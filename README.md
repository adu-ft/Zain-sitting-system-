<div align="center">

<img src="https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/readme/hero-banner.webp" alt="Zain Seating System — Factory-Direct Recliners, Custom Sofas & Electric Sofa Beds" width="960" height="504" />

# Zain Seating System

**Factory-Direct Manual, Motorized & 360° Revolving Recliners, Custom Sofa Sets, Electric Sofa Cum Beds & Modern Home Chairs**

[![React](https://img.shields.io/badge/React-19-131F2D?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-131F2D?style=flat-square&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-131F2D?style=flat-square&logo=vite&logoColor=646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-131F2D?style=flat-square&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com/)
[![Supabase Storage](https://img.shields.io/badge/Media-Supabase_Storage-131F2D?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/storage)

*Built directly at our Jasola Village, New Delhi manufacturing unit — zero middlemen, custom sizes and shades made to order, Pan-India insured dispatch.*

</div>

---

## Visual Website Previews

### 6 Manufactured Factory Lines

<img src="https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/readme/factory-lines-grid.webp" alt="6 Manufactured Factory Lines — Manual Recliners, Motorized Recliners, Revolving Recliners, Custom Sofa Sets, Electric Sofa Cum Beds, Modern Home Chairs" width="1080" height="670" />

---

### Interactive Product Detail Page & Multi-Angle Galleries

Every product features a sticky multi-angle gallery with color-matched front, reclined, mechanism/stitching close-up, rear 3/4, and exact dimension guide views, live swatch switching, PIN code delivery checks, and direct WhatsApp factory ordering.

<img src="https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/readme/pdp-gallery-strip.webp" alt="Multi-Angle Product Detail Gallery — Front 3/4 Lounge, Full Recline & 360° Base, Lever & Seam Detail, Dimensions Spec" width="1080" height="308" />

---

### Interactive Mechanism Showcase (`95° → 130° → 160°`)

Customers can preview exact recline postures and watch the electric forward-extending sofa-cum-bed mechanism before requesting a custom build.

<img src="https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/readme/recline-postures.webp" alt="Recline Mechanism Postures — 95° Upright, 130° TV Lounge, 160° Deep Recline" width="1080" height="306" />

---

### Inside Our Manufacturing Unit (About Us Carousel)

<img src="https://vrjvxpzutmingaqrsvnn.supabase.co/storage/v1/object/public/images/readme/workshop-collage.webp" alt="Inside Zain Seating System Manufacturing Facility — Jasola Village Workshop, Tailoring, Finishing & Lineup" width="1080" height="857" />

---

## Key Features

- **15 Factory-Direct Seating Designs across 6 Categories** — Manual Recliners, Motorized Push-Button Recliners, 360° Revolving Recliners, Custom Sofa Sets, Electric Sofa Cum Beds, and Modern Home Chairs.
- **Live Catalog Filtering & Dedicated Browse Page** — Filter by category, mechanism type (`Manual Lever`, `Motorized Push-Button`, `Fixed / Static`), price tier, customer rating, and real-time search.
- **Full Product Detail Page (PDP)** — Sticky multi-angle gallery with zoom lightbox, color-matched dimension specification sheets, upholstery swatch previews, custom order notes, 6-digit Indian PIN code delivery check, and verified buyer reviews with photo upload.
- **Direct WhatsApp Factory Checkout** — Pre-filled WhatsApp order messages from the product page, shopping bag drawer, and custom order modal.
- **Persistent Cart & Wishlist** — Local storage persistence for bag items and saved seating designs, paired with background browser image cache warming.
- **Viewport-Aware About Us Workshop Carousel** — Starts on the Facility Overview hero image whenever scrolled into view, with thumbnail strip navigation and pause-on-hover.
- **Cloud-Hosted Media & Social Sharing SEO** — All 120+ product and workshop images served from Supabase Storage CDN with WhatsApp-optimized (`1200×630`, 134 KB baseline JPEG) OpenGraph, Twitter Card, and `FurnitureStore` JSON-LD structured metadata.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Animations** | Motion (`motion/react`) |
| **Icons** | Lucide React |
| **Image CDN** | Supabase Storage (`images` public bucket) |
| **Caching & Offline** | Workbox (`vite-plugin-pwa`) + Browser Cache API |
| **Deployment** | Vercel (`vercel.json` SPA rewrites) |

---

## Project Structure

```text
├── index.html                        # Favicons, fonts, OpenGraph/WhatsApp & JSON-LD metadata
├── vercel.json                       # SPA routing configuration for Vercel
├── vite.config.ts                    # Vite, Tailwind CSS v4 & Workbox image caching setup
├── public/
│   ├── favicon.ico                   # Multi-size (16/32/48px) ZSS brand favicon
│   ├── favicon-16x16.png             # 16×16 browser tab icon
│   ├── favicon-32x32.png             # 32×32 browser tab icon
│   ├── apple-touch-icon.png          # 180×180 iOS touch icon
│   └── assets/videos/
│       └── sofa-cum-bed-demo.mp4     # Electric forward-extend sofa-cum-bed demo clip
└── src/
    ├── App.tsx                       # Root storefront layout, smooth scroll, drawers & state
    ├── types.ts                      # Product, CategoryKey, CartItem & review TypeScript types
    ├── data/
    │   └── catalog.ts                # Supabase Storage image helpers, 15 products & stories
    ├── utils/
    │   ├── cacheManager.ts           # LocalStorage cart/wishlist + idle image cache warmer
    │   └── format.ts                 # INR currency formatting & discount helpers
    └── components/
        ├── Header.tsx                # Sticky nav, live search bar, mobile drawer & category tabs
        ├── HeroAndPromo.tsx          # Campaign hero carousel + mobile quick-category strip
        ├── TrendingProducts.tsx      # Dynamic home catalog grid with filters & quick-add
        ├── BrowseCatalogPage.tsx     # Full filterable catalog view (sidebar + mobile filter drawer)
        ├── ProductDetailPage.tsx     # Multi-angle gallery, swatches, PIN check & WhatsApp order
        ├── CategoryExplorer.tsx      # 6-column manufactured factory lines showcase
        ├── ShowroomBanner.tsx        # Factory-direct custom sizing & shade banner
        ├── EditorialAndReviews.tsx   # Recline posture explainer, sofa-bed video & customer stories
        ├── AboutUsSection.tsx        # Jasola Village factory unit carousel & trust metrics
        ├── BuyingGuideAndFooter.tsx  # Buying guide accordion, GST/factory details & footer links
        └── ModalsAndDrawers.tsx      # Cart drawer, wishlist drawer & custom order/support modals
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the development server on http://localhost:3000
npm run dev
```

### Build & Type-Check

```bash
# Run TypeScript type checking
npm run lint

# Create an optimized production bundle in dist/
npm run build

# Preview the production bundle locally
npm run preview
```

---

## Factory & Contact Details

- **Brand:** Zain Seating System
- **Manufacturing Unit:** E-94, Jasola Village, Ground Floor, New Delhi – 110025
- **Hours:** Mon–Sun, 10:00 AM – 8:00 PM
- **Phone / WhatsApp:** +91 81789 42327
- **GSTIN:** `07ACMPH7962E1ZD`
