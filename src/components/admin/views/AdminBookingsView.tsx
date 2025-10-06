import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { adminAPI } from '../../../lib/mock-api';
import { Calendar, Check, X, Loader2, Eye, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../ui/sheet';
import { Separator } from '../../ui/separator';
import { toast } from 'sonner@2.0.3';
import { cn } from '../../ui/utils';

export function AdminBookingsView() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { bookings: bookingData } = await adminAPI.getBookings();
      setBookings(bookingData);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleConfirm = async (id: string) => {
    try {
      await adminAPI.confirmBooking(id);
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: 'confirmed' });
      }
      toast.success('Booking confirmed successfully');
    } catch (error) {
      toast.error('Failed to confirm booking');
    }
  };

  const handleReschedule = async (id: string) => {
    try {
      await adminAPI.updateBooking(id, { status: 'rescheduled' });
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'rescheduled' } : b)));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: 'rescheduled' });
      }
      toast.success('Booking rescheduled successfully');
    } catch (error) {
      toast.error('Failed to reschedule booking');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await adminAPI.cancelBooking(id);
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: 'cancelled' });
      }
      toast.success('Booking cancelled');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rescheduled':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
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
      <div>
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Bookings & Meetings
        </h1>
        <p className="text-muted-foreground">Manage consultation bookings and meetings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
          <h3 className="text-2xl">{bookings.length}</h3>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
          <h3 className="text-2xl text-green-500">
            {bookings.filter((b) => b.status === 'confirmed').length}
          </h3>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <h3 className="text-2xl text-yellow-500">
            {bookings.filter((b) => b.status === 'pending').length}
          </h3>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-1">This Month</p>
          <h3 className="text-2xl">
            {bookings.filter((b) => {
              const bookingDate = new Date(b.date);
              const now = new Date();
              return bookingDate.getMonth() === now.getMonth() && 
                     bookingDate.getFullYear() === now.getFullYear();
            }).length}
          </h3>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="border-border">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="border-b border-border last:border-0 hover:bg-muted-bg/50 cursor-pointer"
                    onClick={() => handleViewDetails(booking)}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{booking.userName || 'Guest User'}</p>
                        <p className="text-sm text-muted-foreground">{booking.userEmail || 'No email'}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{booking.serviceName}</p>
                      <p className="text-xs text-muted-foreground">ID: {booking.id.substring(0, 8)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">{booking.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={cn('capitalize', getStatusColor(booking.status))}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(booking);
                          }}
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirm(booking.id);
                            }}
                            className="text-green-600 hover:text-green-600"
                            title="Confirm booking"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel(booking.id);
                          }}
                          className="text-destructive hover:text-destructive"
                          title="Cancel booking"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Booking Details Drawer */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedBooking && (
            <>
              <SheetHeader>
                <SheetTitle>Booking Details</SheetTitle>
                <SheetDescription>
                  Review and manage this booking
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge className={cn('capitalize text-sm px-3 py-1', getStatusColor(selectedBooking.status))}>
                    {selectedBooking.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    ID: {selectedBooking.id.substring(0, 12)}
                  </p>
                </div>

                <Separator />

                {/* Service Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Service Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium">{selectedBooking.serviceName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">
                          {new Date(selectedBooking.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm">{selectedBooking.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Client Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedBooking.userName || 'Guest User'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedBooking.userEmail || 'No email provided'}</p>
                      </div>
                    </div>
                    {selectedBooking.userPhone && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{selectedBooking.userPhone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedBooking.notes && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                        <h3 className="font-semibold">Notes</h3>
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted-bg/50 p-3 rounded-lg">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Actions */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Actions</h3>
                  
                  {selectedBooking.status === 'pending' && (
                    <Button
                      onClick={() => handleConfirm(selectedBooking.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Booking
                    </Button>
                  )}

                  {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                    <Button
                      onClick={() => handleReschedule(selectedBooking.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                  )}

                  {selectedBooking.status !== 'cancelled' && (
                    <Button
                      onClick={() => handleCancel(selectedBooking.id)}
                      variant="outline"
                      className="w-full text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
