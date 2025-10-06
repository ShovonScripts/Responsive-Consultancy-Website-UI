import { useState } from 'react';
import { User } from '../../../lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Settings,
  Bell,
  BookOpen,
  UserPlus,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

interface MemberDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function MemberDashboard({ user, onNavigate }: MemberDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for member features
  const [memberData] = useState({
    stats: {
      connections: 24,
      eventsAttended: 8,
      communitiesJoined: 3,
      postsMade: 12
    },
    communities: [
      {
        id: 1,
        name: 'Digital Entrepreneurs',
        members: 1240,
        description: 'Connect with fellow digital business owners',
        joined: true
      },
      {
        id: 2,
        name: 'Marketing Hub',
        members: 890,
        description: 'Share marketing strategies and tips',
        joined: true
      },
      {
        id: 3,
        name: 'Freelancer Network',
        members: 560,
        description: 'Support and resources for freelancers',
        joined: false
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Digital Marketing Workshop',
        date: '2024-12-15',
        time: '3:00 PM',
        attendees: 45,
        type: 'workshop'
      },
      {
        id: 2,
        title: 'Networking Meetup',
        date: '2024-12-18',
        time: '6:00 PM',
        attendees: 32,
        type: 'networking'
      }
    ],
    recentPosts: [
      {
        id: 1,
        author: 'Sarah Johnson',
        content: 'Just launched my first online course! Feeling excited about this new journey.',
        time: '2 hours ago',
        likes: 15,
        comments: 3
      },
      {
        id: 2,
        author: 'Mike Chen',
        content: 'Looking for a web developer to collaborate on an e-commerce project. DM me!',
        time: '5 hours ago',
        likes: 8,
        comments: 7
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
                <h1 className="text-2xl font-semibold">Community Dashboard</h1>
                <p className="text-muted-foreground">Connect, learn, and grow together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Connections</p>
                      <p className="text-2xl font-bold">{memberData.stats.connections}</p>
                    </div>
                    <Users className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Events Attended</p>
                      <p className="text-2xl font-bold">{memberData.stats.eventsAttended}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-[var(--accent2)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Communities</p>
                      <p className="text-2xl font-bold">{memberData.stats.communitiesJoined}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-[var(--gold)]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Posts Made</p>
                      <p className="text-2xl font-bold">{memberData.stats.postsMade}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Community Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Community Feed
                  </CardTitle>
                  <CardDescription>Latest posts from your communities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {memberData.recentPosts.map(post => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{post.author}</h4>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-[var(--accent)]">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-[var(--accent)]">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-[var(--accent)]">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Events you might be interested in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {memberData.upcomingEvents.map(event => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.attendees} attending
                          </p>
                        </div>
                        <Badge variant="outline">
                          {event.type}
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Event
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* My Communities */}
            <Card>
              <CardHeader>
                <CardTitle>My Communities</CardTitle>
                <CardDescription>Communities you're part of</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {memberData.communities
                    .filter(community => community.joined)
                    .map(community => (
                      <div key={community.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{community.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {community.description}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {community.members} members
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          View Community
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discover Communities</CardTitle>
                <CardDescription>Find and join communities that match your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {memberData.communities.map(community => (
                    <div key={community.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{community.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {community.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {community.members} members
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={community.joined ? "outline" : "default"}
                        className="w-full"
                      >
                        {community.joined ? 'Joined' : 'Join Community'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Discover and join community events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Event management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your community profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Profile management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}