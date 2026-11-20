import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import type { Product } from '../../types';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Rating } from '../ui/Rating';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0 || product.availabilityStatus === 'Out of Stock';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl bg-[#151922] border border-[#293241] hover:border-[#4F8CFF]/50 transition-colors duration-300 overflow-hidden shadow-lg shadow-black/20"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full bg-[#0B0D12] overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0B0D12]/80 backdrop-blur-md text-[#8AB4FF] border border-[#293241]">
            {product.category}
          </span>
          {product.discountPercentage >= 10 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#4F8CFF] text-white">
              Save {Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            wishlisted
              ? 'bg-[#4F8CFF] border-[#4F8CFF] text-white'
              : 'bg-[#0B0D12]/75 border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[#A5ADBA]">
            {product.brand}
          </span>
          <Rating rating={product.rating} />
        </div>

        <Link
          to={`/products/${product.id}`}
          className="text-base font-semibold font-heading text-white group-hover:text-[#8AB4FF] transition-colors line-clamp-2 mb-2"
        >
          {product.title}
        </Link>

        <p className="text-xs text-[#A5ADBA] line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Price & Actions */}
        <div className="pt-4 border-t border-[#293241] space-y-3">
          <PriceDisplay price={product.price} discountPercentage={product.discountPercentage} size="md" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isOutOfStock ? 'Unavailable' : 'Add to Cart'}</span>
            </button>
            <Link
              to={`/products/${product.id}`}
              aria-label={`View details for ${product.title}`}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/60 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
