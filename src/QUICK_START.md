# NDG Admin Panel - Quick Start 🚀

## 🔐 Admin Login Credentials

```
Email:    admin@example.com
Password: 12345678
```

## 🎯 Three Ways to Access Admin Panel

### 1️⃣ Direct Admin Login (Recommended)
1. Visit the website
2. Click **"Admin Login"** link at bottom of login page
3. Credentials are displayed on the page with copy buttons
4. Click **Sign In**

### 2️⃣ Demo Button Auto-Fill
1. Go to regular login page
2. Click **"Admin Demo"** button
3. Credentials auto-fill
4. Click **Sign In**

### 3️⃣ From Navbar (If Already Logged In)
1. Click your avatar (top-right)
2. Select **"Admin Panel"**

## 📋 What You Get

### 10 Admin Sections

1. **Dashboard** - KPIs, activity feed, quick actions
2. **Users** - Manage all user accounts
3. **Products** - Digital product catalog
4. **Orders** - Payment tracking & processing
5. **Bookings** - Meeting & consultation management
6. **Classes** - Subscription tiers & cohorts
7. **Content** - Blog posts & page management
8. **Analytics** - Business metrics & charts
9. **Settings** - Platform configuration
10. **Logs** - Audit trail & security events

## 🎨 Features

- ✅ Collapsible sidebar navigation
- ✅ Dark/light theme support
- ✅ Search functionality
- ✅ Notification center
- ✅ User profile menu
- ✅ Real-time data (mock)
- ✅ Responsive design
- ✅ Role-based access

## 💾 Data Storage

Everything is stored in **localStorage** (no backend needed):
- Persists across page refreshes
- Visible in DevTools → Application → Local Storage
- Clear localStorage to reset everything

## 🧪 Testing

### Create Test Data
```javascript
// Already pre-seeded with:
✅ 2 products
✅ 2 orders
✅ 2 bookings
✅ 2 blog posts
✅ 1 class
✅ Analytics data
```

### Reset Everything
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

## 🔍 Debug Info

**Console Output on Load:**
- Green banner with admin credentials
- Database initialization confirmation
- Any errors will be logged

**Check localStorage:**
```javascript
// View all data:
console.log(localStorage);

// View specific data:
console.log(JSON.parse(localStorage.getItem('ndg_users')));
console.log(JSON.parse(localStorage.getItem('ndg_products')));
```

## 🎭 User Roles

All demo users (for testing role-based features):
- **Admin**: `admin@example.com` / `12345678`
- **Student**: `student@ndg.com` / `student123` (if seeded)
- **Instructor**: `instructor@ndg.com` / `instructor123` (if seeded)
- **Consultant**: `consultant@ndg.com` / `consultant123` (if seeded)

## ⚡ Pro Tips

1. **Find Credentials Fast**: Check browser console on page load
2. **Dev Mode Banner**: Shows at bottom-right (dismissible)
3. **Copy Credentials**: Use copy buttons on admin login page
4. **Quick Actions**: Dashboard has buttons for common tasks
5. **Sidebar Collapse**: Click arrow to maximize screen space

## 🐛 Troubleshooting

**Can't see credentials?**
→ Check browser console (F12)

**Admin panel not loading?**
→ Make sure you're logged in as admin role

**Data disappeared?**
→ Check if you cleared localStorage or used incognito mode

**Login not working?**
→ Verify exact credentials (case-sensitive)

## 📚 Documentation

- **Full Guide**: `/ADMIN_ACCESS.md`
- **Migration Info**: `/LOCAL_AUTH_MIGRATION.md`
- **Backend Setup**: `/BACKEND_GUIDE.md`

## ⚠️ Important Notes

- This is a **development/prototype** setup
- Data is stored in **browser only**
- **Not production-ready** (no real backend)
- **Change credentials** before any public deployment

## 🚀 Next Steps

1. Explore all 10 admin sections
2. Try creating/editing data
3. Test different user roles
4. Check data persistence after refresh
5. Review the full documentation

---

**Need Help?**
- Check `/ADMIN_ACCESS.md` for detailed guide
- Look at browser console for debug info
- Inspect localStorage to see data

**Status:** ✅ Fully Functional (Local Auth)