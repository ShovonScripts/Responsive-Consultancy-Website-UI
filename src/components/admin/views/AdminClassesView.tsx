import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { adminAPI } from '../../../lib/mock-api';
import { Plus, Users, Calendar, Loader2, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';

export function AdminClassesView() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  
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
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const { classes: classData } = await adminAPI.getClasses();
      setClasses(classData);
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async () => {
    try {
      const newClass = {
        id: `class-${Date.now()}`,
        title: classForm.title,
        track: classForm.track,
        startDate: classForm.startDate,
        status: 'draft',
        currentStudents: 0,
        maxStudents: parseInt(classForm.capacity) || 30,
        price: parseFloat(classForm.price) || 0,
        duration: 'month',
        description: classForm.description,
        nextSession: classForm.startDate,
        tier: classForm.track
      };
      
      setClasses([newClass, ...classes]);
      toast.success('Class created successfully');
      setShowCreateModal(false);
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

  const handleEditClass = async () => {
    try {
      const updatedClasses = classes.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, ...classForm }
          : cls
      );
      setClasses(updatedClasses);
      toast.success('Class updated successfully');
      setShowEditModal(false);
      setSelectedClass(null);
    } catch (error) {
      toast.error('Failed to update class');
    }
  };

  const handlePublishClass = async () => {
    try {
      const updatedClasses = classes.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, status: 'published' }
          : cls
      );
      setClasses(updatedClasses);
      toast.success('Class published successfully');
      setShowPublishDialog(false);
      setSelectedClass(null);
    } catch (error) {
      toast.error('Failed to publish class');
    }
  };

  const handleDeleteClass = async () => {
    try {
      const updatedClasses = classes.filter(cls => cls.id !== selectedClass.id);
      setClasses(updatedClasses);
      toast.success('Class deleted successfully');
      setShowDeleteDialog(false);
      setSelectedClass(null);
    } catch (error) {
      toast.error('Failed to delete class');
    }
  };

  const openEditModal = (cls: any) => {
    setSelectedClass(cls);
    setClassForm({
      title: cls.title,
      track: cls.track || cls.tier,
      startDate: cls.startDate,
      timezone: 'UTC',
      sessionCount: '',
      price: cls.price.toString(),
      capacity: cls.maxStudents.toString(),
      description: cls.description
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Classes & Subscriptions
          </h1>
          <p className="text-muted-foreground">Manage subscription tiers and cohorts</p>
        </div>
        <Button 
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg">{cls.title}</h3>
                  <Badge 
                    className={cls.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}
                  >
                    {cls.status || 'draft'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cls.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Track: <span className="capitalize">{cls.tier || cls.track}</span> · 
                  Starts {new Date(cls.startDate || cls.nextSession).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-xl font-semibold">${cls.price}/{cls.duration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Students</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xl font-semibold">
                    {cls.currentStudents}/{cls.maxStudents}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Next session: {new Date(cls.nextSession).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openEditModal(cls)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              {cls.status !== 'published' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowPublishDialog(true);
                  }}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Publish
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setSelectedClass(cls);
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
        
        {classes.length === 0 && (
          <Card className="p-12 text-center col-span-2">
            <p className="text-muted-foreground">No classes created yet. Click "Create Class" to get started.</p>
          </Card>
        )}
      </div>

      {/* Create Class Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>Set up a new class or cohort</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="create-title">Class Title *</Label>
              <Input
                id="create-title"
                value={classForm.title}
                onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                placeholder="Skill Pyramid Bootcamp"
              />
              {!classForm.title && <p className="text-xs text-destructive mt-1">Required</p>}
            </div>
            <div>
              <Label htmlFor="create-track">Track *</Label>
              <Select value={classForm.track} onValueChange={(value) => setClassForm({ ...classForm, track: value })}>
                <SelectTrigger id="create-track">
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
                <Label htmlFor="create-start">Start Date *</Label>
                <Input
                  id="create-start"
                  type="date"
                  value={classForm.startDate}
                  onChange={(e) => setClassForm({ ...classForm, startDate: e.target.value })}
                />
                {!classForm.startDate && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
              <div>
                <Label htmlFor="create-timezone">Timezone *</Label>
                <Select value={classForm.timezone} onValueChange={(value) => setClassForm({ ...classForm, timezone: value })}>
                  <SelectTrigger id="create-timezone">
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
                <Label htmlFor="create-sessions">Session Count</Label>
                <Input
                  id="create-sessions"
                  type="number"
                  value={classForm.sessionCount}
                  onChange={(e) => setClassForm({ ...classForm, sessionCount: e.target.value })}
                  placeholder="12"
                />
              </div>
              <div>
                <Label htmlFor="create-price">Price</Label>
                <Input
                  id="create-price"
                  type="number"
                  value={classForm.price}
                  onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                  placeholder="299"
                />
              </div>
              <div>
                <Label htmlFor="create-capacity">Capacity</Label>
                <Input
                  id="create-capacity"
                  type="number"
                  value={classForm.capacity}
                  onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                  placeholder="30"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="create-desc">Short Description</Label>
              <Textarea
                id="create-desc"
                value={classForm.description}
                onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                placeholder="Brief description of the class"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
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

      {/* Edit Class Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>Update class information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Class Title *</Label>
              <Input
                id="edit-title"
                value={classForm.title}
                onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-track">Track *</Label>
              <Select value={classForm.track} onValueChange={(value) => setClassForm({ ...classForm, track: value })}>
                <SelectTrigger id="edit-track">
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
                <Label htmlFor="edit-start">Start Date *</Label>
                <Input
                  id="edit-start"
                  type="date"
                  value={classForm.startDate}
                  onChange={(e) => setClassForm({ ...classForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-timezone">Timezone *</Label>
                <Select value={classForm.timezone} onValueChange={(value) => setClassForm({ ...classForm, timezone: value })}>
                  <SelectTrigger id="edit-timezone">
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
                <Label htmlFor="edit-sessions">Session Count</Label>
                <Input
                  id="edit-sessions"
                  type="number"
                  value={classForm.sessionCount}
                  onChange={(e) => setClassForm({ ...classForm, sessionCount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={classForm.price}
                  onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={classForm.capacity}
                  onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-desc">Short Description</Label>
              <Textarea
                id="edit-desc"
                value={classForm.description}
                onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button 
              onClick={handleEditClass}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Confirmation */}
      <AlertDialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Class</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to publish "{selectedClass?.title}"? This will make it visible to students.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePublishClass}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
            >
              Publish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedClass?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteClass}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
