#!/bin/bash

echo "🚀 Gohub Android APK Build Script"
echo "=================================="

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if logged in to Expo
echo "🔐 Checking Expo login status..."
if ! eas whoami &> /dev/null; then
    echo "❌ Not logged in to Expo"
    echo "Please run: eas login"
    echo "Or create an account: npx expo register"
    exit 1
fi

echo "✅ Logged in to Expo"

# Configure the project
echo "⚙️  Configuring project..."
eas build:configure

# Build the APK
echo "🔨 Building APK..."
echo "This will take several minutes..."
eas build --platform android --profile preview

echo "✅ Build completed!"
echo "📱 Your APK will be available for download from the Expo dashboard"
echo "🌐 Check: https://expo.dev/accounts/[your-username]/projects/Gohub/builds"
