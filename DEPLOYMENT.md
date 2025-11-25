# Deployment Guide - Inkblot Crew

This guide covers deploying the Inkblot Crew platform to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Shopify store fully configured with products
- [ ] Subscription app installed and configured
- [ ] All environment variables ready
- [ ] Sanity CMS project set up (optional for v1)
- [ ] Google Tag Manager container created
- [ ] Domain name ready (if using custom domain)
- [ ] SSL certificate (handled automatically by Vercel)

---

## 🚀 Deployment to Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments, edge functions, and great performance.

### Step 1: Prepare Repository

1. **Push code to Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Ensure `.gitignore` is configured** (already included):
   - `.env.local` should be ignored
   - `node_modules` should be ignored
   - `.next/` build directory should be ignored

### Step 2: Connect to Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up/Login** (use GitHub/GitLab account for easy integration)
3. **Import Project**:
   - Click "Add New" → "Project"
   - Select your Git repository
   - Vercel will auto-detect Next.js settings

### Step 3: Configure Build Settings

Vercel auto-detects these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### Step 4: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://inkblotcrew.com
```

**Important**: Add these variables to **all environments** (Production, Preview, Development).

### Step 5: Deploy

1. **Click "Deploy"**
2. Vercel will build and deploy your site
3. **Wait for build** to complete (usually 2-5 minutes)
4. **Check deployment** at the provided URL (e.g., `your-project.vercel.app`)

### Step 6: Configure Custom Domain

1. **Go to** Settings → Domains
2. **Add your domain** (e.g., `inkblotcrew.com`)
3. **Update DNS records** as instructed by Vercel:
   - Usually an A record or CNAME
4. **Wait for DNS propagation** (up to 24 hours, usually faster)
5. **SSL certificate** is automatically provisioned

### Step 7: Set Up Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview deployment

To customize:
1. Go to Settings → Git
2. Configure which branch triggers production deployments
3. Set up deployment protection (optional)

---

## 🏗️ Alternative: Manual Deployment (VPS/Cloud)

If not using Vercel, you can deploy to any server that supports Node.js.

### Requirements

- Node.js 18+
- PM2 or similar process manager
- Nginx or Apache as reverse proxy
- SSL certificate (Let's Encrypt recommended)

### Step 1: Build the Application

```bash
npm install
npm run build
```

This creates an optimized production build in `.next/`.

### Step 2: Set Up Environment

Create `.env.production` with all required variables:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
# ... etc
```

### Step 3: Start with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "inkblot-crew" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### Step 4: Configure Nginx

Example Nginx configuration (`/etc/nginx/sites-available/inkblotcrew`):

```nginx
server {
    listen 80;
    server_name inkblotcrew.com www.inkblotcrew.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/inkblotcrew /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Set Up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d inkblotcrew.com -d www.inkblotcrew.com
```

Certbot will automatically configure HTTPS and set up auto-renewal.

---

## 🔧 Post-Deployment Configuration

### Verify Everything Works

1. **Test all pages**:
   - Home, Box, Shop, Product details
   - Community, Publishers, About, FAQ
   - Cart

2. **Test functionality**:
   - Region/currency selector
   - Cookie consent banner
   - Newsletter signup
   - Contact forms

3. **Check analytics**:
   - Open GTM Preview mode
   - Navigate site and verify events fire
   - Check GA4 real-time reports

4. **Test on devices**:
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)
   - Tablet

### Shopify Integration

1. **Verify checkout flow**:
   - Add product to cart
   - Proceed to checkout
   - Complete test purchase (use Shopify test mode)

2. **Test subscription**:
   - Subscribe to box
   - Verify subscription created in subscription app
   - Check customer portal access

### Performance Optimization

1. **Run Lighthouse audit**:
   ```bash
   # In Chrome DevTools
   # Lighthouse → Generate report
   ```
   Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 95+

2. **Optimize images** if needed:
   - Ensure all images use Next.js `<Image />` component
   - Check image sizes and formats

3. **Check bundle size**:
   ```bash
   npm run build
   # Review build output for large bundles
   ```

### SEO Setup

1. **Submit sitemap** to Google Search Console:
   - Generate sitemap: `your-domain.com/sitemap.xml` (if you add one)
   - Submit in Search Console

2. **Set up Google Search Console**:
   - Verify domain ownership
   - Submit sitemap
   - Monitor indexing

3. **Set up Google Business Profile** (if applicable)

---

## 📊 Monitoring & Maintenance

### Vercel Monitoring

Built-in monitoring shows:
- Deployment status
- Build logs
- Runtime logs
- Analytics (page views, performance)

Access via Vercel Dashboard → Your Project.

### Error Tracking

Consider adding error tracking:

**Sentry** (recommended):
1. Create Sentry project
2. Install: `npm install @sentry/nextjs`
3. Configure with `sentry.client.config.js` and `sentry.server.config.js`
4. Add `SENTRY_DSN` to environment variables

### Uptime Monitoring

Use a service like:
- UptimeRobot (free)
- Pingdom
- StatusCake

Set up monitoring for:
- Homepage
- /box page
- /shop page
- Shopify checkout URL

### Performance Monitoring

**Vercel Analytics** (if on Pro plan):
- Real User Monitoring (RUM)
- Core Web Vitals
- Edge network performance

**Google Analytics 4**:
- Page load times
- User engagement
- Conversion tracking

---

## 🔄 CI/CD Pipeline

### Automatic Deployments (Vercel)

Already configured! Every push to `main` deploys to production.

**Best practices**:
1. **Use branches** for features:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

2. **Create pull request** on GitHub/GitLab
   - Vercel creates preview deployment automatically
   - Review changes on preview URL

3. **Merge to main** when ready
   - Automatic production deployment

### Pre-deployment Checks

Add GitHub Actions for checks (optional):

Create `.github/workflows/checks.yml`:

```yaml
name: Checks

on: [pull_request]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
```

---

## 🚨 Rollback Procedure

If something goes wrong after deployment:

### Vercel Rollback

1. **Go to** Vercel Dashboard → Deployments
2. **Find the last working deployment**
3. **Click "Promote to Production"**
4. Previous version is live immediately

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push (be careful!)
git push --force
```

---

## 🔐 Security Considerations

1. **Environment variables**: Never commit to Git
2. **API tokens**: Rotate regularly, especially after team changes
3. **Shopify Storefront API**: Use Storefront API (public), not Admin API
4. **HTTPS only**: Enforced automatically by Vercel
5. **CSP headers**: Consider adding Content Security Policy headers
6. **Rate limiting**: Monitor for API abuse
7. **GDPR compliance**: Cookie consent is implemented

---

## 📞 Support & Troubleshooting

### Common Issues

**Build fails**:
- Check build logs in Vercel
- Verify all environment variables are set
- Test build locally: `npm run build`

**Shopify integration not working**:
- Verify Storefront API token is correct
- Check API permissions
- Test API queries in Shopify's GraphiQL

**Analytics not tracking**:
- Verify GTM ID is correct
- Check cookie consent is working
- Use GTM Preview mode to debug

**Images not loading**:
- Check Next.js image domains in `next.config.js`
- Verify image URLs are accessible

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Shopify Support**: Available 24/7 via admin
- **Next.js Discord**: [nextjs.org/discord](https://nextjs.org/discord)

---

## ✅ Launch Checklist

Pre-launch:
- [ ] All pages tested and working
- [ ] Shopify products configured
- [ ] Subscription app configured
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking verified
- [ ] Cookie consent working
- [ ] Test purchases completed
- [ ] Email notifications working
- [ ] Mobile responsiveness verified
- [ ] Lighthouse scores acceptable
- [ ] Legal pages reviewed (Terms, Privacy, Cookies)

Post-launch:
- [ ] Monitor error logs
- [ ] Watch analytics for issues
- [ ] Test customer journey end-to-end
- [ ] Set up uptime monitoring
- [ ] Announce launch!

---

**Ready to launch? Good luck! 🚀**

