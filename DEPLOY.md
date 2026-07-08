# Deploying Icy's Second Brain to Vercel

This repo already contains everything needed to publish the site. This guide is
written so you (or a fresh Claude Code session opened in this repo) can deploy it
to Vercel from GitHub in a couple of minutes.

## What gets deployed (and what does NOT)

- Deployed: the `public/` bundle - a public-safe portfolio:
  - `public/index.html` - landing page
  - `public/skills.html` - interactive Skills Map
  - `public/brain.html` - interactive knowledge graph + timeline (personal health/finance nodes removed)
- NOT deployed (kept private): your vault `icy-vault/`, the local capture server
  `serve.js` / `serve.py`, `api/save.js`, and all skill source. These are excluded
  by `.vercelignore`, and `vercel.json` only serves `public/`.

So the hosted site is a clean portfolio with no sensitive data. Your full private
brain runs only locally (via `start-brain.bat`).

## Repo and branch

- Repo: `icychew/obsidian-second-brain`
- The deploy config (`vercel.json`, `.vercelignore`) and the `public/` bundle are
  on branch: `claude/exciting-planck-5wzeu7`
- Deploy that branch directly, OR merge it into `main` first and deploy `main`.

## Method 1 - Vercel dashboard (easiest, no CLI)

1. Open https://vercel.com/new
2. "Import Git Repository" -> pick `icychew/obsidian-second-brain`
   (authorize the Vercel GitHub app for this repo if prompted)
3. If deploying the feature branch: after import, go to Project Settings -> Git ->
   set Production Branch to `claude/exciting-planck-5wzeu7`. (Or merge PR #1 into
   `main` first and skip this.)
4. Framework Preset: "Other". Leave Build Command / Output empty - `vercel.json`
   handles routing.
5. Click Deploy. You get a URL like `https://<project-name>.vercel.app`.

Every future push to that branch auto-redeploys.

## Method 2 - Vercel CLI (from this repo folder)

```
npm i -g vercel        # if not already installed
vercel login
vercel                 # first run links/creates the project + a preview deploy
vercel --prod          # promote to your production URL
```

Vercel reads `vercel.json` and serves `public/`.

## Method 3 - Have a Claude Code session do it

Open a Claude Code session in this repo and say:

> Read DEPLOY.md and deploy the `public/` bundle to Vercel with the Vercel CLI
> (`vercel --prod`). It is a public-safe static portfolio; the private vault is
> excluded via `.vercelignore`. Report the production URL.

## Config reference (already in the repo)

`vercel.json`:
```json
{
  "version": 2,
  "builds": [
    { "src": "public/**", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/", "dest": "/public/index.html" },
    { "src": "/(.*)", "dest": "/public/$1" }
  ]
}
```

`.vercelignore` excludes `icy-vault`, `site`, `api`, `serve.js`, and all source, so
only `public/` (plus `vercel.json`) is uploaded.

## Optional

- Keep it private anyway: Project -> Settings -> Deployment Protection ->
  Password Protection.
- Custom domain: Project -> Settings -> Domains -> add your domain.

## Troubleshooting

- 404 at `/`: confirm the deployed branch actually contains `public/` and
  `vercel.json`. If Vercel deployed `main` but the bundle is on the feature
  branch, either merge to `main` or set the Production Branch (Method 1, step 3).
- Blank page / assets 404: the map pages use relative links (`skills.html`,
  `brain.html`) so they work under the project root - do not move them into a
  subfolder without updating the links.

## Advanced - hosting the FULL brain with online note-save (not recommended)

This publishes your full personal data and arms a GitHub-write endpoint, so only
do it behind Password Protection.

1. Point `vercel.json` at `site/` + the function instead of `public/`:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "api/save.js", "use": "@vercel/node" },
       { "src": "site/**", "use": "@vercel/static" }
     ],
     "routes": [
       { "src": "/api/save", "methods": ["POST"], "dest": "/api/save.js" },
       { "src": "/", "dest": "/site/index.html" },
       { "src": "/(.*)", "dest": "/site/$1" }
     ]
   }
   ```
2. Remove `icy-vault` from `.vercelignore` only if you accept publishing it.
3. Set env vars (Project -> Settings -> Environment Variables):
   - `GITHUB_TOKEN` - a GitHub fine-grained token with Contents: Read and Write on
     this repo only. Never commit it.
   - `SAVE_PASSCODE` - a strong passphrase entered in the app to save.
   - `GITHUB_BRANCH` - `main` (after merging) or the feature branch.
4. Enable Deployment Protection (Password) first.
