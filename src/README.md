# Nas Digital Growth (NDG) Website

A comprehensive, production-ready React website for **Nas Digital Growth** — a consultancy helping students, freelancers, and small businesses build digital income systems.

## ✨ Features

### Core Pages
- **Home** - Hero with Weather Widget, value props, stats, featured products, testimonials
- **About** - Timeline, founder story, principles, partners
- **Services** - Service cards, comparison table, FAQ accordion
- **Booking** - Calendar integration, timezone detection, confirmation flow
- **Digital Products** - Filterable store, cart drawer, checkout
- **Class/Hub** - Subscription tiers with monthly/quarterly/annual toggle
- **Blog** - Searchable articles with category filters
- **Contact** - Contact form with info cards and GDPR compliance
- **Testimonials** - Filterable case studies with detailed results
- **Dashboard** - Authenticated member area with courses, sessions, billing

### Design System

#### Theming
- ✅ **Full Light + Dark Mode** with system preference detection
- ✅ **One-click Theme Switcher** in navigation
- ✅ **Custom Color Tokens**:
  - Accent (Green): `#16A34A`
  - Accent2 (Blue): `#0F74FF`
  - Gold: `#D4AF37`
  - Custom ink, muted, bg, panel, border tokens
- ✅ **WCAG AA Accessible** contrast ratios in both themes
- ✅ Gradient mesh background in dark mode

#### Typography
- **Headings & CTAs**: Poppins
- **Body & UI**: Inter
- **8pt spacing grid** throughout
- **Semantic HTML** with proper hierarchy

#### Components
- Cards with 16px radius and soft shadows
- Buttons (primary, secondary, outline, ghost)
- Forms (Input, Select, Textarea, Checkbox)
- Navigation (Navbar, Footer, Breadcrumbs)
- Data Display (Tables, Cards, Badges, Progress)
- Overlays (Dialog, Sheet, Drawer, Tooltip)
- Feedback (Toast, Skeleton, Alert)
- Special: Weather Widget, Theme Switcher, AI Panel, Cart Drawer

### Special Features

#### 🌤️ Live Watch & Weather Widget
- Real-time clock with analog + digital display
- Dhaka timezone (Asia/Dhaka) by default
- Current weather with 3-day forecast
- Greeting based on time of day

#### 🌍 Multilingual Support
- Language toggle (EN/BN)
- Translations for key UI elements
- RTL-ready layout structure

#### 💳 Payment Integration (UI)
- Stripe, PayPal badges
- Bangladesh-specific: bKash, Nagad indicators
- Invoice history and management

#### 🤖 AI Help Button
- Floating assistant panel
- Quick questions
- Mock conversational interface

#### 📱 Progressive Web App (PWA)
- Install prompt markers
- Offline-ready states
- Responsive design (390px, 1024px, 1440px)

#### 🔐 Authentication
- Sign in/up modals
- Passwordless magic link option
- Protected dashboard routes

#### 📊 Analytics (Mock)
- Admin panel with KPI tiles
- Funnel visualization
- MRR, churn, CAC/LTV tracking

#### 🎁 Referral Program
- Invite & Earn strip
- Share modal
- Affiliate tracking UI

#### 🍪 Compliance
- Cookie consent banner
- GDPR text and checkboxes
- Privacy policy links

#### ⚡ Performance
- Lazy loading markers
- Compressed vector graphics
- Core Web Vitals optimization notes

#### ♿ Accessibility
- Focus rings on interactive elements
- Skip-to-content link
- Keyboard navigation support
- Form inline errors and success states
- ARIA labels throughout

### Interactive Flows

1. **Booking Flow**
   - Select service → Choose date/time → Fill form → Confirmation modal

2. **Cart → Checkout**
   - Add products → Cart drawer → Checkout stepper → Success

3. **Subscription**
   - Choose plan → Billing toggle → Feature comparison → Sign up

4. **Theme Switching**
   - Smooth transitions between light/dark
   - Persisted in localStorage
   - System preference detection

## 🚀 Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - Component library
- **Lucide React** - Icons
- **Recharts** - Charts (if needed)
- **Motion/React** - Animations

## 📁 Project Structure

```
├── App.tsx                      # Main app with routing
├── components/
│   ├── pages/                   # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ClassHubPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── TestimonialsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── ui/                      # Shadcn components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeSwitcher.tsx
│   ├── LanguageToggle.tsx
│   ├── WeatherWidget.tsx
│   ├── AIHelpButton.tsx
│   ├── WhatsAppButton.tsx
│   └── CookieBanner.tsx
├── lib/
│   ├── theme-context.tsx        # Theme provider
│   └── language-context.tsx     # i18n provider
└── styles/
    └── globals.css              # Custom tokens + Tailwind config
```

## 🎨 Color Tokens

### Light Theme
- Ink: `#0D0D1A`
- Muted: `#5B6170`
- BG: `#F6F8FF`
- Panel: `#FFFFFF`
- Border: `#E7E9F2`

### Dark Theme
- Ink: `#EDEFF5`
- Muted: `#9AA3B2`
- BG: `#0D0D1A` (with gradient mesh)
- Panel: `#131622`
- Border: `#23263A`

### Brand Colors (Both Themes)
- Accent: `#16A34A` (Green)
- Accent2: `#0F74FF` (Blue)
- Gold: `#D4AF37`

## 🛠️ Customization

### Adding New Pages
1. Create component in `/components/pages/`
2. Import in `App.tsx`
3. Add case in `renderPage()` switch
4. Add navigation link in `Navbar.tsx`

### Adding Translations
Edit `/lib/language-context.tsx` and add key-value pairs for both `en` and `bn`.

### Modifying Theme Colors
Update CSS variables in `/styles/globals.css` under `:root` (light) and `.dark` (dark).

## 📱 Responsive Breakpoints

- Mobile: 390px (default)
- Tablet: 768px (md)
- Desktop: 1024px (lg)
- Large Desktop: 1440px (xl)

## 🔑 API Integration Notes

This is a frontend prototype with mock data. To integrate with real APIs:

1. **Booking**: Replace calendar mock with Calendly/Cal.com embed
2. **Weather**: Use OpenWeatherMap API
3. **Payments**: Integrate Stripe/PayPal SDK
4. **Auth**: Implement Supabase/Auth0
5. **Email**: Connect to SendGrid/Mailchimp

## 📄 License

This project is proprietary to Nas Digital Growth.

## 🤝 Contributing

This is a client project. For contributions, please contact the NDG team.

---

Built with ❤️ for **Nas Digital Growth** — empowering digital entrepreneurs worldwide.