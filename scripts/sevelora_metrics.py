"""Private Sevelora request counts, adapted from Lowcost's local Nginx counters.

These are observed HTTP requests, not unique people, Search Console clicks or sales.
No IP, raw user agent, referrer URL, query value or product identity is retained.
"""
import argparse
import gzip
import json
import os
import re
import tempfile
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from zoneinfo import ZoneInfo

DOMAIN = "sevelora.eu"
LOG_NAME = "sevelora.access.log"
ENGINES = ("Google", "Bing", "Yahoo", "DuckDuckGo", "Brave", "Seznam", "Yandex")
MAX_LOG_BYTES = 128 * 1024 * 1024
MAX_LINES = 2_000_000
COMBINED = re.compile(
    r'^\S+ \S+ \S+ \[(?P<when>[^\]]{10,55})\] '
    r'"(?P<request>[^"]{0,2048})" (?P<status>\d{3}) \S+ '
    r'"(?P<referer>[^"]{0,2048})" "(?P<agent>[^"]{0,4096})"(?: .*)?$'
)
BOT = re.compile(r"bot|crawl|spider|slurp|headless|playwright|puppeteer|curl|wget|python|httpclient|go-http|scanner|monitor|uptime|facebookexternalhit|preview|lighthouse|pagespeed|bytespider", re.I)
PUBLIC = re.compile(r"/|/catalogo/?|/categoria/[^/]+/?|/produto/[^/]+/?|/guias/?|/sobre/?|/afiliacao/?")
FIELDS = ("page_requests", "client_route_requests", "google", "meta", "other_search",
          "other_external", "direct_unknown", "internal", "bot_requests", "qa_requests")

def _engine(referer):
    if not referer or referer == "-":
        return None
    try:
        parsed = urlsplit(referer)
        if parsed.scheme not in {"http", "https"}:
            return None
        host = (parsed.hostname or "").lower().rstrip(".")
    except ValueError:
        return None
    if re.fullmatch(r"(?:[a-z0-9-]+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?", host):
        return "Google"
    if host == "bing.com" or host.endswith(".bing.com"):
        return "Bing"
    if host == "yahoo.com" or host.endswith(".yahoo.com"):
        return "Yahoo"
    if host == "duckduckgo.com" or host.endswith(".duckduckgo.com"):
        return "DuckDuckGo"
    if host == "search.brave.com":
        return "Brave"
    if host == "seznam.cz" or host.endswith(".seznam.cz"):
        return "Seznam"
    if host == "yandex.ru" or host.endswith(".yandex.ru"):
        return "Yandex"
    return None



def _meta_origin(request_line, referer):
    """Classify a public-page arrival, never identifying a person or sale.

    A Facebook/Instagram Referer, Meta UTM or fbclid is an indication of
    origin, NOT a confirmed paid-ad click. Only explicit paid UTM media are
    flagged as tagged campaigns.
    """
    parts = request_line.split(" ", 2)
    if len(parts) < 2:
        return None
    try:
        query = parse_qs(urlsplit(parts[1]).query)
        referer_url = urlsplit(referer)
        host = (referer_url.hostname or "").lower().rstrip(".")
        if referer_url.scheme not in {"http", "https"}:
            host = ""
    except ValueError:
        return None

    def first(key):
        return str(query.get(key, [""])[0]).lower().strip()

    utm_source = first("utm_source")
    if utm_source in {"facebook", "fb", "fb_ads", "facebook_ads"}:
        origin = "facebook"
    elif utm_source in {"instagram", "ig", "instagram_ads"}:
        origin = "instagram"
    elif utm_source in {"meta", "meta_ads"}:
        origin = "unspecified"
    elif host == "facebook.com" or host.endswith(".facebook.com") or (
        host == "fb.com" or host.endswith(".fb.com")
    ):
        origin = "facebook"
    elif host == "instagram.com" or host.endswith(".instagram.com"):
        origin = "instagram"
    elif first("fbclid") or first("igshid"):
        origin = "unspecified"
    else:
        return None

    paid_media = {"paid", "paid_social", "paidsocial", "cpc", "ppc", "ads", "meta_ads"}
    paid_tagged = first("utm_medium") in paid_media and utm_source in {
        "facebook", "fb", "fb_ads", "facebook_ads", "instagram", "ig",
        "instagram_ads", "meta", "meta_ads",
    }
    return origin, paid_tagged



def log_files(directory):
    directory = Path(directory)
    if not directory.is_dir() or directory.is_symlink():
        raise ValueError("log_directory_unavailable")
    files = []
    for path in directory.iterdir():
        if not re.fullmatch(r"sevelora\.access\.log(?:\.\d+(?:\.gz)?)?", path.name):
            continue
        if path.is_symlink() or not path.is_file() or path.stat().st_size > MAX_LOG_BYTES:
            raise ValueError("unsafe_or_oversized_log")
        files.append(path)
    if not any(path.name == LOG_NAME for path in files):
        raise ValueError("dedicated_log_missing")
    if len(files) > 24:
        raise ValueError("log_inventory_unexpected")
    return sorted(files)


def summarize(directory, *, now=None, recording_started=None):
    now = now or datetime.now(timezone.utc)
    if now.tzinfo is None:
        raise ValueError("naive_now")
    now = now.astimezone(timezone.utc)
    start = now - timedelta(days=7)
    today = now.astimezone(ZoneInfo("Europe/Lisbon")).date()
    rows = {(today - timedelta(days=i)).isoformat(): Counter() for i in range(7, -1, -1)}
    engines = Counter()
    totals = Counter()
    first = last = None
    files = log_files(directory)
    lines = 0
    for path in files:
        opening = gzip.open if path.suffix == ".gz" else open
        with opening(path, "rt", encoding="utf-8", errors="replace") as stream:
            for line in stream:
                lines += 1
                if lines > MAX_LINES:
                    raise ValueError("line_budget_exceeded")
                match = COMBINED.match(line.rstrip("\n"))
                if not match:
                    continue
                data = match.groupdict()
                try:
                    stamp = datetime.strptime(data["when"], "%d/%b/%Y:%H:%M:%S %z").astimezone(timezone.utc)
                    parts = data["request"].split(" ", 2)
                    if len(parts) < 2:
                        continue
                    parsed = urlsplit(parts[1])
                    query = parse_qs(parsed.query)
                    referer = urlsplit(data["referer"])
                    host = (referer.hostname or "").lower().rstrip(".")
                except ValueError:
                    continue
                if not start <= stamp <= now:
                    continue
                first = min(first or stamp, stamp)
                last = max(last or stamp, stamp)
                row = rows[stamp.astimezone(ZoneInfo("Europe/Lisbon")).date().isoformat()]
                def add(key):
                    row[key] += 1
                    totals[key] += 1
                if data["agent"].startswith("SeveloraMetricsCheck/"):
                    add("qa_requests")
                    continue
                if BOT.search(data["agent"]):
                    add("bot_requests")
                    continue
                if parts[0] != "GET" or data["status"] not in {"200", "304"} or not PUBLIC.fullmatch(parsed.path):
                    continue
                # Next.js RSC is a mixture of navigation and prefetch; keep separate.
                if "_rsc" in query:
                    add("client_route_requests")
                    continue
                add("page_requests")
                meta = _meta_origin(data["request"], data["referer"])
                engine = _engine(data["referer"])
                if meta:
                    add("meta")
                elif engine:
                    engines[engine] += 1
                    add("google" if engine == "Google" else "other_search")
                elif host in {DOMAIN, "www." + DOMAIN}:
                    add("internal")
                elif referer.scheme in {"http", "https"} and host:
                    add("other_external")
                else:
                    add("direct_unknown")
    return {
        "schema": 1, "domain": DOMAIN, "source": "DEDICATED_NGINX_LOG",
        "checked_at": now.isoformat(), "recording_started": recording_started,
        "window_start": start.isoformat(), "window_end": now.isoformat(),
        "first_observed": first.isoformat() if first else None,
        "last_observed": last.isoformat() if last else None,
        "log_files_read": len(files),
        "totals": {key: totals[key] for key in FIELDS},
        "engines": {key: engines[key] for key in ENGINES},
        "daily": [{"date": day, **{key: rows[day][key] for key in FIELDS}} for day in sorted(rows)],
        "caveats": [
            "observed_requests_not_unique_people_or_confirmed_customers",
            "referrers_are_unverified_and_can_be_missing",
            "known_bots_and_marked_qa_excluded_from_page_requests",
            "rsc_routes_and_prefetch_separate_not_page_views",
            "new_dedicated_log_does_not_reconstruct_historical_traffic",
            "affiliate_clicks_and_sales_require_awin_reports",
        ],
    }


def write_report(report, output):
    output = Path(output)
    if output.is_symlink() or not output.parent.is_dir() or output.parent.is_symlink():
        raise ValueError("unsafe_report_target")
    fd, temporary = tempfile.mkstemp(prefix=".report-", dir=output.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(report, stream, sort_keys=True, separators=(",", ":"))
            stream.write("\n")
        os.chmod(temporary, 0o600)
        os.replace(temporary, output)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--log-dir", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--started-file", required=True)
    args = parser.parse_args()
    marker = Path(args.started_file)
    started = marker.read_text().strip()
    datetime.fromisoformat(started)
    report = summarize(args.log_dir, recording_started=started)
    write_report(report, args.output)
    print(json.dumps(report, sort_keys=True))


if __name__ == "__main__":
    main()

