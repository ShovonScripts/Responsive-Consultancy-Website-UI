import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import {
  FileText,
  ShoppingBag,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Loader2,
  BarChart3,
} from 'lucide-react';
import { useLocalAuth } from '../../lib/local-auth';
import { blogAPI, productAPI, serviceAPI } from '../../lib/api';
import { toast } from 'sonner';
import { SeedDataButton } from '../SeedDataButton';

export function AdminDashboard() {
  const { user, logout } = useLocalAuth();
  const [activeTab, setActiveTab] = useState('blogs');
  const [isLoading, setIsLoading] = useState(false);

  // Blogs state
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  // Products state
  const [products, setProducts] = useState<any[]>([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Services state
  const [services, setServices] = useState<any[]>([]);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Stats
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalProducts: 0,
    totalServices: 0,
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([loadBlogs(), loadProducts(), loadServices()]);
  };

  const loadBlogs = async () => {
    try {
      const data = await blogAPI.getAll(false); // Get all including unpublished
      setBlogs(data.blogs || []);
      setStats(prev => ({ ...prev, totalBlogs: data.blogs?.length || 0 }));
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data.products || []);
      setStats(prev => ({ ...prev, totalProducts: data.products?.length || 0 }));
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  };

  const loadServices = async () => {
    try {
      const data = await serviceAPI.getAll();
      setServices(data.services || []);
      setStats(prev => ({ ...prev, totalServices: data.services?.length || 0 }));
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Failed to load services');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // ============= BLOG HANDLERS =============

  const handleCreateBlog = () => {
    setEditingBlog({
      title: '',
      excerpt: '',
      content: '',
      category: 'Money',
      readTime: '5 min',
      author: user?.email || 'Admin',
      imageUrl: '',
      published: true,
    });
    setBlogDialogOpen(true);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setBlogDialogOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingBlog.id) {
        await blogAPI.update(editingBlog.id, editingBlog);
        toast.success('Blog updated successfully');
      } else {
        await blogAPI.create(editingBlog);
        toast.success('Blog created successfully');
      }
      
      await loadBlogs();
      setBlogDialogOpen(false);
      setEditingBlog(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setIsLoading(true);
    try {
      await blogAPI.delete(id);
      toast.success('Blog deleted successfully');
      await loadBlogs();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= PRODUCT HANDLERS =============

  const handleCreateProduct = () => {
    setEditingProduct({
      title: '',
      description: '',
      price: 0,
      category: 'Systems',
      level: 'All Levels',
      badge: '',
      features: [],
      includes: [],
      imageUrl: '',
    });
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductDialogOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingProduct.id) {
        await productAPI.update(editingProduct.id, editingProduct);
        toast.success('Product updated successfully');
      } else {
        await productAPI.create(editingProduct);
        toast.success('Product created successfully');
      }
      
      await loadProducts();
      setProductDialogOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setIsLoading(true);
    try {
      await productAPI.delete(id);
      toast.success('Product deleted successfully');
      await loadProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= SERVICE HANDLERS =============

  const handleCreateService = () => {
    setEditingService({
      title: '',
      subtitle: '',
      description: '',
      deliverables: [],
      duration: '',
      price: '',
      icon: 'Search',
      color: 'var(--accent)',
      order: 999,
    });
    setServiceDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setServiceDialogOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingService.id) {
        await serviceAPI.update(editingService.id, editingService);
        toast.success('Service updated successfully');
      } else {
        await serviceAPI.create(editingService);
        toast.success('Service created successfully');
      }
      
      await loadServices();
      setServiceDialogOpen(false);
      setEditingService(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    setIsLoading(true);
    try {
      await serviceAPI.delete(id);
      toast.success('Service deleted successfully');
      await loadServices();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card className="p-8 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your content - {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SeedDataButton />
              <Button variant="outline" onClick={handleLogout} className="border-border">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid sm:grid-cols-3 gap-6">
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[var(--accent)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stats.totalBlogs}
            </div>
            <div className="text-sm text-muted-foreground">Total Blogs</div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent2)]/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[var(--accent2)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stats.totalProducts}
            </div>
            <div className="text-sm text-muted-foreground">Total Products</div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[var(--gold)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stats.totalServices}
            </div>
            <div className="text-sm text-muted-foreground">Total Services</div>
          </Card>
        </div>
      </section>

      {/* Content Management */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/30">
            <TabsTrigger value="blogs">
              <FileText className="w-4 h-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="services">
              <Briefcase className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
          </TabsList>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage Blogs
              </h2>
              <Button onClick={handleCreateBlog} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Blog
              </Button>
            </div>

            <Card className="overflow-hidden border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="max-w-xs truncate">{blog.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{blog.category}</Badge>
                      </TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>{blog.date}</TableCell>
                      <TableCell>
                        <Badge className={blog.published ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'bg-muted'}>
                          {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBlog(blog)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {blogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No blogs yet. Create your first one!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage Products
              </h2>
              <Button onClick={handleCreateProduct} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Product
              </Button>
            </div>

            <Card className="overflow-hidden border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="max-w-xs truncate">{product.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>{product.level}</TableCell>
                      <TableCell>£{product.price}</TableCell>
                      <TableCell>{product.students || 0}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No products yet. Create your first one!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage Services
              </h2>
              <Button onClick={handleCreateService} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Service
              </Button>
            </div>

            <Card className="overflow-hidden border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subtitle</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="max-w-xs truncate">{service.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{service.subtitle}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditService(service)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {services.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No services yet. Create your first one!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Blog Dialog */}
      <BlogFormDialog
        open={blogDialogOpen}
        onOpenChange={setBlogDialogOpen}
        blog={editingBlog}
        setBlog={setEditingBlog}
        onSave={handleSaveBlog}
        isLoading={isLoading}
      />

      {/* Product Dialog */}
      <ProductFormDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={editingProduct}
        setProduct={setEditingProduct}
        onSave={handleSaveProduct}
        isLoading={isLoading}
      />

      {/* Service Dialog */}
      <ServiceFormDialog
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        service={editingService}
        setService={setEditingService}
        onSave={handleSaveService}
        isLoading={isLoading}
      />
    </div>
  );
}

// ============= BLOG FORM DIALOG =============

function BlogFormDialog({ open, onOpenChange, blog, setBlog, onSave, isLoading }: any) {
  if (!blog) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog.id ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {blog.id ? 'update' : 'create'} your blog post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blog-title">Title *</Label>
            <Input
              id="blog-title"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-excerpt">Excerpt *</Label>
            <Textarea
              id="blog-excerpt"
              value={blog.excerpt}
              onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-content">Content *</Label>
            <Textarea
              id="blog-content"
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              rows={8}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="blog-category">Category</Label>
              <Select value={blog.category} onValueChange={(val) => setBlog({ ...blog, category: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Money">Money</SelectItem>
                  <SelectItem value="Skills">Skills</SelectItem>
                  <SelectItem value="Systems">Systems</SelectItem>
                  <SelectItem value="Case Studies">Case Studies</SelectItem>
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-readTime">Read Time</Label>
              <Input
                id="blog-readTime"
                value={blog.readTime}
                onChange={(e) => setBlog({ ...blog, readTime: e.target.value })}
                placeholder="5 min"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-author">Author</Label>
            <Input
              id="blog-author"
              value={blog.author}
              onChange={(e) => setBlog({ ...blog, author: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-imageUrl">Image URL (optional)</Label>
            <Input
              id="blog-imageUrl"
              value={blog.imageUrl}
              onChange={(e) => setBlog({ ...blog, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="blog-published"
              checked={blog.published}
              onCheckedChange={(checked) => setBlog({ ...blog, published: checked })}
            />
            <Label htmlFor="blog-published">Publish immediately</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {blog.id ? 'Update' : 'Create'} Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============= PRODUCT FORM DIALOG =============

function ProductFormDialog({ open, onOpenChange, product, setProduct, onSave, isLoading }: any) {
  if (!product) return null;

  const addFeature = () => {
    setProduct({
      ...product,
      features: [...(product.features || []), ''],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(product.features || [])];
    newFeatures[index] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setProduct({
      ...product,
      features: product.features.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.id ? 'Edit Product' : 'Create New Product'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {product.id ? 'update' : 'create'} your product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-title">Title *</Label>
            <Input
              id="product-title"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description *</Label>
            <Textarea
              id="product-description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-price">Price (£) *</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-category">Category</Label>
              <Select value={product.category} onValueChange={(val) => setProduct({ ...product, category: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Systems">Systems</SelectItem>
                  <SelectItem value="Content">Content</SelectItem>
                  <SelectItem value="Templates">Templates</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-level">Level</Label>
              <Select value={product.level} onValueChange={(val) => setProduct({ ...product, level: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-badge">Badge (optional)</Label>
              <Input
                id="product-badge"
                value={product.badge}
                onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                placeholder="Best Seller, New, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-imageUrl">Image URL (optional)</Label>
            <Input
              id="product-imageUrl"
              value={product.imageUrl}
              onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Features</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {product.features?.map((feature: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Feature description"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {product.id ? 'Update' : 'Create'} Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============= SERVICE FORM DIALOG =============

function ServiceFormDialog({ open, onOpenChange, service, setService, onSave, isLoading }: any) {
  if (!service) return null;

  const addDeliverable = () => {
    setService({
      ...service,
      deliverables: [...(service.deliverables || []), ''],
    });
  };

  const updateDeliverable = (index: number, value: string) => {
    const newDeliverables = [...(service.deliverables || [])];
    newDeliverables[index] = value;
    setService({ ...service, deliverables: newDeliverables });
  };

  const removeDeliverable = (index: number) => {
    setService({
      ...service,
      deliverables: service.deliverables.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service.id ? 'Edit Service' : 'Create New Service'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {service.id ? 'update' : 'create'} your service.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-title">Title *</Label>
            <Input
              id="service-title"
              value={service.title}
              onChange={(e) => setService({ ...service, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-subtitle">Subtitle</Label>
            <Input
              id="service-subtitle"
              value={service.subtitle}
              onChange={(e) => setService({ ...service, subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-description">Description *</Label>
            <Textarea
              id="service-description"
              value={service.description}
              onChange={(e) => setService({ ...service, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-duration">Duration</Label>
              <Input
                id="service-duration"
                value={service.duration}
                onChange={(e) => setService({ ...service, duration: e.target.value })}
                placeholder="1 week, 2-3 weeks, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-price">Price *</Label>
              <Input
                id="service-price"
                value={service.price}
                onChange={(e) => setService({ ...service, price: e.target.value })}
                placeholder="£497, £1,497/mo, etc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Deliverables</Label>
              <Button type="button" variant="outline" size="sm" onClick={addDeliverable}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {service.deliverables?.map((deliverable: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={deliverable}
                  onChange={(e) => updateDeliverable(index, e.target.value)}
                  placeholder="Deliverable description"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDeliverable(index)}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {service.id ? 'Update' : 'Create'} Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
