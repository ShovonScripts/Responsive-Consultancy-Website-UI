import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DemoPaymentInfo } from './DemoPaymentInfo';
import { useCart } from '../lib/cart-context';
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  discount?: number;
  couponCode?: string;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  total,
  discount = 0,
  couponCode,
}: CheckoutDialogProps) {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    country: 'GB',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate payment processing
    setStep('processing');
    
    setTimeout(() => {
      setStep('success');
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 2500);
  };

  const resetDialog = () => {
    setStep('payment');
    setFormData({
      email: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      country: 'GB',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }} className="text-2xl flex items-center gap-2">
                <Lock className="w-6 h-6 text-[var(--accent)]" />
                Secure Checkout
              </DialogTitle>
            </DialogHeader>

            <DemoPaymentInfo />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="rounded-lg bg-muted/30 p-4">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.title} × {item.quantity}
                      </span>
                      <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {discount > 0 && (
                    <div className="flex justify-between text-[var(--accent)]">
                      <span>Discount {couponCode && `(${couponCode})`}</span>
                      <span>-£{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-medium">Contact Information</h3>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-input-background border-border mt-1"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Receipt and product access will be sent here
                  </p>
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-2">
                    <Card className={`p-4 cursor-pointer border-2 transition-colors ${
                      paymentMethod === 'card' ? 'border-[var(--accent)]' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5" />
                          <span>Credit / Debit Card</span>
                          <Badge variant="outline" className="ml-auto text-xs">Recommended</Badge>
                        </Label>
                      </div>
                    </Card>
                    
                    <Card className={`p-4 cursor-pointer border-2 transition-colors ${
                      paymentMethod === 'paypal' ? 'border-[var(--accent)]' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5" />
                          <span>PayPal</span>
                        </Label>
                      </div>
                    </Card>

                    <Card className={`p-4 cursor-pointer border-2 transition-colors ${
                      paymentMethod === 'bank' ? 'border-[var(--accent)]' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Building2 className="w-5 h-5" />
                          <span>Bank Transfer</span>
                        </Label>
                      </div>
                    </Card>
                  </div>
                </RadioGroup>
              </div>

              {/* Card Details (shown for card payment) */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="bg-input-background border-border mt-1"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="bg-input-background border-border mt-1"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="bg-input-background border-border mt-1"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        type="password"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="bg-input-background border-border mt-1"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
                  You will be redirected to PayPal to complete your payment securely.
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 rounded-lg bg-muted/30 text-sm space-y-2">
                  <p>Bank transfer details will be sent to your email.</p>
                  <p className="text-muted-foreground">
                    Access to products will be granted within 24 hours of payment confirmation.
                  </p>
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Pay £{total.toFixed(2)}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-[var(--accent)] animate-spin" />
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Processing Payment
            </h3>
            <p className="text-muted-foreground">
              Please wait while we securely process your payment...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Payment Successful!
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order confirmation and access details have been sent to {formData.email}
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg bg-muted/30 text-sm">
                <p className="font-medium mb-1">Order Number</p>
                <p className="text-muted-foreground">
                  #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-sm">
                <p className="font-medium mb-1">Amount Paid</p>
                <p className="text-muted-foreground">£{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={resetDialog}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                onClick={() => {
                  resetDialog();
                  // Could navigate to dashboard or products
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
