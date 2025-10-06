/**
 * Development Mode Banner
 * Shows when using local authentication
 */

import { Code, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function DevModeBanner() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ndg_dev_banner_dismissed') === 'true';
    }
    return false;
  });

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ndg_dev_banner_dismissed', 'true');
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white rounded-lg shadow-lg p-4 pr-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white hover:bg-white/20 h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Development Mode</h3>
            <p className="text-sm text-white/90 mb-2">
              Using local authentication (no backend required)
            </p>
            <p className="text-xs text-white/80">
              Admin credentials are logged in the browser console
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
