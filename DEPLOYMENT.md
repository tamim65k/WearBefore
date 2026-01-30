# Deployment Guide - WereBefore E-Commerce

## Deploy to Vercel (Recommended)

### Prerequisites
- Git installed on your system
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: WereBefore e-commerce project"
```

### Step 2: Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/werebefore.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Vercel CLI (Fastest)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **werebefore**
   - In which directory is your code located? **./**
   - Want to override settings? **N**

4. Your site will be live at: `https://werebefore-xxxxx.vercel.app`

#### Option B: Vercel Dashboard (Easier)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`
6. Click "Deploy"

### Step 4: Configure Domain (Optional)
1. In Vercel Dashboard, go to your project
2. Settings → Domains
3. Add your custom domain
4. Update DNS settings as instructed

## Environment Variables
No environment variables required for this demo project. All features work with static data and external image sources.

## Build Configuration
- **Node Version**: 18.x or higher
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Image Optimization
Images are served from:
- images.unsplash.com
- cdn.pixabay.com
- i.pravatar.cc

These domains are configured in `next.config.ts` for Next.js Image optimization.

## Production Checklist
- ✅ All TypeScript errors fixed
- ✅ Next.js configuration optimized
- ✅ Image domains configured
- ✅ Build tested locally (`npm run build`)
- ✅ Dependencies up to date
- ✅ .gitignore configured
- ✅ No sensitive data in code

## Testing Production Build Locally
```bash
# Build the project
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to test the production build.

## Troubleshooting

### Build Fails
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `rm -rf .next node_modules package-lock.json`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Images Not Loading
- Verify image domains in `next.config.ts`
- Check external image sources are accessible
- Review Vercel build logs for image optimization errors

### Hydration Errors
- Already fixed with mounted state in Header component
- Clear browser cache and reload

## Performance Optimization
- Images: Automatically optimized by Next.js
- Code: Tree-shaking and minification by Next.js
- Caching: Static assets cached by Vercel CDN
- Loading: Lazy loading for images and components

## Support
For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Project GitHub Issues (if repository is public)

---

**Ready to Deploy!** 🚀
Your WereBefore e-commerce site is production-ready and optimized for Vercel deployment.
