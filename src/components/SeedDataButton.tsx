import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Database, AlertCircle } from 'lucide-react';
import { blogAPI, productAPI, serviceAPI } from '../lib/api';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export function SeedDataButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [open, setOpen] = useState(false);

  const seedData = async () => {
    setOpen(false);
    setIsSeeding(true);
    try {
      // Seed Blogs
      const blogs = [
        {
          title: 'How I Went From £2K to £10K/Month in 6 Months',
          excerpt: 'The exact positioning shift, offer structure, and content strategy that tripled my freelance income.',
          content: 'In this comprehensive guide, I\'ll share the exact strategies I used to triple my freelance income...',
          category: 'Money',
          readTime: '8 min',
          author: 'Nas Ahmed',
          published: true,
        },
        {
          title: 'The YouTube Algorithm: What Actually Works in 2025',
          excerpt: 'Forget what you heard. Here\'s what YouTube engineers say about ranking videos and growing subscribers.',
          content: 'After analyzing thousands of successful channels and speaking with YouTube insiders...',
          category: 'Skills',
          readTime: '12 min',
          author: 'Sarah Mitchell',
          published: true,
        },
      ];

      // Seed Products
      const products = [
        {
          title: 'The Income System Blueprint',
          description: 'Complete framework for building your first £10K/month digital income stream',
          price: 97,
          category: 'Systems',
          level: 'Beginner',
          badge: 'Best Seller',
          features: [
            'Lifetime access to all content and updates',
            'Step-by-step income generation framework',
            'Private community forum access',
          ],
        },
        {
          title: 'YouTube Growth Accelerator',
          description: 'From 0 to 10K subscribers—content strategy, scripting, and SEO',
          price: 147,
          category: 'Content',
          level: 'Intermediate',
          badge: 'New',
          features: [
            'Complete YouTube growth roadmap',
            'Viral content ideation system',
            'SEO and algorithm mastery',
          ],
        },
      ];

      // Seed Services
      const services = [
        {
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
          icon: 'Search',
          color: 'var(--accent)',
          order: 1,
        },
        {
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
          icon: 'Megaphone',
          color: 'var(--accent2)',
          order: 2,
        },
      ];

      // Create all items
      for (const blog of blogs) {
        await blogAPI.create(blog);
      }

      for (const product of products) {
        await productAPI.create(product);
      }

      for (const service of services) {
        await serviceAPI.create(service);
      }

      toast.success('✅ Demo data created! Refresh to see 2 blogs, 2 products, and 2 services.');
    } catch (error: any) {
      console.error('Error seeding data:', error);
      toast.error(error.message || 'Failed to seed data');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isSeeding}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Seeding...
            </>
          ) : (
            <>
              <Database className="w-4 h-4" />
              Seed Demo Data
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[var(--accent)]" />
            Seed Demo Data?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 pt-2">
            <p>This will create sample content to help you get started:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>2 blog posts (Money & Skills categories)</li>
              <li>2 digital products (Income Blueprint & YouTube Growth)</li>
              <li>2 services (Growth Audit & Funnel Build)</li>
            </ul>
            <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg mt-3">
              <AlertCircle className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                You can edit or delete any seeded content afterward. This is just to populate your dashboard with examples.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={seedData}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            Seed Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
