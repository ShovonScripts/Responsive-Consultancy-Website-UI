import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { adminAPI } from '../../../lib/mock-api';
import { Search, Plus, Edit, Trash2, Loader2, DollarSign, Package } from 'lucide-react';
import { Badge } from '../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export function AdminProductsView() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: 'ebook',
    image: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { products: productData } = await adminAPI.getProducts();
      setProducts(productData);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: 'ebook',
      image: '',
    });
    setFormErrors({});
    setIsProductModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct = {
        id: `product_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        rating: 4.5,
        reviews: 0,
        sales: 0,
      };

      setProducts([newProduct, ...products]);
      toast.success('Product created successfully');
      setIsProductModalOpen(false);
    } catch (error) {
      toast.error('Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminAPI.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Products
          </h1>
          <p className="text-muted-foreground">Manage your digital products and courses</p>
        </div>
        <Button 
          onClick={handleAddProduct}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[var(--accent)]/10">
              <Package className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <h3 className="text-2xl">{products.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[var(--accent2)]/10">
              <DollarSign className="w-6 h-6 text-[var(--accent2)]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl">
                ${products.reduce((sum, p) => sum + (p.price * (p.sales || 0)), 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[var(--gold)]/10">
              <Package className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <h3 className="text-2xl">
                {products.reduce((sum, p) => sum + (p.sales || 0), 0)}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="border-border">
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No products found matching your search' : 'No products yet. Create your first product!'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted-bg relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-[var(--accent)] text-white">
                  {product.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg mb-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl text-[var(--accent)]">
                    ${product.price}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {product.sales || 0} sales
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
            <DialogDescription>
              Add a new digital product to your store. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product-title">Product Title *</Label>
              <Input
                id="product-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Complete SEO Masterclass"
                className={formErrors.title ? 'border-destructive' : ''}
              />
              {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-description">Description *</Label>
              <Textarea
                id="product-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={4}
                className={formErrors.description ? 'border-destructive' : ''}
              />
              {formErrors.description && <p className="text-sm text-destructive">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-price">Price (USD) *</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="49.99"
                  className={formErrors.price ? 'border-destructive' : ''}
                />
                {formErrors.price && <p className="text-sm text-destructive">{formErrors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebook">E-Book</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-image">Image URL (Optional)</Label>
              <Input
                id="product-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground">Leave empty to use default image</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Product'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
