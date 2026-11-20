import { AlertCircle, PackageSearch, RefreshCw, Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';
import { filterAndSortProducts } from '../services/productApi';
import type { NexoraCategory, SortOption } from '../types';
import { NEXORA_CATEGORIES } from '../utils/categoryMapper';

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  useSEO({
    title: 'Products Catalog',
    description:
      'Browse NEXORA smartphones, workstations, studio headphones, smartwatches, gaming peripherals, and enterprise accessories.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as NexoraCategory | 'All') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<NexoraCategory | 'All'>(
    NEXORA_CATEGORIES.includes(initialCategory as NexoraCategory) ? initialCategory : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 250);
  const { products, loading, usedFallback, error, reload } = useProducts();

  // Sync URL query params into state when navigated externally
  useEffect(() => {
    const catParam = searchParams.get('category');
    const searchParam = searchParams.get('search') ?? '';
    const sortParam = (searchParams.get('sort') as SortOption) || 'featured';

    if (catParam && NEXORA_CATEGORIES.includes(catParam as NexoraCategory)) {
      setSelectedCategory(catParam as NexoraCategory);
    } else if (!catParam) {
      setSelectedCategory('All');
    }

    setSearchQuery(searchParam);
    setSortBy(sortParam);
    setCurrentPage(1);
  }, [searchParams]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      category: selectedCategory,
      search: debouncedSearch,
      sort: sortBy,
    });
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: NexoraCategory | 'All') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') next.delete('category');
    else next.set('category', cat);
    setSearchParams(next, { replace: true });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
    const next = new URLSearchParams(searchParams);
    if (sort === 'featured') next.delete('sort');
    else next.set('sort', sort);
    setSearchParams(next, { replace: true });
  };

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
            NEXORA Catalog
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            {selectedCategory === 'All' ? 'All Technology Products' : selectedCategory}
          </h1>
          <p className="text-sm text-[#A5ADBA] mt-1">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Search Input + Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-[#A5ADBA] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter by name, brand, or spec..."
              aria-label="Search products"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white placeholder-[#A5ADBA] focus:border-[#4F8CFF] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5ADBA] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm font-medium text-white cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#4F8CFF]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* API Fallback Notice */}
      {usedFallback && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              External product API was unreachable ({error ?? 'network timeout'}). Displaying curated offline fallback catalog.
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={reload} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Retry API
          </Button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-3 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            categoryCounts={categoryCounts}
            totalCount={products.length}
            onReset={handleReset}
          />
        </div>

        <div className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <EmptyState
              icon={<PackageSearch className="w-6 h-6" />}
              title="No matching devices found"
              description="Try adjusting your search keywords or resetting the category filter."
              action={
                <Button onClick={handleReset} variant="primary">
                  Reset All Filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
