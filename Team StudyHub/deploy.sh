#!/bin/bash

# Deployment script for Team StudyHub
set -e

echo "🚀 Starting deployment process..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build the application
echo "📦 Building the application..."
docker-compose build

# Start the application
echo "🚀 Starting the application..."
docker-compose up -d

# Wait for the application to be ready
echo "⏳ Waiting for the application to be ready..."
sleep 10

# Check if the application is running
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Application is running successfully!"
    echo "🌐 API is available at: http://localhost:5000/api"
    echo "📊 Health check: http://localhost:5000/api/health"
else
    echo "❌ Application failed to start. Check the logs with: docker-compose logs"
    exit 1
fi

echo "🎉 Deployment completed successfully!"