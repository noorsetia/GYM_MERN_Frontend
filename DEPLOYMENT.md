# Deployment Guide

## Environment Variables for Production

### Frontend (Vite)

Set this environment variable in your hosting platform (Vercel, Netlify, Render, etc.):

```bash
VITE_API_BASE_URL=https://your-backend-url.com
```

**Examples:**
- Render: `VITE_API_BASE_URL=https://gym-backend-1-z4zg.onrender.com`
- Vercel: Set in project settings → Environment Variables
- Netlify: Set in site settings → Environment variables

**Important:** This MUST be set at BUILD TIME, not runtime. Rebuild your frontend after setting this variable.

### Backend (Node/Express)

Set these environment variables in your backend hosting:

```bash
PORT=4000
FRONTEND_URL=https://your-frontend-url.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
```

**Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Create a new app password
3. Copy the 16-character password (no spaces)
4. Use it for `SMTP_PASSWORD`

## Local Development

Both servers will work automatically on localhost:

- Frontend: Runs on any available port (5173, 5174, 5175, etc.)
- Backend: Runs on port 4000
- CORS: Accepts any localhost origin in development

### Running Locally

```bash
# Terminal 1 - Backend
cd GYM_Backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd GYM_MERN_Frontend-1
npm install
npm run dev
```

Open the URL shown by Vite (e.g., http://localhost:5173)

## Troubleshooting

### "Network error: could not reach server"

**Cause:** Frontend can't connect to backend

**Local Development Fix:**
1. Make sure backend is running on port 4000
2. Check browser console for actual error
3. Verify no firewall blocking port 4000

**Production Fix:**
1. Set `VITE_API_BASE_URL` to your backend URL
2. Rebuild frontend (this bakes the URL into the build)
3. Verify backend is publicly accessible
4. Check backend CORS allows your frontend URL

### Gmail Sending Limit

If you see "Daily user sending limit exceeded":
- Gmail free accounts: 500 emails/day limit
- Wait 24 hours for reset
- OR use a different Gmail account
- OR switch to SendGrid/Mailgun/Postmark

### CORS Errors in Production

Make sure backend `.env` has:
```bash
FRONTEND_URL=https://your-exact-frontend-url.com
```

No trailing slash, exact match required.

## Deployment Checklist

- [ ] Backend deployed with all env vars set
- [ ] Backend health check: `curl https://your-backend.com/mail/verify`
- [ ] Frontend env var `VITE_API_BASE_URL` set
- [ ] Frontend rebuilt after setting env var
- [ ] Frontend deployed
- [ ] Test contact form on live site
- [ ] Check browser console for any errors

## Contact Form Flow

1. User fills form → Frontend validates inputs
2. Frontend POST to `/send/mail` → Backend receives request
3. Backend validates → Sends email via Gmail SMTP
4. Response sent back → Toast shown to user

All API calls use centralized `apiClient` with:
- Automatic baseURL resolution
- Error normalization  
- Development logging
- 15-second timeout
