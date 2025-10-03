#!/bin/bash

# Gohub Vercel Build Script
echo "🚀 Building Gohub for Vercel deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the web version
echo "🔨 Building web bundle..."
npx expo export --platform web

# Verify build
if [ -d "dist" ]; then
    echo "✅ Build successful! dist/ directory created."
    echo "📁 Contents of dist/:"
    ls -la dist/
else
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

echo "🎉 Build completed successfully!"
echo "📤 Ready for Vercel deployment!"
