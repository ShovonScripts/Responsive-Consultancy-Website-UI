import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Wifi, WifiOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function SystemStatus() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7a5ab98d/health`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
        setShowAlert(true);
      }
    } catch (error) {
      setBackendStatus('offline');
      setShowAlert(true);
    }
  };

  if (backendStatus === 'checking') {
    return null;
  }

  return (
    <>
      {/* Status Badge in bottom right corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <Badge 
          variant={backendStatus === 'online' ? 'default' : 'secondary'}
          className="flex items-center gap-2 px-3 py-1"
        >
          {backendStatus === 'online' ? (
            <>
              <CheckCircle className="h-3 w-3 text-green-500" />
              Backend Online
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 text-orange-500" />
              Demo Mode
            </>
          )}
        </Badge>
      </div>

      {/* Alert for offline mode */}
      {showAlert && backendStatus === 'offline' && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md">
          <Alert className="bg-background border-border">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Backend unavailable - running in demo mode with local data.
              <button 
                onClick={() => setShowAlert(false)}
                className="ml-2 text-[var(--accent)] hover:underline"
              >
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}