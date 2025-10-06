import { ShoppingCart, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useCart } from '../lib/cart-context';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

interface CartMiniWidgetProps {
  onNavigate?: (page: string) => void;
}

export function CartMiniWidget({ onNavigate }: CartMiniWidgetProps) {
  const { cart, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-border">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent)] text-white text-xs rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <Button
                onClick={() => onNavigate?.('products')}
                variant="outline"
                className="mt-4"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.map((item) => (
                  <Card key={item.id} className="p-4 border-border">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 flex items-center justify-center shrink-0">
                        {item.badge && (
                          <Badge className="absolute -top-1 -right-1 bg-[var(--gold)] text-white border-none text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        <div className="text-2xl opacity-30">📦</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="shrink-0 h-6 w-6"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Total:</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                    £{cartTotal.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => onNavigate?.('cart')}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                >
                  View Cart & Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
