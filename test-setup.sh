#!/bin/bash

# SAGAR Platform Setup Test Script

echo "🧪 Testing SAGAR Platform Setup..."
echo "=================================="

# Test 1: Check if all required files exist
echo "📁 Checking required files..."

required_files=(
    "package.json"
    "apps/web/package.json"
    "apps/backend/package.json"
    "apps/nlp-service/requirements.txt"
    "docker-compose.yml"
    "vercel.json"
    "README.md"
    "DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Test 2: Check if environment files exist
echo ""
echo "🔧 Checking environment files..."

env_files=(
    ".env.example"
    "apps/web/.env.local.example"
    "apps/backend/.env.example"
)

for file in "${env_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Test 3: Check if Docker is available
echo ""
echo "🐳 Checking Docker availability..."

if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    if docker info > /dev/null 2>&1; then
        echo "✅ Docker is running"
    else
        echo "❌ Docker is not running"
    fi
else
    echo "❌ Docker is not installed"
fi

# Test 4: Check if Node.js is available
echo ""
echo "📦 Checking Node.js availability..."

if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "✅ Node.js is installed: $node_version"
    
    if command -v npm &> /dev/null; then
        npm_version=$(npm --version)
        echo "✅ npm is installed: $npm_version"
    else
        echo "❌ npm is not installed"
    fi
else
    echo "❌ Node.js is not installed"
fi

# Test 5: Check if Python is available (for NLP service)
echo ""
echo "🐍 Checking Python availability..."

if command -v python3 &> /dev/null; then
    python_version=$(python3 --version)
    echo "✅ Python3 is installed: $python_version"
    
    if command -v pip3 &> /dev/null; then
        pip_version=$(pip3 --version | cut -d' ' -f2)
        echo "✅ pip3 is installed: $pip_version"
    else
        echo "❌ pip3 is not installed"
    fi
else
    echo "❌ Python3 is not installed"
fi

# Test 6: Check if services can be built
echo ""
echo "🔨 Testing service builds..."

# Test frontend build
echo "Testing frontend build..."
cd apps/web
if npm install --silent > /dev/null 2>&1; then
    echo "✅ Frontend dependencies installed"
    if npm run build --silent > /dev/null 2>&1; then
        echo "✅ Frontend build successful"
    else
        echo "❌ Frontend build failed"
    fi
else
    echo "❌ Frontend dependencies installation failed"
fi
cd ../..

# Test backend build
echo "Testing backend build..."
cd apps/backend
if npm install --silent > /dev/null 2>&1; then
    echo "✅ Backend dependencies installed"
    if npm run build --silent > /dev/null 2>&1; then
        echo "✅ Backend build successful"
    else
        echo "❌ Backend build failed"
    fi
else
    echo "❌ Backend dependencies installation failed"
fi
cd ../..

# Test NLP service
echo "Testing NLP service..."
cd apps/nlp-service
if pip3 install -r requirements.txt --quiet > /dev/null 2>&1; then
    echo "✅ NLP service dependencies installed"
    if python3 -c "import fastapi, uvicorn" > /dev/null 2>&1; then
        echo "✅ NLP service imports successful"
    else
        echo "❌ NLP service imports failed"
    fi
else
    echo "❌ NLP service dependencies installation failed"
fi
cd ../..

echo ""
echo "🎯 Setup Test Complete!"
echo "======================"
echo ""
echo "If all tests passed, you can run:"
echo "  ./start-dev.sh    # Start development environment"
echo "  docker-compose up # Start with Docker Compose"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"