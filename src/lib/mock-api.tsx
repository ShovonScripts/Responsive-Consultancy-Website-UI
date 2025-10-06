/**
 * Mock API Service
 * Simulates Laravel REST API endpoints with localStorage persistence
 * All admin routes require authentication
 */

// Helper to get auth token
function getAuthToken(): string | null {
  const session = localStorage.getItem('ndg_session');
  if (session) {
    const { token } = JSON.parse(session);
    return token;
  }
  return null;
}

// Helper to check if user is admin
function isAdminUser(): boolean {
  const session = localStorage.getItem('ndg_session');
  if (session) {
    const { userId } = JSON.parse(session);
    const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    return user && (user.role === 'admin' || user.role === 'super_admin');
  }
  return false;
}

// Initialize mock data
function initializeMockData() {
  if (!localStorage.getItem('ndg_mock_initialized')) {
    // Products
    const products = [
      {
        id: 'prod_1',
        title: 'Digital Marketing Masterclass',
        description: 'Complete course on digital marketing strategies',
        price: 99,
        originalPrice: 149,
        category: 'Course',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        rating: 4.8,
        students: 1250,
        features: ['Video lessons', 'Resources', 'Certificate'],
        status: 'published',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'prod_2',
        title: 'E-commerce Business Toolkit',
        description: 'Templates and tools for starting your online business',
        price: 49,
        originalPrice: 79,
        category: 'Template',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
        rating: 4.6,
        students: 890,
        features: ['Business plan', 'Marketing materials', 'Legal docs'],
        status: 'published',
        createdAt: new Date().toISOString(),
      },
    ];

    // Orders
    const orders = [
      {
        id: 'order_1',
        userId: 'user_123',
        productId: 'prod_1',
        amount: 99,
        status: 'completed',
        paymentMethod: 'card',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'order_2',
        userId: 'user_456',
        productId: 'prod_2',
        amount: 49,
        status: 'pending',
        paymentMethod: 'bkash',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Bookings
    const bookings = [
      {
        id: 'booking_1',
        userId: 'user_123',
        serviceId: 'service_1',
        serviceName: 'Business Strategy Consultation',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM',
        status: 'confirmed',
        notes: 'First time consultation',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'booking_2',
        userId: 'user_789',
        serviceId: 'service_2',
        serviceName: 'Digital Marketing Audit',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '2:00 PM',
        status: 'pending',
        notes: 'Need help with social media',
        createdAt: new Date().toISOString(),
      },
    ];

    // Blog posts
    const blogs = [
      {
        id: 'blog_1',
        title: 'Getting Started with Digital Marketing',
        content: 'Learn the fundamentals of digital marketing...',
        excerpt: 'A comprehensive guide to starting your digital marketing journey.',
        author: 'NDG Team',
        authorId: 'admin-001',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'published',
        tags: ['marketing', 'beginners'],
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        views: 1250,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'blog_2',
        title: 'Building Your First E-commerce Store',
        content: 'Step-by-step guide to creating an online store...',
        excerpt: 'Everything you need to know about setting up your e-commerce business.',
        author: 'NDG Team',
        authorId: 'admin-001',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'published',
        tags: ['ecommerce', 'business'],
        featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
        views: 890,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Classes/Subscriptions
    const classes = [
      {
        id: 'class_1',
        title: 'Digital Growth Accelerator',
        description: 'Monthly subscription for ongoing growth coaching',
        tier: 'premium',
        price: 199,
        duration: '1 month',
        features: ['Weekly coaching', 'Resource library', 'Community access'],
        maxStudents: 50,
        currentStudents: 32,
        status: 'active',
        nextSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];

    // Analytics data
    const analytics = {
      mrr: 15680,
      activeMembers: 234,
      totalBookings: 45,
      pendingOrders: 12,
      totalRevenue: 45230,
      conversionRate: 3.2,
      ltv: 450,
      cac: 85,
      churnRate: 2.1,
      trafficSources: [
        { source: 'Organic', visits: 1250, percentage: 45 },
        { source: 'Direct', visits: 890, percentage: 32 },
        { source: 'Social', visits: 445, percentage: 16 },
        { source: 'Referral', visits: 195, percentage: 7 },
      ],
      revenueByMonth: [
        { month: 'Jan', revenue: 35000 },
        { month: 'Feb', revenue: 38000 },
        { month: 'Mar', revenue: 42000 },
        { month: 'Apr', revenue: 45230 },
      ],
    };

    localStorage.setItem('ndg_products', JSON.stringify(products));
    localStorage.setItem('ndg_orders', JSON.stringify(orders));
    localStorage.setItem('ndg_bookings', JSON.stringify(bookings));
    localStorage.setItem('ndg_blogs', JSON.stringify(blogs));
    localStorage.setItem('ndg_classes', JSON.stringify(classes));
    localStorage.setItem('ndg_analytics', JSON.stringify(analytics));
    localStorage.setItem('ndg_mock_initialized', 'true');

    console.log('✅ Mock data initialized');
  }
}

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============= ADMIN API =============

export const adminAPI = {
  // Dashboard
  getDashboard: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const analytics = JSON.parse(localStorage.getItem('ndg_analytics') || '{}');
    const orders = JSON.parse(localStorage.getItem('ndg_orders') || '[]');
    const bookings = JSON.parse(localStorage.getItem('ndg_bookings') || '[]');

    return {
      ...analytics,
      recentOrders: orders.slice(0, 5),
      upcomingBookings: bookings.filter((b: any) => new Date(b.date) > new Date()).slice(0, 5),
      recentActivity: [
        { type: 'order', message: 'New order received', time: '2 hours ago' },
        { type: 'user', message: 'New user registered', time: '3 hours ago' },
        { type: 'booking', message: 'Booking confirmed', time: '5 hours ago' },
      ],
    };
  },

  // Users
  getUsers: async (filters?: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
    return { users };
  },

  getUserById: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
    const user = users.find((u: any) => u.id === id);
    if (!user) throw new Error('User not found');
    return { user };
  },

  updateUser: async (id: string, updates: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
    const updatedUsers = users.map((u: any) =>
      u.id === id ? { ...u, ...updates } : u
    );
    localStorage.setItem('ndg_users', JSON.stringify(updatedUsers));
    return { message: 'User updated successfully' };
  },

  deleteUser: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
    const filteredUsers = users.filter((u: any) => u.id !== id);
    localStorage.setItem('ndg_users', JSON.stringify(filteredUsers));
    return { message: 'User deleted successfully' };
  },

  // Products
  getProducts: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const products = JSON.parse(localStorage.getItem('ndg_products') || '[]');
    return { products };
  },

  createProduct: async (product: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const products = JSON.parse(localStorage.getItem('ndg_products') || '[]');
    const newProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    localStorage.setItem('ndg_products', JSON.stringify(products));
    return { product: newProduct };
  },

  updateProduct: async (id: string, updates: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const products = JSON.parse(localStorage.getItem('ndg_products') || '[]');
    const updatedProducts = products.map((p: any) =>
      p.id === id ? { ...p, ...updates } : p
    );
    localStorage.setItem('ndg_products', JSON.stringify(updatedProducts));
    return { message: 'Product updated successfully' };
  },

  deleteProduct: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const products = JSON.parse(localStorage.getItem('ndg_products') || '[]');
    const filteredProducts = products.filter((p: any) => p.id !== id);
    localStorage.setItem('ndg_products', JSON.stringify(filteredProducts));
    return { message: 'Product deleted successfully' };
  },

  // Orders
  getOrders: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const orders = JSON.parse(localStorage.getItem('ndg_orders') || '[]');
    return { orders };
  },

  updateOrderStatus: async (id: string, status: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const orders = JSON.parse(localStorage.getItem('ndg_orders') || '[]');
    const updatedOrders = orders.map((o: any) =>
      o.id === id ? { ...o, status } : o
    );
    localStorage.setItem('ndg_orders', JSON.stringify(updatedOrders));
    return { message: 'Order status updated' };
  },

  // Bookings
  getBookings: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const bookings = JSON.parse(localStorage.getItem('ndg_bookings') || '[]');
    return { bookings };
  },

  confirmBooking: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const bookings = JSON.parse(localStorage.getItem('ndg_bookings') || '[]');
    const updatedBookings = bookings.map((b: any) =>
      b.id === id ? { ...b, status: 'confirmed' } : b
    );
    localStorage.setItem('ndg_bookings', JSON.stringify(updatedBookings));
    return { message: 'Booking confirmed' };
  },

  cancelBooking: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const bookings = JSON.parse(localStorage.getItem('ndg_bookings') || '[]');
    const updatedBookings = bookings.map((b: any) =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('ndg_bookings', JSON.stringify(updatedBookings));
    return { message: 'Booking cancelled' };
  },

  // Blogs
  getBlogs: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const blogs = JSON.parse(localStorage.getItem('ndg_blogs') || '[]');
    return { blogs };
  },

  createBlog: async (blog: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const blogs = JSON.parse(localStorage.getItem('ndg_blogs') || '[]');
    const newBlog = {
      ...blog,
      id: `blog_${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0,
    };
    blogs.push(newBlog);
    localStorage.setItem('ndg_blogs', JSON.stringify(blogs));
    return { blog: newBlog };
  },

  updateBlog: async (id: string, updates: any) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const blogs = JSON.parse(localStorage.getItem('ndg_blogs') || '[]');
    const updatedBlogs = blogs.map((b: any) =>
      b.id === id ? { ...b, ...updates } : b
    );
    localStorage.setItem('ndg_blogs', JSON.stringify(updatedBlogs));
    return { message: 'Blog updated successfully' };
  },

  deleteBlog: async (id: string) => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    const blogs = JSON.parse(localStorage.getItem('ndg_blogs') || '[]');
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    localStorage.setItem('ndg_blogs', JSON.stringify(filteredBlogs));
    return { message: 'Blog deleted successfully' };
  },

  // Classes
  getClasses: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const classes = JSON.parse(localStorage.getItem('ndg_classes') || '[]');
    return { classes };
  },

  // Analytics
  getAnalytics: async () => {
    await delay();
    if (!isAdminUser()) throw new Error('Unauthorized');
    
    initializeMockData();
    const analytics = JSON.parse(localStorage.getItem('ndg_analytics') || '{}');
    return analytics;
  },
};
