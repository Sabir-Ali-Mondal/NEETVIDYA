# NEETVIDYA — Tech Stack & Hosting

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Animations | Framer Motion |
| Charts | Recharts |
| State | React Context + Hooks |
| HTTP | Axios |
| Routing | React Router v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| File Storage | Cloudinary |
| Communication | Telegram Bot API |
| Validation | express-validator |
| Security | helmet, rate-limit, CORS |

---

## Hosting Plan

| Service | Provider | Why |
|---|---|---|
| Frontend | **Vercel** or **Netlify** | Free tier, auto-deploy from Git, CDN built-in |
| Backend | **Render** or **Railway** | Free/cheap tier, Node.js native, easy env vars |
| Database | **MongoDB Atlas** | Free 512MB cluster, managed backups, scales later |
| File Storage | **Cloudinary** | Free 25GB, auto image/video optimization, CDN |
| Domain | **Namecheap** or **GoDaddy** | Buy neetvidya.com or similar |
| SSL | Free via hosting provider | Vercel/Render auto-provision HTTPS |
| Email | **Brevo** or **Gmail SMTP** | Free tier for verification emails |
| Telegram | Free | No hosting needed, webhook points to backend |

---

## Recommended Combo (Cheapest Start)

```
Frontend   →  Vercel (free)
Backend    →  Render (free tier, spins down after inactivity)
Database   →  MongoDB Atlas M0 (free, 512MB)
Storage    →  Cloudinary (free, 25GB)
Domain     →  ~$10/year
Total      →  ~$10/year to start
```

---

## When to Upgrade

| Trigger | Upgrade To |
|---|---|
| Render free tier sleeps after 15 min idle | Render paid ($7/mo) or Railway ($5/mo) |
| MongoDB 512MB fills up | Atlas M10 ($57/mo) |
| Cloudinary 25GB fills | Cloudinary paid ($89/mo) |
| Need custom email domain | Brevo paid or Zoho Mail |

---

## Deployment Flow

```
Code pushed to GitHub
        │
        ├── Vercel detects client/ → builds → deploys frontend
        │
        ├── Render detects server/ → installs → deploys backend
        │
        └── Backend connects to MongoDB Atlas + Cloudinary
```

---

## One-Line Summary

React on Vercel. Express on Render. MongoDB Atlas. Cloudinary for files. Telegram for chat. Start free. Scale when students grow.