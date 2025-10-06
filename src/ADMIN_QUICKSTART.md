# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Access Admin Portal
1. Click the **"Admin"** button in the navigation bar
2. You'll see the Admin Login page

### Step 2: Create Your Admin Account
1. Click the **"Sign Up"** tab
2. Fill in your details:
   - Full Name: `Your Name`
   - Email: `admin@ndg.com` (or any email)
   - Password: `password123` (minimum 6 characters)
   - Confirm Password: `password123`
3. Click **"Create Admin Account"**
4. You'll be automatically logged in! 🎉

### Step 3: Populate with Demo Data
1. Once logged in, you'll see the Admin Dashboard
2. Click the **"Seed Demo Data"** button at the top
3. Wait a few seconds for the data to be created
4. Refresh the page to see your demo content!

## 📋 Managing Content

### Creating New Content

#### Create a Blog Post
1. Go to the **Blogs** tab
2. Click **"Create Blog"**
3. Fill in:
   - Title (required)
   - Excerpt (required)
   - Content (required)
   - Category (dropdown)
   - Read Time (e.g., "5 min")
   - Author
   - Image URL (optional)
   - Published toggle
4. Click **"Create Blog"**

#### Create a Product
1. Go to the **Products** tab
2. Click **"Create Product"**
3. Fill in:
   - Title (required)
   - Description (required)
   - Price in £ (required)
   - Category (dropdown)
   - Level (dropdown)
   - Badge (optional, e.g., "Best Seller")
   - Image URL (optional)
   - Features (click "+ Add" to add multiple)
4. Click **"Create Product"**

#### Create a Service
1. Go to the **Services** tab
2. Click **"Create Service"**
3. Fill in:
   - Title (required)
   - Subtitle
   - Description (required)
   - Duration (e.g., "1 week")
   - Price (required, e.g., "£497")
   - Deliverables (click "+ Add" to add multiple)
4. Click **"Create Service"**

### Editing Content

1. Find the item you want to edit in the table
2. Click the **pencil icon** (Edit) button
3. Make your changes in the dialog
4. Click **"Update"**

### Deleting Content

1. Find the item you want to delete in the table
2. Click the **trash icon** (Delete) button
3. Confirm the deletion
4. The item will be permanently removed

## 🎯 Pro Tips

### Blogs
- Set `published: false` to save as draft
- Use categories to organize content: Money, Skills, Systems, Case Studies
- The excerpt appears in blog listings
- Content supports full HTML/text

### Products
- Badge examples: "Best Seller", "New", "Popular"
- Use features for selling points
- Price is in GBP (£)
- Level helps users find suitable products

### Services
- Use deliverables to list what's included
- Duration examples: "1 week", "2-3 weeks", "Ongoing"
- Price can include "/mo" for monthly: "£997/mo"

## 📊 Dashboard Features

### Statistics
- View total counts for blogs, products, and services at a glance

### Quick Actions
- **Seed Demo Data**: Populate with sample content for testing
- **Logout**: Securely log out of the admin portal

### Data Persistence
- All your content is saved to the database
- Data persists across page refreshes and sessions
- Changes are reflected immediately on the public pages

## 🔒 Security

- Only authenticated admin users can access the dashboard
- All create, update, and delete operations are protected
- Public users can only view published content
- Sessions are managed securely with Supabase

## 🌐 Viewing Your Content

After creating content, view it on the public pages:

- **Blogs**: Navigate to the "Blog" page in the main navigation
- **Products**: Navigate to the "Products" page
- **Services**: Navigate to the "Services" page

All your created content will appear automatically!

## 💡 Common Workflows

### Publishing Your First Blog Post
1. Go to Admin → Blogs tab
2. Click "Create Blog"
3. Write your content
4. Toggle "Publish immediately" ON
5. Click "Create Blog"
6. Visit the Blog page to see it live!

### Adding Multiple Products
1. Go to Admin → Products tab
2. For each product:
   - Click "Create Product"
   - Fill in details
   - Add features one by one
   - Click "Create Product"

### Updating Existing Content
1. Find the item in the table
2. Click the edit (pencil) icon
3. Make your changes
4. Click "Update"
5. Changes appear immediately!

## ❓ Troubleshooting

**Can't log in?**
- Make sure you created an account first (use Sign Up tab)
- Check that email and password are correct
- Password must be at least 6 characters

**Don't see your content?**
- Check that the item was created successfully (look for success toast)
- Try refreshing the page
- Make sure you're on the correct tab

**Demo data button not working?**
- Check browser console for errors
- Make sure you're logged in
- Try logging out and back in

**Changes not appearing on public pages?**
- Refresh the public page
- Check that blogs are set to "published"
- Verify the content was saved successfully

## 🎨 Customization Ideas

Once you're comfortable with the basics:

1. **Add images**: Use image URLs from Unsplash or your own hosting
2. **Rich content**: Use formatting in the content fields
3. **Organize**: Use categories and badges to organize content
4. **Pricing tiers**: Create products at different price points
5. **Service packages**: Create complementary services

## 📞 Need Help?

- Check the console (F12) for error messages
- All operations show success/error notifications
- Detailed error messages help with debugging
- Refer to BACKEND_GUIDE.md for technical details

---

**Happy content managing! 🎉**
