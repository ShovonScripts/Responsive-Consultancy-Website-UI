/**
 * Development Credentials Display
 * Shows admin login credentials for development
 */

import { Shield, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function DevCredentials() {
  const [copied, setCopied] = useState<'email' | 'password' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(`${type === 'email' ? 'Email' : 'Password'} copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="p-4 bg-yellow-500/10 border-yellow-500/20 max-w-md">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1 text-yellow-700">
            Development Admin Credentials
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Use these credentials to access the admin panel
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-background/50 rounded-md p-2">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-mono">admin@example.com</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard('admin@example.com', 'email')}
                className="h-8 w-8 p-0"
              >
                {copied === 'email' ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center justify-between bg-background/50 rounded-md p-2">
              <div>
                <p className="text-xs text-muted-foreground">Password</p>
                <p className="text-sm font-mono">12345678</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard('12345678', 'password')}
                className="h-8 w-8 p-0"
              >
                {copied === 'password' ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-yellow-700 mt-3">
            ⚠️ Change these credentials in production
          </p>
        </div>
      </div>
    </Card>
  );
}
