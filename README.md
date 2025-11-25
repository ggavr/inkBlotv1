# Inkblot Crew - Indie Romance Subscription Box Platform

A modern, headless e-commerce platform built with Next.js, TypeScript, and Shopify for the Inkblot Crew quarterly indie romance subscription box service.

## 🎯 Overview

Inkblot Crew is a quarterly subscription box service featuring curated indie romance books, bookish merchandise, digital extras, and access to an exclusive reading community. This platform provides both B2C (readers) and B2B (publishers) functionality.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **Styling**: Tailwind CSS
- **Commerce**: Shopify Storefront API
- **CMS**: Sanity (for marketing content)
- **State Management**: Zustand
- **Analytics**: Google Tag Manager, GA4
- **Hosting**: Vercel (recommended)

## 📁 Project Structure

```
inkBlotv1/
├── app/                      # Next.js app directory
│   ├── (routes)/            # Page routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── home/                # Home page sections
│   ├── box/                 # Subscription box components
│   ├── shop/                # Shop components
│   ├── product/             # Product detail components
│   ├── cart/                # Cart components
│   └── analytics/           # Analytics components
├── lib/                     # Utility functions and configs
│   ├── shopify/            # Shopify API integration
│   ├── sanity/             # Sanity CMS integration
│   ├── store/              # Zustand stores
│   └── types/              # TypeScript types
└── public/                  # Static assets

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Shopify store with Storefront API access
- Sanity CMS project (optional for v1)
- Google Tag Manager account

### Installation

1. **Clone the repository**
   ```bash
   cd inkBlotv1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your credentials:
   
   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API token
   - `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually 'production')

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Configuration

### Shopify Setup

1. **Create a Shopify store** or use an existing one
2. **Enable Storefront API**:
   - Go to Settings → Apps and sales channels → Develop apps
   - Create a custom app
   - Configure Storefront API scopes (product read, cart write, etc.)
   - Generate Storefront API access token
3. **Install a subscription app** (e.g., Skio, Smartrr) with headless support
4. **Configure products**:
   - Create subscription product(s)
   - Create merchandise products
   - Set up collections
5. **Configure shipping zones** for UK and EU
6. **Set up tax/VAT** for both regions

### Sanity CMS Setup (Optional for v1)

1. **Create a Sanity project**:
   ```bash
   npm create sanity@latest
   ```

2. **Add schemas** from `lib/sanity/schemas.ts` to your Sanity Studio

3. **Deploy Sanity Studio**:
   ```bash
   sanity deploy
   ```

4. **Add content** through the Sanity Studio interface

### Google Tag Manager

1. **Create a GTM container**
2. **Add GTM ID** to environment variables
3. **Configure tags**:
   - GA4 configuration tag
   - Meta Pixel (Facebook)
   - TikTok Pixel
   - E-commerce events
4. **Set up consent mode** triggers based on cookie consent

## 🎨 Design System

The platform follows a "Modern Editorial / Ink on Paper" aesthetic:

### Colors

- **Primary**: Deep Charcoal/Black (`#0A0A0A`)
- **Background**: Off-white/Paper tone (`#FAFAF9`)
- **Accents**: Light greys for UI elements

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components

All components are located in `components/ui/`:
- Button
- Card
- Container
- Section
- Input
- Accordion

## 🛍️ Key Features

### For Readers (B2C)

- ✅ Quarterly subscription box with curated indie romance
- ✅ eCommerce shop for standalone merchandise
- ✅ Region/currency selector (UK/EU, GBP/EUR)
- ✅ GDPR-compliant cookie consent
- ✅ Community features info
- ✅ Comprehensive FAQ

### For Publishers (B2B)

- ✅ Dedicated landing page
- ✅ Partnership information
- ✅ Contact form
- ✅ Publisher FAQ

### Technical Features

- ✅ Server-side rendering (SSR) and static generation (SSG)
- ✅ Image optimization
- ✅ SEO optimization
- ✅ Cookie consent management
- ✅ Analytics integration (GTM, GA4)
- ✅ Responsive design (mobile-first)

## 📱 Pages

- `/` - Home
- `/box` - Subscription box details
- `/shop` - Product catalog
- `/product/[handle]` - Product detail
- `/cart` - Shopping cart
- `/community` - Community information
- `/publishers` - For publishers
- `/about` - About us
- `/faq` - FAQ
- `/terms` - Terms & conditions
- `/privacy` - Privacy policy
- `/cookies` - Cookie policy

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Structure

- Keep components small and focused
- Use TypeScript for all new code
- Follow the existing file structure
- Use Tailwind utility classes for styling
- Implement proper error handling
- Add loading states where appropriate

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

## 📊 Analytics & Tracking

### Events to Track

- Page views
- Product views
- Add to cart
- Begin checkout
- Purchase
- Subscribe button clicks
- Waitlist signups

### Implementation

All analytics run through GTM. Events are sent via the `dataLayer`:

```javascript
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    items: [{ ... }]
  }
});
```

## 🔒 GDPR Compliance

The platform includes:

- Cookie consent banner
- Granular consent controls (Essential/Analytics/Marketing)
- Consent state management integrated with GTM
- Privacy policy
- Cookie policy

## 🐛 Known Issues / TODO

- [ ] Connect to actual Shopify products (currently using mock data)
- [ ] Implement real cart functionality with Shopify Storefront API
- [ ] Add subscription app integration
- [ ] Set up Sanity CMS content fetching
- [ ] Implement product search
- [ ] Add proper image optimization for product images
- [ ] Implement waitlist functionality
- [ ] Add email provider integration (Klaviyo)
- [ ] Set up automated testing

## 📚 Additional Documentation

- [Shopify Storefront API Docs](https://shopify.dev/api/storefront)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## 🤝 Support

For questions or issues:
- Email: hello@inkblotcrew.com
- Technical issues: Create an issue in the repository

## 📄 License

Proprietary - All rights reserved by Inkblot Crew

---

Built with ❤️ for indie romance readers

