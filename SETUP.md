# Daastaanein — Setup Guide

## One-time Setup

### 1. Push this code to your GitHub repo

```bash
# Navigate to this folder in your terminal, then:
git init
git remote add origin https://github.com/Defend-like-dv/daastaanein.git
git add .
git commit -m "feat: initial Next.js + Tina CMS scaffold"
git branch -M main
git push -u origin main --force
```

> Note: `--force` is needed once to overwrite the existing README. Safe to do on first push.

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the development server

```bash
npm run dev
```

This starts both Next.js and the Tina CMS local server simultaneously.

- **Website:** http://localhost:3000
- **Tina CMS editor:** http://localhost:3000/admin

---

### 4. Add environment variables to Vercel (for production)

Go to Vercel → Your Project → Settings → Environment Variables, and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | `c8822606-0a69-4e58-b2de-e0cd023641ee` |
| `TINA_TOKEN` | `a433581ce68d8d94e2a95cfa5c2e3ccd352be487` |
| `NEXT_PUBLIC_TINA_SEARCH_TOKEN` | `5032721e1bf6c4495ec292ddff719c4647e09c7f` |
| `NEXT_PUBLIC_TINA_BRANCH` | `main` |

---

### 5. Deploy on Vercel

1. Go to https://vercel.com → New Project → Import from GitHub
2. Select `Defend-like-dv/daastaanein`
3. Framework: Next.js (auto-detected)
4. Add the environment variables above
5. Deploy

Every `git push` to `main` will auto-deploy.

---

## Project Structure

```
daastaanein/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   └── page.tsx            # Homepage
├── components/             # Shared React components
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx   # Dark/light mode
│   ├── StoryCard.tsx
│   ├── FeaturedCard.tsx
│   └── StatsStrip.tsx
├── content/
│   ├── daastaanein/        # MDX story files (managed via Tina CMS)
│   └── people/             # MDX artist profile files
├── data/
│   └── collaborations.json # Collaborator Map data (edit to add artists/songs)
├── lib/
│   └── content.ts          # Content fetching utilities
├── styles/
│   └── globals.css         # Design tokens (CSS variables) + base styles
├── tina/
│   └── config.ts           # Tina CMS schema (3 collections)
└── .env.local              # Tina credentials (DO NOT commit)
```

---

## Adding a New Story

**Via Tina CMS editor (recommended):**
1. Run `npm run dev`
2. Go to http://localhost:3000/admin
3. Click "Daastaanein (Stories)" → "New"
4. Fill in all fields and publish

**Via code:**
Create a new `.mdx` file in `content/daastaanein/` following the pattern in `story-behind-lag-ja-gale.mdx`.

---

## Updating the Collaborator Map

Edit `data/collaborations.json` directly. Each song needs:
- `contributors`: array of `{ artistId, role }` — role is per-song, not per-artist
- `year`: for the timeline view
- `hasDaastaan`: set to `true` and add `daastaanSlug` when a story exists
