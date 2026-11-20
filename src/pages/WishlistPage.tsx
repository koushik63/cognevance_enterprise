import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { Rating } from '../components/ui/Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSEO } from '../hooks/useSEO';

export default function WishlistPage() {
  useSEO({
    title: 'Saved Wishlist',
    description: 'View your saved NEXORA hardware and move items directly to your shopping cart.',
  });

  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (productId: number) => {
    const product = items.find((p) => p.id === productId);
    if (!product) return;
    addToCart(product, 1);
    removeFromWishlist(productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
            Saved Devices
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">Your Wishlist</h1>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-6 h-6" />}
          title="Your wishlist is empty"
          description="Save laptops, smartphones, and accessories while browsing to compare and purchase later."
          action={
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#4F8CFF] text-white text-sm font-semibold hover:bg-[#3B7BF2] transition-colors"
            >
              Explore Products
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-2xl bg-[#151922] border border-[#293241] overflow-hidden"
            >
              <Link to={`/products/${product.id}`} className="aspect-[4/3] bg-[#0B0D12] block overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#8AB4FF]">{product.category}</span>
                  <Rating rating={product.rating} />
                </div>
                <Link
                  to={`/products/${product.id}`}
                  className="text-lg font-semibold font-heading text-white hover:text-[#8AB4FF] mb-2"
                >
                  {product.title}
                </Link>
                <div className="mt-auto pt-4 border-t border-[#293241] space-y-4">
                  <PriceDisplay
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMoveToCart(product.id)}
                      leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                    >
                      Move to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.title} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
