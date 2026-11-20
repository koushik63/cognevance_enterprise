import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Loader2, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProductsApi } from '../../services/productApi';
import type { Product } from '../../types';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 280);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    let active = true;
    setLoading(true);
    searchProductsApi(debouncedQuery).then((res) => {
      if (!active) return;
      setResults(res.products.slice(0, 6));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search NEXORA catalog"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#151922] border border-[#293241] shadow-2xl overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="flex items-center px-5 py-4 border-b border-[#293241]">
              <Search className="w-5 h-5 text-[#4F8CFF] shrink-0 mr-3" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search smartphones, laptops, headphones, smartwatches..."
                className="flex-1 bg-transparent text-white placeholder-[#A5ADBA] text-sm sm:text-base focus:outline-none"
              />
              {loading && <Loader2 className="w-4 h-4 text-[#4F8CFF] animate-spin mr-2" />}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-lg text-[#A5ADBA] hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {!query.trim() ? (
                <div className="py-6 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#A5ADBA] mb-3">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['iPhone', 'MacBook', 'Headphones', 'Watch', 'Gaming', 'Charger'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-[#0B0D12] border border-[#293241] text-xs text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/60 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="py-8 text-center text-sm text-[#A5ADBA]">Searching catalog...</div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#A5ADBA]">
                  No products found for "{query}".
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-[#0B0D12] border border-[#293241]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{product.title}</p>
                        <p className="text-xs text-[#A5ADBA]">
                          {product.brand} · {product.category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold font-heading text-[#8AB4FF]">
                        {formatCurrency(calculateDiscountedPrice(product.price, product.discountPercentage))}
                      </span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
                    }}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#4F8CFF]/10 text-[#8AB4FF] hover:bg-[#4F8CFF]/20 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>View all results for "{query}"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
