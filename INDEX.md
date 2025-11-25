# Inkblot Crew - Documentation Index

Welcome to the Inkblot Crew platform documentation. This index will help you find the right information for your role and needs.

## 📚 Documentation Overview

This project includes comprehensive documentation for different audiences:

| Document | Audience | Purpose |
|----------|----------|---------|
| [QUICK_START.md](./QUICK_START.md) | Developers | Get running locally in 10 minutes |
| [README.md](./README.md) | Developers | Complete technical documentation |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Everyone | High-level project overview |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Content/Marketing Team | Managing content and products |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | DevOps/Developers | Deploy to production |

## 🚀 Getting Started

### I'm a Developer

**First time here?**
1. Start with → [QUICK_START.md](./QUICK_START.md)
2. Get it running locally (10 minutes)
3. Then read → [README.md](./README.md) for full details

**Ready to deploy?**
1. Read → [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Follow the Vercel deployment steps
3. Configure environment variables

### I'm Managing Content

**Need to update the site?**
1. Read → [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
2. Learn how to manage products in Shopify
3. Learn how to update content in Sanity

**Common tasks**:
- Adding new products → Section 1 of ADMIN_GUIDE.md
- Managing subscriptions → Section 2 of ADMIN_GUIDE.md
- Updating FAQs → Section 3 of ADMIN_GUIDE.md
- Viewing analytics → Section 4 of ADMIN_GUIDE.md

### I'm a Stakeholder

**Want the big picture?**
1. Read → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
2. Understand what's built and what's next
3. Review success metrics and KPIs

**Want to see it live?**
- Once deployed, refer to DEPLOYMENT.md for the production URL
- Or run locally following QUICK_START.md

## 🗂️ Project Structure

```
inkBlotv1/
├── 📄 Documentation
│   ├── INDEX.md (this file)
│   ├── QUICK_START.md
│   ├── README.md
│   ├── PROJECT_SUMMARY.md
│   ├── ADMIN_GUIDE.md
│   └── DEPLOYMENT.md
│
├── 🎨 Frontend Application
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities and integrations
│   └── public/                 # Static assets
│
├── ⚙️ Configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── .env.example
│
└── 📦 Build Output
    └── .next/                  # (generated on build)
```

## 🎯 Quick Reference

### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/layout.tsx` | Root layout with GTM and fonts |
| `components/ui/*` | Reusable UI components |
| `lib/shopify/client.ts` | Shopify API integration |
| `lib/sanity/schemas.ts` | CMS schema definitions |
| `tailwind.config.ts` | Design system tokens |

### Environment Variables

Required for production:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=...
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_GTM_ID=...
NEXT_PUBLIC_SITE_URL=...
```

See `.env.example` for the complete template.

### Commands

```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run start           # Run production build
npm run lint            # Run linter
npm run type-check      # Check TypeScript types
```

## 📖 Documentation Guide by Task

### Setup & Installation
- [QUICK_START.md](./QUICK_START.md) - Steps 1-5
- [README.md](./README.md) - "Getting Started" section

### Development
- [README.md](./README.md) - "Development" section
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - "Technical Highlights"

### Content Management
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Complete guide
- Sections: Products, Subscriptions, Sanity CMS, Analytics

### Deployment
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- Vercel (recommended) or manual deployment options

### Understanding the Codebase
- [README.md](./README.md) - Architecture section
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Technical overview

### Troubleshooting
- [QUICK_START.md](./QUICK_START.md) - Common issues
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment issues
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Customer support

## 🔍 Feature Reference

### Implemented Features ✅

| Feature | Location | Documentation |
|---------|----------|---------------|
| Home page | `app/page.tsx` | README.md |
| Subscription box | `app/box/page.tsx` | README.md |
| Product catalog | `app/shop/page.tsx` | README.md |
| Product details | `app/product/[handle]/page.tsx` | README.md |
| Shopping cart | `app/cart/page.tsx` | README.md |
| Community info | `app/community/page.tsx` | README.md |
| Publisher portal | `app/publishers/page.tsx` | README.md |
| About page | `app/about/page.tsx` | README.md |
| FAQ | `app/faq/page.tsx` | README.md |
| Region selector | `components/RegionSelector.tsx` | README.md |
| Cookie consent | `components/CookieConsent.tsx` | README.md |
| GTM integration | `components/analytics/GTMScript.tsx` | README.md |
| Shopify API | `lib/shopify/` | README.md |
| Sanity CMS | `lib/sanity/` | README.md |

### Planned Features (Phase 2) 📋

See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - "Post-Launch Enhancements" section

## 🎨 Design System

The platform uses a **"Modern Editorial / Ink on Paper"** aesthetic.

**Key characteristics**:
- Monochrome palette (charcoal + paper white)
- Serif headings (Playfair Display) + sans body (Inter)
- Crisp borders, generous whitespace
- Content-first approach

**Details**: See [README.md](./README.md) - "Design System" section

## 🔗 External Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Shopify Storefront API**: [shopify.dev/api/storefront](https://shopify.dev/api/storefront)
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

## 📞 Support

For questions or issues:
- **Technical issues**: Check README.md and DEPLOYMENT.md
- **Content management**: Check ADMIN_GUIDE.md
- **Getting started**: Check QUICK_START.md
- **Project questions**: Check PROJECT_SUMMARY.md

## ✅ Document Status

All documentation is complete and up-to-date as of the initial project delivery.

| Document | Status | Last Updated |
|----------|--------|--------------|
| QUICK_START.md | ✅ Complete | Initial delivery |
| README.md | ✅ Complete | Initial delivery |
| PROJECT_SUMMARY.md | ✅ Complete | Initial delivery |
| ADMIN_GUIDE.md | ✅ Complete | Initial delivery |
| DEPLOYMENT.md | ✅ Complete | Initial delivery |
| INDEX.md | ✅ Complete | Initial delivery |

## 🚀 Next Steps

1. **For first-time users**: Start with [QUICK_START.md](./QUICK_START.md)
2. **For deployment**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **For understanding the project**: Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
4. **For technical deep-dive**: Study [README.md](./README.md)

---

**Welcome to Inkblot Crew!** 📚✨

*Built with Next.js, TypeScript, and ❤️ for indie romance*

