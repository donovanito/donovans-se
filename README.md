# donovans.se - subdomain sites

Each folder in `sites/` is one subdomain of donovans.se. Push to `main` and
GitHub Actions builds and deploys it to one.com (SFTP, `.github/workflows/deploy.yml`).

| Site | Address | Folder |
|---|---|---|
| Enhörningsspelet (game) | https://enhorningsspelet.donovans.se | `sites/enhorningsspelet` (Next.js, static export) |
| Portfolio | https://sites.donovans.se | `sites/sites` (static HTML, lives in `webroots/www/sites/`) |
| AutoPlan - förslag på ny webbplats (prototyp) | https://freshautoplan.donovans.se | `sites/freshautoplan` (static HTML, noindex) |
| Planetspelet (game) | https://planetspelet.donovans.se | `sites/planetspelet` (static HTML/JS, no build) |
| Gamma Station (FPS game) | https://gamma.donovans.se | `sites/gamma` (static, bundled `game.js`; source in `games-src/gamma`, rebuild with `npm ci && npm run build` there and commit) |
| Delta Roadster (sandbox car game, drive/upside-down/fly) | https://delta.donovans.se | `sites/delta` (static HTML/JS, no build) |

## Add a new subdomain

1. **one.com:** create the subdomain (Control panel > Domains/Subdomains) and point it at its **own** folder.
2. **Find the folder:** Actions > "List one.com webroots" > Run workflow. The log shows `webroots/<id>/` folders with contents; the new, near-empty one is yours.
3. **Add the site:**
   - Static HTML: create `sites/<name>/index.html` (+ other files).
   - Next.js: create `sites/<name>/` with its own `package.json`, `next.config.ts` with `output: "export"`, and a `build` script. It is built with `npm ci && npm run build` and `out/` is deployed.
   - Dotfiles such as `.htaccess` go in `sites/<name>/deploy/` and are copied into the web root.
4. **Register it** in `sites.json`:
   ```json
   "<name>": { "host": "<name>.donovans.se", "dir": "webroots/<id>/" }
   ```
5. Push to `main` (or Actions > "Deploy sites to one.com" > Run workflow, optionally with the site name).

A site with `"dir": null` is skipped, so you can add code before the folder is known.

## Setup (once)

Add these three **repository secrets** (Settings > Secrets and variables > Actions) with the same values as in the biili repo:
`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

## Importing an existing site

Actions > "Inspect one.com folder (read-only)" downloads a folder from one.com and prints its text files in the log, so a site that only exists on the server can be copied into `sites/<name>/`. It never writes to one.com.

## Safety

- The deploy mirrors with `--delete`, so a site's web root is fully owned by this repo. Give every subdomain its own folder and never reuse a folder that holds other content.
- The workflow refuses to deploy to biili.se's web root (`webroots/2367fa6d/`) and to the shared `webroots/www/` root (other sites live in subfolders of it), and refuses to deploy a site without `index.html`.
- Sites inside `www/` use a subfolder `dir`, e.g. `webroots/www/sites/`.
