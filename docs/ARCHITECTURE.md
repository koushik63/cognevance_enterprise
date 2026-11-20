# NEXORA Architecture & API Workflow

## 1. Layered Frontend Architecture

NEXORA separates presentation, state management, domain logic, and external data fetching:

1. **Pages (`src/pages/`):** Route-level components lazy-loaded in `src/App.tsx` via `React.lazy` and `Suspense`.
2. **Layouts (`src/layouts/MainLayout.tsx`):** Provides persistent `Navbar`, `Footer`, `CartDrawer`, `SearchOverlay`, and `ToastContainer`.
3. **Reusable Components (`src/components/`):**
   - `ui/`: Pure design system primitives (`Button`, `PriceDisplay`, `Rating`, `Skeleton`, `EmptyState`, `Modal`, `Pagination`, `ToastContainer`).
   - `product/`: Domain-specific cards and filtering (`ProductCard`, `CategoryCard`, `FilterSidebar`).
   - `layout/`: Shell & navigation (`Navbar`, `Footer`, `CartDrawer`, `SearchOverlay`, `ErrorBoundary`, `ScrollToTop`).
4. **Global State (`src/context/`):**
   - `CartContext`: Manages cart items, quantity clamping against stock, discount/shipping totals, and `localStorage` (`nexora_cart_v1`).
   - `WishlistContext`: Manages saved products and `localStorage` (`nexora_wishlist_v1`).
   - `OrderContext`: Manages seeded demo orders + session-created demo orders in `localStorage` (`nexora_demo_orders_v1`).
   - `ToastContext`: Non-blocking notification queue.
5. **Service Layer (`src/services/productApi.ts`):** Encapsulates all HTTP requests to DummyJSON, response validation, normalization, in-memory caching, and offline fallback.

---

## 2. API Workflow

```text
UI / useProducts()
   │
   ▼
productApi.fetchAllProducts()
   ├── Cache hit? ──► Return cached Product[]
   │
   ├── Fetch DummyJSON categories in parallel (6.5s timeout)
   │      ├── Success ──► normalizeDummyProduct() + merge supplemental Gaming/Headphones ──► Cache & Return
   │      └── Failure / Timeout ──► Return FALLBACK_PRODUCTS (usedFallback: true)
```

---

## 3. Testing & Verification Checklist

- **Build & Type Safety:** `npm run build` (`tsc -b && vite build`) verified with 0 errors.
- **Linter:** `npm run lint` (`oxlint`) verified with 0 errors.
- **Runtime & Interactive Verification:** Live browser verification of navigation, API loading, search, filtering, cart persistence, checkout validation, and responsive layout.
