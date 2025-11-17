# Netlify Deployment Guide

## ✅ Issues Fixed for Netlify Deployment

### 1. **Added netlify.toml Configuration**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. **Updated next.config.mjs**
- Added `output: 'standalone'` for optimized Netlify deployment
- Added `images: { unoptimized: true }` for static export compatibility

### 3. **Fixed Peer Dependencies**
- Set `NPM_FLAGS = "--legacy-peer-deps"` in Netlify config
- Resolves React 19 compatibility issues with next-themes

### 4. **Added Security Headers**
- Created `_headers` file with security best practices
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### 5. **Updated .gitignore**
- Added `.netlify` folder
- Added `.vercel` folder

## 🚀 Deploy Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select `Portfolio_Chronark` repository
   - Settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Wait for Build**
   - Build takes ~2-3 minutes
   - Check build logs if any errors occur

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Initialize site (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

## 🔍 Verify Deployment

After deployment, check:

1. **Homepage** - Particle animations working
2. **Projects Page** - GitHub API loading repos
3. **About Page** - All sections rendering
4. **Contact Page** - Social links active
5. **Navigation** - All routes working

## ⚙️ Netlify Dashboard Settings

### Build & Deploy
- **Build command**: `npm run build` (from netlify.toml)
- **Publish directory**: `.next` (from netlify.toml)
- **Node version**: 20 (from netlify.toml)

### Environment Variables (Optional)
If you need custom domain or API keys:
- Go to Site settings → Environment variables
- Add variables as needed

### Domain Settings
- Custom domain: Configure in Domain management
- HTTPS: Automatically enabled by Netlify
- DNS: Point your domain to Netlify nameservers

## 🐛 Common Issues & Solutions

### Issue: "Peer dependency errors during build"
**Solution**: Already fixed with `NPM_FLAGS = "--legacy-peer-deps"` in netlify.toml

### Issue: "Module not found" errors
**Solution**: Ensure all imports use correct relative paths (not using @/ aliases)

### Issue: "Build exceeds time limit"
**Solution**: Current build takes ~2-3 minutes, which is well within Netlify's limits

### Issue: "404 on page refresh"
**Solution**: Already handled by Next.js plugin and static generation

### Issue: "Images not loading"
**Solution**: Set `images: { unoptimized: true }` in next.config.mjs (already done)

## 📊 Build Output

Expected successful build output:
```
✓ Compiled successfully in 42s
✓ Running TypeScript...
✓ Generating static pages (6/6)
✓ Finalizing page optimization

Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /contact
└ ○ /projects

○ (Static) prerendered as static content
```

## 🎯 Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All pages accessible via navigation
- [ ] Particle animations smooth
- [ ] GitHub API fetches projects
- [ ] Responsive design works on mobile
- [ ] Dark theme displays correctly
- [ ] OG images and metadata correct
- [ ] Custom domain configured (if applicable)

## 🔄 Continuous Deployment

Netlify automatically rebuilds when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Netlify auto-deploys
```

## 📝 Deployment Logs

Access logs at:
- Netlify Dashboard → Deploys → Latest deploy → Deploy log
- Check for any warnings or errors

## 🎉 Success!

Your portfolio is now live on Netlify with:
- ✅ Chronark-style animations
- ✅ All 4 pages working
- ✅ Once UI design system
- ✅ Optimized performance
- ✅ Automatic HTTPS
- ✅ CDN distribution

Share your deployed site: `https://your-site-name.netlify.app`
