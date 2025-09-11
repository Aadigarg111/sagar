# SAGAR Platform Configuration Guide

## Environment Variables

Create the following environment files for each service:

### Web App (apps/web/.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_NLP_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Backend API (apps/backend/.env)
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=sagar_user
DB_PASSWORD=sagar_password
DB_NAME=sagar_db

# Redis Configuration
REDIS_URL=redis://localhost:6379

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=sagar_minio
MINIO_SECRET_KEY=sagar_minio_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# API Configuration
PORT=3001
NODE_ENV=development
```

### NLP Service (apps/nlp-service/.env)
```bash
# Redis Configuration
REDIS_URL=redis://localhost:6379

# Backend API URL
BACKEND_URL=http://localhost:3001

# Service Configuration
PORT=8000
```

## Required Services

### 1. Mapbox Account
- Sign up at [mapbox.com](https://mapbox.com)
- Create a new access token
- Add the token to your web app environment variables

### 2. Database Setup
The platform uses PostgreSQL with PostGIS extension. The Docker Compose setup includes:
- PostgreSQL 15 with PostGIS 3.3
- Redis 7 for caching
- MinIO for object storage

### 3. API Keys (Optional)
- **Weather API**: For real-time weather data integration
- **Social Media APIs**: For Twitter/YouTube monitoring
- **SMS Gateway**: For emergency notifications

## Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd sagar-platform
   npm install
   ```

2. **Set up environment variables**
   - Copy the configuration above to respective `.env` files
   - Update the Mapbox token with your actual token

3. **Start the platform**
   ```bash
   # Windows
   start.bat
   
   # Linux/Mac
   chmod +x start.sh
   ./start.sh
   ```

4. **Access the application**
   - Web App: http://localhost:3000
   - Backend API: http://localhost:3001
   - NLP Service: http://localhost:8000

## Production Configuration

For production deployment:

1. **Update database credentials**
2. **Use strong JWT secrets**
3. **Configure proper CORS origins**
4. **Set up SSL certificates**
5. **Configure monitoring and logging**
6. **Set up backup strategies**

## Troubleshooting

### Common Issues

1. **Map not loading**: Check Mapbox token configuration
2. **Database connection failed**: Ensure PostgreSQL is running
3. **File upload issues**: Check MinIO configuration
4. **NLP service not responding**: Verify Python dependencies

### Logs

Check service logs:
```bash
# Docker services
docker-compose logs

# Individual services
docker-compose logs web
docker-compose logs backend
docker-compose logs nlp-service
```
