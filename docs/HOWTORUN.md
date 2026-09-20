# NEETVIDYA — How to Run
> Full architecture, database and API reference: see [`TECHNICAL.md`](./TECHNICAL.md).

### 1. Prerequisites
- Node.js (v18+) installed
- MongoDB running locally or Atlas URI ready
- (Optional) Cloudinary account for uploads, SMTP account for emails
### 2. Setup Environment
1. Copy `server/.env.example` to `server/.env` and fill in details (MongoDB, JWT, and optionally Cloudinary/SMTP).
2. The client needs no `.env` file for local development - it defaults to the `/api` proxy configured in `client/vite.config.js`. Optionally create `client/.env` with `VITE_API_BASE_URL` to point the frontend at a different API host.

### 3. Install & Start
Run these commands from the **root** folder:

```bash
# Install all dependencies (root, server, client)
npm run install-all
# Start both Backend (5000) and Frontend (5173)
npm run dev
```

Individual services (from root):

```bash
npm run server   # backend only (nodemon)
npm run client   # frontend only (vite)
npm run build    # production build of the client
npm start        # start backend without nodemon
```

### 3.1 Optional: Local Client `.env`
For local development the client works fine without a `.env` (it uses the `/api` proxy).
To point it at another host, create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Keep this file out of GitHub (`.env` is already in `.gitignore`).

### 4. Seed the Database
> **Important:** the seeder now creates **only the admin account**. It does **not**
> create teachers, students, batches, courses, subjects or exams anymore — all of
> that is created from the **admin panel** once you log in.

```bash
cd server
npm run seed
```

What the seed does:
- Connects to `MONGODB_URI` (default `mongodb://localhost:27017/neetvidya`).
- Creates **one admin** using `ADMIN_EMAIL` / `ADMIN_PASSWORD` (or the defaults below).
- **Idempotent:** if an admin with that email already exists, it does nothing and exits — it never deletes or overwrites data.

Default admin credentials (if not overridden in `server/.env`):

| Role  | Email                    | Password         |
|-------|--------------------------|------------------|
| Admin | `neetvidya720@gmail.com` | `Admin@NEET2026` |

> The admin is created with `mustChangePassword = true`. On first login the portal **forces you to set a new password** before you can continue.

After logging in as admin, build the institute from the admin panel:
- **Teachers / Students** — created with the constant default password `Neetvidya@123` (`server/src/config/constants.js`). Each must change it on first login. **No credential emails are sent.**
- **Batches** — create the institute's batch records (see §5).
- **Courses / Subjects / Units / Chapters** — academic structure.
- **Materials, Questions, Exams** — content and assessments.

### 5. Batches & Programmes

The institute offers a **fixed two-programme catalogue** (`client/src/config/courses.js`, enforced on the `Batch` model):

| Programme | Batch          | Duration         | Fees    |
|-----------|----------------|------------------|---------|
| SANKALP   | Dropper & 12th | Complete 1 Year  | ₹20,000 |
| UDAAN     | 11th           | Complete 2 Years | ₹35,000 |

Create the actual batch records from **Admin → Batches**. *The seed no longer creates the “12th Batch – SANKALP” / “11th Batch – UDAAN” records automatically.*

### 6. Key Post-Seed Notes
- **Subjects** — the Faculty Library lazily seeds the four defaults (Biology, Physics, Chemistry, Mathematics) on the first `GET /api/academics/subjects`. Teachers can add custom subjects via “Other…”, which persist for next time.
- **Teachers see all batches** — no per-teacher batch assignment; every teacher can access every active batch.
- **Password model** — admin-created accounts use the constant default password (`Neetvidya@123`) and change it on first login; self-registered users set their own. Credential emails are no longer sent.
- **Batch-scoped notifications** — students only receive notifications for their batches (plus direct/admin-wide ones), never global floods.
- **Exam access** — students in the exam's batch start directly; non-members see a prefilled **“Request permission on WhatsApp”** button and need an admin `ExamPermission` grant.
- **Shareable exam links** — published exams get a `/e/:slug` public preview (no questions exposed); copy it from the exam list.

### 7. Access
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)
- **Health:**   [http://localhost:5000/api/health](http://localhost:5000/api/health)

Official Telegram: https://t.me/neetvidya720official
### 8. Deployment (Vercel + Render)
You do **not** need to commit a client `.env` — set the variable in the Vercel dashboard instead.

**Vercel → Project → Settings → Environment Variables**
```env
VITE_API_BASE_URL=https://neetvidya.onrender.com/api
```

Your code already reads exactly this name:
```js
baseURL: import.meta.env.VITE_API_BASE_URL || "/api"
```
So use **`VITE_API_BASE_URL`** — **not** `VITE_API_URL`.

**Render → Environment Variables**
```env
MONGODB_URI=<atlas-uri>
JWT_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>
CLIENT_URL=https://neetvidya.vercel.app
```

Notes:
- Redeploy after changing a Vercel variable (Vite inlines them at build time).
- No `client/.env` is needed for production when the variable is set in Vercel.
- Local `.env` files stay out of GitHub — `.env` is already listed in `.gitignore`.

### 9. Housekeeping
The repo has already been cleaned of its redundant files (unused models,
middleware, utilities and frontend components). `TECHNICAL.md` §12 records the
small remainder that was kept on purpose and the few items still open for review.
