#!/bin/bash

echo "🚀 Setting up Slack Message Culture Guard..."

# Install Backend Dependencies
echo "📦 Installing Python dependencies..."
pip install -r culture-guard/backend/requirements.txt > /dev/null 2>&1

# Start Backend
echo "🐍 Starting FastAPI Backend on port 8000..."
uvicorn culture-guard.backend.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait for backend to be ready (naive check)
sleep 3

# Start Frontend
echo "⚛️  Starting React Frontend..."
cd culture-guard/frontend
npm run dev -- --host 0.0.0.0

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
