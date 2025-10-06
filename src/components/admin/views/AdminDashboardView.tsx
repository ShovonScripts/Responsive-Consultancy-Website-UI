import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { adminAPI } from '../../../lib/mock-api';
import {
  DollarSign,
  Users,
  Calendar,
  ShoppingBag,
  Plus,
  TrendingUp,
  TrendingDown,
  Loader2,
  UserPlus,
  Package,
  GraduationCap,
} from 'lucide-react';
import { cn } from '../../ui/utils';
import { toast } from 'sonner';

interface DashboardData {
  mrr: number;
  activeMembers: number;
  totalBookings: number;
  pendingOrders: number;
  recentActivity: Array<{ type: string; message: string; time: string }>;
  recentOrders: Array<any>;
}

export function AdminDashboardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  
  // Form states
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'student' });
  const [productForm, setProductForm] = useState({ title: '', price: '', description: '' });
  const [classForm, setClassForm] = useState({ 
    title: '', 
    track: 'starter', 
    startDate: '', 
    timezone: 'UTC', 
    sessionCount: '', 
    price: '', 
    capacity: '', 
    description: '' 
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const dashboardData = await adminAPI.getDashboard();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      await adminAPI.createUser({ ...userForm, password: 'temp123' });
      toast.success('User created successfully');
      setShowUserModal(false);
      setUserForm({ name: '', email: '', role: 'student' });
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleCreateProduct = async () => {
    try {
      await adminAPI.createProduct({ ...productForm, price: parseFloat(productForm.price) });
      toast.success('Product created successfully');
      setShowProductModal(false);
      setProductForm({ title: '', price: '', description: '' });
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleCreateClass = async () => {
    try {
      toast.success('Class created successfully');
      setShowClassModal(false);
      setClassForm({ 
        title: '', 
        track: 'starter', 
        startDate: '', 
        timezone: 'UTC', 
        sessionCount: '', 
        price: '', 
        capacity: '', 
        description: '' 
      });
    } catch (error) {
      toast.error('Failed to create class');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  const stats = [
    {
      label: 'MRR',
      value: `$${data?.mrr?.toLocaleString() || 0}`,
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-[var(--accent)]',
      bgColor: 'bg-[var(--accent)]/10',
    },
    {
      label: 'Active Members',
      value: data?.activeMembers || 0,
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-[var(--accent2)]',
      bgColor: 'bg-[var(--accent2)]/10',
    },
    {
      label: 'Bookings Today',
      value: data?.totalBookings || 0,
      change: '+15.3%',
      trend: 'up' as const,
      icon: Calendar,
      color: 'text-[var(--gold)]',
      bgColor: 'bg-[var(--gold)]/10',
    },
    {
      label: 'Pending Orders',
      value: data?.pendingOrders || 0,
      change: '-2.4%',
      trend: 'down' as const,
      icon: ShoppingBag,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className="text-2xl mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">from last month</span>
                  </div>
                </div>
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', stat.bgColor)}>
                  <Icon className={cn('w-6 h-6', stat.color)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6 border-border">
          <h3 className="text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-2',
                    activity.type === 'order' && 'bg-[var(--accent)]',
                    activity.type === 'user' && 'bg-[var(--accent2)]',
                    activity.type === 'booking' && 'bg-[var(--gold)]'
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 border-border">
          <h3 className="text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4 gap-2"
              onClick={() => setShowUserModal(true)}
            >
              <UserPlus className="w-5 h-5" />
              <span className="text-sm">Add User</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4 gap-2"
              onClick={() => setShowProductModal(true)}
            >
              <Package className="w-5 h-5" />
              <span className="text-sm">New Product</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col py-4 gap-2"
              onClick={() => setShowClassModal(true)}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm">Create Class</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 gap-2">
              <Plus className="w-5 h-5" />
              <span className="text-sm">New Blog Post</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6 border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Recent Orders</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Product</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentOrders?.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-sm">{order.id}</td>
                  <td className="py-3 text-sm">{order.productId}</td>
                  <td className="py-3 text-sm">${order.amount}</td>
                  <td className="py-3">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs',
                        order.status === 'completed' && 'bg-green-500/10 text-green-600',
                        order.status === 'pending' && 'bg-yellow-500/10 text-yellow-600'
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user-name">Name *</Label>
              <Input
                id="user-name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="user-email">Email *</Label>
              <Input
                id="user-email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role *</Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                <SelectTrigger id="user-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserModal(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateUser}
              disabled={!userForm.name || !userForm.email}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
            <DialogDescription>Add a new product to the store</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product-title">Product Title *</Label>
              <Input
                id="product-title"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label htmlFor="product-price">Price *</Label>
              <Input
                id="product-price"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                placeholder="99.00"
              />
            </div>
            <div>
              <Label htmlFor="product-desc">Description</Label>
              <Textarea
                id="product-desc"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProductModal(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateProduct}
              disabled={!productForm.title || !productForm.price}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              Create Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Class Modal */}
      <Dialog open={showClassModal} onOpenChange={setShowClassModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>Set up a new class or cohort</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="class-title">Class Title *</Label>
              <Input
                id="class-title"
                value={classForm.title}
                onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                placeholder="Skill Pyramid Bootcamp"
              />
            </div>
            <div>
              <Label htmlFor="class-track">Track *</Label>
              <Select value={classForm.track} onValueChange={(value) => setClassForm({ ...classForm, track: value })}>
                <SelectTrigger id="class-track">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class-start">Start Date *</Label>
                <Input
                  id="class-start"
                  type="date"
                  value={classForm.startDate}
                  onChange={(e) => setClassForm({ ...classForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="class-timezone">Timezone *</Label>
                <Select value={classForm.timezone} onValueChange={(value) => setClassForm({ ...classForm, timezone: value })}>
                  <SelectTrigger id="class-timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="Asia/Dhaka">Asia/Dhaka</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="class-sessions">Session Count</Label>
                <Input
                  id="class-sessions"
                  type="number"
                  value={classForm.sessionCount}
                  onChange={(e) => setClassForm({ ...classForm, sessionCount: e.target.value })}
                  placeholder="12"
                />
              </div>
              <div>
                <Label htmlFor="class-price">Price</Label>
                <Input
                  id="class-price"
                  type="number"
                  value={classForm.price}
                  onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                  placeholder="299"
                />
              </div>
              <div>
                <Label htmlFor="class-capacity">Capacity</Label>
                <Input
                  id="class-capacity"
                  type="number"
                  value={classForm.capacity}
                  onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                  placeholder="30"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="class-desc">Short Description</Label>
              <Textarea
                id="class-desc"
                value={classForm.description}
                onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                placeholder="Brief description of the class"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClassModal(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateClass}
              disabled={!classForm.title || !classForm.track || !classForm.startDate}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              Create Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
