import { useState } from 'react';
import { User } from '../../../lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  BookOpen, 
  Users, 
  PlayCircle, 
  Upload,
  BarChart3,
  MessageSquare,
  Star,
  Settings,
  Bell,
  Plus,
  Video,
  FileText
} from 'lucide-react';

interface InstructorDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function InstructorDashboard({ user, onNavigate }: InstructorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const [instructorData] = useState({
    stats: {
      totalCourses: 8,
      totalStudents: 156,
      averageRating: 4.7,
      monthlyEarnings: 2840
    },
    courses: [
      {
        id: 1,
        title: 'Digital Marketing Fundamentals',
        students: 45,
        rating: 4.8,
        status: 'published',
        revenue: 1350
      },
      {
        id: 2,
        title: 'E-commerce Business Setup',
        students: 32,
        rating: 4.6,
        status: 'published',
        revenue: 960
      },
      {
        id: 3,
        title: 'Advanced SEO Strategies',
        students: 0,
        rating: 0,
        status: 'draft',
        revenue: 0
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
                <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
                <p className="text-muted-foreground">Create and manage your courses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold">{instructorData.stats.totalCourses}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold">{instructorData.stats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-[var(--accent2)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">{instructorData.stats.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-[var(--gold)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                      <p className="text-2xl font-bold">${instructorData.stats.monthlyEarnings}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Overview
                </CardTitle>
                <CardDescription>Manage your published and draft courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorData.courses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{course.students} students</span>
                          <span>${course.revenue} revenue</span>
                          {course.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                              <span>{course.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Courses</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorData.courses.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.students} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      {course.rating > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Revenue</span>
                        <span className="font-medium">${course.revenue}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Edit</Button>
                        <Button size="sm" variant="outline">Analytics</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and interact with your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Student management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
                <CardDescription>Track your course performance and student engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your course revenue and payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Earnings analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}