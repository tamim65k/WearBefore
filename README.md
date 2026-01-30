# WereBefore - Fashion E-Commerce Platform 🛍️

<div align="center">

![WereBefore Logo](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop&crop=center)

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
- **Shopping Cart**: Real-time cart updates with persistent storage
- **Checkout System**: Complete checkout flow with shipping and payment forms
- **Order Management**: Order confirmation and tracking system

### 🤖 **AI Virtual Try-On**
- Upload your photo and visualize how products look on you
- Real-time AI processing simulation
- Product overlay and result sharing
- Enhanced shopping experience

### 👤 **User Management**
- User registration and authentication system
- Personal account dashboard
- Order history tracking
- Wishlist functionality
- Profile management

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
git clone https://github.com/tamim65k/WereBefore.git

# Navigate to project directory
cd WereBefore

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
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
WereBefore/
├── 📂 app/                    # Next.js app router pages
│   ├── 📂 account/           # User account pages
│   ├── 📂 auth/              # Authentication (login/register)
│   ├── 📂 cart/              # Shopping cart
│   ├── 📂 checkout/          # Checkout flow
│   ├── 📂 contact/           # Contact page with team info
│   ├── 📂 products/          # Product catalog & details
│   ├── 📂 category/          # Product categories
│   ├── 📂 virtual-tryon/     # AI virtual try-on
│   └── 📂 ...               # Other pages (FAQ, shipping, etc.)
├── 📂 components/            # Reusable React components
│   ├── 📂 layout/           # Header, Footer components
│   ├── 📂 cart/             # Cart-related components
│   └── 📂 products/         # Product components
├── 📂 data/                  # Static data and mock data
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
# No environment variables required for demo
# All features work with static data
```

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tamim65k/WereBefore)

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
To connect to a real backend:
1. Update store files (`store/cartStore.ts`, `store/authStore.ts`)
2. Replace demo functions with actual API calls
3. Add environment variables in `.env.local`

## 🔄 Development Workflow

```bash
# Start development
npm run dev

# Type checking
npm run type-check

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

- [ ] **Backend Integration** with REST API
- [ ] **Payment Gateway** integration (Stripe/PayPal)
- [ ] **Real AI Try-On** with ML models
- [ ] **User Reviews & Ratings** system
- [ ] **Admin Dashboard** for product management
- [ ] **Email Notifications** for orders
- [ ] **Multi-language Support**
- [ ] **Social Media Integration**

## 🐛 Known Issues

- Minor ESLint warnings (non-blocking)
- @next/swc version mismatch warning
- Browser extension hydration warnings

See [Issues](https://github.com/tamim65k/WereBefore/issues) for full list.

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

Made with ❤️ by [Team WereBefore](https://github.com/tamim65k/WereBefore)

[🔝 Back to Top](#werebefore---fashion-e-commerce-platform-)

</div>

## Features

### 🛍️ E-Commerce Core
- **Product Catalog**: Browse sneakers, watches, shirts, pants, and accessories
- **Advanced Search & Filters**: Category, price range, and sorting options
- **Product Details**: High-quality images, size/color selection, reviews
- **Shopping Cart**: Real-time cart updates with persistent storage
- **Checkout Flow**: Complete checkout with shipping and payment forms
- **Order Management**: Order confirmation and tracking

### 🤖 AI Virtual Try-On
- Upload your photo and see how products look on you
- Real-time AI processing simulation
- Product overlay and visualization
- Download and share results

### 👤 User Management
- User registration and login (demo authentication)
- User profile and account management
- Order history
- Wishlist functionality

### 📱 Responsive Design
- Fully responsive across all devices
- Mobile-first approach
- Touch-friendly navigation
- Optimized for tablets and desktops

### 🎨 Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Accessible components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd "c:\\Users\\mythz\\Desktop\\project werebefore"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

#### Quick Deploy
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure everything
4. Click "Deploy"

#### Using Vercel CLI
```bash
npm install -g vercel
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Other Platforms
- **Netlify**: Supports Next.js with automatic configuration
- **AWS Amplify**: Full Next.js support with SSR
- **Docker**: Can be containerized for any platform

## Project Structure

```
project werebefore/
├── app/                          # Next.js app router pages
│   ├── account/                 # User account pages
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── cart/                    # Shopping cart page
│   ├── checkout/                # Checkout flow
│   ├── products/                # Product catalog
│   │   ├── [category]/         # Category pages
│   │   └── [id]/               # Product detail pages
│   ├── virtual-tryon/          # AI virtual try-on
│   ├── order-confirmation/     # Order success page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── cart/                   # Cart components
│   │   └── CartSidebar.tsx
│   └── products/               # Product components
│       └── ProductCard.tsx
├── data/                        # Static data
│   └── products.ts             # Product catalog
├── store/                       # State management
│   ├── cartStore.ts            # Shopping cart store
│   └── authStore.ts            # Authentication store
├── types/                       # TypeScript types
│   └── index.ts
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies

```

## Key Features Implementation

### Shopping Cart
- Persistent cart using Zustand with localStorage
- Add/remove items with size and color variants
- Quantity management
- Real-time price calculations

### Product Catalog
- 20+ demo products with real images from Unsplash
- Multiple categories
- Filtering and sorting
- Search functionality

### Virtual Try-On
- Image upload interface
- Product selection grid
- Simulated AI processing
- Result preview and sharing

### Authentication
- Login and registration forms
- Demo authentication (no backend required)
- Protected routes
- User profile management

## Demo Data

The application includes demo products for:
- Sneakers (4 products)
- Watches (4 products)
- Shirts (4 products)
- Pants (4 products)
- Accessories (2 products)

All product images are sourced from Unsplash for demonstration purposes.

## Customization

### Adding Products
Edit `data/products.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  category: 'sneakers',
  images: ['image-url'],
  sizes: ['S', 'M', 'L'],
  colors: ['Black', 'White'],
  inStock: true,
}
```

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-level styles use Tailwind utility classes

### API Integration
To connect to a real backend:
1. Update store files (`store/cartStore.ts`, `store/authStore.ts`)
2. Replace demo functions with actual API calls
3. Add environment variables in `.env.local`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Efficient state management
- Fast page transitions

## Future Enhancements

- Backend API integration
- Real payment processing
- Advanced AI try-on with actual ML models
- Product reviews and ratings system
- Admin dashboard for product management
- Email notifications
- Social media integration
- Multi-language support

## License

This project is for demonstration purposes.

## Support

For questions or issues, please refer to the [Next.js documentation](https://nextjs.org/docs).

---

Built with ❤️ using Next.js and TypeScript
