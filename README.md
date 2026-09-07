# Lal Ten Cafe (लाल टेन कैफे) — Website

🏮 **Sukun Ka Doosra Naam** • Merta City, Rajasthan

Official modern website for **Lal Ten Cafe**, featuring handcrafted coffee, desi kulhad chai, interactive digital menu, table reservation engine, order cart, live status tracking, and direct WhatsApp / call ordering.

---

## 🚀 GitHub Par Website Kaise Publish Karein (Step-by-Step Guide)

Aapki website ko GitHub par publish karna bilkul aasan hai! Humne is project ko pehle se hi GitHub Pages ke liye 100% ready kar diya hai:
- ✅ `base: './'` configure kiya hua hai taaki GitHub Pages par blank screen na aaye aur assets sahi se load hon.
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`) setup kiya gaya hai, jisse code push karte hi website automatically publish ho jayegi!
- ✅ `npm run deploy` script (`gh-pages`) bhi available hai.

---

### Option 1: Automatic Deployment with GitHub Actions (Sabse Aasan & Recommended)

#### Step 1: GitHub par New Repository banayein
1. [GitHub.com](https://github.com/) par login karein.
2. **"New"** button par click karke nayi repository banayein (e.g. `lalten-cafe` ya `lalten-cafe-website`).
3. Repository ko **Public** rakhein.
4. "Add a README file" ko **uncheck** rakhein (empty repository).

#### Step 2: Code ko GitHub par Push karein
Apne computer ke terminal/command prompt me project folder open karein aur ye commands chalayein:

```bash
# Git initialize karein
git init

# Sabhi files ko add karein
git add .

# Pehla commit karein
git commit -m "Initial commit of Lal Ten Cafe website"

# Branch ko main set karein
git branch -M main

# Apni GitHub repository ka link jodein (apna username aur repo name daalein)
git remote add origin https://github.com/<AAPKA_GITHUB_USERNAME>/<AAPKI_REPO_NAME>.git

# Code ko push karein
git push -u origin main
```

#### Step 3: GitHub Pages Enable karein (Only 1 Click)
1. GitHub par apni repository ke **Settings** tab me jayein.
2. Left sidebar me **Pages** par click karein.
3. **Build and deployment** section me:
   - **Source**: Select karein **GitHub Actions**.
4. Bas! Ab har baar jab bhi aap code push karenge, GitHub automatically website build karke live kar dega.
5. 1-2 minute me aapki website live link par open ho jayegi:
   👉 `https://<AAPKA_GITHUB_USERNAME>.github.io/<AAPKI_REPO_NAME>/`

---

### Option 2: `npm run deploy` se Publish Karna (gh-pages)

Agar aap apne local system se direct build bhej kar publish karna chahte hain:

1. Terminal me ye command run karein:
   ```bash
   npm run deploy
   ```
2. Ye command automatically:
   - `npm run build` run karegi aur `dist/` folder banayegi.
   - Us folder ko `gh-pages` branch par push kar degi.
3. Phir GitHub repository ki **Settings** > **Pages** me jaakar **Source** ko **Deploy from a branch** chunein aur branch **`gh-pages`** select karein.

---

## 💻 Local Development (Apne Computer Par Chalana)

```bash
# Dependencies install karein
npm install

# Development server start karein
npm run dev

# Production build test karein
npm run build
npm run preview
```

---

## ☕ Key Features

- 🏮 **Aesthetic Atmosphere**: Warm lantern theme & bamboo aesthetics matching the physical store opposite GVT College.
- ☕ **Artisanal Coffee & Kulhad Chai**: Full menu with customization (size, sweetness, milk options).
- 🛵 **Direct WhatsApp Ordering**: One-click order dispatch to Sumit Soni (+91 8209389020).
- 📅 **Online Table Reservation**: Instant reservation booking for friends, family & students.
- 📱 **100% Mobile & Desktop Responsive**: Smooth animations, mobile bottom navigation bar, and fast loading.
- ⚡ **Zero-config Static Deploy**: Compatible with GitHub Pages, Vercel, Netlify, and Cloudflare Pages.
