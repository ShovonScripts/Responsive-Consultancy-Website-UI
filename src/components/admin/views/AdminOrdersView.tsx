import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { adminAPI } from '../../../lib/mock-api';
import { Download, Eye, Loader2 } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';
import { cn } from '../../ui/utils';

export function AdminOrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { orders: orderData } = await adminAPI.getOrders();
      setOrders(orderData);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter((o) => o.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Orders & Payments
          </h1>
          <p className="text-muted-foreground">Manage orders and payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <h3 className="text-2xl">${totalRevenue.toLocaleString()}</h3>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
          <h3 className="text-2xl">{orders.length}</h3>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Completed</p>
          <h3 className="text-2xl">{completedOrders}</h3>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Payment Method
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted-bg/50">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4 text-sm">{order.productId}</td>
                  <td className="p-4 text-sm font-semibold">${order.amount}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">
                      {order.paymentMethod}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      className={cn(
                        order.status === 'completed' && 'bg-green-500',
                        order.status === 'pending' && 'bg-yellow-500',
                        order.status === 'failed' && 'bg-red-500'
                      )}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(order.id, 'completed')}
                          className="text-green-600"
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
