import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Calendar, Clock, CheckCircle2, Globe } from 'lucide-react';

export function BookingPage() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessStage: '',
    goals: '',
    consent: false,
  });

  const services = [
    'Growth Audit - £497',
    'Funnel Build - £1,497',
    'Ads & Analytics - £997/mo',
    'YouTube Strategy - £797',
    'Free 15-min Discovery Call',
  ];

  const availableDates = [
    '2025-10-10',
    '2025-10-11',
    '2025-10-12',
    '2025-10-13',
    '2025-10-14',
  ];

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.consent && selectedDate && selectedTime) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
          Book a Call
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Let's Build Your Digital Income Together
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose a service, pick a time, and we'll confirm your booking within 24 hours. No commitment required for discovery calls.
        </p>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="mb-6">
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Your Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fill in your information and we'll get back to you shortly
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service">Select Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service" className="bg-input-background border-border">
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    className="bg-input-background border-border"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-input-background border-border"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp / Telegram</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    className="bg-input-background border-border"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Business Stage */}
                <div className="space-y-2">
                  <Label htmlFor="stage">Current Business Stage</Label>
                  <Select
                    value={formData.businessStage}
                    onValueChange={(value) => setFormData({ ...formData, businessStage: value })}
                  >
                    <SelectTrigger id="stage" className="bg-input-background border-border">
                      <SelectValue placeholder="Select your stage..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Just an idea</SelectItem>
                      <SelectItem value="starting">Getting started (£0-1K/mo)</SelectItem>
                      <SelectItem value="growing">Growing (£1K-5K/mo)</SelectItem>
                      <SelectItem value="scaling">Scaling (£5K+/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <Label htmlFor="goals">What are your main goals?</Label>
                  <Textarea
                    id="goals"
                    placeholder="Tell us what you want to achieve..."
                    className="bg-input-background border-border min-h-[100px]"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, consent: checked as boolean })
                    }
                  />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to receive email updates and understand that NDG will process my data in accordance with the{' '}
                    <a href="#" className="text-[var(--accent)] hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              </form>
            </Card>

            {/* Timezone Info */}
            <Card className="p-4 border-border bg-muted/20">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                <div className="text-sm">
                  <p className="mb-1">
                    <span className="font-medium">Auto-detected timezone:</span> Asia/Dhaka (GMT+6)
                  </p>
                  <p className="text-muted-foreground">
                    All times shown are in your local timezone. You'll receive reschedule/cancel links via email.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Calendar */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="mb-6">
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Select Date & Time
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred date and time slot
                </p>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <Label>Available Dates</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedDate === date
                          ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'border-border hover:border-[var(--accent)]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(date).toLocaleDateString('en-GB', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="space-y-4">
                  <Label>Available Times</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          selectedTime === time
                            ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                            : 'border-border hover:border-[var(--accent)]/50'
                        }`}
                      >
                        <Clock className="w-3 h-3 mx-auto mb-1" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!formData.consent || !selectedDate || !selectedTime || !formData.name || !formData.email}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
              size="lg"
            >
              Confirm Booking
            </Button>

            {/* Trust Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <p>We'll confirm via email within 24 hours</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <p>Free cancellation up to 24 hours before</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <p>All calls are via Zoom (link sent after confirmation)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <DialogTitle className="text-center text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Booking Request Received!
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <p>
                Thank you, <span className="font-medium text-foreground">{formData.name}</span>! We've received your booking request for:
              </p>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium text-foreground">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium text-foreground">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium text-foreground">{selectedTime}</span>
                </div>
              </div>
              <p className="text-sm">
                We'll send a confirmation email to <span className="font-medium text-foreground">{formData.email}</span> within 24 hours with your Zoom link and calendar invite.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowConfirmation(false)}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          >
            Got it, thanks!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}