# 🚀 Deployment Guide - UNO React Game

Complete step-by-step guide to deploy your UNO game to Netlify.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ A [GitHub](https://github.com) account
- ✅ A [Netlify](https://netlify.com) account (free tier is perfect)
- ✅ Git installed on your computer
- ✅ Your UNO game code ready

## 🎯 Deployment Options

### Option 1: Deploy via GitHub (Recommended)

This method enables automatic deployments whenever you push code changes.

#### Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   cd uno-react
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit changes**:
   ```bash
   git commit -m "Initial commit - UNO game ready for deployment"
   ```

4. **Create repository on GitHub**:
   - Go to [GitHub](https://github.com/new)
   - Name: `uno-game-react`
   - Description: `Modern UNO card game built with React`
   - Keep it Public or Private (your choice)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/uno-game-react.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Connect to Netlify

1. **Log in to Netlify**:
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign up or log in (you can use your GitHub account)

2. **Create new site**:
   - Click **"Add new site"** → **"Import an existing project"**
   
3. **Connect to GitHub**:
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select your `uno-game-react` repository

4. **Configure build settings**:
   - **Base directory**: Leave empty (or enter `uno-react` if deploying from parent folder)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - These settings are also in `netlify.toml`, so Netlify will auto-detect them

5. **Deploy!**:
   - Click **"Deploy site"**
   - Wait 2-3 minutes for build to complete
   - Your site will be live! 🎉

#### Step 3: Customize Your Site

1. **Change site name**:
   - Go to **Site settings** → **Site details**
   - Click **"Change site name"**
   - Choose something like: `alex-uno-game` or `play-uno-now`
   - Your URL becomes: `https://alex-uno-game.netlify.app`

2. **Add custom domain** (optional):
   - Go to **Domain settings**
   - Click **"Add custom domain"**
   - Follow instructions to connect your domain

### Option 2: Deploy via Netlify Drop (Quick & Easy)

Perfect for quick testing without Git integration.

1. **Build your project locally**:
   ```bash
   cd uno-react
   npm install
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the `dist` folder
   - Wait for upload to complete
   - Your site is live! 🎉

**Note**: This method requires manual re-upload for each update.

### Option 3: Netlify CLI (For Developers)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and deploy**:
   ```bash
   cd uno-react
   netlify init
   ```

4. **Follow prompts**:
   - Create & configure a new site
   - Choose your team
   - Set site name
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## 🔧 Configuration Files

### netlify.toml

The project includes a `netlify.toml` file that automatically configures:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**What it does**:
- Sets build command and output directory
- Redirects all routes to index.html (needed for React Router)
- Sets caching headers for optimal performance
- Configures security headers

### package.json Scripts

```json
"scripts": {
  "dev": "vite",          // Local development
  "build": "vite build",  // Production build
  "preview": "vite preview" // Preview production build
}
```

## 🐛 Troubleshooting

### Build Fails

**Error**: `npm ERR! Cannot find module`
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error**: `Failed to load config`
```bash
# Solution: Check Node version
node --version  # Should be 20+
```

### Blank Page After Deploy

**Problem**: Site loads but shows blank page

**Solution**: Check build logs in Netlify dashboard
- Look for build warnings/errors
- Ensure `dist` folder contains files
- Check browser console for errors

### 404 on Refresh

**Problem**: Page works on first load but 404 on refresh

**Solution**: Make sure `netlify.toml` includes the redirect rule:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Images Not Loading

**Problem**: Card images don't display

**Solution**: 
- Ensure `public/cards/` folder exists
- Check image paths are correct
- Verify images are committed to Git

## 📊 Post-Deployment Checklist

After deployment, verify everything works:

- [ ] Site loads without errors
- [ ] Start menu displays correctly
- [ ] CSS UNO logo appears and animates
- [ ] Can enter player names
- [ ] Game starts successfully
- [ ] Cards display properly
- [ ] Can play cards
- [ ] Can draw cards
- [ ] AI opponents play correctly
- [ ] Wild card color picker works
- [ ] Game rules modal opens
- [ ] Winner screen appears when game ends
- [ ] Mobile responsive design works
- [ ] No console errors

## 🔄 Continuous Deployment

With GitHub integration, every push to main branch triggers automatic deployment:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Netlify automatically:
# 1. Detects the push
# 2. Runs npm install
# 3. Runs npm run build
# 4. Deploys new version
# 5. Updates live site (2-3 minutes)
```

## 🌐 Environment Variables

If you need environment variables:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add key-value pairs
4. Redeploy site

Example:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎉 Success!

Your UNO game is now live on the internet! Share the URL with friends and family:

```
https://your-site-name.netlify.app
```

### Next Steps

- 🎨 Customize the site name
- 📱 Test on different devices
- 📊 Check Netlify Analytics
- 🔗 Share your game!
- ⭐ Star the repo on GitHub

## 📞 Support

If you encounter issues:

1. Check [Netlify Documentation](https://docs.netlify.com)
2. Review build logs in Netlify dashboard
3. Check browser console for errors
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**

Made with ❤️ by Alexandru Tulbure
