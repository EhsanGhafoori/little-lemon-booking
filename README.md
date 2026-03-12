# Little Lemon Food Ordering App

React Native (Expo) capstone project for the Meta/Coursera course. A mobile app for the Little Lemon restaurant with onboarding, home menu, and profile.

## Wireframe

The design is based on the wireframe in this repository: **wireframe.png**

## Features

- **Onboarding**: First-time users are prompted to enter first name, last name, and email. The **Next** button is only enabled when all fields are filled.
- **Home screen**: Header (logo + profile icon), hero section (Little Lemon description + search bar), menu breakdown (selectable categories: Starters, Mains, Desserts, Drinks), and a summarized food menu list (name, description, price, image).
- **Profile**: Pre-filled with onboarding data. Save/Discard changes; changes are retained after app restart. **Log out** clears all data and returns to onboarding.
- **Navigation**: Stack navigation with **Back** button on the Profile screen.

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your phone (optional, for physical device) or iOS Simulator / Android Emulator

## Setup and run

1. **Clone the repository**
   ```bash
   git clone https://github.com/EhsanGhafoori/little-lemon-booking.git
   cd little-lemon-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Or scan the QR code with Expo Go on your phone

## Project structure

```
├── App.js                 # Entry: navigation, onboarding check
├── wireframe.png          # Design wireframe (submission requirement)
├── src/
│   ├── context/
│   │   └── UserContext.js  # User state, AsyncStorage
│   ├── data/
│   │   └── menuItems.js   # Menu items and categories
│   └── screens/
│       ├── OnboardingScreen.js
│       ├── HomeScreen.js
│       └── ProfileScreen.js
├── app.json
├── babel.config.js
└── package.json
```

## Testing the grading criteria

1. **Wireframe**: See `wireframe.png` in the repo.
2. **Onboarding**: Clear app data or uninstall/reinstall; open app → you should see the onboarding form. Next is disabled until name and email are entered.
3. **Home layout**: Header (logo, profile icon), hero (description + search), menu categories (tap to filter), scrollable menu list.
4. **Profile**: Tap profile icon on Home → Profile shows your onboarding data. Edit and Save → restart app → data persists. Log out → all data cleared, onboarding shown again.
5. **Back button**: On Profile screen, use the header Back button to return to Home.

## License

MIT
