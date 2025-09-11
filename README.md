# SAGAR Platform - Social-AI Geospatial Alerts & Reporting

A comprehensive coastal hazard monitoring and reporting platform that combines social media analytics, AI-powered predictions, and real-time geospatial data to help communities prepare for and respond to coastal disasters.

## 🌊 Features

- **Real-time Hazard Mapping**: Interactive maps showing coastal hazards, reports, and predictions
- **Social Media Integration**: AI-powered analysis of social media posts for hazard detection
- **Predictive Analytics**: Machine learning models for coastal hazard prediction
- **Community Reporting**: User-generated reports with verification system
- **Gamification**: Community engagement through reputation and badge systems
- **Multi-role Support**: Different interfaces for citizens, analysts, officials, and administrators

## 🏗️ Architecture

The platform consists of three main services:

- **Frontend (Next.js)**: React-based web application with interactive maps and dashboards
- **Backend (NestJS)**: RESTful API with authentication, data management, and business logic
- **NLP Service (FastAPI)**: AI-powered natural language processing for social media analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+
- Mapbox API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sagar-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp apps/web/.env.local.example apps/web/.env.local
   cp apps/backend/.env.example apps/backend/.env
   
   # Edit the files with your configuration
   # Make sure to add your Mapbox token to apps/web/.env.local
   ```

4. **Start the development environment**
   ```bash
   # Using Docker Compose (recommended)
   npm run docker:up
   
   # Or start services individually
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - NLP Service: http://localhost:8000

### Manual Setup (without Docker)

1. **Start PostgreSQL and Redis**
   ```bash
   # PostgreSQL
   createdb sagar_platform
   
   # Redis
   redis-server
   ```

2. **Run database migrations**
   ```bash
   cd apps/backend
   npm run migration:run
   ```

3. **Start the services**
   ```bash
   # Terminal 1 - Backend
   cd apps/backend
   npm run start:dev
   
   # Terminal 2 - NLP Service
   cd apps/nlp-service
   pip install -r requirements.txt
   python main.py
   
   # Terminal 3 - Frontend
   cd apps/web
   npm run dev
   ```

## 🐳 Docker Deployment

### Production Build

```bash
# Build all services
docker-compose -f docker-compose.prod.yml up --build

# Or build individual services
docker-compose up --build
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/sagar_platform
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=sagar_platform

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# MinIO (File Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# Mapbox
MAPBOX_ACCESS_TOKEN=your-mapbox-access-token-here

# API URLs
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:3001
NLP_SERVICE_URL=http://localhost:8000
```

## 🚀 Vercel Deployment

### Frontend Deployment

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy the frontend**
   ```bash
   cd apps/web
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token

### Backend Deployment

For the backend, you'll need to deploy to a service that supports Node.js and PostgreSQL:

**Recommended options:**
- **Railway**: Easy deployment with PostgreSQL support
- **Heroku**: Classic platform with add-ons
- **DigitalOcean App Platform**: Scalable and cost-effective
- **AWS ECS/Fargate**: Enterprise-grade solution

#### Railway Deployment Example

1. **Connect your GitHub repository to Railway**
2. **Add environment variables**:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret
   REDIS_URL=redis://...
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Deploy**: Railway will automatically build and deploy your backend

### NLP Service Deployment

Deploy the Python service to:
- **Railway**: Supports Python applications
- **Heroku**: With Python buildpack
- **Google Cloud Run**: Serverless container deployment
- **AWS Lambda**: For serverless deployment

## 📊 Database Schema

The platform uses PostgreSQL with the following main entities:

- **Users**: User accounts with roles and reputation
- **Reports**: User-generated hazard reports
- **Alerts**: System-generated alerts and warnings
- **MediaFiles**: Attached images and videos
- **Predictions**: AI-generated hazard predictions
- **UserReputation**: Reputation tracking and gamification

## 🔧 Development

### Project Structure

```
sagar-platform/
├── apps/
│   ├── web/                 # Next.js frontend
│   ├── backend/             # NestJS API
│   └── nlp-service/         # FastAPI NLP service
├── packages/                # Shared packages (if any)
├── docker-compose.yml       # Development Docker setup
├── vercel.json             # Vercel configuration
└── README.md
```

### Available Scripts

```bash
# Development
npm run dev                  # Start all services in development mode
npm run build               # Build all services
npm run lint                # Lint all services
npm run test                # Run tests

# Docker
npm run docker:up           # Start all services with Docker
npm run docker:down         # Stop all services

# Database
npm run db:migrate          # Run database migrations
npm run db:seed             # Seed database with sample data
```

### API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:3001/api/v1/docs
- Health Check: http://localhost:3001/api/v1/health

## 🔐 Authentication

The platform uses JWT-based authentication with role-based access control:

- **Citizen**: Can create reports and view public data
- **Analyst**: Can verify reports and access analytics
- **Official**: Can create alerts and manage responses
- **Moderator**: Can moderate content and manage users
- **Admin**: Full system access

## 🗺️ Map Integration

The platform integrates with Mapbox for interactive mapping:

1. **Get a Mapbox account**: https://mapbox.com
2. **Create an access token**: https://account.mapbox.com/access-tokens/
3. **Add to environment variables**: `NEXT_PUBLIC_MAPBOX_TOKEN`

## 🤖 AI/ML Features

The NLP service provides:
- **Hazard Classification**: Automatic categorization of reports
- **Severity Assessment**: AI-powered severity scoring
- **Misinformation Detection**: Content verification
- **Sentiment Analysis**: Community sentiment tracking
- **Urgency Assessment**: Priority scoring for alerts

## 📱 Mobile Support

The web application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones
- Progressive Web App (PWA) capabilities

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Rate limiting (recommended for production)
- HTTPS enforcement (production)

## 📈 Monitoring and Analytics

- Health check endpoints
- Error logging and monitoring
- Performance metrics
- User analytics dashboard
- Report statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Contact the development team

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced ML models
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Integration with weather APIs
- [ ] Community forums
- [ ] Advanced analytics dashboard

---

**SAGAR Platform** - Protecting coastal communities through technology and community engagement.