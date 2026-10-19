# Monthly Expenses for iPhone (iOS)

The iPhone version uses the **same** `index.html`, financial calculations, local records and dashboard/PDF report code as the GitHub Pages website and the Android app. The native version is a Capacitor iOS app, not a separate finance database.

## Install on an iPhone today (without App Store or Mac)

This is the easiest option if you use Linux Mint:

1. On your iPhone, open Safari and visit **https://naikea.github.io/Monthly-expenses/**.
2. Tap the Safari **Share** button (sometimes under the Page Menu).
3. Select **Add to Home Screen**.
4. Turn on **Open as Web App**, if offered, then tap **Add**.

The icon opens the website as a standalone home-screen web app. This is **not** a compiled App Store app and should not be relied on for offline access. The browser version keeps using the browser's PDF print/export facility.

## Native iPhone app (Capacitor)

The repository includes `@capacitor/ios` and iOS scripts. Native iOS packages and signing require **macOS with Xcode**. Generating an installable, signed app for an actual iPhone also requires Apple signing through Xcode, a suitable Apple account/team and a provisioning profile. A paid Apple Developer Program membership is normally needed for TestFlight/App Store distribution, but a personal Apple ID can be used with Xcode for limited testing on your own device.

On a Mac:

```bash
git clone https://github.com/NaikeA/Monthly-expenses.git
cd Monthly-expenses
npm install
npm run ios:init
npm run ios:open
```

In Xcode:
1. Open **App** target → **Signing & Capabilities**.
2. Select your Apple development **Team** and enable **Automatically manage signing**.
3. Set a unique **Bundle Identifier** if `de.naikea.monthlyexpenses` isn't available for your team.
4. Select an iOS simulator or your connected and trusted iPhone.
5. Press **Run** to install and test the app.

Once the native `ios/` project exists, updating the app is:

```bash
git pull --ff-only
npm install
npm run ios:sync
npm run ios:open
```

**Important:** `ios/` is excluded from GitHub because it contains generated Xcode project files and device-specific signing settings. Keep a safe local copy of those settings on your Mac.

### GitHub Actions build (no Mac needed for the build)

In GitHub, open **Actions → Build Monthly Expenses iOS Simulator → Run workflow**.

A macOS runner generates an **unsigned iOS simulator app** and uploads `monthly-expenses-ios-simulator` after a successful build. It is **not an installable iPhone IPA**, and cannot be installed directly on a physical iPhone or submitted to the App Store. The workflow is manual-only to avoid email notifications after every GitHub commit.

To distribute a signed iPhone build or use TestFlight, configure Apple signing and distribution separately. Never commit Apple certificates, private keys, passwords, or provisioning secrets into this public repository.

## Data, PDF and privacy

- The native iOS app bundles the web files and should work offline once installed. PDF export uses the existing vector PDF generator and the device share sheet; test this on a physical iPhone.
- The home-screen web app uses Safari-managed website data and the online GitHub Pages site. The native iOS app has its own data storage.
- **There is no automatic cross-device sync** between your desktop browser, Android, iPhone home-screen app or native iOS app.
- Move records via **Settings & Backup → Export JSON backup** and **Import JSON backup**.
- **JSON backups are plaintext financial data**, even if your app normally uses a password. Store and transfer them privately; delete unneeded copies.
- Always test iOS backup import/export and PDF sharing before relying on the app for financial records.

The existing Android build, Android app identifier and GitHub Pages deployment remain separate and unchanged.
