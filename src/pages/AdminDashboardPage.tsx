import { AlertTriangle, DollarSign, Package, Search, ShoppingCart, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';
import type { OrderStatus } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

const STATUS_BADGE: Record<OrderStatus, string> = {
  Processing: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Shipped: 'bg-[#4F8CFF]/15 text-[#8AB4FF] border-[#4F8CFF]/30',
  Delivered: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Pending Review': 'bg-slate-500/15 text-slate-300 border-slate-500/30',
};

export default function AdminDashboardPage() {
  useSEO({
    title: 'Admin Dashboard (Demo)',
    description: 'Demonstration admin interface for NEXORA catalog and demo orders.',
  });

  const { products, loading } = useProducts();
  const { orders, updateOrderStatus } = useOrders();

  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [productSearch, setProductSearch] = useState('');

  const demoRevenue = useMemo(
    () => orders.reduce((acc, ord) => acc + ord.total, 0),
    [orders]
  );

  const statusCounts = useMemo(() => {
    const counts: Record<OrderStatus, number> = {
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      'Pending Review': 0,
    };
    for (const o of orders) {
      counts[o.status] = (counts[o.status] ?? 0) + 1;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
      const q = orderSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        ord.reference.toLowerCase().includes(q) ||
        ord.customer.fullName.toLowerCase().includes(q) ||
        ord.customer.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [orders, statusFilter, orderSearch]);

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return products.slice(0, 10);
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [products, productSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Demo Warning */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="text-white block">Demonstration Admin Interface</strong>
          <span>
            This dashboard displays client-side demo orders (including orders placed in your current browser session) and live catalog data. It is not connected to a production backend or authentication system.
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
          Operations Preview
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
          Admin Dashboard (Demo)
        </h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#151922] border border-[#293241]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#A5ADBA]">Catalog Products</span>
            <Package className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <p className="text-3xl font-bold font-heading text-white">
            {loading ? '—' : products.length}
          </p>
          <p className="text-xs text-[#8AB4FF] mt-1">Normalized API + fallback items</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#151922] border border-[#293241]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#A5ADBA]">Demo Orders</span>
            <ShoppingCart className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <p className="text-3xl font-bold font-heading text-white">{orders.length}</p>
          <p className="text-xs text-[#A5ADBA] mt-1">Seeded + session orders</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#151922] border border-[#293241]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#A5ADBA]">Demo Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold font-heading text-white">
            {formatCurrency(demoRevenue)}
          </p>
          <p className="text-xs text-emerald-400 mt-1">Simulated order total</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#151922] border border-[#293241]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#A5ADBA]">Order Statuses</span>
            <TrendingUp className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-xs text-white">
              Delivered: <strong>{statusCounts.Delivered}</strong>
            </span>
            <span className="text-xs text-[#8AB4FF]">
              Shipped: <strong>{statusCounts.Shipped}</strong>
            </span>
            <span className="text-xs text-amber-300">
              Processing: <strong>{statusCounts.Processing}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Recent Demo Orders */}
      <section className="rounded-2xl bg-[#151922] border border-[#293241] overflow-hidden">
        <div className="p-6 border-b border-[#293241] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">Recent Demo Orders</h2>
            <p className="text-xs text-[#A5ADBA] mt-0.5">
              Filter by reference, customer, or update simulated status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#A5ADBA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders..."
                aria-label="Search demo orders"
                className="pl-9 pr-3 py-2 rounded-xl bg-[#0B0D12] border border-[#293241] text-xs text-white focus:border-[#4F8CFF] focus:outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'All')}
              aria-label="Filter by order status"
              className="px-3 py-2 rounded-xl bg-[#0B0D12] border border-[#293241] text-xs text-white focus:border-[#4F8CFF] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0B0D12] text-xs uppercase tracking-wider text-[#A5ADBA]">
              <tr>
                <th className="px-6 py-3.5">Reference</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293241]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-[#8AB4FF] whitespace-nowrap">
                    <Link to={`/order-confirmation/${encodeURIComponent(ord.reference)}`} className="hover:underline">
                      {ord.reference}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{ord.customer.fullName}</p>
                    <p className="text-xs text-[#A5ADBA]">{ord.customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#A5ADBA] whitespace-nowrap">
                    {formatDate(ord.createdAt)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                    {formatCurrency(ord.total)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      aria-label={`Update status for ${ord.reference}`}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border bg-[#0B0D12] cursor-pointer ${STATUS_BADGE[ord.status]}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pending Review">Pending Review</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Catalog Product Listing */}
      <section className="rounded-2xl bg-[#151922] border border-[#293241] overflow-hidden">
        <div className="p-6 border-b border-[#293241] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">Catalog Inventory Preview</h2>
            <p className="text-xs text-[#A5ADBA] mt-0.5">Showing up to 10 matching products</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#A5ADBA] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Filter catalog..."
              aria-label="Filter catalog products"
              className="pl-9 pr-3 py-2 rounded-xl bg-[#0B0D12] border border-[#293241] text-xs text-white focus:border-[#4F8CFF] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0B0D12] text-xs uppercase tracking-wider text-[#A5ADBA]">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">SKU</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293241]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-3.5">
                    <Link to={`/products/${p.id}`} className="flex items-center gap-3 hover:text-[#8AB4FF]">
                      <img
                        src={p.thumbnail}
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover bg-[#0B0D12]"
                      />
                      <span className="font-medium text-white truncate max-w-xs">{p.title}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 text-xs text-[#8AB4FF]">{p.category}</td>
                  <td className="px-6 py-3.5 text-xs text-[#A5ADBA]">{p.sku}</td>
                  <td className="px-6 py-3.5 font-medium text-white">{formatCurrency(p.price)}</td>
                  <td className="px-6 py-3.5 text-xs text-[#A5ADBA]">{p.stock} units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
