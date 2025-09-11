# 🚀 SAGAR Platform - Vercel Deployment Guide

## Quick Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   cd "C:\Users\Aadi Garg\Desktop\New folder"
   vercel
   ```

4. **Follow the prompts**:
   - Choose your team/account
   - Link to existing project or create new one
   - Confirm the settings

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository or drag and drop the project folder
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### Build Configuration

The project is configured with:
- ✅ Next.js 14.2.0 (stable)
- ✅ React 18.3.1 (stable)
- ✅ Leaflet for maps
- ✅ Recharts for analytics
- ✅ Tailwind CSS for styling

### Troubleshooting

If you encounter build errors:
1. Clear cache: `rm -rf .next node_modules package-lock.json`
2. Reinstall: `npm install`
3. Build: `npm run build`

### Deployment URL

After successful deployment, you'll get a URL like:
`https://sagar-platform-xyz.vercel.app`

## Features Included

- 🗺️ Interactive coastal map with 25+ locations
- 📊 Real-time analytics dashboard
- 🚨 Coastal hazard alerts
- 📈 Predictive analytics
- 👥 User management system
- 📱 Responsive design
