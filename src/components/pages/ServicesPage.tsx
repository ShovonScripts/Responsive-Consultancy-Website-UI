import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { CheckCircle2, Search, Megaphone, BarChart3, Youtube, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Search,
      title: 'Growth Audit',
      subtitle: 'Find what\'s holding you back',
      description: 'Comprehensive analysis of your current digital presence, income streams, and growth opportunities.',
      deliverables: [
        'In-depth positioning analysis',
        'Funnel & conversion audit',
        'Actionable 90-day roadmap',
      ],
      duration: '1 week',
      price: '£497',
      color: 'var(--accent)',
    },
    {
      icon: Megaphone,
      title: 'Funnel Build',
      subtitle: 'Turn visitors into customers',
      description: 'End-to-end funnel design and implementation—landing pages, email sequences, and conversion optimisation.',
      deliverables: [
        'Custom landing page design',
        'Email automation sequences',
        'A/B testing setup',
      ],
      duration: '2-3 weeks',
      price: '£1,497',
      color: 'var(--accent2)',
    },
    {
      icon: BarChart3,
      title: 'Ads & Analytics',
      subtitle: 'Scale with paid traffic',
      description: 'Meta, Google, and YouTube ads management with advanced tracking and optimisation.',
      deliverables: [
        'Campaign strategy & setup',
        'Weekly optimisation calls',
        'Detailed ROI reporting',
      ],
      duration: 'Ongoing',
      price: '£997/mo',
      color: 'var(--gold)',
    },
    {
      icon: Youtube,
      title: 'YouTube Strategy',
      subtitle: 'Build your organic engine',
      description: 'From zero to monetisation—content strategy, scripting, SEO, and thumbnail optimisation.',
      deliverables: [
        'Channel audit & strategy',
        'Content calendar (12 weeks)',
        'Thumbnail & SEO templates',
      ],
      duration: '4 weeks',
      price: '£797',
      color: 'var(--accent)',
    },
  ];

  const comparison = [
    { feature: 'Strategy Call', audit: true, funnel: true, ads: true, youtube: true },
    { feature: 'Written Report', audit: true, funnel: true, ads: true, youtube: true },
    { feature: 'Implementation', audit: false, funnel: true, ads: true, youtube: false },
    { feature: 'Ongoing Support', audit: false, funnel: false, ads: true, youtube: false },
    { feature: 'Money-Back Guarantee', audit: true, funnel: true, ads: false, youtube: true },
  ];

  const faqs = [
    {
      question: 'Do you work with complete beginners?',
      answer: 'Absolutely! Our Growth Audit and YouTube Strategy are perfect for beginners. We\'ll help you build a foundation before scaling.',
    },
    {
      question: 'What if I\'m not in the UK?',
      answer: 'We work with clients worldwide. All consultations are remote via Zoom, and we accommodate different time zones.',
    },
    {
      question: 'Can I combine services?',
      answer: 'Yes! We offer package discounts when you bundle multiple services. Book a call to discuss custom packages.',
    },
    {
      question: 'What\'s your refund policy?',
      answer: 'We offer a 30-day money-back guarantee on all services except ongoing retainers. If you\'re not satisfied with the deliverables, we\'ll refund 100%.',
    },
    {
      question: 'How quickly can you start?',
      answer: 'Most projects start within 1-2 weeks of booking. Ads & Analytics retainers can begin immediately after onboarding.',
    },
    {
      question: 'Do you provide payment plans?',
      answer: 'Yes, we offer flexible payment plans for services over £500. Split into 2-3 instalments with no extra fees.',
    },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent2)]/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
                Consultancy Services
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Done-For-You & Done-With-You Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto lg:mx-0 mb-8">
                Whether you need a one-time audit or ongoing support, we've got packages for every stage of your digital growth journey.
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate('booking')}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
              >
                Book a Free Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzU5NjU2NTA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Digital marketing strategy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} className="p-8 border-border hover:shadow-lg transition-all">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">What you get:</div>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Timeline</div>
                    <div>{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Starting at</div>
                    <div className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {service.price}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => onNavigate('booking')}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                >
                  Book This Service
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Compare Services
        </h2>
        <Card className="overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">Audit</th>
                  <th className="text-center p-4">Funnel</th>
                  <th className="text-center p-4">Ads</th>
                  <th className="text-center p-4">YouTube</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-t border-border">
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    <td className="text-center p-4">
                      {row.audit ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.funnel ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.ads ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.youtube ? (
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

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}