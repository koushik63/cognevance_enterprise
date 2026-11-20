import { ArrowRight, CheckCircle2, FileText, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { useOrders } from '../context/OrderContext';
import { useSEO } from '../hooks/useSEO';
import { calculateDiscountedPrice, formatCurrency, formatDate } from '../utils/formatters';

export default function OrderConfirmationPage() {
  const { reference } = useParams<{ reference: string }>();
  const { getOrderByReference, lastOrder } = useOrders();

  const order = reference ? getOrderByReference(decodeURIComponent(reference)) : lastOrder;

  useSEO({
    title: order ? `Demo Order ${order.reference}` : 'Order Confirmation',
    description: 'Demonstration order confirmation summary on NEXORA.',
  });

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="Demo order not found"
          description="We could not locate that demonstration order reference in local session storage."
          action={
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#4F8CFF] text-white text-sm font-semibold hover:bg-[#3B7BF2]"
            >
              Return to Storefront
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="rounded-3xl bg-[#151922] border border-[#293241] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#293241]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/30 mb-1.5">
                SIMULATED DEMO ORDER
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Demo Order Confirmed
              </h1>
              <p className="text-sm text-[#A5ADBA] mt-1">
                Reference: <strong className="text-white">{order.reference}</strong> · Placed on{' '}
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          <Link
            to="/admin"
            className="text-xs font-semibold text-[#8AB4FF] hover:text-white underline underline-offset-4"
          >
            View in Admin Demo →
          </Link>
        </div>

        {/* Customer & Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#293241] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8AB4FF]">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Delivery Recipient</span>
            </div>
            <p className="text-sm font-semibold text-white">{order.customer.fullName}</p>
            <p className="text-xs text-[#A5ADBA]">{order.customer.address}</p>
            <p className="text-xs text-[#A5ADBA]">
              {order.customer.city}, {order.customer.state} {order.customer.postalCode}
            </p>
            <p className="text-xs text-[#A5ADBA]">
              {order.customer.email} · {order.customer.phone}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#293241] space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8AB4FF]">
              Payment & Totals (Demo)
            </p>
            <div className="flex justify-between text-[#A5ADBA]">
              <span>Subtotal</span>
              <span className="text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#A5ADBA]">
              <span>Shipping</span>
              <span className="text-white">
                {order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold font-heading text-white pt-2 border-t border-[#293241]">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        {order.items.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold font-heading text-white">Items Ordered</h2>
            <div className="rounded-2xl bg-[#0B0D12] border border-[#293241] divide-y divide-[#293241]">
              {order.items.map(({ product, quantity }) => {
                const unitPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
                return (
                  <div key={product.id} className="flex items-center gap-4 p-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-14 h-14 rounded-xl object-cover bg-[#151922]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{product.title}</p>
                      <p className="text-xs text-[#A5ADBA]">
                        Qty: {quantity} × {formatCurrency(unitPrice)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(unitPrice * quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <p className="text-xs text-[#A5ADBA]">
            This is a demonstration summary. No real shipment or payment was initiated.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white text-sm font-semibold transition-colors"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
