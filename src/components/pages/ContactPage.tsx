import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 mb-6">
          Get in Touch
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          We're Here to Help
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question? Need support? Want to partner with us? Drop us a message and we'll get back to you within 24 hours.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                We're a remote-first team serving clients worldwide. Reach us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Email
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For general enquiries
                    </p>
                    <a href="mailto:hello@nasdigitalgrowth.com" className="text-[var(--accent)] hover:underline">
                      hello@nasdigitalgrowth.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--accent2)]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[var(--accent2)]" />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      WhatsApp
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For urgent matters
                    </p>
                    <a href="https://wa.me/8801733956590" className="text-[var(--accent)] hover:underline">
                      +880 1733-956590
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Office
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Dhaka, Bangladesh
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Remote-first team • Global clients
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Illustration */}
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5NzI2MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8 border-border">
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-input-background border-border"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-input-background border-border"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="bg-input-background border-border"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your enquiry..."
                    className="bg-input-background border-border min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                  size="lg"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-[var(--accent)] hover:underline">
                    Privacy Policy
                  </a>
                  . We respect your privacy and will never share your information.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* GDPR Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <Card className="p-6 border-border bg-muted/20">
          <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your Privacy Matters
          </h3>
          <p className="text-sm text-muted-foreground">
            NDG is committed to protecting your personal data. We process information in accordance with GDPR and applicable data protection laws. Your data will only be used to respond to your enquiry and will not be shared with third parties. For more information, please read our{' '}
            <a href="#" className="text-[var(--accent)] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </Card>
      </section>
    </div>
  );
}