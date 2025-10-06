import { useState, useEffect } from 'react';
import { User } from '../../../lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Calendar } from '../../ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Video,
  FileText,
  Star,
  Settings,
  Bell,
  Plus
} from 'lucide-react';

interface ConsultantDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function ConsultantDashboard({ user, onNavigate }: ConsultantDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data - replace with real API calls
  const [consultantData, setConsultantData] = useState({
    stats: {
      totalClients: 47,
      monthlyEarnings: 3250,
      averageRating: 4.8,
      sessionsThisWeek: 12
    },
    upcomingSessions: [
      {
        id: 1,
        client: 'Sarah Ahmed',
        service: 'Business Strategy',
        date: '2024-12-10',
        time: '10:00 AM',
        duration: '60 min',
        type: 'video',
        status: 'confirmed'
      },
      {
        id: 2,
        client: 'John Smith',
        service: 'Marketing Consultation',
        date: '2024-12-10',
        time: '2:00 PM',
        duration: '45 min',
        type: 'phone',
        status: 'pending'
      }
    ],
    recentSessions: [
      {
        id: 1,
        client: 'Maria Garcia',
        service: 'E-commerce Setup',
        date: '2024-12-08',
        rating: 5,
        feedback: 'Excellent guidance on setting up my online store!'
      },
      {
        id: 2,
        client: 'David Chen',
        service: 'Digital Marketing',
        date: '2024-12-07',
        rating: 5,
        feedback: 'Very helpful session, learned a lot about SEO strategies.'
      }
    ],
    earnings: {
      thisMonth: 3250,
      lastMonth: 2890,
      growth: 12.5
    },
    services: [
      {
        id: 1,
        name: 'Business Strategy Consultation',
        price: 150,
        duration: '60 min',
        bookings: 23,
        rating: 4.9
      },
      {
        id: 2,
        name: 'Marketing Consultation',
        price: 100,
        duration: '45 min',
        bookings: 18,
        rating: 4.7
      },
      {
        id: 3,
        name: 'E-commerce Setup Guide',
        price: 120,
        duration: '60 min',
        bookings: 15,
        rating: 4.8
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold">Consultant Dashboard</h1>
                <p className="text-muted-foreground">Manage your consultations and clients</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                      <p className="text-2xl font-bold">{consultantData.stats.totalClients}</p>
                    </div>
                    <Users className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                      <p className="text-2xl font-bold">${consultantData.stats.monthlyEarnings}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-[var(--accent2)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">{consultantData.stats.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-[var(--gold)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">{consultantData.stats.sessionsThisWeek}</p>
                    </div>
                    <Clock className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your next consultations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {consultantData.upcomingSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {session.type === 'video' ? (
                          <Video className="h-5 w-5 text-[var(--accent)]" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-[var(--accent2)]" />
                        )}
                        <div>
                          <h4 className="font-medium">{session.client}</h4>
                          <p className="text-sm text-muted-foreground">{session.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.date} at {session.time} ({session.duration})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                          {session.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Recent Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {consultantData.recentSessions.map(session => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{session.client}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < session.rating ? 'fill-[var(--gold)] text-[var(--gold)]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{session.service}</p>
                      <p className="text-sm italic">"{session.feedback}"</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Services Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Services</CardTitle>
                <CardDescription>Manage your consultation offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {consultantData.services.map(service => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{service.name}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Price: ${service.price} / {service.duration}</p>
                        <p>Bookings: {service.bookings}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        Edit Service
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                  <CardDescription>Manage your availability and appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultantData.upcomingSessions
                      .filter(session => session.date === '2024-12-10')
                      .map(session => (
                        <div key={session.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{session.time}</span>
                            <Badge variant="outline">{session.duration}</Badge>
                          </div>
                          <p className="text-sm">{session.client}</p>
                          <p className="text-xs text-muted-foreground">{session.service}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs can be implemented similarly */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>View and manage your client relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Client management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Create and manage your consultation services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Service management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your consultation income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Earnings analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>View feedback from your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Review management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}