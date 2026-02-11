# Admin Credentials

## Default Admin Account

**Email:** `sdeepaksharma834@gmail.com`
**Password:** (You need to sign up with this email first)

## How to Get Admin Access

### Option 1: Use Your Existing Email
1. Sign up at `/login` with your email: `sdeepaksharma834@gmail.com`
2. Verify your email if required
3. Login and you'll see **ADMIN** badge on dashboard
4. As admin, you can see ALL jobs and delete any job

### Option 2: Add a New Admin Email
Edit `/src/lib/auth-context.tsx` and add your email to `ADMIN_EMAILS` array:

```typescript
const ADMIN_EMAILS = [
    'sdeepaksharma834@gmail.com',
    'your-new-email@example.com',  // Add your email here
    'admin@frontendjobs.in',
];
```

## Admin Privileges

✅ View all jobs (not just your own)
✅ Delete any job
✅ Access admin badge on dashboard
✅ See "Admin View" label on job listings

## Regular User vs Admin

| Feature | Regular User | Admin |
|---------|-------------|-------|
| View own jobs | ✅ | ✅ |
| View all jobs | ❌ | ✅ |
| Delete own jobs | ✅ | ✅ |
| Delete any job | ❌ | ✅ |
| Post jobs | ✅ | ✅ |
| Edit company profile | ✅ | ✅ |

## Testing

To test admin features:
1. Sign up with `sdeepaksharma834@gmail.com`
2. Login and go to `/dashboard`
3. You should see purple **ADMIN** badge
4. You'll see ALL jobs posted by any user
5. You can delete any job (not just yours)
