# SAGAR Platform - Vercel Deployment Guide

This guide will walk you through deploying the SAGAR Platform to Vercel and other cloud services.

## 🚀 Frontend Deployment (Vercel)

### Step 1: Prepare the Frontend

1. **Navigate to the web app directory**
   ```bash
   cd apps/web
   ```

2. **Update the build configuration**
   The `next.config.ts` is already configured for Vercel deployment.

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app/api/v1
   NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
   NODE_ENV=production
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from the web directory**
   ```bash
   cd apps/web
   vercel --prod
   ```

4. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL
     - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token

#### Option B: Using Vercel Dashboard

1. **Connect GitHub repository**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the project**
   - Root Directory: `apps/web`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set environment variables**
   - Add the same environment variables as above

### Step 3: Configure Custom Domain (Optional)

1. **Add domain in Vercel dashboard**
2. **Update DNS records** as instructed by Vercel
3. **Enable HTTPS** (automatic with Vercel)

## 🗄️ Backend Deployment (Railway)

### Step 1: Prepare the Backend

1. **Create a Railway account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect your repository**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your SAGAR repository

### Step 2: Configure the Backend

1. **Set the root directory**
   - In Railway dashboard, go to Settings
   - Set Root Directory to `apps/backend`

2. **Add environment variables**
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-super-secret-jwt-key
   REDIS_URL=redis://...
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=3001
   ```

3. **Add PostgreSQL database**
   - In Railway dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will provide the `DATABASE_URL`

4. **Add Redis (Optional)**
   - Add Redis service if needed
   - Railway will provide the `REDIS_URL`

### Step 3: Deploy

1. **Railway will automatically deploy** when you push to your main branch
2. **Check the logs** to ensure successful deployment
3. **Copy the backend URL** for frontend configuration

## 🤖 NLP Service Deployment (Railway)

### Step 1: Deploy NLP Service

1. **Create a new Railway project**
2. **Set root directory** to `apps/nlp-service`
3. **Add environment variables**:
   ```
   REDIS_URL=redis://...
   BACKEND_URL=https://your-backend.railway.app
   PORT=8000
   ```

4. **Railway will automatically detect Python** and install dependencies

## 🔧 Alternative Deployment Options

### Backend Alternatives

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create sagar-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app

# Deploy
git push heroku main
```

#### DigitalOcean App Platform
1. **Create a new app** in DigitalOcean
2. **Connect GitHub repository**
3. **Set build settings**:
   - Source Directory: `apps/backend`
   - Build Command: `npm run build`
   - Run Command: `npm run start:prod`
4. **Add PostgreSQL database**
5. **Set environment variables**

### NLP Service Alternatives

#### Google Cloud Run
```bash
# Build and push container
gcloud builds submit --tag gcr.io/PROJECT-ID/sagar-nlp
gcloud run deploy --image gcr.io/PROJECT-ID/sagar-nlp --platform managed
```

#### AWS Lambda (Serverless)
- Use AWS SAM or Serverless Framework
- Package the FastAPI app for Lambda
- Configure API Gateway

## 🌐 Full Stack Deployment

### Option 1: All on Railway
- Deploy frontend, backend, and NLP service all on Railway
- Use Railway's built-in databases

### Option 2: Vercel + Railway
- Frontend on Vercel
- Backend and NLP service on Railway
- External PostgreSQL database

### Option 3: Vercel + AWS
- Frontend on Vercel
- Backend on AWS ECS/Fargate
- NLP service on AWS Lambda
- Database on AWS RDS

## 🔐 Production Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS everywhere
- [ ] Set up CORS properly
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Use environment variables for all secrets
- [ ] Enable database encryption
- [ ] Set up backup strategies
- [ ] Configure proper error handling
- [ ] Set up health checks

## 📊 Monitoring and Maintenance

### Health Checks
- Frontend: `https://your-app.vercel.app/api/health`
- Backend: `https://your-backend.railway.app/api/v1/health`
- NLP Service: `https://your-nlp.railway.app/health`

### Logs
- **Vercel**: Check function logs in dashboard
- **Railway**: View logs in project dashboard
- **Set up external logging** (e.g., LogRocket, Sentry)

### Database Management
- **Regular backups** (Railway provides automatic backups)
- **Monitor performance** and scale as needed
- **Set up alerts** for critical issues

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names and values
   - Restart services after changing variables

3. **Database Connection**
   - Verify database URL format
   - Check if database is accessible
   - Ensure migrations are run

4. **CORS Issues**
   - Update CORS settings in backend
   - Check frontend URL configuration
   - Verify API endpoints

### Getting Help

- Check the main README.md for general setup
- Review service-specific documentation
- Check deployment platform documentation
- Create an issue in the GitHub repository

## 📈 Scaling Considerations

### Frontend (Vercel)
- Vercel automatically handles scaling
- Consider CDN configuration for global performance
- Monitor bandwidth usage

### Backend (Railway)
- Start with Hobby plan, upgrade as needed
- Monitor resource usage
- Consider horizontal scaling for high traffic

### Database
- Start with shared database, upgrade to dedicated
- Set up read replicas for read-heavy workloads
- Consider database sharding for very large datasets

---

**Happy Deploying! 🚀**

For more detailed information, refer to the main README.md file.