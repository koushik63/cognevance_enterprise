import { useMemo } from 'react';
import { CategoryCard } from '../components/product/CategoryCard';
import { CATEGORY_METADATA } from '../data/siteContent';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';

export default function CategoriesPage() {
  useSEO({
    title: 'Product Categories',
    description:
      'Explore NEXORA product categories: Smartphones, Laptops, Headphones, Smartwatches, Accessories, and Gaming.',
  });

  const { products } = useProducts();

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
          Hardware Directory
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3">
          Technology Categories
        </h1>
        <p className="text-base text-[#A5ADBA]">
          Select a hardware discipline to browse curated devices, enterprise workstations, and precision peripherals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORY_METADATA.map((cat, idx) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            productCount={counts[cat.name]}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
