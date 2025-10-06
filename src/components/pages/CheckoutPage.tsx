import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
  planData?: {
    name: string;
    price: number;
    billing: 'monthly' | 'quarterly' | 'annual';
    features: string[];
  };
}

export function CheckoutPage({ onNavigate, planData }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'bkash'>('card');

  // Default plan if none provided
  const plan = planData || {
    name: 'Pro',
    price: 197,
    billing: 'monthly' as const,
    features: [
      'Access to core courses (20+ hours)',
      'Weekly live coaching calls',
      'Private community access',
      'Direct message access to coaches',
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-12 text-center border-border">
          <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[var(--accent)]" />
          </div>
          <h1 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your subscription to <span className="text-foreground font-medium">{plan.name}</span> is now active.
          </p>
          <p className="text-muted-foreground mb-8">
            We've sent a confirmation email to <span className="text-foreground">{formData.email}</span>
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Instant Access</div>
                <div className="text-sm text-muted-foreground">Log in to your dashboard to start learning</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Welcome Email Sent</div>
                <div className="text-sm text-muted-foreground">Check your inbox for onboarding resources</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Community Access</div>
                <div className="text-sm text-muted-foreground">Join our private members community</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('dashboard')}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              Go to Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('home')}
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('class')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Complete Your Purchase
              </h1>
              <p className="text-muted-foreground">
                Join thousands of members building digital income
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="p-6 border-border">
                <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="bg-input-background border-border"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-input-background border-border"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6 border-border">
                <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Payment Method
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedPayment === 'card'
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-border hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm">Card</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('paypal')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedPayment === 'paypal'
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-border hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">PP</div>
                    <div className="text-sm">PayPal</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('bkash')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedPayment === 'bkash'
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-border hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">bK</div>
                    <div className="text-sm">bKash</div>
                  </button>
                </div>

                {selectedPayment === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-input-background border-border"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-input-background border-border"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="bg-input-background border-border"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment === 'paypal' && (
                  <div className="p-6 bg-muted/30 rounded-lg text-center">
                    <p className="text-muted-foreground mb-4">
                      You'll be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}

                {selectedPayment === 'bkash' && (
                  <div className="p-6 bg-muted/30 rounded-lg text-center">
                    <p className="text-muted-foreground mb-4">
                      You'll be redirected to bKash to complete your payment
                    </p>
                  </div>
                )}
              </Card>

              {/* Billing Address */}
              <Card className="p-6 border-border">
                <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      className="bg-input-background border-border"
                      value={formData.billingAddress}
                      onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="London"
                        className="bg-input-background border-border"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="SW1A 1AA"
                        className="bg-input-background border-border"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="United Kingdom"
                      className="bg-input-background border-border"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
              >
                <Lock className="w-5 h-5 mr-2" />
                Confirm & Pay £{plan.price}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By confirming your purchase, you agree to our Terms of Service and Privacy Policy. 
                Your payment is secure and encrypted.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-border sticky top-6">
              <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{plan.name} Plan</div>
                    <div className="text-sm text-muted-foreground">
                      Billed {plan.billing}
                    </div>
                  </div>
                  <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20">
                    {plan.billing === 'monthly' ? 'Monthly' : plan.billing === 'quarterly' ? 'Quarterly' : 'Annual'}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium mb-2">What's included:</div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>£{plan.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">VAT (20%)</span>
                    <span>£{(plan.price * 0.2).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    £{(plan.price * 1.2).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">30-day money-back guarantee</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Cancel anytime, no questions asked</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Instant access to all content</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
