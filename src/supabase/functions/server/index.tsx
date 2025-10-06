import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase client for auth
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Auth middleware for protected routes
async function requireAuth(c: any, next: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401);
  }

  const accessToken = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user?.id) {
    console.log('Authorization error in auth middleware:', error);
    return c.json({ error: 'Unauthorized: Invalid token or user not found' }, 401);
  }

  // Get or create user profile
  let userProfile = await kv.get(`user:${user.id}`);
  if (!userProfile) {
    // Create user profile if it doesn't exist
    userProfile = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email,
      role: user.user_metadata?.role || 'student',
      isActive: true,
      emailVerified: true,
      createdAt: user.created_at || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    await kv.set(`user:${user.id}`, userProfile);
  }

  c.set('userId', user.id);
  c.set('userEmail', user.email);
  c.set('userRole', userProfile.role);
  await next();
}

// Health check endpoint
app.get("/make-server-7a5ab98d/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= AUTH ROUTES =============

// User signup (create user with role)
app.post("/make-server-7a5ab98d/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role = 'student' } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Validate role
    const validRoles = ['super_admin', 'admin', 'consultant', 'instructor', 'student', 'member'];
    if (!validRoles.includes(role)) {
      return c.json({ error: 'Invalid role specified' }, 400);
    }

    // Create user with auto-confirmed email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        role,
        isActive: true,
        emailVerified: true,
        createdAt: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: `Failed to create user: ${error.message}` }, 400);
    }

    // Store user profile in KV store
    const userProfile = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name,
      role: role,
      isActive: true,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };

    await kv.set(`user:${data.user.id}`, userProfile);

    return c.json({ 
      message: 'User created successfully',
      user: userProfile
    });
  } catch (error) {
    console.log('Error in signup route:', error);
    return c.json({ error: `Server error during signup: ${error}` }, 500);
  }
});

// Get user profile
app.get("/make-server-7a5ab98d/auth/profile/:userId", requireAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const currentUserId = c.get('userId');
    
    // Users can only access their own profile unless they're admin
    if (userId !== currentUserId) {
      const currentUser = await kv.get(`user:${currentUserId}`);
      if (!currentUser || !['super_admin', 'admin'].includes(currentUser.role)) {
        return c.json({ error: 'Unauthorized: Cannot access other user profiles' }, 403);
      }
    }

    const userProfile = await kv.get(`user:${userId}`);
    
    if (!userProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ user: userProfile });
  } catch (error) {
    console.log('Error fetching user profile:', error);
    return c.json({ error: `Failed to fetch user profile: ${error}` }, 500);
  }
});

// Update user profile
app.put("/make-server-7a5ab98d/auth/profile/:userId", requireAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const currentUserId = c.get('userId');
    const body = await c.req.json();
    
    // Users can only update their own profile unless they're admin
    if (userId !== currentUserId) {
      const currentUser = await kv.get(`user:${currentUserId}`);
      if (!currentUser || !['super_admin', 'admin'].includes(currentUser.role)) {
        return c.json({ error: 'Unauthorized: Cannot update other user profiles' }, 403);
      }
    }

    const existingProfile = await kv.get(`user:${userId}`);
    if (!existingProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    // Prevent non-admins from changing critical fields
    const protectedFields = ['id', 'email', 'role', 'isActive', 'emailVerified', 'createdAt'];
    const isAdmin = ['super_admin', 'admin'].includes(c.get('userRole'));
    
    if (!isAdmin) {
      protectedFields.forEach(field => {
        if (body[field] !== undefined) {
          delete body[field];
        }
      });
    }

    const updatedProfile = {
      ...existingProfile,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, updatedProfile);

    return c.json({ 
      message: 'Profile updated successfully',
      user: updatedProfile 
    });
  } catch (error) {
    console.log('Error updating user profile:', error);
    return c.json({ error: `Failed to update user profile: ${error}` }, 500);
  }
});

// Get all users (admin only)
app.get("/make-server-7a5ab98d/auth/users", requireAuth, async (c) => {
  try {
    const currentUserId = c.get('userId');
    const currentUser = await kv.get(`user:${currentUserId}`);
    
    if (!currentUser || !['super_admin', 'admin'].includes(currentUser.role)) {
      return c.json({ error: 'Unauthorized: Admin access required' }, 403);
    }

    const users = await kv.getByPrefix('user:');
    const userList = users.map(u => u.value);
    
    // Sort by creation date
    userList.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ users: userList });
  } catch (error) {
    console.log('Error fetching users:', error);
    return c.json({ error: `Failed to fetch users: ${error}` }, 500);
  }
});

// ============= BLOG ROUTES =============

// Get all blogs
app.get("/make-server-7a5ab98d/blogs", async (c) => {
  try {
    const blogs = await kv.getByPrefix('blog:');
    const published = c.req.query('published');
    
    let blogList = blogs.map(b => b.value);
    
    // Filter published if requested
    if (published === 'true') {
      blogList = blogList.filter((blog: any) => blog.published === true);
    }
    
    // Sort by date descending
    blogList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return c.json({ blogs: blogList });
  } catch (error) {
    console.log('Error fetching blogs:', error);
    return c.json({ error: `Failed to fetch blogs: ${error}` }, 500);
  }
});

// Get single blog
app.get("/make-server-7a5ab98d/blogs/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const blog = await kv.get(`blog:${id}`);
    
    if (!blog) {
      return c.json({ error: 'Blog not found' }, 404);
    }
    
    return c.json({ blog });
  } catch (error) {
    console.log('Error fetching blog:', error);
    return c.json({ error: `Failed to fetch blog: ${error}` }, 500);
  }
});

// Create blog (protected)
app.post("/make-server-7a5ab98d/blogs", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const { title, excerpt, content, category, readTime, author, imageUrl, published } = body;
    
    if (!title || !excerpt || !content) {
      return c.json({ error: 'Title, excerpt, and content are required' }, 400);
    }
    
    const id = crypto.randomUUID();
    const blog = {
      id,
      title,
      excerpt,
      content,
      category: category || 'Uncategorized',
      readTime: readTime || '5 min',
      date: new Date().toISOString().split('T')[0],
      author: author || c.get('userEmail'),
      imageUrl: imageUrl || '',
      published: published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`blog:${id}`, blog);
    
    return c.json({ blog, message: 'Blog created successfully' }, 201);
  } catch (error) {
    console.log('Error creating blog:', error);
    return c.json({ error: `Failed to create blog: ${error}` }, 500);
  }
});

// Update blog (protected)
app.put("/make-server-7a5ab98d/blogs/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingBlog = await kv.get(`blog:${id}`);
    if (!existingBlog) {
      return c.json({ error: 'Blog not found' }, 404);
    }
    
    const updatedBlog = {
      ...existingBlog,
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`blog:${id}`, updatedBlog);
    
    return c.json({ blog: updatedBlog, message: 'Blog updated successfully' });
  } catch (error) {
    console.log('Error updating blog:', error);
    return c.json({ error: `Failed to update blog: ${error}` }, 500);
  }
});

// Delete blog (protected)
app.delete("/make-server-7a5ab98d/blogs/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingBlog = await kv.get(`blog:${id}`);
    if (!existingBlog) {
      return c.json({ error: 'Blog not found' }, 404);
    }
    
    await kv.del(`blog:${id}`);
    
    return c.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log('Error deleting blog:', error);
    return c.json({ error: `Failed to delete blog: ${error}` }, 500);
  }
});

// ============= PRODUCT ROUTES =============

// Get all products
app.get("/make-server-7a5ab98d/products", async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    const productList = products.map(p => p.value);
    
    // Sort by students descending (popularity)
    productList.sort((a: any, b: any) => (b.students || 0) - (a.students || 0));
    
    return c.json({ products: productList });
  } catch (error) {
    console.log('Error fetching products:', error);
    return c.json({ error: `Failed to fetch products: ${error}` }, 500);
  }
});

// Get single product
app.get("/make-server-7a5ab98d/products/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const product = await kv.get(`product:${id}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    return c.json({ product });
  } catch (error) {
    console.log('Error fetching product:', error);
    return c.json({ error: `Failed to fetch product: ${error}` }, 500);
  }
});

// Create product (protected)
app.post("/make-server-7a5ab98d/products", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, price, category, level, badge, features, includes, imageUrl } = body;
    
    if (!title || !description || !price) {
      return c.json({ error: 'Title, description, and price are required' }, 400);
    }
    
    const id = crypto.randomUUID();
    const product = {
      id,
      title,
      description,
      price: parseFloat(price),
      rating: 5.0,
      students: 0,
      category: category || 'General',
      level: level || 'All Levels',
      badge: badge || '',
      features: features || [],
      includes: includes || [],
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, product);
    
    return c.json({ product, message: 'Product created successfully' }, 201);
  } catch (error) {
    console.log('Error creating product:', error);
    return c.json({ error: `Failed to create product: ${error}` }, 500);
  }
});

// Update product (protected)
app.put("/make-server-7a5ab98d/products/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...body,
      id, // Ensure ID doesn't change
      price: body.price ? parseFloat(body.price) : existingProduct.price,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, updatedProduct);
    
    return c.json({ product: updatedProduct, message: 'Product updated successfully' });
  } catch (error) {
    console.log('Error updating product:', error);
    return c.json({ error: `Failed to update product: ${error}` }, 500);
  }
});

// Delete product (protected)
app.delete("/make-server-7a5ab98d/products/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    await kv.del(`product:${id}`);
    
    return c.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error deleting product:', error);
    return c.json({ error: `Failed to delete product: ${error}` }, 500);
  }
});

// ============= SERVICE ROUTES =============

// Get all services
app.get("/make-server-7a5ab98d/services", async (c) => {
  try {
    const services = await kv.getByPrefix('service:');
    const serviceList = services.map(s => s.value);
    
    // Sort by order field or createdAt
    serviceList.sort((a: any, b: any) => (a.order || 999) - (b.order || 999));
    
    return c.json({ services: serviceList });
  } catch (error) {
    console.log('Error fetching services:', error);
    return c.json({ error: `Failed to fetch services: ${error}` }, 500);
  }
});

// Get single service
app.get("/make-server-7a5ab98d/services/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const service = await kv.get(`service:${id}`);
    
    if (!service) {
      return c.json({ error: 'Service not found' }, 404);
    }
    
    return c.json({ service });
  } catch (error) {
    console.log('Error fetching service:', error);
    return c.json({ error: `Failed to fetch service: ${error}` }, 500);
  }
});

// Create service (protected)
app.post("/make-server-7a5ab98d/services", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const { title, subtitle, description, deliverables, duration, price, icon, color, order } = body;
    
    if (!title || !description || !price) {
      return c.json({ error: 'Title, description, and price are required' }, 400);
    }
    
    const id = crypto.randomUUID();
    const service = {
      id,
      title,
      subtitle: subtitle || '',
      description,
      deliverables: deliverables || [],
      duration: duration || 'TBD',
      price,
      icon: icon || 'Search',
      color: color || 'var(--accent)',
      order: order || 999,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`service:${id}`, service);
    
    return c.json({ service, message: 'Service created successfully' }, 201);
  } catch (error) {
    console.log('Error creating service:', error);
    return c.json({ error: `Failed to create service: ${error}` }, 500);
  }
});

// Update service (protected)
app.put("/make-server-7a5ab98d/services/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingService = await kv.get(`service:${id}`);
    if (!existingService) {
      return c.json({ error: 'Service not found' }, 404);
    }
    
    const updatedService = {
      ...existingService,
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`service:${id}`, updatedService);
    
    return c.json({ service: updatedService, message: 'Service updated successfully' });
  } catch (error) {
    console.log('Error updating service:', error);
    return c.json({ error: `Failed to update service: ${error}` }, 500);
  }
});

// Delete service (protected)
app.delete("/make-server-7a5ab98d/services/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingService = await kv.get(`service:${id}`);
    if (!existingService) {
      return c.json({ error: 'Service not found' }, 404);
    }
    
    await kv.del(`service:${id}`);
    
    return c.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.log('Error deleting service:', error);
    return c.json({ error: `Failed to delete service: ${error}` }, 500);
  }
});

// ============= SEED DATA ROUTES =============

// Seed demo users
app.post("/make-server-7a5ab98d/seed/users", async (c) => {
  try {
    const demoUsers = [
      {
        email: 'student@ndg.com',
        password: 'student123',
        name: 'Alex Student',
        role: 'student'
      },
      {
        email: 'consultant@ndg.com',
        password: 'consultant123',
        name: 'Dr. Sarah Wilson',
        role: 'consultant'
      },
      {
        email: 'instructor@ndg.com',
        password: 'instructor123',
        name: 'Prof. Mike Chen',
        role: 'instructor'
      },
      {
        email: 'member@ndg.com',
        password: 'member123',
        name: 'Jamie Member',
        role: 'member'
      }
    ];

    const createdUsers = [];

    for (const userData of demoUsers) {
      try {
        // Create user with auto-confirmed email
        const { data, error } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          user_metadata: { 
            name: userData.name,
            role: userData.role,
            isActive: true,
            emailVerified: true,
            createdAt: new Date().toISOString()
          },
          email_confirm: true
        });

        if (error) {
          console.log(`Error creating user ${userData.email}:`, error);
          continue;
        }

        // Store user profile in KV store
        const userProfile = {
          id: data.user.id,
          email: data.user.email,
          name: userData.name,
          role: userData.role,
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: null
        };

        await kv.set(`user:${data.user.id}`, userProfile);
        createdUsers.push({ email: userData.email, name: userData.name, role: userData.role });
      } catch (userError) {
        console.log(`Failed to create user ${userData.email}:`, userError);
      }
    }

    return c.json({ 
      message: 'Demo users seeded successfully',
      users: createdUsers
    });
  } catch (error) {
    console.log('Error seeding users:', error);
    return c.json({ error: `Failed to seed users: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);