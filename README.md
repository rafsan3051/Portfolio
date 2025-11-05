# Magic Portfolio

Magic Portfolio is a simple, clean, beginner-friendly portfolio template. It supports an MDX-based content system for projects and blog posts, an about / CV page and a gallery.

View the demo [here](https://demo.magic-portfolio.com).

![Magic Portfolio](public/images/og/home.jpg)

## Getting started

**1. Clone the repository**
```
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependencies**
```
npm install
```

**3. Run dev server**
```
npm run dev
```

**4. Edit config**
```
src/resources/once-ui.config.js
```

**5. Edit content**
```
src/resources/content.js
```

**6. Create blog posts / projects**
```
Add a new .mdx file to src/app/blog/posts or src/app/work/projects
```

Magic Portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js v18.17+.

## Documentation

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## Features

### Once UI
## Automatic GitHub Sync

This portfolio can auto-sync whenever you push, create, delete, or rename public repositories on GitHub.

Two mechanisms are available:

- GitHub Webhook (recommended): GitHub calls your site and triggers a full sync.
- Scheduled Cron (optional): A timed job that triggers sync periodically as a safety net.

### 1) Configure environment variables

Add these to your deployment environment (and optionally to `.env` locally):

- `GITHUB_USERNAME` (optional; defaults to your account, e.g., `rafsan3051`)
- `GITHUB_TOKEN` (optional but recommended for higher rate limits)
- `GITHUB_WEBHOOK_SECRET` (required for webhook signature verification)
- `CRON_SECRET` (required if you enable scheduled sync)

### 2) GitHub webhook setup

Set up a webhook at either your user’s settings (for all repos) or per-repository:

- Payload URL: `https://your-domain.com/api/webhooks/github`
- Content type: `application/json`
- Secret: value of `GITHUB_WEBHOOK_SECRET`
- Events: choose “Let me select individual events” and select at least `push` and `repository` (or choose “Send me everything”).

When GitHub fires a webhook for push or repo changes, the route validates the HMAC (`X-Hub-Signature-256`) and calls a full sync.

### 3) Optional: scheduled sync

Add a scheduled task (Vercel/Netlify/cron) to call:

GET `https://your-domain.com/api/cron/sync`

Headers: `Authorization: Bearer <CRON_SECRET>`

### 4) Manual sync (for local maintenance)

You can still run sync locally without the server:

```
npm run sync:repos
```

This updates MDX files under `src/app/work/projects` and prunes any stale GitHub-sourced entries. The manifest `.synced.json` tracks the current set.

### Notes

- Only MDX files with `source: "github"` are pruned automatically. Manually authored MDX are preserved unless you remove them yourself.
- Project images use local files when present, and fall back to GitHub OpenGraph previews when missing.
- The dashboard “Sync Selected” uses the same sync engine and now shows how many items were pruned.
- All tokens, components & features of [Once UI](https://once-ui.com)

### SEO
- Automatic open-graph and X image generation with next/og
- Automatic schema and metadata generation based on the content file

### Design
- Responsive layout optimized for all screen sizes
- Timeless design without heavy animations and motion
- Endless customization options through [data attributes](https://once-ui.com/docs/theming)

### Content
- Render sections conditionally based on the content file
- Enable or disable pages for blog, work, gallery and about / CV
- Generate and display social links automatically
- Set up password protection for URLs

### Localization
- A localized, earlier version of Magic Portfolio is available with the next-intl library
- To use localization, switch to the 'i18n' branch

## Creators

Lorant One: [Threads](https://www.threads.net/@lorant.one) / [LinkedIn](https://www.linkedin.com/in/lorant-one/)

## Get involved

- Join the Design Engineers Club on [Discord](https://discord.com/invite/5EyAQ4eNdS) and share your project with us!
- Deployed your docs? Share it on the [Once UI Hub](https://once-ui.com/hub) too! We feature our favorite apps on our landing page.

## License

Distributed under the CC BY-NC 4.0 License.
- Attribution is required.
- Commercial usage is not allowed.
- You can extend the license to [Dopler CC](https://dopler.app/license) by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE.txt` for more information.

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fog%2Fhome.jpg)