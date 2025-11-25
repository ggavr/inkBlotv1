# Quick Start Guide - Inkblot Crew

Get the Inkblot Crew platform running locally in under 10 minutes.

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- A Shopify store (free trial available at [shopify.com](https://www.shopify.com/))
- Code editor (VS Code recommended)

## 🚀 Setup in 5 Steps

### Step 1: Install Dependencies

```bash
cd inkBlotv1
npm install
```

This installs all required packages (~2-3 minutes).

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
# Create from template
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Don't have Shopify credentials yet?** That's okay! The site will run with mock data. You can add real credentials later.

### Step 3: Run Development Server

```bash
npm run dev
```

The server starts at [http://localhost:3000](http://localhost:3000)

### Step 4: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Inkblot Crew homepage!

### Step 5: Explore

Try these pages:
- `/` - Home page
- `/box` - Subscription box details
- `/shop` - Product catalog
- `/community` - Community info
- `/publishers` - For publishers page

## 🔑 Getting Shopify Credentials

### Create Shopify Storefront API Access

1. **Log into your Shopify admin**
   
2. **Go to Settings** → **Apps and sales channels**

3. **Click "Develop apps"** → **"Create an app"**

4. **Name it** (e.g., "Inkblot Crew Frontend")

5. **Configure Storefront API scopes**:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`

6. **Install the app**

7. **Get your Storefront Access Token**:
   - Click "API credentials"
   - Copy the "Storefront API access token"
   - Add to your `.env.local`

8. **Your store domain** is: `your-store.myshopify.com`

## 🎨 What You'll See

With the default setup:
- ✅ All pages fully functional
- ✅ Mock product data in shop
- ✅ Cookie consent banner
- ✅ Region/currency selector
- ✅ Responsive design
- ⚠️ Checkout won't work yet (needs real Shopify products)

## 📦 Adding Real Products

Once you have Shopify credentials:

1. **Add products in Shopify**:
   - Go to Shopify Admin → Products
   - Add some test products
   - Assign to collections

2. **The site will automatically fetch them!**
   - Shop page will show real products
   - Product detail pages will work
   - Cart and checkout will function

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check for code issues
npm run type-check   # Check TypeScript types
```

## 🐛 Troubleshooting

### Port 3000 already in use?

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors?

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Shopify API errors?

1. Check your `.env.local` file has correct values
2. Verify Storefront API token is correct (not Admin API)
3. Make sure you copied the full token (no extra spaces)

### Cookie consent not working?

GTM requires a valid GTM ID. You can:
- Skip this for now (site works without it)
- Or create a free GTM account at [tagmanager.google.com](https://tagmanager.google.com)

## 📱 Testing on Mobile

```bash
# Find your local IP
ipconfig getifaddr en0   # Mac
ip addr show            # Linux
ipconfig               # Windows

# Access from phone using your IP
http://192.168.x.x:3000
```

Make sure your phone is on the same WiFi network.

## 🎯 Next Steps

Now that you're running locally:

1. **Explore the codebase**:
   - `app/` - All pages
   - `components/` - Reusable components
   - `lib/` - API integrations and utilities

2. **Read the docs**:
   - `README.md` - Full technical documentation
   - `ADMIN_GUIDE.md` - Content management guide
   - `DEPLOYMENT.md` - How to deploy to production

3. **Set up Shopify** (see README.md for detailed steps):
   - Add products
   - Configure subscription app
   - Set up shipping zones

4. **Optional: Set up Sanity CMS**:
   - For managing box cycles and FAQs
   - See README.md "Sanity CMS Setup" section

5. **Deploy to Vercel** (when ready):
   - See DEPLOYMENT.md for step-by-step guide
   - Free tier available!

## ✅ You're Ready!

The Inkblot Crew platform is now running locally. Start exploring and customizing!

**Need help?** Check:
- `README.md` for technical details
- `ADMIN_GUIDE.md` for content management
- `PROJECT_SUMMARY.md` for project overview

## 🎉 Happy Coding!

Built with Next.js, TypeScript, and ❤️ for indie romance.

