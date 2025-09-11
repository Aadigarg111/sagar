# SAGAR Platform - Social-AI Geospatial Alerts & Reporting

A comprehensive disaster management platform that combines crowdsourced reporting with AI-powered analysis for coastal hazard detection and response.

## 🌊 Overview

SAGAR (Social-AI Geospatial Alerts & Reporting) is an innovative platform designed to bridge the gap in ground-truth validation for coastal hazard warnings. By fusing crowd reports with social media analytics and AI predictions, SAGAR provides real-time situational awareness for disaster management officials and coastal communities.

## ✨ Key Features

### 🗺️ Interactive Mapping
- Real-time hazard visualization with Mapbox integration
- Geospatial clustering and heatmap overlays
- Historical data playback and analysis
- Multi-layer map views (satellite, street, terrain)

### 📱 Crowdsourced Reporting
- Mobile-optimized reporting interface
- GPS-enabled location tagging
- Photo/video upload with AI analysis
- Offline reporting with sync capabilities
- Multi-language support (English, Hindi, Tamil)

### 🤖 AI-Powered Analysis
- Natural Language Processing for report classification
- Misinformation detection and filtering
- Severity assessment and risk scoring
- Predictive analytics for hazard forecasting
- Computer vision for media analysis

### 🚨 Alert System
- Real-time push notifications
- Geofenced alert distribution
- Multi-channel communication (SMS, email, app)
- Official verification workflows
- Public safety broadcasts

### 📊 Analytics Dashboard
- Real-time statistics and trends
- User reputation and gamification
- Performance metrics and KPIs
- Predictive insights and forecasting
- Export capabilities for officials

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Radix UI components
- **Maps**: Mapbox GL JS with custom overlays
- **State Management**: React Query for server state
- **Real-time**: Socket.io for live updates

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with PostGIS for geospatial data
- **Authentication**: JWT with role-based access control
- **File Storage**: MinIO for media files
- **Caching**: Redis for performance optimization

### AI/NLP Service (FastAPI)
- **Framework**: FastAPI with Python
- **ML Models**: Hugging Face Transformers
- **Analysis**: Text classification, sentiment analysis, misinformation detection
- **Processing**: Async task queue with Celery

### Infrastructure
- **Containerization**: Docker Compose for local development
- **Database**: PostgreSQL with PostGIS extension
- **Cache**: Redis for session and data caching
- **Storage**: MinIO for object storage
- **Monitoring**: Health checks and logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

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
   cp apps/web/.env.example apps/web/.env.local
   cp apps/backend/.env.example apps/backend/.env
   ```
   
   Update the environment files with your configuration:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token
   - Database credentials
   - JWT secrets
   - API endpoints

4. **Start the development environment**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

6. **Seed the database**
   ```bash
   npm run db:seed
   ```

7. **Access the application**
   - Web App: http://localhost:3000
   - Backend API: http://localhost:3001
   - NLP Service: http://localhost:8000
   - API Documentation: http://localhost:3001/api/v1/docs

## 📱 Usage

### For Citizens
1. **Register** for an account or login
2. **Report hazards** using the mobile-friendly interface
3. **View alerts** and safety information
4. **Track your contributions** and earn reputation points

### For Officials
1. **Access the admin dashboard** with enhanced analytics
2. **Verify reports** and manage alerts
3. **Monitor trends** and predictive insights
4. **Broadcast alerts** to specific regions

### For Analysts
1. **Analyze data** using advanced filtering
2. **Export reports** for further analysis
3. **Monitor AI predictions** and accuracy
4. **Manage user reputation** and content moderation

## 🔧 Development

### Project Structure
```
sagar-platform/
├── apps/
│   ├── web/                 # Next.js frontend
│   ├── backend/             # NestJS API
│   └── nlp-service/         # FastAPI AI service
├── packages/                # Shared packages
├── docker-compose.yml       # Development environment
└── README.md
```

### Available Scripts
```bash
# Development
npm run dev                  # Start all services
npm run dev:web             # Start web app only
npm run dev:backend         # Start backend only
npm run dev:nlp             # Start NLP service only

# Building
npm run build               # Build all services
npm run build:web           # Build web app
npm run build:backend       # Build backend

# Database
npm run db:migrate          # Run migrations
npm run db:seed             # Seed database
npm run db:reset            # Reset database

# Testing
npm run test                # Run all tests
npm run test:web            # Test web app
npm run test:backend        # Test backend
npm run test:e2e            # End-to-end tests

# Docker
npm run docker:up           # Start containers
npm run docker:down         # Stop containers
npm run docker:logs         # View logs
```

## 🌍 Deployment

### Production Deployment
1. **Configure environment variables** for production
2. **Build Docker images** for each service
3. **Deploy to cloud platform** (AWS, Google Cloud, Azure)
4. **Set up monitoring** and logging
5. **Configure CDN** for static assets

### Environment Variables
```bash
# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=sagar_db

# Redis
REDIS_URL=redis://your-redis-host:6379

# MinIO
MINIO_ENDPOINT=your-minio-host
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key

# JWT
JWT_SECRET=your-jwt-secret

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **INCOIS** for coastal hazard data and requirements
- **Mapbox** for mapping services
- **Hugging Face** for AI models
- **Open source community** for various libraries and tools

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Basic web application
- [x] User authentication
- [x] Report submission
- [x] Interactive mapping
- [x] AI text analysis

### Phase 2 (Next)
- [ ] Mobile app (React Native)
- [ ] Advanced AI predictions
- [ ] Social media integration
- [ ] Real-time notifications
- [ ] Admin dashboard

### Phase 3 (Future)
- [ ] AR/VR visualizations
- [ ] Blockchain integration
- [ ] IoT sensor integration
- [ ] Multi-tenant support
- [ ] Advanced analytics

---

**Built with ❤️ for coastal safety and disaster resilience**
