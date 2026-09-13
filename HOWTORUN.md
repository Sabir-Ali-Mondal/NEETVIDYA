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

### 4. Login Credentials
| Role | Email | Password |
|---|---|---|
| Admin | `admin@neetvidya.com` | `adminpassword123` |
| Teacher | `rajesh@neetvidya.com` | `teacherpassword123` |
| Student | `student@neetvidya.com` | `studentpassword123` |

### 5. Access
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)