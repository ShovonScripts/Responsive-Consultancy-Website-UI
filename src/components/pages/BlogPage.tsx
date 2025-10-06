import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Clock, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Money', 'Skills', 'Systems', 'Case Studies'];
  const [activeCategory, setActiveCategory] = useState('All');

  const articles = [
    {
      title: 'How I Went From £2K to £10K/Month in 6 Months',
      excerpt: 'The exact positioning shift, offer structure, and content strategy that tripled my freelance income.',
      category: 'Money',
      readTime: '8 min',
      date: 'Oct 1, 2025',
      author: 'Nas Ahmed',
    },
    {
      title: 'The YouTube Algorithm: What Actually Works in 2025',
      excerpt: 'Forget what you heard. Here\'s what YouTube engineers say about ranking videos and growing subscribers.',
      category: 'Skills',
      readTime: '12 min',
      date: 'Sep 28, 2025',
      author: 'Sarah Mitchell',
    },
    {
      title: 'Building a £10K/Month Funnel: Complete Breakdown',
      excerpt: 'Landing page, email sequence, upsells—this funnel converts at 3.2% and generates £10K monthly on autopilot.',
      category: 'Systems',
      readTime: '15 min',
      date: 'Sep 25, 2025',
      author: 'Nas Ahmed',
    },
    {
      title: 'From Zero to £5K/Month: A Freelance Designer\'s Journey',
      excerpt: 'How Arif used NDG frameworks to land his first 5-figure client and build a recurring revenue stream.',
      category: 'Case Studies',
      readTime: '10 min',
      date: 'Sep 22, 2025',
      author: 'Team NDG',
    },
    {
      title: '5 Email Sequences Every Business Needs',
      excerpt: 'Welcome, nurture, sales, re-engagement, and retention—templates and examples included.',
      category: 'Systems',
      readTime: '7 min',
      date: 'Sep 20, 2025',
      author: 'Sarah Mitchell',
    },
    {
      title: 'The £100K/Year Creator Economy Blueprint',
      excerpt: 'Multiple income streams, leverage, and systems—how to build a 6-figure creator business.',
      category: 'Money',
      readTime: '14 min',
      date: 'Sep 18, 2025',
      author: 'Nas Ahmed',
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
          Blog & Resources
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Ideas, Tactics, and Case Studies
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real strategies from real businesses. No fluff, no theory—just actionable insights you can implement today.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input-background border-border"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <Card
              key={idx}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-border flex flex-col cursor-pointer"
              onClick={() => onNavigate('blog-post')}
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    <div>{article.author}</div>
                    <div className="text-xs">{article.date}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('blog-post');
                    }}
                  >
                    Read
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles found matching your search.</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get Weekly Insights
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 10,000+ readers getting actionable digital income strategies every Sunday.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-input-background border-border"
            />
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shrink-0">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </Card>
      </section>
    </div>
  );
}