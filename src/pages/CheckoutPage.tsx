import { AlertTriangle, Building, CreditCard, Lock, ShoppingBag, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../hooks/useSEO';
import type { CustomerDetails, PaymentMethod } from '../types';
import { calculateDiscountedPrice, formatCurrency } from '../utils/formatters';
import { validateCheckoutForm, type ValidationErrors } from '../utils/validation';

const INITIAL_CUSTOMER: CustomerDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
};

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
  {
    id: 'demo-card',
    label: 'Demo Corporate / Credit Card',
    desc: 'Simulated card authorization (no real charge)',
    icon: CreditCard,
  },
  {
    id: 'demo-wire',
    label: 'Demo Enterprise Purchase Order',
    desc: 'Simulated B2B invoice reference',
    icon: Building,
  },
  {
    id: 'demo-wallet',
    label: 'Demo Digital Wallet',
    desc: 'Simulated express wallet flow',
    icon: Smartphone,
  },
];

export default function CheckoutPage() {
  useSEO({
    title: 'Demonstration Checkout',
    description: 'Complete your simulated NEXORA hardware order in demonstration mode.',
  });

  const { items, subtotal, discountTotal, shipping, finalTotal, clearCart } = useCart();
  const { createDemoOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerDetails>(INITIAL_CUSTOMER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('demo-card');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6" />}
          title="No items to check out"
          description="Add devices to your cart before proceeding to demonstration checkout."
          action={
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#4F8CFF] text-white text-sm font-semibold hover:bg-[#3B7BF2]"
            >
              Browse Products
            </Link>
          }
        />
      </div>
    );
  }

  const handleFieldChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(customer);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please review form fields', 'Some required delivery details need correction.');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const order = createDemoOrder({
        customer,
        items,
        subtotal,
        discountTotal,
        shipping,
        total: finalTotal,
        paymentMethod,
      });
      clearCart();
      setSubmitting(false);
      showToast('success', 'Demo order created', `Reference: ${order.reference}`);
      navigate(`/order-confirmation/${encodeURIComponent(order.reference)}`);
    }, 650);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Clear Demo Banner */}
      <div className="mb-8 flex items-start gap-3 p-4 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/35 text-sm text-[#8AB4FF]">
        <AlertTriangle className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="text-white block">Demonstration Checkout Environment</strong>
          <span>
            No real payments are processed, and no financial credentials are transmitted. Submitting generates a local demo order reference for testing.
          </span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Customer & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          <section className="rounded-2xl bg-[#151922] border border-[#293241] p-6 space-y-5">
            <h2 className="text-xl font-semibold font-heading text-white">Delivery Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Delivery Address *
                </label>
                <input
                  id="address"
                  type="text"
                  value={customer.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="450 Innovation Drive, Suite 300"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={customer.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  placeholder="San Francisco"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="state" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    State / Region *
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={customer.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    placeholder="CA"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={customer.postalCode}
                    onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                    placeholder="94105"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.postalCode && <p className="text-xs text-red-400 mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method (Simulated) */}
          <section className="rounded-2xl bg-[#151922] border border-[#293241] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold font-heading text-white">
                Payment Method (Simulated)
              </h2>
              <span className="inline-flex items-center gap-1 text-xs text-[#8AB4FF]">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                Demo Mode
              </span>
            </div>

            <div className="space-y-3">
              {PAYMENT_OPTIONS.map((opt) => {
                const selected = paymentMethod === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                      selected
                        ? 'bg-[#4F8CFF]/10 border-[#4F8CFF]'
                        : 'bg-[#0B0D12] border-[#293241] hover:border-[#4F8CFF]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.id}
                      checked={selected}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="mt-1 accent-[#4F8CFF]"
                    />
                    <opt.icon className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-white">{opt.label}</p>
                      <p className="text-xs text-[#A5ADBA] mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#151922] border border-[#293241] p-6 space-y-5 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold font-heading text-white pb-4 border-b border-[#293241]">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {items.map(({ product, quantity }) => {
                const unitPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
                return (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover bg-[#0B0D12] border border-[#293241]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{product.title}</p>
                      <p className="text-xs text-[#A5ADBA]">Qty: {quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(unitPrice * quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#293241] space-y-2.5 text-sm">
              <div className="flex justify-between text-[#A5ADBA]">
                <span>Subtotal</span>
                <span className="text-white">{formatCurrency(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Savings</span>
                  <span>-{formatCurrency(discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#A5ADBA]">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold font-heading text-white pt-3 border-t border-[#293241]">
                <span>Final Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" isLoading={submitting} className="w-full">
              Place Demo Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
