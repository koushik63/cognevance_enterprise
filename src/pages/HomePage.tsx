import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/product/CategoryCard';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { CATEGORY_METADATA, ILLUSTRATIVE_TESTIMONIALS } from '../data/siteContent';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';

export default function HomePage() {
  useSEO({
    title: 'NEXORA — Technology. Elevated.',
    description:
      'Discover the next generation of technology. Explore premium devices, intelligent accessories, and solutions designed for modern living.',
  });

  const { products, loading } = useProducts();

  const { featuredProducts, bestSellers, newArrivals, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }

    const featured = products.slice(0, 4);
    const sellers = products.filter((p) => p.isBestSeller || p.rating >= 4.5).slice(0, 4);
    const arrivals = products.filter((p) => p.isNewArrival || p.discountPercentage >= 8).slice(0, 4);

    return {
      featuredProducts: featured,
      bestSellers: sellers.length >= 4 ? sellers : products.slice(0, 4),
      newArrivals: arrivals.length >= 4 ? arrivals : products.slice(4, 8),
      categoryCounts: counts,
    };
  }, [products]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B0D12] pt-14 pb-20 lg:pt-24 lg:pb-28 border-b border-[#293241]">
        {/* Subtle interactive radial gradients */}
        <div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#4F8CFF]/15 blur-[130px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#8AB4FF]/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151922] border border-[#293241] text-xs font-medium text-[#8AB4FF]">
                <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" aria-hidden="true" />
                <span>NEXORA — Technology. Elevated.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.08] tracking-tight">
                Technology That Moves You{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] to-[#8AB4FF]">
                  Forward.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#A5ADBA] max-w-xl leading-relaxed">
                Discover the next generation of technology. Explore premium devices, intelligent accessories, and solutions designed for modern living.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white font-semibold text-sm shadow-lg shadow-[#4F8CFF]/25 transition-all"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#151922] hover:bg-[#1E2432] border border-[#293241] hover:border-[#4F8CFF]/50 text-white font-semibold text-sm transition-all"
                >
                  <span>Discover Our Solutions</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#293241] max-w-lg">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#A5ADBA]">Architecture</p>
                  <p className="text-sm font-semibold text-white mt-1">Precision Hardware</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#A5ADBA]">Fulfillment</p>
                  <p className="text-sm font-semibold text-white mt-1">Enterprise Ready</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#A5ADBA]">Support</p>
                  <p className="text-sm font-semibold text-white mt-1">Dedicated Advisory</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl bg-[#151922] border border-[#293241] p-4 shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0B0D12]">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"
                    alt="NEXORA flagship workstation laptop"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Spec Card */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-4 flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B0D12]/90 border border-[#293241]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8AB4FF] font-medium">Featured Workstation</p>
                      <p className="text-sm font-semibold font-heading text-white">
                        ProBook X1 Carbon Series
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/products?category=Laptops"
                    className="text-xs font-semibold text-[#4F8CFF] hover:text-[#8AB4FF] whitespace-nowrap"
                  >
                    View Lineup →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
                Curated Hardware
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Featured Product Showcase
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8AB4FF] hover:text-white transition-colors"
            >
              <span>Browse full catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 lg:py-20 bg-[#151922] border-y border-[#293241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
                Ecosystem
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Explore by Category
              </h2>
            </div>
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8AB4FF] hover:text-white transition-colors"
            >
              <span>All categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_METADATA.map((cat, idx) => (
              <CategoryCard
                key={cat.name}
                category={cat}
                productCount={categoryCounts[cat.name]}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Light Contrast Section: Enterprise Business Solutions */}
      <section className="py-16 lg:py-24 bg-[#F4F6F8] text-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F8CFF]/10 text-[#2563EB] text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>NEXORA Enterprise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#0B0D12] leading-tight">
                Technology Infrastructure Built for Modern Teams.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                From standardized workstation provisioning to acoustic conference gear and lifecycle consulting, NEXORA helps organizations equip distributed teams without friction.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  'Unified hardware procurement & volume configuration',
                  'Architecture & device compatibility consulting',
                  'Dedicated post-deployment technical support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-[#4F8CFF] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B0D12] hover:bg-[#151922] text-white text-sm font-semibold transition-colors"
                >
                  <span>Discover Business Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Layers,
                  title: 'Fleet Standardization',
                  desc: 'Consistent hardware specifications across engineering, design, and operations.',
                },
                {
                  icon: Shield,
                  title: 'Security First',
                  desc: 'Devices selected with hardware-backed encryption and enterprise manageability.',
                },
                {
                  icon: Zap,
                  title: 'Rapid Deployment',
                  desc: 'Streamlined procurement workflows and pre-vetted accessory bundles.',
                },
                {
                  icon: Cpu,
                  title: 'Technical Advisory',
                  desc: 'Direct consultation on docking, display, and mobile device ecosystems.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 text-[#2563EB] flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold font-heading text-[#0B0D12] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
                Most Requested
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">Best Sellers</h2>
            </div>
            <Link
              to="/products?sort=rating-desc"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8AB4FF] hover:text-white transition-colors"
            >
              <span>View top rated</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : bestSellers.map((product, idx) => (
                  <ProductCard key={`bs-${product.id}`} product={product} index={idx} />
                ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-10 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#151922] via-[#1A2233] to-[#151922] border border-[#293241] p-8 sm:p-12 overflow-hidden">
            <div
              className="absolute right-0 top-0 w-80 h-80 bg-[#4F8CFF]/15 blur-[100px] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8AB4FF]">
                  Complimentary Enterprise Shipping
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Free Express Delivery on Orders Over \$250
                </h2>
                <p className="text-sm text-[#A5ADBA]">
                  Equip your workspace with flagship laptops, spatial audio, and Thunderbolt connectivity.
                </p>
              </div>
              <Link
                to="/products?sort=discount-desc"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white text-sm font-semibold whitespace-nowrap transition-colors"
              >
                <span>Shop Current Offers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
                Latest Additions
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">New Arrivals</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8AB4FF] hover:text-white transition-colors"
            >
              <span>Explore all devices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : newArrivals.map((product, idx) => (
                  <ProductCard key={`na-${product.id}`} product={product} index={idx} />
                ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials (Illustrative) */}
      <section className="py-16 lg:py-20 bg-[#151922] border-t border-[#293241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
              Illustrative Feedback
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Designed for Discerning Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ILLUSTRATIVE_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#0B0D12] border border-[#293241] flex flex-col justify-between"
              >
                <p className="text-sm text-[#A5ADBA] leading-relaxed mb-6">"{item.quote}"</p>
                <div className="pt-4 border-t border-[#293241]">
                  <p className="text-sm font-semibold font-heading text-white">{item.author}</p>
                  <p className="text-xs text-[#8AB4FF] mt-0.5">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
