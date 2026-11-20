import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';
import { calculateDiscountedPrice, formatCurrency } from '../utils/formatters';

export default function CartPage() {
  useSEO({
    title: 'Shopping Cart',
    description: 'Review your selected NEXORA devices, adjust quantities, and proceed to demonstration checkout.',
  });

  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    rawSubtotal,
    discountTotal,
    subtotal,
    shipping,
    finalTotal,
    freeShippingThreshold,
  } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
            Order Review
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">Shopping Cart</h1>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6" />}
          title="Your shopping cart is empty"
          description="Browse our catalog of enterprise laptops, flagship smartphones, and studio audio gear."
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => {
              const unitPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
              return (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl bg-[#151922] border border-[#293241]"
                >
                  <Link to={`/products/${product.id}`} className="shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-24 h-24 rounded-xl object-cover bg-[#0B0D12] border border-[#293241]"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#8AB4FF]">
                          {product.category}
                        </p>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-lg font-semibold font-heading text-white hover:text-[#8AB4FF] transition-colors"
                        >
                          {product.title}
                        </Link>
                        <p className="text-xs text-[#A5ADBA] mt-0.5">
                          Unit price: {formatCurrency(unitPrice)}
                          {product.discountPercentage > 0 && (
                            <span className="ml-2 line-through opacity-70">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.title}`}
                        className="p-2 rounded-lg text-[#A5ADBA] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#293241]">
                      <div className="inline-flex items-center rounded-xl bg-[#0B0D12] border border-[#293241]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-2 text-[#A5ADBA] hover:text-white cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          aria-label="Increase quantity"
                          className="p-2 text-[#A5ADBA] hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-lg font-bold font-heading text-white">
                        {formatCurrency(unitPrice * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-[#151922] border border-[#293241] p-6 space-y-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold font-heading text-white pb-4 border-b border-[#293241]">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#A5ADBA]">
                  <span>Retail Subtotal</span>
                  <span className="text-white">{formatCurrency(rawSubtotal)}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Catalog Discounts</span>
                    <span>-{formatCurrency(discountTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#A5ADBA]">
                  <span>Discounted Subtotal</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#A5ADBA]">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#8AB4FF]">
                    Add {formatCurrency(freeShippingThreshold - subtotal)} more for free shipping.
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold font-heading text-white pt-4 border-t border-[#293241]">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white text-sm font-semibold shadow-lg shadow-[#4F8CFF]/20 transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
