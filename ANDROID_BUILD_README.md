# Android APK Build Guide for Gohub

This guide will help you build an Android APK for the Gohub app that's ready for Play Store deployment.

## Prerequisites

1. **Expo Account**: You need an Expo account (free)
2. **EAS CLI**: Expo Application Services CLI
3. **Node.js**: Version 16 or higher

## Step-by-Step Build Process

### 1. Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```
If you don't have an account, create one:
```bash
npx expo register
```

### 3. Configure the Project
```bash
eas build:configure
```

### 4. Build the APK
```bash
eas build --platform android --profile preview
```

## Build Profiles

The app is configured with three build profiles:

- **development**: For development testing
- **preview**: Creates an APK file for testing
- **production**: Creates an AAB file for Play Store

## Configuration Files

### app.json
- **Package Name**: `com.godfreyokoyeuniversity.gohub`
- **Version**: `1.0.0`
- **Version Code**: `1`
- **Permissions**: Internet, Network State, Storage access
- **Blocked Permissions**: Camera, Microphone, Location (for privacy)

### eas.json
- **Preview Profile**: Builds APK for testing
- **Production Profile**: Builds AAB for Play Store

## Build Process

1. **Cloud Build**: The build runs on Expo's servers
2. **Duration**: Typically 10-15 minutes
3. **Output**: Downloadable APK/AAB file
4. **Dashboard**: Monitor progress at expo.dev

## Play Store Requirements

### APK Requirements
- ✅ Package name is unique
- ✅ Version code increments with each release
- ✅ App icon meets Play Store standards
- ✅ Permissions are minimal and justified

### Before Uploading to Play Store

1. **Test the APK** thoroughly on different devices
2. **Update version** in `app.json`:
   ```json
   {
     "version": "1.0.1",
     "android": {
       "versionCode": 2
     }
   }
   ```
3. **Create production build**:
   ```bash
   eas build --platform android --profile production
   ```

## Troubleshooting

### Common Issues

1. **Login Failed**: 
   - Check your Expo credentials
   - Try `npx expo register` to create new account

2. **Build Failed**:
   - Check the build logs in Expo dashboard
   - Ensure all dependencies are properly installed

3. **Permission Issues**:
   - Review the permissions in `app.json`
   - Remove unnecessary permissions

### Support

- **Expo Documentation**: https://docs.expo.dev/build/introduction/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Play Store Guidelines**: https://support.google.com/googleplay/android-developer

## Quick Build Script

Use the provided build script:
```bash
./build-android.sh
```

This script will:
- Check EAS CLI installation
- Verify login status
- Configure the project
- Build the APK
- Provide download instructions

## Next Steps

After successful build:

1. Download the APK from Expo dashboard
2. Test on multiple Android devices
3. Upload to Google Play Console
4. Submit for review

---

**Note**: The first build may take longer as it sets up the build environment. Subsequent builds will be faster.
