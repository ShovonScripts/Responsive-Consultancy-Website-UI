import { useState } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Search, Shield, AlertTriangle, Info } from 'lucide-react';

const mockLogs = [
  {
    id: '1',
    type: 'security',
    message: 'User admin@example.com logged in',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    severity: 'info',
  },
  {
    id: '2',
    type: 'security',
    message: 'Failed login attempt from unknown@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    severity: 'warning',
  },
  {
    id: '3',
    type: 'admin',
    message: 'Product "Digital Marketing Masterclass" updated by admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    severity: 'info',
  },
  {
    id: '4',
    type: 'admin',
    message: 'User account deactivated: user@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    severity: 'warning',
  },
  {
    id: '5',
    type: 'system',
    message: 'Database backup completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    severity: 'info',
  },
];

export function AdminLogsView() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = mockLogs.filter((log) =>
    log.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Logs & Audit Trail
        </h1>
        <p className="text-muted-foreground">Monitor admin actions and security events</p>
      </div>

      <Card className="p-4 border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="border-border">
        <div className="divide-y divide-border">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-muted-bg/50">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getSeverityIcon(log.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm mb-1">{log.message}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {log.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
