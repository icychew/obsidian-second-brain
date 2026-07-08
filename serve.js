// Icy's Second Brain - local server (no dependencies).
// Run:   node serve.js      then open  http://localhost:4321
// It serves the site/ pages and saves captured notes straight into your vault.
// Change the vault location with:  OBSIDIAN_VAULT_PATH=/path/to/icy-vault node serve.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const isPkg = !!process.pkg;                                  // true when running as the packaged .exe
const BASE = isPkg ? path.dirname(process.execPath) : __dirname; // folder the exe/script lives in
const SITE = path.join(BASE, 'site');
const VAULT = process.env.OBSIDIAN_VAULT_PATH || path.join(BASE, 'icy-vault');
const PORT = process.env.PORT || 4321;
function lanIP(){ const ifs=os.networkInterfaces(); for(const n of Object.keys(ifs)){ for(const i of ifs[n]){ if(i.family==='IPv4'&&!i.internal) return i.address; } } return null; }

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg', '.webp': 'image/webp' };

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');

  // Save a note into the vault
  if (req.method === 'POST' && u.pathname === '/api/save') {
    let data = '';
    req.on('data', c => { data += c; if (data.length > 2e6) req.destroy(); });
    req.on('end', () => {
      let body = {};
      try { body = JSON.parse(data); } catch (e) {}
      const rel = String(body.path || '').replace(/\.\.+/g, '').replace(/^[\/\\]+/, '');
      if (!rel || !body.content) return send(res, 400, JSON.stringify({ error: 'path and content required' }), 'application/json');
      const dest = path.resolve(VAULT, rel);
      if (!dest.startsWith(path.resolve(VAULT))) return send(res, 400, JSON.stringify({ error: 'bad path' }), 'application/json');
      fs.mkdir(path.dirname(dest), { recursive: true }, err => {
        if (err) return send(res, 500, JSON.stringify({ error: String(err) }), 'application/json');
        fs.writeFile(dest, body.content, e => {
          if (e) return send(res, 500, JSON.stringify({ error: String(e) }), 'application/json');
          console.log('  saved ->', dest);
          send(res, 200, JSON.stringify({ ok: true, url: 'file:///' + dest.replace(/\\/g, '/') }), 'application/json');
        });
      });
    });
    return;
  }

  // Static files from site/
  let p = u.pathname === '/' ? '/index.html' : u.pathname;
  let file = path.resolve(SITE, '.' + decodeURIComponent(p));
  if (!file.startsWith(path.resolve(SITE))) return send(res, 403, 'forbidden');
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, 'not found');
    send(res, 200, buf, MIME[path.extname(file)] || 'application/octet-stream');
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Icy Second Brain is running:  http://localhost:' + PORT);
  const ip = lanIP(); if (ip) console.log('  On your phone (same WiFi):    http://' + ip + ':' + PORT);
  console.log('  Site:   ' + SITE);
  console.log('  Vault:  ' + VAULT + '   (notes save here)');
  console.log('  Stop by closing this window (or Ctrl+C)');
  console.log('');
  const _url = 'http://localhost:' + PORT;
  const _open = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  try { require('child_process').exec(_open + ' ' + _url); } catch (e) {}
});
