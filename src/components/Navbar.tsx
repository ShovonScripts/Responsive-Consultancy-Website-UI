import { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { useCart } from '../lib/cart-context';
import { useLocalAuth } from '../lib/local-auth';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useLocalAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You've been logged out");
      onNavigate('home');
      setMobileMenuOpen(false);
    } catch (error: any) {
      toast.error('Failed to logout');
    }
  };

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'services', label: 'Services' },
    { key: 'booking', label: 'Booking' },
    { key: 'products', label: 'Products' },
    { key: 'class', label: 'Class / Hub' },
    { key: 'blog', label: 'Blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">N</span>
            </div>
            <span className="text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NDG
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPage === link.key
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent)] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Authentication Controls */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem onClick={() => onNavigate('admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="hidden md:inline-flex"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  className="hidden md:inline-flex bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                >
                  Join Now
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => {
                  onNavigate(link.key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === link.key
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 px-4 pt-2">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  {isAdmin() && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigate('admin');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                  >
                    Join Now
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
