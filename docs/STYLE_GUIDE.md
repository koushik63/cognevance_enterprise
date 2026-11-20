# NEXORA Design System & Style Guide

## 1. Color Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| Primary Background | `#0B0D12` | Main page canvas, dark sections, footer |
| Secondary Background | `#151922` | Cards, sidebars, modals, elevated surfaces |
| Light Contrast Section | `#F4F6F8` | Enterprise contrast sections on Home & About |
| Primary Accent | `#4F8CFF` | Primary CTAs, active states, focus rings |
| Secondary Accent | `#8AB4FF` | Badges, eyebrow labels, hover highlights |
| Primary Text | `#FFFFFF` | Headings and primary copy on dark surfaces |
| Secondary Text | `#A5ADBA` | Supporting copy, metadata, muted labels |
| Subtle Border | `#293241` | Card borders, dividers, form input outlines |

---

## 2. Typography

- **Headings:** `Space Grotesk` (`font-heading`), tight tracking (`-0.02em`)
- **Body & UI:** `Inter` (`font-sans`)
- **Scale:**
  - Hero Display: `text-4xl sm:text-5xl lg:text-6xl font-bold`
  - Page Title: `text-3xl sm:text-4xl font-bold`
  - Section Heading: `text-2xl sm:text-3xl font-bold`
  - Card Title: `text-base` to `text-lg font-semibold`
  - Eyebrow Label: `text-xs font-semibold uppercase tracking-[0.2em]`

---

## 3. Spacing, Radius & Shadows

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Vertical Rhythm:** `py-16 lg:py-20` (standard), `py-16 lg:py-24` (feature contrast)
- **Border Radius:**
  - Buttons & Inputs: `rounded-xl` (`12px`)
  - Cards & Panels: `rounded-2xl` (`16px`)
  - Hero / Feature Containers: `rounded-3xl` (`24px`)
  - Pills & Badges: `rounded-full`
- **Shadows:** Subtle dark elevation (`shadow-lg shadow-black/20`) and accent glow (`shadow-lg shadow-[#4F8CFF]/20`) on primary actions.

---

## 4. UI Components

- **Buttons (`src/components/ui/Button.tsx`):** Variants `primary`, `secondary`, `outline`, `ghost`, `danger`, `light` in `sm`, `md`, `lg` sizes with Framer Motion tap/hover feedback and loading spinner support.
- **Cards (`ProductCard`, `CategoryCard`):** `bg-[#151922] border border-[#293241]` transitioning to `border-[#4F8CFF]/50` on hover.
- **Form Controls:** `bg-[#0B0D12]` or `bg-[#151922]` with `border-[#293241]`, `focus:border-[#4F8CFF]`, explicit `<label htmlFor>` associations, and inline validation errors in `text-red-400`.
- **Responsive Breakpoints:** Standard Tailwind CSS breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
