import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setIsVisible(true);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'accepted');
    }
    setIsVisible(false);
  };

  const declineCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'declined');
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground">
            We use cookies to enhance your browsing experience and analyse our traffic. By clicking "Accept", you consent to our use of cookies.{' '}
            <a href="#" className="text-[var(--accent)] hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={declineCookies}
            className="border-border"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={acceptCookies}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}