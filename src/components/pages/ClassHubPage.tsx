import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CheckCircle2, Star, Users, Video, FileText, Award, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ClassHubPageProps {
  onNavigate: (page: string) => void;
}

export function ClassHubPage({ onNavigate }: ClassHubPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const tiers = [
    {
      name: 'Starter',
      price: { monthly: 97, quarterly: 277, annual: 970 },
      description: 'Perfect for beginners starting their digital income journey',
      features: [
        'Access to core courses (20+ hours)',
        'Monthly group Q&A sessions',
        'Private community access',
        'Templates & resource library',
        'Email support (48h response)',
      ],
      popular: false,
      color: 'var(--accent2)',
    },
    {
      name: 'Pro',
      price: { monthly: 197, quarterly: 537, annual: 1970 },
      description: 'For serious builders ready to scale',
      features: [
        'Everything in Starter, plus:',
        'Weekly live coaching calls',
        'Advanced courses & masterclasses',
        'Direct message access to coaches',
        '1-on-1 quarterly review session',
        'Early access to new content',
        'Premium templates & scripts',
      ],
      popular: true,
      color: 'var(--accent)',
    },
    {
      name: 'Elite',
      price: { monthly: 497, quarterly: 1397, annual: 4970 },
      description: 'White-glove support for rapid growth',
      features: [
        'Everything in Pro, plus:',
        'Private Slack channel with founders',
        'Monthly 1-on-1 strategy calls',
        'Done-for-you funnel & content reviews',
        'VIP networking events',
        'Guaranteed response within 4 hours',
        'Certification track',
        'Lifetime access to all courses',
      ],
      popular: false,
      color: 'var(--gold)',
    },
  ];

  const calculateSavings = (tier: typeof tiers[0]) => {
    const monthly = tier.price.monthly * (billingCycle === 'quarterly' ? 3 : 12);
    const current = tier.price[billingCycle];
    return Math.round(((monthly - current) / monthly) * 100);
  };

  const featureMatrix = [
    { name: 'Course Library Access', starter: true, pro: true, elite: true },
    { name: 'Community Forum', starter: true, pro: true, elite: true },
    { name: 'Monthly Group Q&A', starter: true, pro: true, elite: true },
    { name: 'Weekly Live Coaching', starter: false, pro: true, elite: true },
    { name: '1-on-1 Quarterly Review', starter: false, pro: true, elite: true },
    { name: 'Monthly 1-on-1 Strategy', starter: false, pro: false, elite: true },
    { name: 'Direct Slack Access', starter: false, pro: false, elite: true },
    { name: 'Done-For-You Reviews', starter: false, pro: false, elite: true },
    { name: 'Certification Track', starter: false, pro: false, elite: true },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent2)]/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
                Class / Hub Membership
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Learn, Build, and Grow with Our Community
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Join 10,000+ members building sustainable digital income. Get courses, coaching, templates, and a supportive community—all in one place.
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1588912914078-2fe5224fd8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjb3Vyc2UlMjBlZHVjYXRpb24lMjBsYXB0b3B8ZW58MXx8fHwxNzU5NzYxMzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Online learning and education"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center">
          <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3 bg-muted/30">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">
                Quarterly
                <Badge className="ml-2 bg-[var(--accent)]/10 text-[var(--accent)] text-xs">
                  Save 5%
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="annual">
                Annual
                <Badge className="ml-2 bg-[var(--accent)]/10 text-[var(--accent)] text-xs">
                  Save 17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-8 relative ${
                tier.popular ? 'border-[var(--accent)] shadow-lg scale-105' : 'border-border'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white">
                  Most Popular
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: tier.color }}>
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    £{tier.price[billingCycle]}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'mo' : billingCycle === 'quarterly' ? 'qtr' : 'yr'}
                  </span>
                </div>
                {billingCycle !== 'monthly' && (
                  <p className="text-sm text-[var(--accent)] mt-1">
                    Save {calculateSavings(tier)}% vs monthly
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.color }} />
                    <span className={feature.includes(':') ? 'font-medium' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onNavigate('checkout')}
                className={`w-full ${
                  tier.popular
                    ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                    : 'bg-muted hover:bg-muted/70'
                }`}
              >
                Join Now
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-3xl sm:text-4xl text-center mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Compare Plans
        </h2>
        <Card className="overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">Starter</th>
                  <th className="text-center p-4">Pro</th>
                  <th className="text-center p-4">Elite</th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="border-t border-border">
                    <td className="p-4">{row.name}</td>
                    <td className="text-center p-4">
                      {row.starter ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.pro ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.elite ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Social Proof */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                10,000+
              </div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Star className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                4.9/5.0
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Video className="w-8 h-8 text-[var(--accent2)]" />
              </div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                200+
              </div>
              <div className="text-sm text-muted-foreground">Hours of Content</div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                £2.4M+
              </div>
              <div className="text-sm text-muted-foreground">Members' Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Not Sure Which Plan to Choose?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 15-minute call and we'll help you pick the perfect plan for your goals.
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('booking')}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            Talk to Our Team
          </Button>
        </Card>
      </section>
    </div>
  );
}