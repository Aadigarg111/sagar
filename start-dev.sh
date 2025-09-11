#!/bin/bash

# SAGAR Platform Development Startup Script

echo "🌊 Starting SAGAR Platform Development Environment..."
echo "=================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing."
fi

if [ ! -f "apps/web/.env.local" ]; then
    echo "📝 Creating web .env.local file from example..."
    cp apps/web/.env.local.example apps/web/.env.local
    echo "⚠️  Please edit apps/web/.env.local file with your Mapbox token."
fi

if [ ! -f "apps/backend/.env" ]; then
    echo "📝 Creating backend .env file from example..."
    cp apps/backend/.env.example apps/backend/.env
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."

# Check PostgreSQL
if docker-compose exec -T postgres pg_isready -U sagar_user -d sagar_db > /dev/null 2>&1; then
    echo "✅ PostgreSQL is ready"
else
    echo "❌ PostgreSQL is not ready"
fi

# Check Redis
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is ready"
else
    echo "❌ Redis is not ready"
fi

# Check Backend
if curl -s http://localhost:3001/api/v1/health > /dev/null 2>&1; then
    echo "✅ Backend API is ready"
else
    echo "❌ Backend API is not ready"
fi

# Check NLP Service
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ NLP Service is ready"
else
    echo "❌ NLP Service is not ready"
fi

# Check Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not ready"
fi

echo ""
echo "🎉 SAGAR Platform is starting up!"
echo "=================================================="
echo "🌐 Frontend:     http://localhost:3000"
echo "🔧 Backend API:  http://localhost:3001"
echo "🤖 NLP Service:  http://localhost:8000"
echo "📊 Health Check: http://localhost:3001/api/v1/health"
echo ""
echo "📚 For more information, see README.md"
echo "🚀 For deployment instructions, see DEPLOYMENT.md"
echo ""
echo "To stop the services, run: docker-compose down"
echo "To view logs, run: docker-compose logs -f"