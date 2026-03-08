# Movie App 🎬

A modern mobile application for discovering movies, built with **React Native**, **Expo**, and **Appwrite**.

## 🚀 Features

- **Discover Movies**: Browse trending and popular movies.
- **Search**: Find your favorite movies using the integrated search bar.
- **Movie Details**: View detailed information about each movie.
- **Personalized Lists**: Save and track movies (Profile & Saved tabs).
- **Responsive Design**: Styled with **NativeWind** (Tailwind CSS for React Native).

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction) (File-based routing)
- **Backend**: [Appwrite](https://appwrite.io/) (Authentication & Database)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **State Management**: Custom hooks & Appwrite integration
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📁 Project Structure

```text
├── app/                  # Expo Router directory (screens & layouts)
│   ├── (tabs)/           # Main tab navigation
│   └── movies/           # Movie detail screens
├── components/           # Reusable UI components
├── services/             # API and Appwrite service logic
├── constants/            # App-wide constants (icons, images)
├── assets/               # Static assets (fonts, icons, images)
└── types/                # TypeScript definitions
```

## 🏁 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/go) app on your phone or an emulator (Android Studio / Xcode)

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file (if required by your `appwrite.ts` configuration) and add your Appwrite credentials.

### 4. Start the app

```bash
npx expo start
```

- Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).
- Press `a` for Android emulator or `i` for iOS simulator.

## 📖 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
