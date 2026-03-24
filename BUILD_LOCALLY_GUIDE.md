# Build EVLO Locally & Sync to Server

Perfect! Let's build locally with npm, then sync to cPanel via SFTP.

---

## Step 1: Open evlo-nextjs Folder in VS Code

1. **File → Open Folder**
2. Select: `c:/Users/mpeve/OneDrive/Desktop/EVLO_Razvoj/evlo-nextjs`
3. Click **Open**

---

## Step 2: Install Dependencies Locally

1. **Terminal → New Terminal** (Ctrl + `)
2. Run:
```bash
npm install
```

⏳ Wait 3-5 minutes for dependencies to download

---

## Step 3: Build the App

Run:
```bash
npm run build
```

⏳ Wait 1-2 minutes for build to complete

---

## Step 4: Sync Build to Server via SFTP

### A) Using SFTP Extension Menu:
1. **View → Explorer** (Ctrl + Shift + E)
2. Right-click on **evlo-nextjs** folder
3. Select: **SFTP: Sync to Remote**
4. **Wait** for sync to complete

### B) Or Use Command Palette:
1. **Ctrl + Shift + P** → "SFTP: Sync to Remote"
2. Select your folder
3. **Confirm sync**

---

## Step 5: What Gets Synced:

✅ `package.json`
✅ `next.config.js`
✅ `.next/` (built files) ← **Important!**
✅ `app/`
✅ `styles/`
✅ `node_modules/` ← **Will auto-sync**

---

## Step 6: Restart App on cPanel

1. Go to **cPanel → Node.js Selector**
2. Click your **"evlo-app"** application
3. Click **"Restart"**
4. **Wait** 10 seconds for restart

---

## Step 7: Test Live

Visit: **https://evlo-app.evlo.si**

You should see:
- 🏠 EVLO Homepage with features
- ⚙️ "Diagnostic" link working
- 📊 Full form and calculations

---

## Troubleshooting

### npm install fails?
```bash
npm cache clean --force
npm install
```

### Build fails?
Check errors in terminal - usually missing files

### SFTP not syncing?
1. Check SFTP extension is active
2. Verify `.vscode/sftp.json` config
3. Try: **SFTP: Connect** first

### App still showing blank?
- Wait 30 seconds after restart
- Check cPanel Node.js Selector logs
- Click "View Logs" to see errors

---

## Success Indicators:

✅ Terminal shows: `✅ build successful`
✅ SFTP shows files uploaded
✅ cPanel shows app "Running"
✅ https://evlo-app.evlo.si loads

---

**Start with Step 1! Run npm install locally first.** 🚀
