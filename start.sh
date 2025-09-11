#!/bin/bash

echo "Starting SAGAR Platform..."
echo

echo "Starting Docker services..."
docker-compose up -d

echo
echo "Waiting for services to start..."
sleep 10

echo
echo "Starting web application..."
cd apps/web
npm run dev &
WEB_PID=$!

echo
echo "Starting backend API..."
cd ../backend
npm run start:dev &
BACKEND_PID=$!

echo
echo "Starting NLP service..."
cd ../nlp-service
python main.py &
NLP_PID=$!

echo
echo "SAGAR Platform is starting up!"
echo
echo "Services will be available at:"
echo "- Web App: http://localhost:3000"
echo "- Backend API: http://localhost:3001"
echo "- NLP Service: http://localhost:8000"
echo
echo "Press Ctrl+C to stop all services..."

# Function to cleanup processes on exit
cleanup() {
    echo
    echo "Stopping services..."
    kill $WEB_PID $BACKEND_PID $NLP_PID 2>/dev/null
    docker-compose down
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
