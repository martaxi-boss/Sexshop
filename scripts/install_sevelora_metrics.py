"""Enable only Sevelora's dedicated log; preserve config and roll back on errors."""
import datetime
import grp
import hashlib
import os
from pathlib import Path
import pwd
import re
import subprocess

ROOT = Path('/srv/projects/Sexshop')
CONFIG = ROOT / 'infra/sevelora.eu.conf'
METRICS = ROOT / '.local-metrics'
DIRECTIVE = 'access_log /var/log/nginx/sevelora.access.log combined;'


def run(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True)


def main():
    if ROOT.is_symlink() or CONFIG.is_symlink() or not CONFIG.is_file():
        raise ValueError('unexpected_sevelora_config')
    for service in ['sexshop.service', 'lowcost-europa.service', 'nginx']:
        run('systemctl', 'is-active', '--quiet', service)
    active = run('nginx', '-T').stdout
    sections = re.findall(r'# configuration file ([^\n]+):\n(.*?)(?=\n# configuration file |\Z)', active, re.S)
    candidates = [Path(name).resolve() for name, body in sections
                  if re.search(r'\bserver_name\s+sevelora\.eu\s*;', body)]
    if len(candidates) != 1:
        raise ValueError('canonical_nginx_config_not_unique')
    config = candidates[0]
    if not (config.is_relative_to(ROOT) or config.is_relative_to('/etc/nginx')) or not config.is_file():
        raise ValueError('unexpected_active_config_location')
    print('SEVELORA_ACTIVE_CONFIG=' + str(config))
    if METRICS.is_symlink():
        raise ValueError('unsafe_metrics_directory')
    METRICS.mkdir(mode=0o700, exist_ok=True)
    os.chmod(METRICS, 0o700)
    backups = METRICS / 'backups'
    backups.mkdir(mode=0o700, exist_ok=True)
    if backups.is_symlink():
        raise ValueError('unsafe_backup_directory')
    raw_log = Path('/var/log/nginx/sevelora.access.log')
    if raw_log.is_symlink():
        raise ValueError('unsafe_log_target')
    fd = os.open(raw_log, os.O_CREAT | os.O_APPEND | os.O_WRONLY | os.O_NOFOLLOW, 0o640)
    os.close(fd)
    os.chown(raw_log, pwd.getpwnam('www-data').pw_uid, grp.getgrnam('adm').gr_gid)
    os.chmod(raw_log, 0o640)
    before = config.read_text()
    if DIRECTIVE not in before:
        matches = list(re.finditer(r'(?m)^(\s*)server_name\s+sevelora\.eu\s*;', before))
        if len(matches) != 1 or 'access_log' in before:
            raise ValueError('unexpected_nginx_layout')
        match = matches[0]
        after = before[:match.end()] + '\n' + match.group(1) + DIRECTIVE + before[match.end():]
        backup = backups / ('nginx-' + hashlib.sha256(before.encode()).hexdigest() + '.conf')
        if not backup.exists():
            backup.write_text(before)
            os.chmod(backup, 0o600)
        try:
            config.write_text(after)
            run('nginx', '-t')
            run('systemctl', 'reload', 'nginx')
            if DIRECTIVE not in run('nginx', '-T').stdout:
                raise ValueError('dedicated_log_not_active')
        except Exception:
            config.write_text(before)
            run('nginx', '-t')
            run('systemctl', 'reload', 'nginx')
            raise
    else:
        run('nginx', '-t')
    marker = METRICS / 'recording-started.txt'
    if marker.is_symlink():
        raise ValueError('unsafe_marker')
    if not marker.exists():
        marker.write_text(datetime.datetime.now(datetime.timezone.utc).isoformat() + '\n')
        os.chmod(marker, 0o600)
    # The derived report stays private to this project; no website endpoint.
    os.chown(METRICS, pwd.getpwnam('ubuntu').pw_uid, pwd.getpwnam('ubuntu').pw_gid)
    for service in ['sexshop.service', 'lowcost-europa.service', 'nginx']:
        run('systemctl', 'is-active', '--quiet', service)
    print('SEVELORA_DEDICATED_LOG_ACTIVE=PASS')


if __name__ == '__main__':
    main()
