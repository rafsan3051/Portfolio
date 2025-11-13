# MRAS Portfolio (Next.js 14 + Tailwind)

A modern, animated portfolio inspired by chronark.com. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and next-themes.

## Quickstart

```pwsh
# from g:\VSCODE\portfolio_chronark
npm i
npm run dev
```

Then open http://localhost:3000.

## Customize
- Update hero text and social links in `app/page.tsx`.
- Replace `public/resume.pdf` with your actual resume PDF.
- Replace `public/og.png` with a 1200x630 PNG for social previews.
- Tweak colors/gradients in `styles/globals.css`.
- Navbar/Theme toggle in `components/navbar.tsx` and `components/theme-toggle.tsx`.

## Tech
- Next.js 14 (App Router), React 18
- Tailwind CSS, TypeScript
- Framer Motion (animations), next-themes (dark/light)
- Vercel Analytics

## Deploy
- Push to GitHub and import in Vercel. No extra config required.

```pwsh
npm run build
npm start
```

---
Planned sections: About, Skills, Projects (GitHub API), Experience, Contact.