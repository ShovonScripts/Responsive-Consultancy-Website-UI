import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

export function AboutPage() {
  const timeline = [
    { year: '2020', event: 'NDG Founded', description: 'Started with a mission to democratise digital income education' },
    { year: '2021', event: '1,000 Students', description: 'Reached our first major milestone with students from 20+ countries' },
    { year: '2023', event: 'Global Expansion', description: 'Launched localised programmes for Bangladesh, India, and Southeast Asia' },
    { year: '2024', event: '10,000+ Community', description: 'Built a thriving community of digital entrepreneurs worldwide' },
  ];

  const pillars = [
    {
      icon: Target,
      title: 'No Fluff',
      description: 'We cut through the noise and deliver only what works—tested, proven strategies.',
      color: 'var(--accent)',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'You\'re not just buying a course; you\'re joining a supportive ecosystem of like-minded builders.',
      color: 'var(--accent2)',
    },
    {
      icon: Lightbulb,
      title: 'Systems > Tactics',
      description: 'We teach sustainable systems, not one-off hacks that expire in 6 months.',
      color: 'var(--gold)',
    },
  ];

  const partners = [
    { name: 'Stripe', type: 'Payment Partner' },
    { name: 'YouTube', type: 'Content Partner' },
    { name: 'Teachable', type: 'Learning Platform' },
    { name: 'Zoom', type: 'Technology Partner' },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
          About Us
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          We Help People Build <span className="text-[var(--accent)]">Real</span> Digital Income
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Founded in 2020, Nas Digital Growth has helped thousands of students, freelancers, and small businesses build sustainable digital income systems. We're not about get-rich-quick schemes—we're about building real, lasting businesses.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Our Journey
        </h2>
        <div className="grid gap-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.year.slice(2)}
                </div>
                {idx < timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>
              <Card className="flex-1 p-6 border-border">
                <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.event}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 flex items-center justify-center">
              <div className="text-8xl">👨‍💼</div>
            </div>
            <div className="space-y-4">
              <Badge className="bg-[var(--accent2)]/10 text-[var(--accent2)] border-[var(--accent2)]/20">
                Founder's Note
              </Badge>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Built by someone who's been there
              </h2>
              <p className="text-muted-foreground">
                "I started as a freelancer making £500/month, struggling to find clients and scale my income. After years of trial and error, I cracked the code—and now I'm sharing everything I learned with you."
              </p>
              <p className="text-muted-foreground">
                "No gatekeeping. No fluffy motivational content. Just proven systems that work whether you're in Dhaka or London."
              </p>
              <div className="pt-4">
                <div style={{ fontFamily: 'Poppins, sans-serif' }}>— Nas Ahmed</div>
                <div className="text-sm text-muted-foreground">Founder, NDG</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Principles
          </h2>
          <p className="text-muted-foreground">
            What sets us apart
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <Card key={idx} className="p-6 text-center border-border">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${pillar.color}15` }}
              >
                <pillar.icon className="w-8 h-8" style={{ color: pillar.color }} />
              </div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Trusted Partners
          </h2>
          <p className="text-muted-foreground">
            We work with industry leaders to deliver the best experience
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, idx) => (
            <Card key={idx} className="p-6 text-center border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-muted/50 mx-auto mb-3 flex items-center justify-center">
                <Award className="w-6 h-6 text-muted-foreground" />
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif' }} className="mb-1">
                {partner.name}
              </div>
              <div className="text-xs text-muted-foreground">{partner.type}</div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}