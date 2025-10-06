import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Star, TrendingUp, Target, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function TestimonialsPage() {
  const [industryFilter, setIndustryFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');

  const testimonials = [
    {
      name: 'Arif Rahman',
      role: 'Freelance Designer',
      location: 'Dhaka, Bangladesh',
      avatar: 'AR',
      industry: 'Design',
      goal: 'Scale Income',
      challenge: 'Stuck at £2K/month, no clear path to scale, struggling with client acquisition',
      solution: 'Implemented NDG\'s positioning framework, created a niche offer, built automated funnel',
      result: {
        revenue: '£2K → £10K/month',
        time: '4 months',
        key: '5x revenue increase',
      },
      tools: ['Positioning Workshop', 'Funnel Templates', 'Pro Membership'],
      quote: 'NDG didn\'t just teach me tactics—they helped me build a real business system. Now I have predictable income and time freedom.',
      rating: 5,
    },
    {
      name: 'Sarah Mitchell',
      role: 'Content Creator',
      location: 'London, UK',
      avatar: 'SM',
      industry: 'Content',
      goal: 'Grow Audience',
      challenge: '500 YouTube subscribers, inconsistent views, no monetisation strategy',
      solution: 'Applied YouTube Growth Accelerator strategies, optimised content & SEO, launched membership',
      result: {
        revenue: '£0 → £3.5K/month',
        time: '6 months',
        key: '12K subscribers gained',
      },
      tools: ['YouTube Strategy', 'Elite Membership'],
      quote: 'The YouTube course is pure gold. Doubled my subscribers and tripled my revenue. Nas knows what he\'s talking about.',
      rating: 5,
    },
    {
      name: 'Kamal Hossain',
      role: 'E-commerce Owner',
      location: 'Chittagong, Bangladesh',
      avatar: 'KH',
      industry: 'E-commerce',
      goal: 'Increase Conversion',
      challenge: 'High traffic but low conversion (1.2%), abandoned carts, no email follow-up',
      solution: 'Funnel audit + rebuild, email automation, retargeting campaigns with NDG',
      result: {
        revenue: '£5K → £18K/month',
        time: '3 months',
        key: '3.8% conversion rate',
      },
      tools: ['Funnel Build', 'Ads & Analytics'],
      quote: 'The funnel audit found exactly what was broken. Within 3 months, revenue tripled. Best ROI I\'ve ever had.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      role: 'Freelance Copywriter',
      location: 'Manchester, UK',
      avatar: 'EW',
      industry: 'Writing',
      goal: 'Land High-Ticket Clients',
      challenge: 'Too many low-paying clients (£50-200), no positioning, burnout',
      solution: 'Repositioned as conversion copywriter, created case studies, implemented outreach system',
      result: {
        revenue: '£1.5K → £6K/month',
        time: '5 months',
        key: '£2K avg. project value',
      },
      tools: ['Client Acquisition System', 'Pro Membership'],
      quote: 'I went from writing blog posts for £50 to landing £2K sales page projects. NDG changed my life.',
      rating: 5,
    },
    {
      name: 'Rafiq Ahmed',
      role: 'Digital Marketer',
      location: 'Sylhet, Bangladesh',
      avatar: 'RA',
      industry: 'Marketing',
      goal: 'Build Agency',
      challenge: 'Solo freelancer, no team, maxed out on time, couldn\'t scale',
      solution: 'Built service packages, hired VAs, automated client delivery with NDG frameworks',
      result: {
        revenue: '£3K → £15K/month',
        time: '8 months',
        key: '3-person team built',
      },
      tools: ['Growth Audit', 'Elite Membership', 'Templates'],
      quote: 'Nas helped me transition from freelancer to agency owner. Now I have a team and recurring revenue.',
      rating: 5,
    },
    {
      name: 'Lisa Chen',
      role: 'Course Creator',
      location: 'Singapore',
      avatar: 'LC',
      industry: 'Education',
      goal: 'Launch Course',
      challenge: 'Great course content but no audience, no sales funnel, zero revenue',
      solution: 'Pre-launch content strategy, funnel build, email sequences, launch campaign',
      result: {
        revenue: '£0 → £12K first launch',
        time: '2 months',
        key: '150 students enrolled',
      },
      tools: ['Funnel Build', 'Email Marketing Mastery'],
      quote: 'I had the course but no idea how to sell it. NDG built my entire funnel and launch plan. £12K in the first cohort!',
      rating: 5,
    },
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesIndustry = industryFilter === 'all' || t.industry === industryFilter;
    const matchesGoal = goalFilter === 'all' || t.goal === goalFilter;
    return matchesIndustry && matchesGoal;
  });

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
          Success Stories
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Real People, Real Results
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From students to freelancers to agency owners—these are the people who trusted NDG to help them build sustainable digital income.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-input-background border-border">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Writing">Writing</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Select value={goalFilter} onValueChange={setGoalFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-input-background border-border">
              <SelectValue placeholder="Goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="Scale Income">Scale Income</SelectItem>
              <SelectItem value="Grow Audience">Grow Audience</SelectItem>
              <SelectItem value="Increase Conversion">Increase Conversion</SelectItem>
              <SelectItem value="Land High-Ticket Clients">Land High-Ticket Clients</SelectItem>
              <SelectItem value="Build Agency">Build Agency</SelectItem>
              <SelectItem value="Launch Course">Launch Course</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {filteredTestimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-8 border-border">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Person Info */}
                <div>
                  <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <span className="text-2xl text-[var(--accent)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <h3 className="text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {testimonial.name}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-1">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground mb-4">📍 {testimonial.location}</div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">{testimonial.industry}</Badge>
                    <Badge variant="outline" className="text-xs">{testimonial.goal}</Badge>
                  </div>
                </div>

                {/* Middle: Story */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-sm font-medium">Challenge</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.challenge}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-[var(--accent2)]" />
                      <span className="text-sm font-medium">Solution</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.solution}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-[var(--gold)]" />
                      <span className="text-sm font-medium">Results</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/30 rounded-lg p-3 text-center">
                        <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                        <div className="font-medium text-sm">{testimonial.result.revenue}</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 text-center">
                        <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                        <div className="font-medium text-sm">{testimonial.result.time}</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 text-center">
                        <div className="text-sm text-muted-foreground mb-1">Key Win</div>
                        <div className="font-medium text-sm">{testimonial.result.key}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Tools Used:</div>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.tools.map((tool, i) => (
                        <Badge key={i} className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No testimonials found matching your filters.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who've transformed their digital income with NDG.
          </p>
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>
    </div>
  );
}