import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogPostPageProps {
  onNavigate: (page: string) => void;
  postId?: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  tags: string[];
}

export function BlogPostPage({ onNavigate, postId }: BlogPostPageProps) {
  // Mock blog posts database
  const blogPosts: Record<string, BlogPost> = {
    '1': {
      id: '1',
      title: 'How I Went From £2K to £10K/Month in 6 Months',
      excerpt: 'The exact positioning shift, offer structure, and content strategy that tripled my freelance income.',
      category: 'Money',
      readTime: '8 min',
      date: 'Oct 1, 2025',
      author: 'Nasir Uddin',
      authorRole: 'Founder, NDG',
      image: 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5uZWwlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzU5NzYxMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Income Growth', 'Freelancing', 'Positioning'],
      content: `
When I started my digital consultancy journey, I was stuck at £2,000/month. It wasn't terrible—I could pay rent and eat—but I knew I was capable of more. Six months later, I was consistently earning £10,000/month. Here's exactly how I did it.

## The Positioning Shift That Changed Everything

The biggest breakthrough wasn't a new marketing tactic or funnel hack. It was changing who I served and how I talked about what I do.

**Before:** "I'm a digital marketing consultant who helps businesses grow online."

**After:** "I help freelancers and small service businesses build £10K/month income systems through positioning, funnels, and content."

See the difference? The second statement is specific, outcome-focused, and speaks directly to my ideal client's goal.

### Action Steps:
1. **Define your niche precisely** - Not "businesses" but "freelance designers in the UK"
2. **Lead with outcomes** - What transformation do you provide?
3. **Be specific about the result** - "£10K/month" is better than "more revenue"

## The Offer Structure That Converted

Instead of selling one-off services, I created a three-tier system:

### Tier 1: Audit (£497)
A diagnostic session where I identify exactly what's holding the client back. This became my entry point.

### Tier 2: Done-With-You (£1,497)
For clients who want implementation support. We build their funnel together over 4 weeks.

### Tier 3: Done-For-You (£3,997)
Full-service package where my team handles everything.

**Why this works:** The audit acts as a low-barrier entry point. About 60% of audit clients upgrade to Tier 2 or 3.

## The Content Strategy That Filled My Pipeline

I went all-in on value-first content. Every week, I published:
- 1 long-form YouTube video (10-15 minutes)
- 3 LinkedIn posts (mix of tactical advice and case studies)
- 1 email to my list (personal story + lesson)

**The secret:** I stopped trying to "go viral" and focused on being genuinely helpful. My videos weren't polished—just me, my laptop, and actionable advice.

### Content Principles:
1. **Teach what you sell** - Don't hold back your best ideas
2. **Show your work** - Share real examples and case studies
3. **Be consistent** - Weekly beats perfection every time

## The Numbers Breakdown

Here's how my monthly revenue broke down after 6 months:

- **3 Done-For-You clients:** £11,991
- **5 Done-With-You clients:** £7,485  
- **4 Audits:** £1,988
- **Digital products:** £2,100

**Total:** £23,564/month

(I'm being conservative with "£10K+" because some months dipped below £20K, but the average was well above £10K)

## What Didn't Work

Let me save you some time by sharing what flopped:

- **Cold outreach** - I sent 500+ cold emails. Got 2 replies. Both said no.
- **Paid ads** - Burned £2,000 with zero conversions. My organic content worked better.
- **Complicated funnels** - My 12-email nurture sequence? Nobody read past email 3.

## The Real Secret: Consistency + Focus

If I had to boil it down to one thing, it's this: I stopped chasing shiny objects and doubled down on what worked.

Every week for 6 months:
- Published valuable content
- Had conversations with potential clients  
- Delivered exceptional results for current clients

No magic. No hacks. Just showing up consistently and doing the work.

## Your Next Steps

If you're stuck at £2K/month (or any plateau), ask yourself:

1. **Is my positioning clear and specific?**  
   If you can't explain what you do in one sentence, your clients are confused too.

2. **Do I have a clear offer ladder?**  
   Make it easy for people to start small and grow with you.

3. **Am I creating helpful content consistently?**  
   You can't build trust without showing up regularly.

The jump from £2K to £10K isn't about working 5x harder. It's about positioning yourself correctly, packaging your services strategically, and being visible to the right people.

If you want to dig deeper into any of these topics, book a free strategy call with our team. We'll audit your current setup and show you exactly what to focus on next.

Keep building,  
Nas
      `,
    },
    '2': {
      id: '2',
      title: 'The YouTube Algorithm: What Actually Works in 2025',
      excerpt: 'Forget what you heard. Here\'s what YouTube engineers say about ranking videos and growing subscribers.',
      category: 'Skills',
      readTime: '12 min',
      date: 'Sep 28, 2025',
      author: 'Sarah Khan',
      authorRole: 'Content Strategist, NDG',
      image: 'https://images.unsplash.com/photo-1616412875447-096e932d893c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwY29udGVudCUyMGNyZWF0aW9ufGVufDF8fHx8MTc1OTc1OTkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['YouTube', 'Content Strategy', 'Growth'],
      content: `
I've helped dozens of creators grow their YouTube channels from zero to thousands of subscribers. In 2025, the algorithm works differently than most "experts" will tell you. Here's what actually matters.

## The #1 Metric YouTube Cares About

It's not views. It's not likes. It's not even watch time.

**It's "viewer satisfaction."**

YouTube wants people to stay on YouTube. If your video keeps viewers on the platform and watching more videos (yours or others'), the algorithm rewards you.

### How YouTube Measures Satisfaction:
- **Click-through rate (CTR)** - Do people click when they see your thumbnail?
- **Average view duration (AVD)** - How long do they watch?
- **Session time** - Do they keep watching YouTube after your video?

## The Thumbnail + Title Formula

Your thumbnail and title work together. Here's the formula I use:

### Thumbnail:
- **One clear focal point** - Face, text, or object
- **Bright, contrasting colours** - Stand out in the feed
- **Readable text (3-5 words max)** - Think billboard, not essay

### Title:
- **28-60 characters** - Longer titles get truncated on mobile
- **Front-load keywords** - What would someone search for?
- **Create curiosity gap** - Promise value without giving it all away

**Example:**
❌ "In this video, I'm going to show you some tips for growing your business"
✅ "How I Got My First 100 Clients in 90 Days"

## Content Structure That Keeps People Watching

Most creators lose viewers in the first 30 seconds. Here's how to hook them:

### The First 10 Seconds:
1. **Visual hook** - Show the payoff/result
2. **Verbal hook** - "In this video, I'm showing you..."
3. **Social proof** - "This strategy helped me/my client..."

### The Pattern Interrupt Method:
Every 60-90 seconds, add:
- A visual change (B-roll, text overlay, zoom)
- A new point or sub-topic
- An example or story

**Why this works:** Our brains crave novelty. Keep it moving.

## The Upload Schedule Myth

You've heard "upload consistently, 3x per week." That's outdated advice.

**What actually matters:** Upload quality over quantity.

I've seen channels grow faster with 1 video per week than channels posting daily low-quality content.

### My Recommendation:
- **Beginner:** 1 video per week, every week
- **Intermediate:** 2 videos per week once you've dialled in your process
- **Advanced:** 3+ videos per week if you have a team

Consistency matters, but not at the expense of quality.

## SEO Still Matters (But Not How You Think)

YouTube is the #2 search engine. But keyword stuffing doesn't work anymore.

### What Does Work:
1. **Natural language keywords** - Use phrases people actually say
2. **Tags that match your content** - Don't add random popular tags
3. **Timestamps in descriptions** - Helps with suggested videos

**Pro tip:** Look at the auto-complete suggestions when you type in YouTube search. Those are real queries people are searching for.

## The Secret to Getting Recommended

YouTube's "Suggested Videos" sidebar drives more views than search.

**How to get suggested:**
- Create content similar to popular videos in your niche
- Use similar keywords and tags
- Encourage viewers to binge-watch your content

**The playlist strategy:** Group related videos into playlists. When one video ends, the next auto-plays. This skyrockets session time.

## What Actually Grows Subscribers

Subscribers are a vanity metric... until they're not.

**The truth:** Subscribers matter because they're your "warm audience." They're more likely to watch your new videos, which signals to YouTube that your content is good.

### How to convert viewers to subscribers:
1. **Deliver on your promise** - If the video was valuable, they'll want more
2. **Verbal CTA** - "If you found this helpful, subscribe for weekly tips"
3. **Pattern of value** - Show them you consistently deliver

**Don't:** Beg for subscribers or use clickbait. It backfires.

## Mistakes That Kill Growth

After analyzing hundreds of channels, these are the fatal errors I see:

### ❌ Inconsistent branding
Your thumbnails should look like they're from the same channel. Create a template.

### ❌ Rambling intros
Get to the point in under 10 seconds. Nobody has time for your life story.

### ❌ No clear niche
If your channel is about "everything," it's about nothing. Pick a lane.

### ❌ Ignoring analytics
Check your CTR and AVD for every video. Double down on what works.

## The 90-Day Growth Plan

Here's what I tell every creator:

### Month 1: Foundation
- Define your niche and ideal viewer
- Create 5 "pillar" videos (evergreen topics)
- Learn basic editing and thumbnail design

### Month 2: Optimization
- Analyze what's working (CTR, AVD)
- Create 5 more videos, improving on what worked
- Build playlists to increase session time

### Month 3: Scaling
- Increase upload frequency (if quality allows)
- Experiment with new formats
- Engage with your community (reply to comments)

## Final Thoughts

The YouTube algorithm isn't a mystery. It's a reflection of what viewers want.

**Focus on:**
1. Making videos people actually want to watch
2. Packaging them in a way that gets clicks
3. Keeping viewers engaged from start to finish

Do that consistently for 6-12 months, and you'll grow.

Need help? Our YouTube Strategy service includes a full channel audit, content calendar, and thumbnail templates. Book a call to learn more.

Keep creating,  
Sarah
      `,
    },
  };

  // Get the post or use the first one as default
  const post = postId && blogPosts[postId] ? blogPosts[postId] : blogPosts['1'];

  // Related posts (just a simple filter for now)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('blog')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {post.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <div>
                <span className="text-foreground">{post.author}</span>
                <span className="mx-1">•</span>
                <span>{post.authorRole}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video rounded-xl overflow-hidden mb-12">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <Card className="p-8 sm:p-12 border-border mb-12">
          <div 
            className="prose prose-lg max-w-none"
            style={{ 
              lineHeight: '1.8',
            }}
          >
            {post.content.split('\n').map((paragraph, idx) => {
              // Handle headings
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 
                    key={idx} 
                    className="text-2xl sm:text-3xl mt-12 mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 
                    key={idx} 
                    className="text-xl sm:text-2xl mt-8 mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              
              // Handle bold
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={idx} className="font-medium my-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }

              // Handle lists
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={idx} className="ml-6 my-2 text-muted-foreground">
                    {paragraph.replace('- ', '')}
                  </li>
                );
              }

              // Handle regular paragraphs
              if (paragraph.trim()) {
                // Check for inline bold
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx} className="mb-6 text-muted-foreground">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-foreground">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
              
              return null;
            })}
          </div>

          <Separator className="my-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Author Bio */}
        <Card className="p-6 border-border mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <span className="text-xl text-[var(--accent)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {post.author}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {post.authorRole}
              </div>
              <p className="text-sm text-muted-foreground">
                {post.author === 'Nasir Uddin' 
                  ? 'Founder of Nas Digital Growth, helping freelancers and small businesses build £10K+ monthly income through positioning, funnels, and content.'
                  : 'Content strategist specializing in YouTube growth and organic traffic generation.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-border cursor-pointer"
                  onClick={() => {
                    // In a real app, this would update the URL and post data
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="text-xs mb-3">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{relatedPost.author}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border mt-12">
          <h2 className="text-2xl sm:text-3xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Build Your Digital Income System?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 15-minute call and we'll show you exactly what to focus on next.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('booking')}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            Book Your Free Call
          </Button>
        </Card>
      </div>
    </div>
  );
}
