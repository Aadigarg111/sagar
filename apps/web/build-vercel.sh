#!/bin/bash

# SAGAR Platform - Vercel Build Script

echo "🚀 Building SAGAR Platform for Vercel deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for Vercel deployment."
    echo "🌐 You can now deploy using: vercel"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
