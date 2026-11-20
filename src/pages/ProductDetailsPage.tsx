import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { Rating } from '../components/ui/Rating';
import { ProductDetailsSkeleton } from '../components/ui/Skeleton';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';
import { fetchProductById } from '../services/productApi';
import type { Product } from '../types';
import { formatDate } from '../utils/formatters';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { products: allProducts } = useProducts();

  useSEO({
    title: product ? product.title : 'Product Details',
    description: product?.description ?? 'Explore detailed hardware specifications and pricing on NEXORA.',
  });

  useEffect(() => {
    if (!Number.isFinite(productId)) {
      setLoading(false);
      setProduct(null);
      return;
    }

    let active = true;
    setLoading(true);
    setSelectedImage(0);
    setQuantity(1);

    fetchProductById(productId).then((res) => {
      if (!active) return;
      setProduct(res.product);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon={<Package className="w-6 h-6" />}
          title="Product not found"
          description="The requested device could not be located in the catalog."
          action={
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-sm font-medium hover:bg-[#3B7BF2]"
            >
              Return to Catalog
            </Link>
          }
        />
      </div>
    );
  }

  const gallery = product.images.length > 0 ? product.images : [product.thumbnail];
  const wishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0 || product.availabilityStatus === 'Out of Stock';
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm text-[#A5ADBA] hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl bg-[#151922] border border-[#293241] overflow-hidden flex items-center justify-center p-4">
            <motion.img
              key={gallery[selectedImage]}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={gallery[selectedImage]}
              alt={`${product.title} view ${selectedImage + 1}`}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`Select image ${idx + 1}`}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-[#151922] border shrink-0 cursor-pointer transition-all ${
                    selectedImage === idx
                      ? 'border-[#4F8CFF] ring-2 ring-[#4F8CFF]/30'
                      : 'border-[#293241] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/30">
                {product.category}
              </span>
              <span className="text-xs font-medium text-[#A5ADBA] uppercase tracking-wider">
                {product.brand} · SKU {product.sku}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 pt-1">
              <Rating rating={product.rating} reviewCount={product.reviews.length} />
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  isOutOfStock ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                {isOutOfStock ? 'Out of Stock' : `${product.availabilityStatus} (${product.stock} units)`}
              </span>
            </div>
          </div>

          <div className="py-4 border-y border-[#293241]">
            <PriceDisplay
              price={product.price}
              discountPercentage={product.discountPercentage}
              size="lg"
            />
          </div>

          <p className="text-sm sm:text-base text-[#A5ADBA] leading-relaxed">{product.description}</p>

          {/* Quantity & Purchase Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="inline-flex items-center rounded-xl bg-[#151922] border border-[#293241] p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2.5 text-[#A5ADBA] hover:text-white cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
                className="p-2.5 text-[#A5ADBA] hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 min-w-[180px]"
              disabled={isOutOfStock}
              onClick={() => addToCart(product, quantity)}
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
            </Button>

            <Button
              size="lg"
              variant={wishlisted ? 'primary' : 'outline'}
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              leftIcon={<Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />}
            >
              {wishlisted ? 'Saved' : 'Wishlist'}
            </Button>
          </div>

          {/* Fulfillment Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#151922] border border-[#293241]">
              <Truck className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-white">Fulfillment</p>
                <p className="text-xs text-[#A5ADBA] mt-0.5">{product.shippingInformation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#151922] border border-[#293241]">
              <ShieldCheck className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-white">Coverage</p>
                <p className="text-xs text-[#A5ADBA] mt-0.5">{product.warrantyInformation}</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specs.length > 0 && (
            <div className="pt-4">
              <h2 className="text-lg font-semibold font-heading text-white mb-3">
                Technical Specifications
              </h2>
              <div className="rounded-2xl bg-[#151922] border border-[#293241] divide-y divide-[#293241]">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-[#A5ADBA]">{spec.label}</span>
                    <span className="font-medium text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#293241]">
          <h2 className="text-2xl font-bold font-heading text-white mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#151922] border border-[#293241] space-y-3">
                <div className="flex items-center justify-between">
                  <Rating rating={rev.rating} showValue={false} />
                  <span className="text-xs text-[#A5ADBA]">{formatDate(rev.date)}</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">"{rev.comment}"</p>
                <p className="text-xs font-medium text-[#8AB4FF]">{rev.reviewerName}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#293241]">
          <h2 className="text-2xl font-bold font-heading text-white mb-6">Related Hardware</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item, idx) => (
              <ProductCard key={item.id} product={item} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
