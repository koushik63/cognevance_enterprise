# NEXORA — Enterprise Business & E-Commerce Platform

**Tagline:** Technology. Elevated.

NEXORA is a modern, enterprise-grade technology retail and B2B hardware solutions storefront built with React, TypeScript, Tailwind CSS, Framer Motion, and Vite.

> **Demonstration Notice:** Checkout, newsletter sign-ups, contact/business inquiry forms, and the Admin Dashboard operate in client-side demonstration mode using `localStorage` and local validation. No real payments are processed and no external emails are sent.

---

## Key Features

- **Enterprise Landing Experience:** Hero showcase, featured products, category navigation, light/dark contrast sections, promotional banner, illustrative testimonials, and newsletter form.
- **Live Product Catalog (`DummyJSON` API + Fallback):** Fetches and normalizes products from `https://dummyjson.com/products`, supports category filtering (`Smartphones`, `Laptops`, `Headphones`, `Smartwatches`, `Accessories`, `Gaming`), debounced search, price/rating/discount sorting, pagination, loading skeletons, and automatic fallback catalog when offline.
- **Product Details:** Multi-image gallery, technical specifications table, stock & fulfillment info, quantity selector, customer reviews, wishlist toggle, and related hardware.
- **Persistent Cart & Wishlist:** Powered by React Context + `localStorage` with slide-over Cart Drawer, free-shipping progress bar, discount calculation, and quantity clamping.
- **Demonstration Checkout & Order Confirmation:** Validated delivery form, simulated payment options, generated demo order reference (`NX-DEMO-...`), and persistent order history.
- **Business & About Pages:** Mission, vision, core values, technology philosophy, enterprise procurement solutions, and validated contact/business inquiry forms.
- **Admin Dashboard (Demo):** Live catalog count, demo order count, simulated revenue, order status updater, and searchable inventory/order tables.
- **Accessibility & Performance:** Semantic HTML, keyboard-accessible modals/drawers, `prefers-reduced-motion` support, route-level code splitting (`React.lazy`), and `ErrorBoundary`.

---

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API + `localStorage` persistence
- **Fonts:** Space Grotesk (Headings) & Inter (Body)

---

## Installation & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Type-check & build for production:**
   ```bash
   npm run build
   ```

4. **Run linter:**
   ```bash
   npm run lint
   ```

---

## Project Structure

```text
src/
  components/
    layout/        # Navbar, Footer, CartDrawer, SearchOverlay, ErrorBoundary, ScrollToTop
    product/       # ProductCard, CategoryCard, FilterSidebar
    ui/            # Button, PriceDisplay, Rating, Skeleton, EmptyState, Modal, ToastContainer, Pagination
  context/         # CartContext, WishlistContext, OrderContext, ToastContext
  data/            # fallbackProducts.ts, siteContent.ts
  hooks/           # useProducts, useDebounce, useSEO
  layouts/         # MainLayout.tsx
  pages/           # Home, Products, ProductDetails, Categories, About, Solutions, Contact, Cart, Wishlist, Checkout, OrderConfirmation, AdminDashboard, NotFound
  services/        # productApi.ts (DummyJSON integration, caching, normalization, fallback)
  types/           # TypeScript interfaces and union types
  utils/           # formatters.ts, validation.ts, categoryMapper.ts
docs/
  ARCHITECTURE.md  # Architecture, API workflow, and component documentation
  STYLE_GUIDE.md   # Design tokens, typography, spacing, and UI standards
```

---

## API Integration

NEXORA integrates with the **DummyJSON Products API**:
- `GET https://dummyjson.com/products/category/{category}?limit=20`
- `GET https://dummyjson.com/products/categories`
- `GET https://dummyjson.com/products/search?q={query}`
- `GET https://dummyjson.com/products/{id}`

All API logic is isolated in `src/services/productApi.ts`, which handles:
- 6.5-second request timeouts via `AbortController`
- In-memory catalog caching to prevent redundant requests
- Response validation and normalization into NEXORA's `Product` interface
- Graceful fallback to `src/data/fallbackProducts.ts` if the external API is unreachable

---

## Deployment

Build the static production bundle with:
```bash
npm run build
```
Deploy the generated `dist/` directory to any static hosting provider (Vercel, Netlify, Cloudflare Pages, or Nginx) configured with SPA fallback routing to `index.html`.
