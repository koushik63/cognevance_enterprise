import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatters';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    finalTotal,
    freeShippingThreshold,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, closeDrawer]);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart drawer"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-[#0B0D12] border-l border-[#293241] flex flex-col h-full shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#293241]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#4F8CFF]" aria-hidden="true" />
                <h2 className="text-lg font-semibold font-heading text-white">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart drawer"
                className="p-1.5 rounded-lg text-[#A5ADBA] hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping indicator */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#151922] border-b border-[#293241]">
                <div className="flex items-center gap-2 text-xs text-[#A5ADBA] mb-2">
                  <Truck className="w-4 h-4 text-[#4F8CFF]" aria-hidden="true" />
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="text-white">{formatCurrency(remainingForFreeShipping)}</strong> more for
                      complimentary shipping
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium">
                      Complimentary enterprise shipping unlocked
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#0B0D12] overflow-hidden">
                  <div
                    className="h-full bg-[#4F8CFF] transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#151922] border border-[#293241] flex items-center justify-center text-[#4F8CFF] mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-base font-semibold font-heading text-white mb-1">Your cart is empty</p>
                  <p className="text-xs text-[#A5ADBA] max-w-xs mb-6">
                    Explore our curated collection of smartphones, workstations, and intelligent accessories.
                  </p>
                  <Link
                    to="/products"
                    onClick={closeDrawer}
                    className="px-5 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-sm font-medium hover:bg-[#3B7BF2] transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                items.map(({ product, quantity }) => {
                  const unitPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3.5 rounded-xl bg-[#151922] border border-[#293241]"
                    >
                      <Link to={`/products/${product.id}`} onClick={closeDrawer} className="shrink-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-20 h-20 rounded-lg object-cover bg-[#0B0D12]"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/products/${product.id}`}
                            onClick={closeDrawer}
                            className="text-sm font-medium text-white hover:text-[#8AB4FF] truncate"
                          >
                            {product.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            aria-label={`Remove ${product.title}`}
                            className="text-[#A5ADBA] hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#A5ADBA] mt-0.5">{product.category}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center rounded-lg bg-[#0B0D12] border border-[#293241]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1.5 text-[#A5ADBA] hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-medium text-white">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              disabled={quantity >= product.stock}
                              aria-label="Increase quantity"
                              className="p-1.5 text-[#A5ADBA] hover:text-white disabled:opacity-30 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold font-heading text-white">
                            {formatCurrency(unitPrice * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#293241] bg-[#151922] space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#A5ADBA]">
                    <span>Subtotal</span>
                    <span className="text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#A5ADBA]">
                    <span>Estimated Shipping</span>
                    <span className="text-white">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold font-heading text-white pt-2 border-t border-[#293241]">
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/cart"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm font-medium text-white hover:border-[#4F8CFF]/60 transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#4F8CFF] text-sm font-semibold text-white hover:bg-[#3B7BF2] transition-colors"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
