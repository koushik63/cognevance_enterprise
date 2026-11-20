import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { NexoraCategory, SortOption } from '../../types';
import { NEXORA_CATEGORIES } from '../../utils/categoryMapper';

interface FilterSidebarProps {
  selectedCategory: NexoraCategory | 'All';
  onCategoryChange: (cat: NexoraCategory | 'All') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  onReset: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured & Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'discount-desc', label: 'Best Discounts' },
];

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoryCounts,
  totalCount,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-2xl bg-[#151922] border border-[#293241] p-5 space-y-6 h-fit lg:sticky lg:top-24">
      <div className="flex items-center justify-between pb-4 border-b border-[#293241]">
        <div className="flex items-center gap-2 text-white font-heading font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-[#4F8CFF]" aria-hidden="true" />
          <span>Catalog Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-[#A5ADBA] hover:text-[#4F8CFF] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A5ADBA] mb-3">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/40 font-medium'
                : 'text-[#A5ADBA] hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span>All Hardware</span>
            <span className="text-xs opacity-75">{totalCount}</span>
          </button>

          {NEXORA_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/40 font-medium'
                    : 'text-[#A5ADBA] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{cat}</span>
                <span className="text-xs opacity-75">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label
          htmlFor="catalog-sort-select"
          className="block text-xs font-semibold uppercase tracking-wider text-[#A5ADBA] mb-2.5"
        >
          Sort By
        </label>
        <select
          id="catalog-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
