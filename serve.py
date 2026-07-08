#!/usr/bin/env python3
# Icy's Second Brain - local server (Python, no dependencies).
# Run:   python serve.py     then open  http://localhost:4321
# Saves captured notes straight into your vault (icy-vault next to this file,
# or set OBSIDIAN_VAULT_PATH).
import os, json, socket, socketserver, http.server

BASE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(BASE, 'site')
VAULT = os.environ.get('OBSIDIAN_VAULT_PATH', os.path.join(BASE, 'icy-vault'))
PORT = int(os.environ.get('PORT', '4321'))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=SITE, **k)

    def _json(self, code, obj):
        b = json.dumps(obj).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_POST(self):
        if self.path.split('?')[0] != '/api/save':
            return self.send_error(404)
        n = int(self.headers.get('Content-Length', 0) or 0)
        try:
            body = json.loads(self.rfile.read(n) or b'{}')
        except Exception:
            body = {}
        rel = str(body.get('path', '')).replace('..', '').lstrip('/\\')
        content = body.get('content')
        if not rel or not content:
            return self._json(400, {'error': 'path and content required'})
        dest = os.path.normpath(os.path.join(VAULT, rel))
        if not dest.startswith(os.path.normpath(VAULT)):
            return self._json(400, {'error': 'bad path'})
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'w', encoding='utf-8') as f:
            f.write(content)
        print('  saved ->', dest)
        return self._json(200, {'ok': True, 'url': 'file:///' + dest.replace('\\', '/')})

    def log_message(self, *a):
        pass


def lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return None


if __name__ == '__main__':
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    httpd = socketserver.ThreadingTCPServer(('0.0.0.0', PORT), Handler)
    print('')
    print('  Icy Second Brain is running:  http://localhost:%d' % PORT)
    ip = lan_ip()
    if ip:
        print('  On your phone (same WiFi):    http://%s:%d' % (ip, PORT))
    print('  Vault:  %s   (notes save here)' % VAULT)
    print('  Stop with Ctrl+C')
    print('')
    try:
        import webbrowser
        webbrowser.open('http://localhost:%d' % PORT)
    except Exception:
        pass
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
