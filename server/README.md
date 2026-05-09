# La Masia Elite Auth API

Production-ready Express + MongoDB authentication backend for La Masia Elite.

## Setup

```bash
cd server
npm install
npm run dev
```

Copy `.env.example` to `.env` and replace every secret before deploying.

## Required Environment Variables

```bash
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
CLIENT_URL=https://your-frontend.vercel.app
API_URL=https://your-api.onrender.com
JWT_ACCESS_SECRET=long_random_secret
JWT_REFRESH_SECRET=another_long_random_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_REFRESH_COOKIE_EXPIRES_DAYS=7
EMAIL_FROM="La Masia Elite <no-reply@yourdomain.com>"
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Endpoints

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify-email/:token
GET    /api/health
```

The refresh token is stored in a secure HTTP-only cookie. The access token is returned in the JSON response and should be kept in memory on the frontend.
