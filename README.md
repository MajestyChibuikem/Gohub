# Gohub - Catholic Prayer & Hymn App

<div align="center">
  <img src="assets/images/logo.png" alt="Gohub Logo" width="120" height="120">
  
  **A Comprehensive Catholic Prayer and Hymn Application for Godfrey Okoye University**
  
  [![Expo](https://img.shields.io/badge/Expo-53.0.0-blue.svg)](https://expo.dev/)
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.3-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📖 Overview

Gohub is a comprehensive Catholic prayer and hymn application specifically designed for the Godfrey Okoye University community. The app provides easy access to daily prayers, traditional Catholic devotions, sacramental prayers, and an extensive collection of hymns organized by liturgical seasons and Mass parts.

### 🎯 Key Features

- **📅 Daily Prayers**: Morning, mid-day, and evening prayers for each day of the week
- **🙏 Traditional Devotions**: Angelus, Regina Caeli, Holy Rosary, and Order of the Mass
- **✝️ Sacramental Prayers**: Confession, Holy Communion, and Sacred Heart devotions
- **👼 Saints & Devotions**: Prayers to saints and the Holy Spirit
- **🎵 Extensive Hymn Collection**: Organized by liturgical seasons and Mass parts
- **🌍 Multi-language Support**: English and Spanish prayer content
- **🎨 Theme Support**: Light and dark mode with customizable fonts
- **🔐 User Authentication**: Secure login with device-based activation
- **📱 Cross-platform**: iOS, Android, and Web support

## 🏗️ Project Structure

```
Gohub/
├── app/                          # Expo Router app directory
│   ├── (app)/                    # Main app screens (authenticated)
│   │   ├── hymns/               # Hymn categories and listings
│   │   ├── prayers/             # Prayer categories and content
│   │   └── settings.tsx         # App settings and preferences
│   ├── (auth)/                  # Authentication screens
│   │   ├── login.tsx            # User login
│   │   └── register.tsx         # User registration
│   └── _layout.tsx              # Root layout configuration
├── assets/                       # Static assets
│   ├── hymns/                   # Hymn JSON files by category
│   │   ├── Christmas/           # Christmas season hymns
│   │   ├── Communion/           # Communion hymns
│   │   ├── Entrance-hymns/      # Entrance hymns
│   │   ├── Marian-Hymns/        # Marian devotions
│   │   └── ...                  # Other categories
│   ├── prayers/                 # Prayer JSON files
│   │   ├── morning/             # Daily morning prayers
│   │   ├── evening/             # Daily evening prayers
│   │   ├── traditional/         # Traditional Catholic prayers
│   │   └── ...                  # Other prayer categories
│   └── images/                  # App icons and images
├── components/                   # Reusable UI components
├── context/                     # React Context providers
│   ├── AuthContext.tsx          # Authentication state management
│   ├── ThemeContext.tsx         # Theme and font management
│   └── LanguageContext.tsx      # Language preferences
├── utils/                       # Utility functions
│   ├── hymnMap.ts              # Hymn data mapping
│   ├── prayerMap.ts            # Prayer data mapping
│   └── prayerTimes.ts          # Prayer time calculations
└── constants/                   # App constants and colors
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm** or **yarn**: Package manager
- **Expo CLI**: For development and building
- **Expo Go**: For testing on mobile devices (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gohub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 📱 App Features

### 🔐 Authentication System

The app features a secure authentication system with device-based activation:

- **User Registration**: Students and staff can register with their name and registration number
- **Device Binding**: Accounts are tied to specific devices for security
- **Activation System**: Admin approval required for full access
- **Session Management**: Automatic login persistence with secure token storage

### 📿 Prayer Categories

#### Daily Prayers
- **Morning Prayers**: Different prayers for each day of the week
- **Mid-day Prayers**: Noon time devotions
- **Evening Prayers**: End-of-day prayers and reflections

#### Traditional Catholic Devotions
- **The Angelus**: Traditional Marian devotion
- **Regina Caeli**: Easter season prayer
- **Order of the Mass**: Complete Mass structure
- **Holy Rosary**: Marian devotion with mysteries

#### Sacramental Prayers
- **Confession Prayers**: Preparation and thanksgiving
- **Holy Communion**: Before and after Communion prayers
- **Sacred Heart Devotions**: Litany and special prayers

#### Saints & Devotions
- **Holy Spirit Prayers**: Invocations and devotions
- **Saint Francis Prayer**: Peace prayer
- **St. Patrick's Prayer**: Traditional Irish prayer
- **Catena**: Marian prayer chain

### 🎵 Hymn Collection

The app includes an extensive collection of hymns organized by:

#### Liturgical Seasons
- **Christmas Hymns**: Seasonal carols and hymns
- **Lent Hymns**: Penitential and reflective songs
- **Easter Hymns**: Resurrection and joy hymns

#### Mass Parts
- **Entrance Hymns**: Opening songs for Mass
- **Offertory Hymns**: Presentation of gifts
- **Communion Hymns**: Eucharistic songs
- **Dismissal Hymns**: Closing songs

#### Special Categories
- **Marian Hymns**: Devotions to the Blessed Virgin Mary
- **Common of the Mass**: Kyrie, Gloria, Sanctus, Agnus Dei
- **Hymns for the Dead**: Funeral and memorial songs
- **General Hymns**: Popular spiritual songs

### 🎨 User Interface

- **Responsive Design**: Optimized for phones, tablets, and web
- **Theme Support**: Light and dark mode with automatic switching
- **Font Scaling**: Adjustable text sizes for accessibility
- **Haptic Feedback**: Tactile responses for better UX
- **Smooth Animations**: Fluid transitions and interactions

## 🛠️ Development

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data
- **UI Components**: Custom themed components
- **Icons**: Expo Vector Icons

### Key Dependencies

```json
{
  "expo": "~53.0.0",
  "expo-router": "~5.1.0",
  "react": "19.0.0",
  "react-native": "0.79.3",
  "@react-native-async-storage/async-storage": "2.1.2",
  "@expo/vector-icons": "^14.0.0"
}
```

### Development Scripts

```bash
# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web

# Run tests
npm test

# Lint code
npm run lint

# Reset project (development only)
npm run reset-project
```

## 📦 Building for Production

### Android Build

For detailed Android build instructions, see [ANDROID_BUILD_README.md](./ANDROID_BUILD_README.md).

Quick build process:

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

4. **Build for Play Store**
   ```bash
   eas build --platform android --profile production
   ```

### iOS Build

1. **Configure for iOS**
   ```bash
   eas build:configure
   ```

2. **Build for App Store**
   ```bash
   eas build --platform ios --profile production
   ```

## 🎯 App Configuration

### app.json Settings

```json
{
  "expo": {
    "name": "Gohub",
    "slug": "Gohub",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "automatic",
    "ios": {
      "bundleIdentifier": "com.godfreyokoyeuniversity.gohub"
    },
    "android": {
      "package": "com.godfreyokoyeuniversity.gohub",
      "versionCode": 1
    }
  }
}
```

### Permissions

The app requests minimal permissions:
- **Internet**: For content updates and authentication
- **Network State**: For connectivity monitoring
- **Storage**: For local data caching

Blocked permissions for privacy:
- Camera
- Microphone
- Location services

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add tests for new features
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

### Compilers/Editors
- **Sr. Mary Gloria Njoku DDL**
- **Rev. Fr. Prof. Christian Anieke**

### Development
- **MAJESTY** - Lead Developer
- **Godfrey Okoye University** - Institution

## 📞 Support

For support and questions:
- **Email**: [support@godfreyokoyeuniversity.edu.ng]
- **Institution**: Godfrey Okoye University
- **Documentation**: [Link to documentation]

## 🔄 Version History

- **v1.0.0** - Initial release with prayers and hymns
- Future versions will include additional features and content

---

<div align="center">
  <p>Made with ❤️ for the Godfrey Okoye University Community</p>
  <p>© 2024 Godfrey Okoye University - MAJESTY</p>
</div>
