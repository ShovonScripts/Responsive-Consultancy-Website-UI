import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { adminAPI } from '../../../lib/mock-api';
import { TrendingUp, DollarSign, Users, Activity, Loader2 } from 'lucide-react';
import { cn } from '../../ui/utils';

export function AdminAnalyticsView() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await adminAPI.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  const metrics = [
    {
      label: 'Total Revenue',
      value: `$${analytics?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'text-[var(--accent)]',
      bgColor: 'bg-[var(--accent)]/10',
    },
    {
      label: 'Conversion Rate',
      value: `${analytics?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: 'text-[var(--accent2)]',
      bgColor: 'bg-[var(--accent2)]/10',
    },
    {
      label: 'Customer LTV',
      value: `$${analytics?.ltv || 0}`,
      icon: Users,
      color: 'text-[var(--gold)]',
      bgColor: 'bg-[var(--gold)]/10',
    },
    {
      label: 'Churn Rate',
      value: `${analytics?.churnRate || 0}%`,
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Analytics
        </h1>
        <p className="text-muted-foreground">Track performance and growth metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <h3 className="text-2xl">{metric.value}</h3>
                </div>
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', metric.bgColor)}>
                  <Icon className={cn('w-6 h-6', metric.color)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="p-6 border-border">
          <h3 className="text-lg mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {analytics?.trafficSources?.map((source: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{source.source}</span>
                  <span className="text-sm font-medium">{source.visits} visits</span>
                </div>
                <div className="w-full bg-muted-bg rounded-full h-2">
                  <div
                    className="bg-[var(--accent)] h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue by Month */}
        <Card className="p-6 border-border">
          <h3 className="text-lg mb-4">Revenue by Month</h3>
          <div className="space-y-3">
            {analytics?.revenueByMonth?.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted-bg rounded-lg">
                <span className="font-medium">{item.month}</span>
                <span className="text-lg font-semibold">${item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
