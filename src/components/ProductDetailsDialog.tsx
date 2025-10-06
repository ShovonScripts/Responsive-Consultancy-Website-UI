import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Star, Users, BookOpen, CheckCircle2, Award, Clock, Download, Shield } from 'lucide-react';
import { Product, useCart } from '../lib/cart-context';

interface ProductDetailsDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDialog({ product, open, onOpenChange }: ProductDetailsDialogProps) {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const features = product.features || [
    'Lifetime access to all content',
    'Regular updates and improvements',
    'Access to community forum',
    'Download resources for offline use',
    '30-day money-back guarantee',
    'Certificate of completion',
  ];

  const includes = product.includes || [
    `${Math.floor(Math.random() * 10 + 5)} hours of video content`,
    `${Math.floor(Math.random() * 50 + 20)} downloadable resources`,
    `${Math.floor(Math.random() * 15 + 5)} practical assignments`,
    'Email support from instructors',
    'Access on mobile and desktop',
  ];

  const requirements = product.requirements || [
    'No prior experience required',
    'Computer or mobile device with internet',
    'Willingness to learn and implement',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }} className="text-2xl">
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image/Preview */}
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 flex items-center justify-center relative overflow-hidden">
            {product.badge && (
              <Badge className="absolute top-4 right-4 bg-[var(--gold)] text-white border-none">
                {product.badge}
              </Badge>
            )}
            <div className="text-9xl opacity-20">📦</div>
          </div>

          {/* Title and Price */}
          <div className="space-y-2">
            <h2 className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {product.title}
            </h2>
            <p className="text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({Math.floor(product.students / 10)} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">{product.students.toLocaleString()} students</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant="outline">{product.level}</Badge>
            </div>
          </div>

          <Separator />

          {/* What's Included */}
          <div className="space-y-3">
            <h3 className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              What's Included
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Key Features
            </h3>
            <div className="grid gap-3">
              {features.map((feature, idx) => {
                const icons = [Award, Clock, Download, Shield, BookOpen, CheckCircle2];
                const Icon = icons[idx % icons.length];
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div className="space-y-3">
            <h3 className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Requirements
            </h3>
            <ul className="space-y-2">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-[var(--accent)]">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Price and CTA */}
          <div className="sticky bottom-0 bg-background pt-4 pb-2 -mx-6 px-6 border-t border-border">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  £{product.price}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  30-day money-back guarantee
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                  size="lg"
                >
                  {isInCart ? 'Already in Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
