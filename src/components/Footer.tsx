import { Facebook, Youtube, Send, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Company</h3>
            <nav className="flex flex-col space-y-2">
              <button onClick={() => onNavigate('about')} className="text-muted-foreground hover:text-foreground text-left transition-colors">About Us</button>
              <button onClick={() => onNavigate('testimonials')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Testimonials</button>
              <button onClick={() => onNavigate('contact')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Contact</button>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Resources</h3>
            <nav className="flex flex-col space-y-2">
              <button onClick={() => onNavigate('blog')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Blog</button>
              <button onClick={() => onNavigate('products')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Digital Products</button>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a>
            </nav>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Programs</h3>
            <nav className="flex flex-col space-y-2">
              <button onClick={() => onNavigate('class')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Class / Hub</button>
              <button onClick={() => onNavigate('services')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Consultancy</button>
              <button onClick={() => onNavigate('booking')} className="text-muted-foreground hover:text-foreground text-left transition-colors">Book a Call</button>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Affiliate Program</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get weekly insights on building digital income.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-input-background border-border"
              />
              <Button size="icon" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-[var(--accent)] hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-[var(--accent2)] hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-[var(--accent2)] hover:text-white flex items-center justify-center transition-all"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-semibold">N</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Nas Digital Growth. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}