# Inkblot Crew - Admin Guide

This guide explains how to manage content and products for the Inkblot Crew platform.

## 📋 Table of Contents

1. [Shopify Product Management](#shopify-product-management)
2. [Subscription Management](#subscription-management)
3. [Content Management (Sanity)](#content-management-sanity)
4. [Analytics & Reporting](#analytics--reporting)
5. [Customer Support](#customer-support)

---

## 🛍️ Shopify Product Management

### Adding New Products

1. **Log into Shopify Admin** at `your-store.myshopify.com/admin`

2. **Navigate to Products** → Click "Add product"

3. **Fill in product details**:
   - **Title**: Product name (e.g., "Romance Reading Candle")
   - **Description**: Detailed product description
   - **Media**: Upload high-quality product images (recommended: 2000x2000px)
   - **Pricing**: Set price for both GBP and EUR if using multi-currency
   - **Inventory**: Set SKU and track quantity
   - **Shipping**: Set weight and dimensions

4. **Organize**:
   - **Product type**: Candles, Apparel, Stationery, etc.
   - **Collections**: Assign to relevant collections (shown as categories on site)
   - **Tags**: Add tags for filtering (e.g., "new", "bestseller")

5. **SEO**: Fill in meta title and description

6. **Save** the product

### Managing Collections

Collections group products together (e.g., "Candles", "Apparel").

1. **Go to Products** → **Collections**
2. **Create collection** or edit existing
3. **Set conditions**:
   - Manual: Manually add products
   - Automated: Use conditions (e.g., product type = "Candles")
4. **Add collection image and description**
5. **Save**

Collections automatically appear as filters on the `/shop` page.

### Pricing & Currency

The site supports GBP and EUR:

1. **Set base prices** in your primary currency (e.g., GBP)
2. **Install Shopify Markets** or a currency converter app
3. **Configure exchange rates** or manual pricing for EUR
4. The site's region selector will display appropriate prices

### Inventory Management

- **Track inventory** in Shopify for each product
- Set **"Continue selling when out of stock"** as needed
- Use **inventory transfers** if managing multiple locations
- **Low stock alerts** can be configured in Shopify

---

## 📦 Subscription Management

### Subscription App Setup

You'll be using a subscription app (e.g., Skio, Smartrr, Recharge).

#### Initial Setup

1. **Install subscription app** from Shopify App Store
2. **Create subscription product**:
   - Title: "Inkblot Crew Quarterly Box"
   - Set billing frequency: Every 3 months
   - Price: £45 / €52
3. **Configure subscription settings**:
   - Allow cancellation anytime
   - Allow pausing (up to 3 cycles)
   - Set cutoff dates

#### Managing Subscriptions

1. **View all subscriptions** in the app dashboard
2. **Filter by status**: Active, Paused, Cancelled
3. **Manually adjust** a subscription if needed:
   - Skip a box
   - Modify billing date
   - Update shipping address

#### Cutoff Dates

**Important**: Manage cutoff dates to ensure subscribers know which box they'll receive.

**Example Timeline** (for February box):
- **Cutoff**: January 15
- **Box prep**: January 20-31
- **Shipping**: February 1-5
- **Delivery**: February 8-15

**To configure**:
1. Set cutoff date in subscription app settings
2. Update cutoff date in Sanity CMS (for current box content)
3. Communicate via email to existing subscribers

#### Handling Special Cases

**Pause requests**:
- Customer can pause via account portal
- Or email: manually pause in subscription app

**Cancellations**:
- Customer can cancel via account portal
- Process immediately (no penalty)

**Gift subscriptions**:
- Create gift subscription in app
- Option to send gift card or ship directly
- Gift recipient gets email invite after first shipment

---

## 📝 Content Management (Sanity)

### Accessing Sanity Studio

1. **Go to** `your-project.sanity.studio`
2. **Log in** with your Sanity credentials

### Managing Box Cycles

**Box Cycles** define each quarterly box.

1. **Navigate to** "Box Cycle" in Sanity Studio
2. **Create new document**:
   - **Title**: "Spring 2026 Box"
   - **Slug**: Auto-generated (e.g., spring-2026-box)
   - **Quarter**: "Q1 2026" or "Spring 2026"
   - **Theme**: (optional) "Cozy Reads"
   - **Description**: Short description for the box
   - **Image**: Upload box image or mockup
   - **Cutoff Date**: January 15, 2026
   - **Ship Date**: February 1, 2026
   - **Is Available**: Toggle on when ready to sell
   - **Digital Extras**:
     - Spotify Playlist URL
     - Q&A Session links
     - Downloadable files
3. **Publish** the document

### Managing FAQs

1. **Navigate to** "FAQ" in Sanity Studio
2. **Create new FAQ**:
   - **Question**: The question text
   - **Answer**: The answer text
   - **Category**: Select appropriate category
   - **Order**: Number for sorting within category (e.g., 1, 2, 3)
3. **Publish**

FAQs automatically appear on the `/faq` page grouped by category.

### Managing Testimonials

1. **Navigate to** "Testimonial" in Sanity Studio
2. **Create new testimonial**:
   - **Author Name**: Customer name (can be first name + initial)
   - **Content**: Quote text
   - **Rating**: 1-5 stars
   - **Image**: (optional) Customer photo
   - **Featured**: Toggle on to show on homepage
3. **Publish**

### Updating Page Content

For flexible page sections (hero text, feature descriptions):

1. **Navigate to** "Page Content" in Sanity Studio
2. **Find the page** you want to edit (e.g., "Home")
3. **Edit the content** using the rich text editor
4. **Add images** by uploading or selecting from media library
5. **Publish** changes

Changes appear on the live site within minutes (depending on ISR settings).

---

## 📊 Analytics & Reporting

### Google Tag Manager

**Access**: [tagmanager.google.com](https://tagmanager.google.com)

#### Viewing Events

1. **Preview mode**: Use GTM's preview mode to test events
2. **Debug**: Click "Preview" and navigate your site to see events fire in real-time

#### Common Tags

- **GA4 Configuration**: Main Google Analytics setup
- **GA4 Events**: Purchase, add to cart, etc.
- **Facebook Pixel**: For Meta ads
- **TikTok Pixel**: For TikTok ads

### Google Analytics 4

**Access**: [analytics.google.com](https://analytics.google.com)

#### Key Reports

1. **Realtime**: See current site activity
2. **Acquisition**: Where traffic comes from
3. **Engagement**: Pages, events, conversions
4. **Monetization**: Ecommerce performance
5. **Retention**: Returning users

#### Important Metrics

- **Total users**: Overall site visitors
- **Conversion rate**: Percentage who subscribe
- **Add to cart rate**: Product engagement
- **Average order value**: For merch purchases
- **Top products**: Best-selling items

### Shopify Reports

**Access**: Shopify Admin → Analytics

1. **Sales overview**: Revenue, orders, average order value
2. **Top products**: Best sellers
3. **Sales by traffic source**: Which marketing channels work
4. **Sales by location**: UK vs EU performance

#### Key Metrics

- **Subscription revenue**: Track quarterly
- **Merch revenue**: Separate from subscriptions
- **Customer LTV**: Lifetime value of subscribers
- **Churn rate**: Cancellation rate

---

## 🤝 Customer Support

### Common Issues & Solutions

#### "I didn't receive my box"

1. **Check tracking** in Shopify (Orders → find order)
2. **Verify address** is correct
3. **Check delivery status**:
   - Delivered: Ask customer to check with neighbors
   - In transit: Provide tracking and expected delivery
   - Lost: File claim with carrier and send replacement

#### "I want to cancel my subscription"

1. **Direct to self-service**: Guide them to account portal
2. **Or cancel manually**: Via subscription app
3. **Ask for feedback**: Why are they cancelling?
4. **Offer pause** as alternative if it's temporary

#### "When will I get the next box?"

1. **Check their subscription** status in app
2. **Provide timeline**: Based on cutoff and ship dates
3. **If past cutoff**: Explain they'll get next cycle

#### "I already own one of the books"

1. **Acknowledge**: We can't prevent duplicates
2. **Suggest**: Gift to a friend or donate
3. **Note feedback**: Consider for future curation

#### "Can I swap this item?"

1. **Subscription boxes**: No swaps (curated experience)
2. **Merch purchases**: Standard return policy applies
3. **Damaged items**: Always replace

### Support Channels

- **Email**: hello@inkblotcrew.com
- **Response time**: Within 24 hours on business days
- **Shopify inbox**: For chat support (optional)

### Email Templates

**Subscription Welcome**:
```
Subject: Welcome to Inkblot Crew! 🎉

Hi [Name],

Welcome to the Crew! Your first box will ship on [Date].

In the meantime:
- Join our community: [Discord link]
- View your subscription: [Account link]
- Check digital extras: [Extras link]

Can't wait to share indie romance magic with you!

The Inkblot Crew Team
```

**Shipping Notification**:
```
Subject: Your box is on the way! 📦

Hi [Name],

Your [Season Year] box has shipped!

Track your package: [Tracking link]

Expected delivery: [Date range]

Happy reading!
```

---

## 🚨 Emergency Procedures

### Site Down

1. **Check Vercel status**: [vercel.com/status](https://vercel.com/status)
2. **Check Shopify status**: [status.shopify.com](https://status.shopify.com)
3. **Review error logs**: In Vercel dashboard
4. **Rollback if needed**: Deploy previous version

### Payment Issues

1. **Check Shopify Payments** status
2. **Verify payment gateway** is configured
3. **Contact Shopify Support** if needed

### Bulk Issues (e.g., wrong box shipped)

1. **Identify affected orders**
2. **Email affected customers** immediately
3. **Send corrections** at your cost
4. **Offer apology gift** (e.g., discount on merch)

---

## 📞 Support Contacts

- **Shopify Support**: Available 24/7 via admin panel
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Sanity Support**: [sanity.io/help](https://sanity.io/help)

---

## ✅ Monthly Checklist

- [ ] Review subscription numbers and churn
- [ ] Check inventory for upcoming box
- [ ] Update box cycle content in Sanity (if needed)
- [ ] Review and respond to customer feedback
- [ ] Analyze GA4 reports
- [ ] Check for product stock issues
- [ ] Update FAQ if new common questions emerge
- [ ] Backup important data

---

**Need help?** Contact the development team or refer to the main README.md for technical details.

