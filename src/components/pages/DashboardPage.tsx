import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  BookOpen,
  Calendar,
  Download,
  TrendingUp,
  Video,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  PlayCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export function DashboardPage() {
  const user = {
    name: 'John Smith',
    email: 'john@example.com',
    memberSince: 'Jan 2025',
    plan: 'Pro',
    avatar: 'JS',
  };

  const upcomingSessions = [
    { title: 'Weekly Live Coaching', date: 'Oct 8, 2025', time: '2:00 PM GMT+6', type: 'Live Call' },
    { title: 'Funnel Review Session', date: 'Oct 12, 2025', time: '4:00 PM GMT+6', type: '1-on-1' },
  ];

  const purchasedProducts = [
    { title: 'The Income System Blueprint', progress: 65, status: 'In Progress' },
    { title: 'YouTube Growth Accelerator', progress: 100, status: 'Completed' },
    { title: 'Email Marketing Mastery', progress: 30, status: 'In Progress' },
  ];

  const invoices = [
    { id: 'INV-001', date: 'Oct 1, 2025', amount: '£197', status: 'Paid', plan: 'Pro Monthly' },
    { id: 'INV-002', date: 'Sep 1, 2025', amount: '£197', status: 'Paid', plan: 'Pro Monthly' },
    { id: 'INV-003', date: 'Aug 1, 2025', amount: '£197', status: 'Paid', plan: 'Pro Monthly' },
  ];

  return (
    <div className="py-12">
      {/* Welcome Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card className="p-8 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                <span className="text-2xl text-[var(--accent)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {user.avatar}
                </span>
              </div>
              <div>
                <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Welcome back, {user.name}!
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{user.email}</span>
                  <span>•</span>
                  <Badge className="bg-[var(--accent)] text-white border-none">
                    {user.plan} Member
                  </Badge>
                  <span>•</span>
                  <span>Member since {user.memberSince}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-border">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[var(--accent)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              3
            </div>
            <div className="text-sm text-muted-foreground">Active Courses</div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent2)]/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-[var(--accent2)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              42
            </div>
            <div className="text-sm text-muted-foreground">Videos Watched</div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[var(--gold)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              65%
            </div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[var(--accent)]" />
              </div>
            </div>
            <div className="text-2xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              2
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-muted/30">
            <TabsTrigger value="courses">
              <BookOpen className="w-4 h-4 mr-2" />
              My Products
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Video className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Your Library
              </h2>
              <Button variant="outline" className="border-border">
                <Download className="w-4 h-4 mr-2" />
                Download Resources
              </Button>
            </div>

            <div className="grid gap-6">
              {purchasedProducts.map((product, idx) => (
                <Card key={idx} className="p-6 border-border">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-48 aspect-video rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent2)]/10 flex items-center justify-center shrink-0">
                      <div className="text-4xl opacity-20">📦</div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {product.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {product.status}
                          </Badge>
                        </div>
                        <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shrink-0">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{product.progress}%</span>
                        </div>
                        <Progress value={product.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Upcoming Sessions
              </h2>
            </div>

            <div className="grid gap-4">
              {upcomingSessions.map((session, idx) => (
                <Card key={idx} className="p-6 border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                        <Video className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                      <div>
                        <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {session.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {session.date}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[var(--accent2)]/10 text-[var(--accent2)] border-[var(--accent2)]/20">
                        {session.type}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-border">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 border-border bg-muted/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                <div>
                  <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    You'll receive Zoom links via email
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All session links are sent 24 hours before the scheduled time. Can't make it? Contact support to reschedule.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Billing & Invoices
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Current Plan
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <Badge className="bg-[var(--accent)] text-white border-none">
                      Pro Monthly
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      £197/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Next billing</span>
                    <span>Nov 1, 2025</span>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full border-border">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="w-full border-border text-destructive hover:text-destructive">
                      Cancel Membership
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Payment Method
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded bg-muted/50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm">•••• •••• •••• 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 12/26</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-border">
                    Update Payment Method
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="overflow-hidden border-border">
              <div className="p-6">
                <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Invoice History
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.plan}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Card className="p-6 border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our support team is here for you 24/7
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-border">
                <FileText className="w-4 h-4 mr-2" />
                Support
              </Button>
              <Button variant="outline" className="border-border text-destructive hover:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}