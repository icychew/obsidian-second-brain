// Vercel serverless function: commit a note into the icy-vault via the GitHub API.
// Requires env vars: GITHUB_TOKEN (repo write), SAVE_PASSCODE, and optionally
// GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH (default main).
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const pass = process.env.SAVE_PASSCODE;
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'icychew';
  const repo = process.env.GITHUB_REPO || 'obsidian-second-brain';
  const branch = process.env.GITHUB_BRANCH || 'main';

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { path, content, passcode } = body || {};

  if (!pass || passcode !== pass) return res.status(401).json({ error: 'invalid passcode' });
  if (!token) return res.status(500).json({ error: 'server not configured (GITHUB_TOKEN missing)' });
  if (!path || !content) return res.status(400).json({ error: 'path and content required' });

  const clean = String(path).replace(/\.\.+/g, '').replace(/^\/+/, '');
  const full = 'icy-vault/' + clean;
  const segs = full.split('/').map(encodeURIComponent).join('/');
  const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + segs;
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'icy-second-brain'
  };

  try {
    let sha;
    const g = await fetch(url + '?ref=' + encodeURIComponent(branch), { headers });
    if (g.status === 200) { const j = await g.json(); sha = j.sha; }

    const put = await fetch(url, {
      method: 'PUT',
      headers: Object.assign({}, headers, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        message: 'Add note via voice capture: ' + clean,
        content: Buffer.from(String(content), 'utf8').toString('base64'),
        branch: branch,
        sha: sha
      })
    });
    const out = await put.json();
    if (!put.ok) return res.status(put.status).json({ error: (out && out.message) || 'github error' });
    return res.status(200).json({ ok: true, url: out.content && out.content.html_url });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
