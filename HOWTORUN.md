# NEETVIDYA — How to Run

### 1. Prerequisites
- Node.js installed
- MongoDB running locally or Atlas URI ready

### 2. Setup Environment
1. Copy `server/.env.example` to `server/.env` and fill in details (MongoDB, Cloudinary, JWT).
2. Copy `client/.env.example` to `client/.env`.

### 3. Install & Start
Run these commands from the **root** folder:

```bash
# Install all dependencies
npm run install-all

# Start both Backend (5000) and Frontend (5173)
npm run dev
```

### 4. Login Credentials for Local Testing
| Role | Email | Password |
|---|---|---|
| Admin | `neetvidya720@gmail.com` | `Admin@NEET2026` |
| Teacher | `ramijkhan314@gmail.com` | `Teacher@NEET2026` |
| Teacher | `bheshmadas377@gmail.com` | `Teacher@NEET2026` |
| Student | `sabir.gdsc@gmail.com` | `Student@NEET2026` |

Official Telegram: https://t.me/neetvidya720official

### 5. Seed the Database
Run this once locally to create the core local accounts and the two default batches:

```bash
cd server
npm run seed
```

This seed creates:
- the admin, student and faculty test accounts
- the two default batches for the institute:
  - 12th Batch – SANKALP
  - 11th Batch – UDAAN
- no demo courses or demo tests, so all academic content must be added from the admin panel

### 6. Batch Details
- **12th Batch – SANKALP**
  - Duration: Complete 1 Year
  - Fees: ₹20,000
- **11th Batch – UDAAN**
  - Duration: Complete 2 Years
  - Fees: ₹35,000

### 7. Access
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)