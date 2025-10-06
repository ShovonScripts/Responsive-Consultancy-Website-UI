import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const helpfulLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Products', page: 'products' },
    { label: 'Class / Hub', page: 'class' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            404
          </div>
          <h1 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <Card className="p-8 border-border mb-8">
          <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Helpful Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {helpfulLinks.map((link) => (
              <Button
                key={link.page}
                variant="outline"
                onClick={() => onNavigate(link.page)}
                className="border-border"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate('home')}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Still can't find what you're looking for?
          </p>
          <Button
            variant="outline"
            onClick={() => onNavigate('contact')}
            className="border-border"
          >
            <Search className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}