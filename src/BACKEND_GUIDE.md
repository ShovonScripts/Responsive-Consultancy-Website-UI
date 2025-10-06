# NDG Backend & Admin Dashboard Guide

## Overview

Your NDG website now has a complete backend system with full CRUD (Create, Read, Update, Delete) operations for:
- **Blogs** - Manage blog posts with categories, authors, and publishing control
- **Products** - Manage digital products with pricing, features, and categories
- **Services** - Manage consultancy services with deliverables and pricing

## Features

### 🔐 Authentication System
- **Admin Sign Up** - Create admin accounts with email/password
- **Admin Login** - Secure login with session management
- **Protected Routes** - API endpoints secured with JWT tokens
- **Auto-confirm Email** - Email confirmation handled automatically (no email server needed)

### 📝 Content Management
- **Full CRUD Operations** - Create, read, update, and delete content
- **Rich Forms** - User-friendly forms for all content types
- **Real-time Updates** - Changes reflect immediately
- **Draft/Publish Control** - Publish or save blogs as drafts
- **Data Validation** - Required fields and error handling

### 🎨 Admin Dashboard
- **Statistics Overview** - See total counts for all content
- **Tabbed Interface** - Organized management for blogs, products, and services
- **Quick Actions** - Edit and delete buttons for each item
- **Responsive Design** - Works on all devices
- **Demo Data Seeder** - Quickly populate with sample content

## Getting Started

### 1. Access the Admin Portal

Navigate to the **Admin** link in the navbar or visit the admin page directly.

### 2. Create Your Admin Account

On the Admin Login page:
1. Click the **Sign Up** tab
2. Enter your full name, email, and password
3. Confirm your password
4. Click **Create Admin Account**

You'll be automatically logged in after signup.

### 3. Seed Demo Data (Optional)

Once logged in:
1. Click the **Seed Demo Data** button in the dashboard header
2. This will create sample blogs, products, and services
3. Use this to test the system or as a starting point

### 4. Manage Content

Use the tabs to navigate between:
- **Blogs** - Create and manage blog posts
- **Products** - Create and manage digital products
- **Services** - Create and manage consultancy services

## API Endpoints

All API endpoints are prefixed with `/make-server-7a5ab98d/`

### Authentication Endpoints

#### Sign Up (Create Admin User)
```
POST /auth/signup
Body: { email, password, name }
```

#### Login (Client-side)
Use Supabase client-side auth:
```javascript
supabase.auth.signInWithPassword({ email, password })
```

### Blog Endpoints

#### Get All Blogs
```
GET /blogs?published=true
Returns: { blogs: [...] }
```

#### Get Single Blog
```
GET /blogs/:id
Returns: { blog: {...} }
```

#### Create Blog (Protected)
```
POST /blogs
Headers: { Authorization: "Bearer TOKEN" }
Body: { title, excerpt, content, category, readTime, author, imageUrl, published }
Returns: { blog: {...}, message }
```

#### Update Blog (Protected)
```
PUT /blogs/:id
Headers: { Authorization: "Bearer TOKEN" }
Body: { ...updates }
Returns: { blog: {...}, message }
```

#### Delete Blog (Protected)
```
DELETE /blogs/:id
Headers: { Authorization: "Bearer TOKEN" }
Returns: { message }
```

### Product Endpoints

#### Get All Products
```
GET /products
Returns: { products: [...] }
```

#### Get Single Product
```
GET /products/:id
Returns: { product: {...} }
```

#### Create Product (Protected)
```
POST /products
Headers: { Authorization: "Bearer TOKEN" }
Body: { title, description, price, category, level, badge, features, includes, imageUrl }
Returns: { product: {...}, message }
```

#### Update Product (Protected)
```
PUT /products/:id
Headers: { Authorization: "Bearer TOKEN" }
Body: { ...updates }
Returns: { product: {...}, message }
```

#### Delete Product (Protected)
```
DELETE /products/:id
Headers: { Authorization: "Bearer TOKEN" }
Returns: { message }
```

### Service Endpoints

#### Get All Services
```
GET /services
Returns: { services: [...] }
```

#### Get Single Service
```
GET /services/:id
Returns: { service: {...} }
```

#### Create Service (Protected)
```
POST /services
Headers: { Authorization: "Bearer TOKEN" }
Body: { title, subtitle, description, deliverables, duration, price, icon, color, order }
Returns: { service: {...}, message }
```

#### Update Service (Protected)
```
PUT /services/:id
Headers: { Authorization: "Bearer TOKEN" }
Body: { ...updates }
Returns: { service: {...}, message }
```

#### Delete Service (Protected)
```
DELETE /services/:id
Headers: { Authorization: "Bearer TOKEN" }
Returns: { message }
```

## Data Schemas

### Blog Schema
```typescript
{
  id: string;              // Auto-generated UUID
  title: string;           // Required
  excerpt: string;         // Required
  content: string;         // Required - Full article content
  category: string;        // Money, Skills, Systems, Case Studies, Uncategorized
  readTime: string;        // e.g., "5 min"
  date: string;           // ISO date string (auto-generated)
  author: string;          // Author name
  imageUrl: string;        // Optional - Cover image URL
  published: boolean;      // Draft or published
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

### Product Schema
```typescript
{
  id: string;              // Auto-generated UUID
  title: string;           // Required
  description: string;     // Required
  price: number;           // Required - Price in GBP
  rating: number;          // Auto-set to 5.0
  students: number;        // Auto-set to 0
  category: string;        // Systems, Content, Templates, Marketing, General
  level: string;           // Beginner, Intermediate, Advanced, All Levels
  badge: string;           // Optional - e.g., "Best Seller", "New"
  features: string[];      // Array of feature descriptions
  includes: string[];      // Array of what's included
  imageUrl: string;        // Optional - Product image URL
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

### Service Schema
```typescript
{
  id: string;              // Auto-generated UUID
  title: string;           // Required
  subtitle: string;        // Optional tagline
  description: string;     // Required
  deliverables: string[];  // Array of deliverable items
  duration: string;        // e.g., "1 week", "2-3 weeks", "Ongoing"
  price: string;           // Required - e.g., "£497", "£997/mo"
  icon: string;            // Icon name (Search, Megaphone, etc.)
  color: string;           // CSS color variable
  order: number;           // Display order
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

## Frontend Integration

### Using the API in Your Components

```typescript
import { blogAPI, productAPI, serviceAPI } from '../lib/api';

// Get all published blogs
const { blogs } = await blogAPI.getAll(true);

// Get all products
const { products } = await productAPI.getAll();

// Get all services
const { services } = await serviceAPI.getAll();

// Create new blog (requires admin auth)
const { blog } = await blogAPI.create({
  title: 'My Blog Post',
  excerpt: 'Short summary',
  content: 'Full content here...',
  category: 'Money',
  published: true
});
```

### Using Auth Context

```typescript
import { useAuth } from '../lib/auth-context';

function MyComponent() {
  const { user, isAuthenticated, login, logout, signup } = useAuth();
  
  // Check if user is logged in
  if (isAuthenticated) {
    // Show admin features
  }
  
  // Login
  await login(email, password);
  
  // Signup
  await signup(email, password, name);
  
  // Logout
  await logout();
}
```

## Database Storage

The backend uses Supabase's KV (Key-Value) store for data persistence:

- **Blogs**: Stored with key prefix `blog:`
- **Products**: Stored with key prefix `product:`
- **Services**: Stored with key prefix `service:`

Data persists across server restarts and is production-ready for prototyping.

## Security Notes

⚠️ **Important**: Figma Make is designed for prototyping and demos. For production use:

1. Add additional validation and sanitization
2. Implement rate limiting
3. Add CSRF protection
4. Use environment-specific configurations
5. Add proper error logging and monitoring
6. Consider migration to a proper database for scalability

## Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in as admin
- Check that your session hasn't expired
- Try logging out and back in

### Data Not Showing
- Check browser console for errors
- Ensure the API calls are completing successfully
- Try seeding demo data to test the system

### Can't Create Content
- Verify you're logged in with admin credentials
- Check that all required fields are filled
- Look for error messages in the UI or console

## Next Steps

1. **Customize Forms**: Add more fields to the content types
2. **Add Image Upload**: Integrate with Supabase Storage for image uploads
3. **Extend API**: Add filtering, sorting, and pagination
4. **Analytics**: Track views, clicks, and conversions
5. **Email Integration**: Send notifications on new content
6. **Comments**: Add user comments to blogs
7. **Search**: Implement full-text search across content

## Support

For questions or issues with the backend system, check the console logs for detailed error messages. All errors include contextual information to help with debugging.
