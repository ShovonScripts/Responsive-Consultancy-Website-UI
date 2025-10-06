import { useState, useEffect } from 'react';
import { User } from '../../../lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  BookOpen, 
  Calendar, 
  User as UserIcon, 
  Bell, 
  Award, 
  Clock, 
  PlayCircle,
  MessageSquare,
  TrendingUp,
  Target,
  Star,
  Download,
  Settings
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function StudentDashboard({ user, onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real API calls
  const [studentData, setStudentData] = useState({
    enrolledCourses: [
      {
        id: 1,
        title: 'Digital Marketing Fundamentals',
        instructor: 'Sarah Johnson',
        progress: 75,
        nextLesson: 'Social Media Strategy',
        totalLessons: 12,
        completedLessons: 9
      },
      {
        id: 2,
        title: 'E-commerce Business Setup',
        instructor: 'Mike Chen',
        progress: 45,
        nextLesson: 'Payment Gateway Integration',
        totalLessons: 15,
        completedLessons: 7
      }
    ],
    upcomingBookings: [
      {
        id: 1,
        consultant: 'Dr. Ahmed Hassan',
        service: 'Business Strategy Consultation',
        date: '2024-12-10',
        time: '2:00 PM',
        duration: '60 minutes'
      }
    ],
    achievements: [
      { id: 1, title: 'First Course Completed', date: '2024-11-15', icon: '🎓' },
      { id: 2, title: 'Study Streak (7 days)', date: '2024-11-20', icon: '🔥' },
      { id: 3, title: 'Quiz Master', date: '2024-11-25', icon: '⭐' }
    ],
    recentActivity: [
      { id: 1, action: 'Completed lesson', item: 'Email Marketing Basics', time: '2 hours ago' },
      { id: 2, action: 'Booked consultation', item: 'Business Strategy Session', time: '1 day ago' },
      { id: 3, action: 'Downloaded resource', item: 'Marketing Templates', time: '2 days ago' }
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
                <h1 className="text-2xl font-semibold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('profile')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
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
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                      <p className="text-2xl font-bold">{studentData.enrolledCourses.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                      <p className="text-2xl font-bold">
                        {Math.round(studentData.enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / studentData.enrolledCourses.length)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-[var(--accent2)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                      <p className="text-2xl font-bold">{studentData.achievements.length}</p>
                    </div>
                    <Award className="h-8 w-8 text-[var(--gold)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Next Session</p>
                      <p className="text-2xl font-bold">Dec 10</p>
                    </div>
                    <Calendar className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Continue Learning
                  </CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.enrolledCourses.map(course => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        </div>
                        <Badge variant="secondary">{course.progress}%</Badge>
                      </div>
                      <Progress value={course.progress} className="mb-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center gap-3 p-2">
                      <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentData.upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {studentData.upcomingBookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <p className="text-sm text-muted-foreground">with {booking.consultant}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time} ({booking.duration})
                          </p>
                        </div>
                        <Button size="sm">Join Session</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming sessions</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => onNavigate('booking')}
                    >
                      Book a Consultation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Courses</h2>
              <Button onClick={() => onNavigate('class')}>
                Browse More Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentData.enrolledCourses.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Next: {course.nextLesson}
                      </div>
                      <Button className="w-full">Continue Learning</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Bookings</h2>
              <Button onClick={() => onNavigate('booking')}>
                Book New Session
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Book your first consultation session to get personalized guidance
                  </p>
                  <Button onClick={() => onNavigate('booking')}>
                    Book a Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-semibold">Learning Progress</h2>
            
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studentData.achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-4 border rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-2xl font-semibold">Learning Resources</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Resources Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Access downloadable materials, templates, and tools for your courses
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}