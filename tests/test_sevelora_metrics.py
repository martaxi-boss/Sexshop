import gzip
import importlib.util
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('metrics', Path(__file__).parents[1] / 'scripts/sevelora_metrics.py')
metrics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metrics)


class CounterTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 21, 12, tzinfo=timezone.utc)

    def line(self, path='/', ref='-', agent='Mozilla/5.0', status=200, when=None):
        stamp = (when or self.now - timedelta(minutes=1)).strftime('%d/%b/%Y:%H:%M:%S %z')
        return f'192.0.2.45 - - [{stamp}] "GET {path} HTTP/1.1" {status} 100 "{ref}" "{agent}"\n'

    def test_origins_prefetch_bots_and_private_report(self):
        lines = ''.join([
            self.line(ref='https://www.google.pt/search?q=private'),
            self.line('/catalogo?utm_source=facebook&utm_medium=paid_social'),
            self.line('/produto/123?_rsc=private', ref='https://sevelora.eu/'),
            self.line('/produto/123', ref='https://sevelora.eu/'),
            self.line(ref='https://www.bing.com/'),
            self.line(ref='https://notgoogle.pt/'),
            self.line(agent='Googlebot'),
            self.line(agent='SeveloraMetricsCheck/1.0'),
            self.line('/_next/static/foo.js', ref='https://www.google.pt/'),
            self.line(status=404),
            self.line(when=self.now - timedelta(days=8)),
        ])
        with tempfile.TemporaryDirectory() as root:
            folder = Path(root)
            (folder / metrics.LOG_NAME).write_text(lines)
            result = metrics.summarize(folder, now=self.now)
            self.assertEqual(result['totals']['page_requests'], 5)
            self.assertEqual(result['totals']['client_route_requests'], 1)
            self.assertEqual(result['totals']['google'], 1)
            self.assertEqual(result['totals']['meta'], 1)
            self.assertEqual(result['totals']['internal'], 1)
            self.assertEqual(result['totals']['other_search'], 1)
            self.assertEqual(result['totals']['other_external'], 1)
            self.assertEqual(result['totals']['bot_requests'], 1)
            self.assertEqual(result['totals']['qa_requests'], 1)
            metrics.write_report(result, folder / 'report.json')
            written = (folder / 'report.json').read_text()
            for sensitive in ['192.0.2.45', 'Mozilla', 'private', 'fbclid', 'notgoogle.pt', '/produto/123']:
                self.assertNotIn(sensitive, written)
            self.assertEqual((folder / 'report.json').stat().st_mode & 0o777, 0o600)

    def test_missing_is_not_zero_but_new_empty_log_is_zero(self):
        with tempfile.TemporaryDirectory() as root:
            folder = Path(root)
            with self.assertRaises(ValueError):
                metrics.summarize(folder, now=self.now)
            (folder / metrics.LOG_NAME).touch()
            report = metrics.summarize(folder, now=self.now)
            self.assertEqual(report['totals']['page_requests'], 0)
            self.assertIsNone(report['first_observed'])

    def test_rotated_gzip_and_symlink_rejection(self):
        with tempfile.TemporaryDirectory() as root:
            folder = Path(root)
            (folder / metrics.LOG_NAME).touch()
            with gzip.open(folder / (metrics.LOG_NAME + '.1.gz'), 'wt') as stream:
                stream.write(self.line(ref='https://www.google.com/'))
            result = metrics.summarize(folder, now=self.now)
            self.assertEqual(result['totals']['google'], 1)
            (folder / (metrics.LOG_NAME + '.2')).symlink_to(folder / metrics.LOG_NAME)
            with self.assertRaises(ValueError):
                metrics.summarize(folder, now=self.now)


if __name__ == '__main__':
    unittest.main()
