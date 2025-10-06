import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Star, ShoppingCart, Search, Filter, CheckCircle2, Eye, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Product, useCart } from '../../lib/cart-context';
import { ProductDetailsDialog } from '../ProductDetailsDialog';

interface ProductsPageProps {
  onNavigate?: (page: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const { cart, addToCart, cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      title: 'The Income System Blueprint',
      description: 'Complete framework for building your first £10K/month digital income stream',
      price: 97,
      rating: 4.9,
      students: 1200,
      category: 'Systems',
      level: 'Beginner',
      badge: 'Best Seller',
      features: [
        'Lifetime access to all content and updates',
        'Step-by-step income generation framework',
        'Proven strategies from 1000+ success stories',
        'Private community forum access',
        'Weekly live Q&A sessions',
        '30-day money-back guarantee',
      ],
      includes: [
        '12 hours of video masterclasses',
        '45+ downloadable templates and worksheets',
        '20 practical implementation assignments',
        'Income tracking spreadsheet',
        'Priority email support',
      ],
    },
    {
      id: '2',
      title: 'YouTube Growth Accelerator',
      description: 'From 0 to 10K subscribers—content strategy, scripting, and SEO',
      price: 147,
      rating: 4.8,
      students: 890,
      category: 'Content',
      level: 'Intermediate',
      badge: 'New',
      features: [
        'Complete YouTube growth roadmap',
        'Viral content ideation system',
        'Thumbnail & title optimization tools',
        'SEO and algorithm mastery',
        'Monetization strategies',
        'Certificate of completion',
      ],
    },
    {
      id: '3',
      title: 'Funnel Template Library',
      description: '50+ high-converting landing pages, email sequences, and checkout flows',
      price: 67,
      rating: 4.7,
      students: 1500,
      category: 'Templates',
      level: 'All Levels',
      features: [
        '50+ professionally designed templates',
        'Copy-paste ready code',
        'Mobile-responsive designs',
        'A/B testing variations included',
        'Regular template additions',
        'Commercial usage rights',
      ],
    },
    {
      id: '4',
      title: 'Email Marketing Mastery',
      description: 'Build an email list that actually converts—sequences, automation, and copywriting',
      price: 87,
      rating: 4.8,
      students: 750,
      category: 'Marketing',
      level: 'Intermediate',
      features: [
        'Email copywriting frameworks',
        'Automated sequence blueprints',
        'List building strategies',
        'Segmentation and personalization',
        'Analytics and optimization',
        'Swipe file with 100+ examples',
      ],
    },
    {
      id: '5',
      title: 'Social Media Content Engine',
      description: '90 days of done-for-you content ideas, templates, and scheduling workflows',
      price: 47,
      rating: 4.6,
      students: 2100,
      category: 'Content',
      level: 'Beginner',
      features: [
        '90-day content calendar',
        'Platform-specific templates',
        'Engagement boost tactics',
        'Hashtag research tools',
        'Scheduling workflow guide',
        'Content repurposing system',
      ],
    },
    {
      id: '6',
      title: 'Client Acquisition System',
      description: 'Repeatable process for landing high-ticket clients (£2K-10K projects)',
      price: 197,
      rating: 4.9,
      students: 450,
      category: 'Systems',
      level: 'Advanced',
      features: [
        'High-ticket client attraction framework',
        'Proposal and pricing templates',
        'Discovery call scripts',
        'Contract and legal templates',
        'CRM setup and management',
        '1-on-1 coaching session included',
      ],
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || product.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
            Digital Products
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready-to-Use Systems & Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plug-and-play products that save you months of trial and error. All backed by our 30-day money-back guarantee.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-border"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-input-background border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Systems">Systems</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="Templates">Templates</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-input-background border-border">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => onNavigate?.('cart')}
            variant="outline"
            className="relative border-border"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent)] text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-border flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10">
                {product.badge && (
                  <Badge className="absolute top-3 right-3 bg-[var(--gold)] text-white border-none z-10">
                    {product.badge}
                  </Badge>
                )}
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691096673789-ae6a7492fd97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTk3NjA4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {product.students.toLocaleString()} students
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      £{product.price}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewProductDetails(product)}
                      className="border-border"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={cart.some(item => item.id === product.id)}
                    className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                  >
                    {cart.some(item => item.id === product.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        In Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products found matching your filters.</p>
          </div>
        )}
      </section>

      {/* Guarantee Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Card className="p-8 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h3 className="text-2xl mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try any product risk-free. If you're not satisfied with the quality or results, we'll refund 100% of your purchase—no questions asked.
          </p>
        </Card>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        product={selectedProduct}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}