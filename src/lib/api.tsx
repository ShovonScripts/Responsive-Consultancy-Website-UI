import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7a5ab98d`;

// Mock data for fallback when backend is not available
const mockData = {
  blogs: [
    {
      id: '1',
      title: 'Getting Started with Digital Marketing',
      content: 'Learn the fundamentals of digital marketing and how to build a successful online presence...',
      excerpt: 'A comprehensive guide to starting your digital marketing journey.',
      author: 'NDG Team',
      date: '2024-12-01',
      published: true,
      tags: ['marketing', 'beginners'],
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Building Your First E-commerce Store',
      content: 'Step-by-step guide to creating an online store that converts visitors into customers...',
      excerpt: 'Everything you need to know about setting up your e-commerce business.',
      author: 'NDG Team',
      date: '2024-11-28',
      published: true,
      tags: ['ecommerce', 'business'],
      readTime: '8 min'
    }
  ],
  products: [
    {
      id: '1',
      title: 'Digital Marketing Masterclass',
      description: 'Complete course on digital marketing strategies and implementation',
      price: 99,
      originalPrice: 149,
      category: 'Course',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      rating: 4.8,
      students: 1250,
      features: ['Video lessons', 'Downloadable resources', 'Certificate of completion']
    },
    {
      id: '2',
      title: 'E-commerce Business Toolkit',
      description: 'Templates and tools for starting your online business',
      price: 49,
      originalPrice: 79,
      category: 'Template',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      rating: 4.6,
      students: 890,
      features: ['Business plan template', 'Marketing materials', 'Legal documents']
    }
  ],
  services: [
    {
      id: '1',
      title: 'Business Strategy Consultation',
      subtitle: 'Get expert guidance for your business',
      description: 'One-on-one consultation with our business experts to develop your growth strategy',
      price: 150,
      duration: '60 minutes',
      deliverables: ['Strategy document', 'Action plan', 'Follow-up support'],
      icon: 'Target',
      color: 'var(--accent)',
      order: 1
    },
    {
      id: '2',
      title: 'Digital Marketing Audit',
      subtitle: 'Analyze and improve your marketing',
      description: 'Comprehensive review of your digital marketing efforts with actionable recommendations',
      price: 99,
      duration: '45 minutes',
      deliverables: ['Audit report', 'Recommendations', 'Implementation guide'],
      icon: 'BarChart3',
      color: 'var(--accent2)',
      order: 2
    }
  ]
};

// Helper function to make API requests with fallback
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  useAuth: boolean = false
): Promise<any> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if required
    if (useAuth) {
      const token = localStorage.getItem('ndg_admin_token') || localStorage.getItem('ndg_auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        headers['Authorization'] = `Bearer ${publicAnonKey}`;
      }
    } else {
      headers['Authorization'] = `Bearer ${publicAnonKey}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API request failed: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.log(`API call failed for ${endpoint}, using mock data:`, error);
    
    // Return mock data based on endpoint
    if (endpoint.includes('/blogs')) {
      if (endpoint.includes('?published=true')) {
        return { blogs: mockData.blogs.filter(b => b.published) };
      }
      return { blogs: mockData.blogs };
    } else if (endpoint.includes('/products')) {
      return { products: mockData.products };
    } else if (endpoint.includes('/services')) {
      return { services: mockData.services };
    }
    
    // For write operations, return mock success
    if (options.method === 'POST') {
      return { message: 'Created successfully (mock)', id: Date.now().toString() };
    } else if (options.method === 'PUT') {
      return { message: 'Updated successfully (mock)' };
    } else if (options.method === 'DELETE') {
      return { message: 'Deleted successfully (mock)' };
    }
    
    throw error;
  }
}

// ============= AUTH API =============

export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },
};

// ============= BLOG API =============

export const blogAPI = {
  getAll: async (publishedOnly: boolean = true) => {
    const query = publishedOnly ? '?published=true' : '';
    return apiRequest(`/blogs${query}`);
  },

  getById: async (id: string) => {
    return apiRequest(`/blogs/${id}`);
  },

  create: async (blog: any) => {
    return apiRequest('/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    }, true);
  },

  update: async (id: string, blog: any) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    }, true);
  },

  delete: async (id: string) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'DELETE',
    }, true);
  },
};

// ============= PRODUCT API =============

export const productAPI = {
  getAll: async () => {
    return apiRequest('/products');
  },

  getById: async (id: string) => {
    return apiRequest(`/products/${id}`);
  },

  create: async (product: any) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }, true);
  },

  update: async (id: string, product: any) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }, true);
  },

  delete: async (id: string) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }, true);
  },
};

// ============= SERVICE API =============

export const serviceAPI = {
  getAll: async () => {
    return apiRequest('/services');
  },

  getById: async (id: string) => {
    return apiRequest(`/services/${id}`);
  },

  create: async (service: any) => {
    return apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    }, true);
  },

  update: async (id: string, service: any) => {
    return apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    }, true);
  },

  delete: async (id: string) => {
    return apiRequest(`/services/${id}`, {
      method: 'DELETE',
    }, true);
  },
};
