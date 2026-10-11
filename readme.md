# Monopoly Family Banker & Property Manager 🎲🏠

A modern, responsive, real-time digital bank and property portfolio manager built for family game night. Say goodbye to lost paper money and complicated calculations—manage cash transfers, properties, mortgages, auctions, and dice rolls seamlessly across multiple phones, tablets, and computers!

---

## 📂 Project Structure

To keep your workspace clean and modular, the project is organized into separate folders and files:

```text
monopoly-manager/
├── Index.html          # Main HTML markup, modals, and UI structure
├── stules.css          # Custom styling, glassmorphism effects, and scrollbars
└── Script/
    └── script.js       # Complete game logic, Firebase real-time sync, and UI controllers
```

---

## 🚀 Getting Started

### 1. Local Testing (No Firebase Required)
If you want to play right away without setting up a backend, the app includes an in-memory fallback mode:
1. Open `Index.html` directly in any modern web browser.
2. Enter your nickname, click **Create New Game Room** (or join an existing code).
3. Add other family members and start playing!

### 2. Multi-Device Setup with Google Firestore (Recommended)
To sync money and properties in real-time across everyone's phones at the game table:
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a free project.
2. Enable **Firestore Database** in test mode or production mode.
3. Register a Web App in your Firebase project settings to get your configuration object.
4. Open the app, click the **Settings** gear icon in the top header, and paste your Firebase JSON configuration:
   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "YOUR_AUTH_DOMAIN",
     "projectId": "YOUR_PROJECT_ID",
     "storageBucket": "YOUR_STORAGE_BUCKET",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "appId": "YOUR_APP_ID"
   }
   ```
5. Click **Save & Connect**. Share your 4-letter room code with family members so they can join from their own devices!

---

## ✨ Features

* **Real-Time Sync**: Instant updates across devices using Google Firebase Firestore.
* **Bank & Reserve Management**: Track the central Bank Reserve with instant one-tap **Collect $200** (GO) and **Pay Bank** actions.
* **Player Portfolios**: Automatic net worth calculations (cash + property values + houses), custom tokens (Top Hat, Car, Dog, etc.), and quick pay/rent charge buttons.
* **Property Directory & Management**: Buy properties from the bank, mortgage/unmortgage deeds, build houses/hotels, and trade properties between players.
* **Interactive Utilities**: Built-in 3D dice roller with automatic doubles detection and a live property auction hub.
* **Chronological Activity Log**: Keeps a transparent history of every transaction and transfer made during the game.

---

## 🛠️ Technologies Used
* **HTML5 & Tailwind CSS**: For a clean, modern, dark-mode-ready interface.
* **FontAwesome**: For game tokens and UI icons.
* **Google Fonts (Inter)**: For typography.
* **Firebase SDK (v11)**: For real-time cloud synchronization.