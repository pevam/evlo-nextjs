# 🚀 Quick Build on cPanel Terminal

## ✅ Copy & Paste This Command:

```bash
cd /home/waxeesi/public_html/evlo-app && npm install --production && npm run build && echo "✅ BUILD COMPLETE!"
```

---

## 📝 Steps:

1. **Go to cPanel**
2. Click **Terminal** (or **SSH**)
3. **Paste the command above** and press Enter
4. **Wait 5 minutes** for install + build
5. When you see **"✅ BUILD COMPLETE!"** → **DONE!**
6. Go to **Node.js Selector** → Click app → **Restart**

---

## 🎯 Then Visit:
https://evlo-app.evlo.si

You should see the **EVLO homepage** with battery diagnostics! 🎉

---

## If It Fails:

Run these **one by one**:
```bash
cd /home/waxeesi/public_html/evlo-app
npm cache clean --force
npm install --production
npm run build
```

Then restart the app in **Node.js Selector**.

---

**This will build your app in 5-10 minutes!** 🚀
