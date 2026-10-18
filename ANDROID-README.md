# Monthly Expenses Android app

This is the Android wrapper for the Monthly Expenses web application, built with Capacitor. The website remains hosted by GitHub Pages.

## On your Linux Mint computer

Use this folder for your local Android source and build files:

`/mnt/6C6133BB1D53765D/03_Expenses_Contracts_etc/00_Github_Bank_App/00_Android_App`

To download the project into it:

```bash
mkdir -p "/mnt/6C6133BB1D53765D/03_Expenses_Contracts_etc/00_Github_Bank_App/00_Android_App"
cd "/mnt/6C6133BB1D53765D/03_Expenses_Contracts_etc/00_Github_Bank_App/00_Android_App"
git clone https://github.com/NaikeA/Monthly-expenses.git
cd Monthly-expenses
npm install
npm run android:init
```

Requires Node.js, Java 21, Android SDK and Android Studio to build locally.

## Easier APK creation through GitHub Actions

Open the GitHub repository's Actions tab, select **Build Monthly Expenses Android APK**, and run the workflow. Once successful, download the artifact called `monthly-expenses-android-debug-apk` and extract `app-debug.apk`. You can save this APK into the folder above.

## Important data distinction

This folder stores the **Android project, source files, and APK**. The installed Android app stores your financial records locally on your **phone**, not in this Linux Mint folder. The web version likewise stores data in its browser profile. There is no automatic sync between the web version and the Android app.

To transfer personal financial data, use Export JSON Backup on the old device and Import JSON Backup on the new one. JSON exports are **unencrypted** and should be handled securely. Before relying on mobile backups, test the import/export flows on your Android device because Android WebView handles file dialogs differently from desktop browsers.

The project currently produces a debug APK for personal testing, not a signed Play Store release.
