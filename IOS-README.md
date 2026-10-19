# Monthly Expenses for iPhone (iOS)

The iPhone version uses the **same** `index.html`, financial calculations, local records and dashboard/PDF report code as the GitHub Pages website and the Android app. The native version is a Capacitor iOS app, not a separate finance database.

## Install on an iPhone today (without App Store or Mac)

This is the easiest option if you use Linux Mint:

1. On your iPhone, open Safari and visit **https://naikea.github.io/Monthly-expenses/**.
2. Tap the Safari **Share** button (sometimes under the Page Menu).
3. Select **Add to Home Screen**.
4. Turn on **Open as Web App**, if offered, then tap **Add**.

The icon opens the website as a standalone home-screen web app, **without Apple signing or App Store approval**. This is **not** a compiled native iPhone app. After the first successful online visit, the app shell can reopen offline on supported iOS versions using a service worker. **iOS can evict cached website data**, so do not rely on this as your only financial backup. The browser version uses the browser's PDF print/export facility; PDF sharing may vary in iPhone standalone mode.

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
- The home-screen web app uses iOS website storage and a locally cached application shell. It can work offline after the initial online load, although iOS storage/cache eviction is possible. The native iOS app uses separate storage.
- **There is no automatic cross-device sync** between your desktop browser, Android, iPhone home-screen app or native iOS app.
- Move records via **Settings & Backup → Export JSON backup** and **Import JSON backup**.
- **JSON backups are plaintext financial data**, even if your app normally uses a password. Store and transfer them privately; delete unneeded copies.
- Always test iOS backup import/export and PDF sharing before relying on the app for financial records.

The existing Android build, Android app identifier and GitHub Pages deployment remain separate and unchanged.

## Sharing with a friend

Send the URL https://naikea.github.io/Monthly-expenses/ and ask your friend to open it in **Safari** on their own iPhone and choose **Share → Add to Home Screen → Add**. It installs as an independent Home Screen web app with its own data. It requires **no Apple Store, Apple Developer account, certificate or signing process**. The publicly hosted code contains **no personal financial data**; all financial records are created and saved on the friend's own device. Passwords and other stored records are not synchronized between devices.
