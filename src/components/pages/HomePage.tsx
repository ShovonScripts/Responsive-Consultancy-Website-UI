import { ArrowRight, CheckCircle2, Star, TrendingUp, Target, Zap, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { WeatherWidget } from '../WeatherWidget';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {

  const valueProps = [
    {
      icon: Target,
      title: 'Positioning',
      description: 'Stand out in your niche with a clear, magnetic positioning that attracts ideal clients.',
      color: 'var(--accent)',
    },
    {
      icon: Zap,
      title: 'Leverage',
      description: 'Build systems that work for you—automated funnels, content engines, and scalable offers.',
      color: 'var(--accent2)',
    },
    {
      icon: TrendingUp,
      title: 'Reach',
      description: 'Grow your audience with proven strategies for YouTube, social media, and organic traffic.',
      color: 'var(--gold)',
    },
    {
      icon: CheckCircle2,
      title: 'Automation',
      description: 'Free up your time with plug-and-play templates, workflows, and AI-assisted systems.',
      color: 'var(--accent)',
    },
  ];

  const stats = [
    { label: 'Learners Worldwide', value: '10,000+', icon: Users },
    { label: 'Average Rating', value: '4.8★', icon: Star },
    { label: 'Case Studies', value: '100+', icon: TrendingUp },
  ];

  const featuredProducts = [
    {
      title: 'The Income System Blueprint',
      price: '£97',
      rating: 4.9,
      badge: 'Best Seller',
      image: 'blueprint',
    },
    {
      title: 'YouTube Growth Accelerator',
      price: '£147',
      rating: 4.8,
      badge: 'New',
      image: 'youtube',
    },
    {
      title: 'Funnel Template Library',
      price: '£67',
      rating: 4.7,
      badge: null,
      image: 'funnel',
    },
  ];

  const testimonials = [
    {
      name: 'Arif Rahman',
      role: 'Freelance Designer',
      content: 'NDG helped me go from £2K/month to £10K/month in just 4 months. The systems work!',
      avatar: 'AR',
      location: 'Dhaka, Bangladesh',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Content Creator',
      content: 'The YouTube strategy course doubled my subscribers and tripled my revenue. Best investment ever.',
      avatar: 'SM',
      location: 'London, UK',
    },
    {
      name: 'Kamal Hossain',
      role: 'E-commerce Owner',
      content: 'Their consultancy pinpointed exactly what was holding me back. Revenue up 3x in 6 months.',
      avatar: 'KH',
      location: 'Chittagong, Bangladesh',
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726056652752-58303aafa0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZ3Jvd3RoJTIwb25saW5lJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU5NzYxMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Digital Growth Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20">
                  Digital Income Systems That Work
                </Badge>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl tracking-tight"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Build Digital Income the Smart Way
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Consultancy + classes + ready-to-use systems. From first £10K to repeatable growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('booking')}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-base px-8"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('products')}
                  className="text-base px-8 border-border"
                >
                  Explore Products
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
                  <span>10K+ Happy Students</span>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="lg:justify-self-end w-full max-w-md">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Four Pillars of Digital Growth
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our proven framework for building sustainable digital income
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-border"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${prop.color}15` }}
              >
                <prop.icon className="w-6 h-6" style={{ color: prop.color }} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {prop.title}
              </h3>
              <p className="text-sm text-muted-foreground">{prop.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* KPI Stats */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Featured Digital Products
            </h2>
            <p className="text-muted-foreground">
              Ready-to-use systems, templates, and courses
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onNavigate('products')}
            className="hidden sm:inline-flex"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, idx) => (
            <Card
              key={idx}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-border"
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
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">• 500+ students</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.price}
                  </div>
                  <Button
                    onClick={() => onNavigate('products')}
                    className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Success Stories
            </h2>
            <p className="text-muted-foreground">
              Real results from real people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <span className="text-[var(--accent)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif' }}>{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="text-xs text-muted-foreground">📍 {testimonial.location}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Start with a Free 15-min Call
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            No pressure, no sales pitch. Just a friendly chat about your goals and how we can help you get there.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('booking')}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8"
          >
            Book Your Free Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>
    </div>
  );
}