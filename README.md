# WearBefore - Fashion E-Commerce Platform 🛍️

<div align="center">

![WearBefore Logo](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop&crop=center)

**A modern, full-featured fashion e-commerce website built with Next.js 15**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)

[🚀 Live Demo](https://werebefore.vercel.app) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation)

</div>

## ✨ Features

### 🛒 **Complete E-Commerce Experience**
- **Product Catalog**: Browse sneakers, watches, shirts, pants, and accessories
- **Advanced Search & Filters**: Filter by category, price range, and sort options
- **Shopping Cart**: Real-time cart updates with local + server persistence (when logged in)
- **Checkout System**: Complete checkout flow with shipping and payment forms
- **Order Management**: Checkout creates orders and account history (Neon-backed)

### 🤖 **AI Trial (Gemini Stylist)**
- Conversational stylist that builds looks from the live catalog
- Product-aware suggestions with direct product links
- Bilingual responses (English/Bangla)
- Requires a Gemini API key for live responses

### 👤 **User Management**
- Auth0-powered login and signup flow
- Personal account dashboard
- Order history tracking
- Wishlist and profile management

### 📱 **Modern Design**
- Fully responsive across all devices
- Clean, professional UI/UX
- Smooth animations and transitions
- Mobile-first approach
- Accessible components

### 🎨 **Additional Pages**
- Contact Us with team information
- Shipping & Returns policies
- FAQ section
- Size guide
- New arrivals showcase

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with persistence
- **Authentication**: [Auth0](https://auth0.com/) (Next.js SDK)
- **Database**: [Neon Postgres](https://neon.tech/) (optional persistence)
- **AI**: Google Gemini API (optional, for AI Trial)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: Next.js Image component
- **Deployment**: [Vercel](https://vercel.com) ready

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tamim65k/WearBefore.git

# Navigate to project directory
cd WearBefore

# Install dependencies
npm install

# Optional: enable Auth0 + AI Trial + Neon persistence
# Copy .env.example to .env.local and fill values

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
WearBefore/
├── 📂 app/                    # Next.js app router pages
│   ├── 📂 account/           # User account pages
│   ├── 📂 auth/              # Authentication (login/register)
│   ├── 📂 cart/              # Shopping cart
│   ├── 📂 checkout/          # Checkout flow
│   ├── 📂 contact/           # Contact page with team info
│   ├── 📂 products/          # Product catalog & details
│   ├── 📂 category/          # Product categories
│   ├── 📂 ai-trial/          # Conversational AI trial
│   └── 📂 ...               # Other pages (FAQ, shipping, etc.)
├── 📂 components/            # Reusable React components
│   ├── 📂 layout/           # Header, Footer components
│   ├── 📂 cart/             # Cart-related components
│   └── 📂 products/         # Product components
├── 📂 data/                  # Static data and mock data
├── 📂 db/                    # Database schema
├── 📂 lib/                   # Auth + catalog + database helpers
├── 📂 store/                 # Zustand state management
├── 📂 types/                 # TypeScript type definitions
├── 📂 public/               # Static assets
└── 📄 ...                   # Config files
```

## 🎮 Demo Features

### 🛍️ **Shopping Experience**
- **20+ Demo Products** across 5 categories
- **Real Product Images** from Unsplash
- **Functional Cart** with quantity management
- **Size & Color Selection** for each product
- **Price Calculations** with shipping and tax

### 👥 **Team Section**
Meet our development team from **Dhaka International University (DIU)**:
- **Mohammad Tamim Hossen** - Frontend Developer
- **MD Emon Sarkar** - Project Lead
- **Showrov Shahriarar** - Technical Lead
- **Montasir Hasan Peal** - UI/UX Designer
- **Nusrat Jahan** - Content Manager
- **Nushaiba Kawser Era** - QA Specialist

## 🔧 Configuration

### Environment Variables
```bash
# Optional but recommended for full functionality
# Copy .env.example to .env.local and fill values

# Gemini API configuration for AI Trial
GEMINI_API_KEY=
GEMINI_MODEL=
AI_TRIAL_MAX_HISTORY=

# Auth0 configuration
AUTH0_SECRET=
AUTH0_DOMAIN=
APP_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# Neon database
DATABASE_URL=
```

Without these values, the UI still runs with static product data and local cart
persistence, but AI Trial responses and authenticated server persistence are disabled.

### Image Domains
Configure external image sources in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'i.pravatar.cc' },
  ]
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tamim65k/WearBefore)

**Or manually:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts for configuration
```

### Alternative Platforms
- **Netlify**: Full Next.js support
- **AWS Amplify**: SSR compatible
- **Railway**: One-click deployment
- **Heroku**: Docker deployment available

## 📚 Documentation

### Adding Products
Edit `data/products.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  category: 'sneakers' | 'watches' | 'shirts' | 'pants' | 'accessories',
  images: ['image-url'],
  sizes: ['S', 'M', 'L'],
  colors: ['Black', 'White'],
  inStock: true,
  featured: true,
  rating: 4.5,
  reviews: 100
}
```

### Customizing Styles
- **Global Styles**: `app/globals.css`
- **Tailwind Config**: `tailwind.config.ts`
- **Component Styles**: Tailwind utility classes

### API Integration
This project already ships with Next.js route handlers:
- `GET /api/products` (search/category/featured/new filters)
- `GET /api/products/[id]`
- `GET|PUT /api/cart` (Auth0 + Neon persistence)
- `GET|POST /api/orders`
- `POST /api/ai-trial` (Gemini-powered stylist)

Catalog data falls back to `data/products.ts` and `data/newArrivals.ts` when the
database is not configured. See `db/schema.sql` for the Neon schema.

## 🔄 Development Workflow

```bash
# Start development
npm run dev

# Linting
npm run lint

# Build and test
npm run build
npm start
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📋 Roadmap

- [ ] **Payment Gateway** integration (Stripe/PayPal)
- [ ] **Image-based AI Try-On** with ML models
- [ ] **User Reviews & Ratings** system
- [ ] **Admin Dashboard** for product management
- [ ] **Email Notifications** for orders
- [ ] **Expanded i18n + content management**
- [ ] **Social Media Integration**

## 🐛 Known Issues

- Minor ESLint warnings (non-blocking)
- @next/swc version mismatch warning
- Browser extension hydration warnings

See [Issues](https://github.com/tamim65k/WearBefore/issues) for full list.

## 📊 Performance

- **Lighthouse Score**: 95+ Performance
- **First Load JS**: ~102-118 kB
- **Static Pages**: 22 pages pre-rendered
- **Image Optimization**: Next.js automatic optimization

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for product images
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **Next.js** team for the amazing framework
- **Vercel** for seamless deployment
- **DIU CSE Department** for academic support

## 📞 Contact

**Mohammad Tamim Hossen**  
📧 Email: tamim.hossen@diu.edu.bd  
🐙 GitHub: [@tamim65k](https://github.com/tamim65k)  
🎓 Institution: Dhaka International University

---

<div align="center">

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Made with ❤️ by [Team WearBefore](https://github.com/tamim65k/WearBefore)

[🔝 Back to Top](#wearbefore---fashion-e-commerce-platform-)

</div>
