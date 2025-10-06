import { useState } from 'react';
import { ThemeProvider } from './lib/theme-context';
import { CartProvider } from './lib/cart-context';
import { LocalAuthProvider, useLocalAuth } from './lib/local-auth';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIHelpButton } from './components/AIHelpButton';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { BookingPage } from './components/pages/BookingPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { CartPage } from './components/pages/CartPage';
import { ClassHubPage } from './components/pages/ClassHubPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogPostPage } from './components/pages/BlogPostPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ContactPage } from './components/pages/ContactPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { UserDashboard } from './components/pages/UserDashboard';
import { ProfilePage } from './components/pages/ProfilePage';
import { AdminPanel } from './components/admin/AdminPanel';
import { DevModeBanner } from './components/DevModeBanner';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, isLoading, user, isAdmin } = useLocalAuth();

  const renderPage = () => {
    // Admin routes
    if (currentPage === 'admin') {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        );
      }
      
      if (!isAuthenticated || !isAdmin()) {
        setCurrentPage('login');
        return null;
      }
      
      return <AdminPanel onNavigate={setCurrentPage} />;
    }

    // Auth routes
    if (currentPage === 'login') {
      if (isAuthenticated) {
        // If user is admin and tries to access login, redirect to admin
        if (isAdmin()) {
          setCurrentPage('admin');
        } else {
          setCurrentPage('dashboard');
        }
        return null;
      }
      return <LoginPage onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'register') {
      if (isAuthenticated) {
        setCurrentPage('dashboard');
        return null;
      }
      return <RegisterPage onNavigate={setCurrentPage} />;
    }

    // Protected user dashboard
    if (currentPage === 'dashboard') {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        );
      }
      
      if (!isAuthenticated) {
        setCurrentPage('login');
        return null;
      }
      
      return <UserDashboard onNavigate={setCurrentPage} />;
    }

    // Protected profile page
    if (currentPage === 'profile') {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        );
      }
      
      if (!isAuthenticated) {
        setCurrentPage('login');
        return null;
      }
      
      return <ProfilePage onNavigate={setCurrentPage} />;
    }

    // Public routes
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage />;
      case 'products':
        return <ProductsPage onNavigate={setCurrentPage} />;
      case 'cart':
        return <CartPage onNavigate={setCurrentPage} />;
      case 'class':
        return <ClassHubPage onNavigate={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'blog':
        return <BlogPage onNavigate={setCurrentPage} />;
      case 'blog-post':
        return <BlogPostPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const showNavAndFooter = currentPage !== 'admin' && 
                        currentPage !== 'login' && 
                        currentPage !== 'register' &&
                        currentPage !== 'profile' &&
                        !(currentPage === 'dashboard' && !isAuthenticated);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
      {showNavAndFooter && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
      
      <main className={showNavAndFooter ? "min-h-[calc(100vh-4rem)]" : "min-h-screen"}>
        {renderPage()}
      </main>

      {showNavAndFooter && <Footer onNavigate={setCurrentPage} />}

      {/* Floating Action Buttons */}
      {showNavAndFooter && (
        <>
          <WhatsAppButton />
          <AIHelpButton />
        </>
      )}

      {/* Cookie Banner */}
      {showNavAndFooter && <CookieBanner />}

      {/* Toast Notifications */}
      <Toaster />

      {/* Dev Mode Banner */}
      <DevModeBanner />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocalAuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LocalAuthProvider>
    </ThemeProvider>
  );
}