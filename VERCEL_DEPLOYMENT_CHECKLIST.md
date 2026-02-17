# Vercel Deployment Troubleshooting - Signup Error Fix

## ❌ Issue
**Error**: `Unexpected token 'A', "An error o"... is not valid JSON`

**Root Cause**: API route returning non-JSON response (HTML error page or plain text) instead of proper JSON error object.

## ✅ Fixes Applied

### 1. **Frontend Error Handling** (SignupFormPhase1.jsx)
- Added content-type check before parsing JSON
- Catches non-JSON responses and shows user-friendly error
- Added error logging for debugging

### 2. **Backend Error Handling** (signup/route.js)
- Check environment variables before proceeding
- Wrap database connection in try-catch
- Ensure ALL error paths return proper JSON

## 🔍 Critical Environment Variables to Check in Vercel

### Required for Signup to Work:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Email Service (Zoho)
EMAIL_SERVER_HOST=smtp.zoho.in
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=admin@techutsavtce.tech
EMAIL_SERVER_PASSWORD=your-password-here
EMAIL_FROM=Team Techutsav'26

# JWT Authentication
JWT_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here

# Azure Blob Storage (for future payment uploads)
CONNECTIONSTRING=your-azure-connection-string
CONTAINERNAME=techutsav25
```

## 🚀 Vercel Deployment Steps

### Step 1: Verify Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check ALL variables from the list above are set
3. Make sure there are no extra spaces or quotes around values
4. Verify variables are set for "Production" environment

### Step 2: Check Database Access
1. MongoDB Atlas → Network Access
2. Ensure IP address `0.0.0.0/0` is whitelisted (or Vercel's IP range)
3. Check database user has read/write permissions

### Step 3: Test Email Configuration
1. Try sending test email from local environment
2. Verify Zoho credentials are correct
3. Check if email sending is enabled for the domain

### Step 4: Redeploy
```bash
git add .
git commit -m "fix: Add robust error handling for signup API"
git push origin main
```

Vercel will auto-deploy. Monitor the deployment logs in Vercel dashboard.

## 🧪 Testing the Fix

### Local Testing:
```bash
# Remove .env file temporarily to simulate missing env vars
mv .env .env.backup
npm run dev

# Try to signup - should see user-friendly error
# "Server configuration error. Please contact support."

# Restore .env
mv .env.backup .env
```

### Production Testing:
1. Open browser DevTools → Network tab
2. Try to signup
3. Check the response from `/api/auth/signup`:
   - Should always be JSON (even for errors)
   - Status codes: 400 (validation), 500 (server), 503 (database)
   - Never HTML error page

## 🔧 Common Vercel Issues & Solutions

### Issue 1: "MONGODB_URI not set"
**Solution**: Add MONGODB_URI to Vercel environment variables
- Must include database name: `mongodb+srv://.../?retryWrites=true&w=majority`

### Issue 2: "Email service not configured"
**Solution**: Add all EMAIL_SERVER_* variables
- For Zoho: Use port 465 with SSL
- For Gmail: Use app-specific password, not regular password

### Issue 3: "Database connection error"
**Solution**: Whitelist Vercel IPs in MongoDB Atlas
- Atlas → Network Access → Add IP: `0.0.0.0/0`
- Or use MongoDB's Vercel integration

### Issue 4: Cold Starts / Timeouts
**Solution**: MongoDB connection caching already implemented
- Check `src/lib/mongodb.js` - uses global cache
- First request may be slow (< 10s), subsequent fast

### Issue 5: Function Execution Timeout
**Solution**: Increase timeout in `vercel.json`:
```json
{
  "functions": {
    "src/app/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

## 📊 Monitoring & Debugging

### View Logs in Vercel:
1. Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Click "View Function Logs"
4. Look for `[SIGNUP ERROR]` logs

### Key Log Patterns:

✅ **Success**:
```
[SIGNUP] Database connected
[SIGNUP] User created: user@example.com
[SIGNUP] Verification email sent to: user@example.com
```

❌ **Environment Error**:
```
[SIGNUP ERROR] MONGODB_URI not set
```

❌ **Database Error**:
```
[SIGNUP ERROR] Database connection failed: MongoServerError: ...
```

❌ **Email Error**:
```
[SIGNUP ERROR] Failed to send verification email: Error: ...
```

## 🎯 Expected Behavior After Fix

### Scenario 1: All Env Vars Set ✅
- User submits form
- API validates input
- Creates user in MongoDB
- Sends verification email
- Returns: `{ success: true, message: "..." }`
- Redirects to `/verify-email?email=...`

### Scenario 2: Missing Env Vars ⚠️
- API checks env vars first
- Returns: `{ error: "Server configuration error. Please contact support." }`
- Frontend shows error message
- NO JSON parse error

### Scenario 3: Database Connection Fails 🔴
- API tries to connect
- Catches error
- Returns: `{ error: "Database connection error. Please try again later." }`
- Frontend shows error message
- NO JSON parse error

### Scenario 4: Email Sending Fails 📧
- User created in MongoDB
- Email fails to send
- User is deleted from database (rollback)
- Returns: `{ error: "Failed to send verification email. Please check your email address." }`
- Frontend shows error message
- NO JSON parse error

## 🔐 Security Notes

### Production Best Practices:
1. **Never log sensitive data** in production
   - Current code logs email (OK) but not passwords ✅
   
2. **Use strong JWT_SECRET**
   - Generate: `openssl rand -base64 32`
   
3. **Rate limiting** (Future enhancement)
   - Add Vercel Edge Config or Upstash Redis
   - Limit signup attempts per IP
   
4. **Email validation** (Future enhancement)
   - Add email verification before allowing login
   - Current implementation sends verification email ✅

## 📞 Support & Further Help

If issue persists after applying all fixes:

1. **Check Vercel Function Logs**
   - Look for the exact error message
   - Check which line is failing

2. **Test Locally First**
   - Ensure local signup works 100%
   - Use exact same env var values as Vercel

3. **Gradual Debugging**
   - Add more console.logs
   - Check each step: parse → validate → DB → email

4. **Contact Support Checklist**:
   - Which step fails? (env check, DB, email)
   - Error message from Vercel logs
   - Environment variables set (don't share values!)
   - MongoDB whitelist status
   - Email service status

## 📝 Related Files Modified

1. `src/components/Forms/SignupFormPhase1.jsx`
   - Added content-type check
   - Better error handling

2. `src/app/api/auth/signup/route.js`
   - Environment variable validation
   - Database connection error handling
   - Always returns JSON

3. `src/lib/mongodb.js`
   - Already has caching (no changes needed)

## ✨ Success Indicators

You'll know it's fixed when:
- ✅ Signup works in production
- ✅ Error messages are user-friendly
- ✅ NO "Unexpected token" errors
- ✅ All responses are valid JSON
- ✅ Vercel logs show clear error messages
