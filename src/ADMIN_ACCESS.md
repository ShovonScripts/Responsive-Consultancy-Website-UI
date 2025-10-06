# NDG Admin Panel - Access Guide

## Overview

The NDG Admin Panel is a comprehensive management system with **local authentication** (no Supabase required). All data is stored in browser localStorage for development and prototyping.

## Admin Access

### Development Credentials

**Email:** `admin@example.com`  
**Password:** `12345678`

⚠️ **IMPORTANT:** Change these credentials before deploying to production!

### How to Access Admin Panel

1. **Direct Admin Login**
   - Navigate to the login page
   - Click "Admin Login" link at the bottom
   - Use the dev credentials shown on the page
   - Or click the "Copy" buttons to copy credentials

2. **From Navbar (If Already Logged In)**
   - Click your avatar in the top-right
   - Select "Admin Panel" from the dropdown

3. **Direct URL**
   - Visit `/admin` route (redirects to login if not authenticated)

## Admin Panel Features

### 1. Dashboard
- Monthly Recurring Revenue (MRR)
- Active members count
- Bookings today
- Pending orders
- Recent activity feed
- Quick action buttons

### 2. Users Management
- View all users
- Search and filter by role
- Edit user details
- Activate/deactivate accounts
- Delete users
- Export to CSV

### 3. Products
- Create digital products
- Edit product details
- Set pricing and discounts
- Manage product visibility
- Delete products
- View product analytics

### 4. Orders & Payments
- View all orders
- Filter by status
- Update order status
- Download invoices
- Process refunds
- Export order history

### 5. Bookings & Meetings
- Calendar view of bookings
- Confirm/cancel bookings
- Reschedule appointments
- Send reminders (email/WhatsApp)
- View booking details

### 6. Classes & Subscriptions
- Manage subscription tiers
- Create cohorts
- Schedule sessions
- View attendee lists
- Generate certificates
- Track enrollment

### 7. Content Management
- Create/edit blog posts
- Manage pages
- SEO metadata
- Featured images
- Publish scheduling
- Draft management

### 8. Analytics
- Traffic sources
- Conversion funnel
- Customer Lifetime Value (LTV)
- Customer Acquisition Cost (CAC)
- Churn rate
- Revenue charts

### 9. Settings
- General settings
- Payment provider config (Stripe, PayPal, bKash)
- Email/SMS provider
- Site copy and branding
- Legal pages

### 10. Logs & Audit Trail
- Admin actions
- Failed login attempts
- Security events
- System logs

## Architecture

### Local Authentication System

Located in `/lib/local-auth.tsx`:

- **No Backend Required**: Pure localStorage-based authentication
- **Session Management**: 24-hour session tokens
- **Password Hashing**: Basic validation (upgrade for production)
- **Role-Based Access Control**: 6 user roles (super_admin, admin, consultant, instructor, student, member)

### Mock API System

Located in `/lib/mock-api.tsx`:

- Simulates Laravel REST API endpoints
- Uses localStorage for data persistence
- Includes mock data initialization
- All CRUD operations supported
- Admin-only route protection

### Data Storage

All data is stored in localStorage:
- `ndg_users` - User accounts
- `ndg_passwords` - Password storage (DEV ONLY)
- `ndg_session` - Active session
- `ndg_products` - Product catalog
- `ndg_orders` - Order history
- `ndg_bookings` - Booking records
- `ndg_blogs` - Blog content
- `ndg_classes` - Class/subscription data
- `ndg_analytics` - Analytics data

## User Roles

1. **Super Admin** - Full system access
2. **Admin** - Full admin panel access
3. **Consultant** - Booking and client management
4. **Instructor** - Class and student management
5. **Student** - Learning dashboard
6. **Member** - Basic membership features

## Security Notes

### For Development
- Dev credentials are displayed in the UI
- Passwords stored in plain text in localStorage
- No encryption on session tokens
- Auto-login for testing

### For Production (Required Changes)
1. **Replace localStorage auth** with proper backend (Laravel/Node.js)
2. **Implement password hashing** (bcrypt/argon2)
3. **Add JWT tokens** with refresh mechanism
4. **Enable HTTPS** only
5. **Add rate limiting** on login attempts
6. **Implement 2FA** for admin accounts
7. **Add CSRF protection**
8. **Enable audit logging** to database
9. **Change all default credentials**
10. **Add IP whitelisting** for admin panel

## API Endpoints (Mock)

All routes prefixed with `/api/admin/`:

```
GET    /admin/dashboard
GET    /admin/users
POST   /admin/users
PUT    /admin/users/:id
DELETE /admin/users/:id
GET    /admin/products
POST   /admin/products
PUT    /admin/products/:id
DELETE /admin/products/:id
GET    /admin/orders
PUT    /admin/orders/:id/status
GET    /admin/bookings
POST   /admin/bookings/:id/confirm
POST   /admin/bookings/:id/cancel
GET    /admin/blogs
POST   /admin/blogs
PUT    /admin/blogs/:id
DELETE /admin/blogs/:id
GET    /admin/classes
GET    /admin/analytics
```

## Development Workflow

1. **Login as Admin**
   ```
   Email: admin@example.com
   Password: 12345678
   ```

2. **Add Test Data**
   - Products are pre-seeded
   - Orders are pre-seeded
   - Bookings are pre-seeded
   - Analytics data is pre-seeded

3. **Test Features**
   - All CRUD operations work with mock API
   - Data persists in localStorage
   - Role-based access is enforced

4. **Reset Data**
   - Clear localStorage to reset all data
   - Refresh page to reinitialize

## Troubleshooting

### Cannot Login
- Check console for errors
- Verify credentials exactly match
- Clear localStorage and try again
- Ensure JavaScript is enabled

### Data Not Persisting
- Check localStorage is enabled
- Verify not in incognito/private mode
- Check browser storage quota

### Admin Panel Not Loading
- Check if user has admin/super_admin role
- Verify session is active
- Check console for errors

## Next Steps

### Connecting to Real Backend

When ready to move to production:

1. Replace `/lib/local-auth.tsx` with actual API calls
2. Update `/lib/mock-api.tsx` to use real endpoints
3. Implement proper authentication flow
4. Add database migrations
5. Deploy backend and frontend separately

### Recommended Backend Stack

**Laravel (Recommended):**
```php
// Use Laravel Sanctum for API authentication
composer require laravel/sanctum
php artisan migrate
```

**Node.js Alternative:**
```javascript
// Use Express + JWT
npm install express jsonwebtoken bcrypt
```

## Support

For questions or issues:
1. Check console logs
2. Review this documentation
3. Inspect localStorage data
4. Check network requests in DevTools

---

**Last Updated:** 2025-10-06  
**Version:** 1.0.0  
**Auth System:** Local Storage (Development Only)
