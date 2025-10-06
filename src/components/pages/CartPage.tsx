import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { useCart } from '../../lib/cart-context';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Shield,
  CheckCircle2,
  CreditCard,
  Lock,
  Star,
  TrendingUp,
} from 'lucide-react';
import { CheckoutDialog } from '../CheckoutDialog';

interface CartPageProps {
  onNavigate?: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const applyCoupon = () => {
    // Demo coupon codes
    const coupons: Record<string, number> = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'NDG50': 50,
    };

    const discount = coupons[couponCode.toUpperCase()];
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
      setCouponCode('');
    }
  };

  const discountAmount = appliedCoupon ? (cartTotal * appliedCoupon.discount) / 100 : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
              </p>
            </div>
            {cart.length > 0 && (
              <Button
                variant="outline"
                onClick={() => onNavigate?.('products')}
                className="border-border"
              >
                Continue Shopping
              </Button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="space-y-8">
            <Card className="p-12 text-center border-border">
              <ShoppingCart className="w-20 h-20 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products yet
              </p>
              <Button
                onClick={() => onNavigate?.('products')}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
              >
                Browse Products
              </Button>
            </Card>

            {/* Featured Products Suggestion */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Popular Products
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.('products')}
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Income System Blueprint', price: 97, rating: 4.9, badge: 'Best Seller', icon: '🎯' },
                  { title: 'YouTube Growth Accelerator', price: 147, rating: 4.8, badge: 'New', icon: '🚀' },
                  { title: 'Funnel Template Library', price: 67, rating: 4.7, icon: '📊' },
                ].map((product, idx) => (
                  <Card key={idx} className="p-6 border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('products')}>
                    <div className="aspect-video bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 rounded-lg flex items-center justify-center mb-4 relative">
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-[var(--gold)] text-white border-none text-xs">
                          {product.badge}
                        </Badge>
                      )}
                      <div className="text-5xl opacity-20">{product.icon}</div>
                    </div>
                    <h4 className="font-medium mb-2">{product.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <div className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        £{product.price}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Section */}
            <Card className="p-8 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-[var(--accent)]" />
                  <h4 className="font-medium mb-1">30-Day Guarantee</h4>
                  <p className="text-sm text-muted-foreground">Risk-free purchase</p>
                </div>
                <div>
                  <Star className="w-8 h-8 mx-auto mb-2 text-[var(--gold)]" />
                  <h4 className="font-medium mb-1">4.8★ Average Rating</h4>
                  <p className="text-sm text-muted-foreground">From 10,000+ students</p>
                </div>
                <div>
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[var(--accent2)]" />
                  <h4 className="font-medium mb-1">Proven Results</h4>
                  <p className="text-sm text-muted-foreground">100+ case studies</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-6 border-border">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 flex items-center justify-center shrink-0 relative">
                      {item.badge && (
                        <Badge className="absolute -top-2 -right-2 bg-[var(--gold)] text-white border-none text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <div className="text-4xl opacity-30">📦</div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.level}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-border sticky top-24">
                <h3 className="text-xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>£{cartTotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-[var(--accent)]">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-£{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>Total</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                      £{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code */}
                {!appliedCoupon && (
                  <div className="mb-6">
                    <label className="text-sm mb-2 block">Have a coupon code?</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-input-background border-border"
                      />
                      <Button
                        variant="outline"
                        onClick={applyCoupon}
                        className="shrink-0"
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: WELCOME10, SAVE20, NDG50
                    </p>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="mb-6 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[var(--accent)]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Coupon applied: {appliedCoupon.code}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedCoupon(null)}
                        className="h-6 px-2 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white mb-4"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Trust Badges */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[var(--accent)]" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[var(--accent)]" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[var(--accent)]" />
                    <span>Multiple payment methods accepted</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        total={finalTotal}
        discount={discountAmount}
        couponCode={appliedCoupon?.code}
      />
    </div>
  );
}
