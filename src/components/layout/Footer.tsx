import { ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { validateEmail } from '../../utils/validation';

export function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail('');
    showToast('success', 'Demo subscription recorded', 'Newsletter sign-up is simulated in this frontend demo.');
  };

  return (
    <footer className="bg-[#0B0D12] border-t border-[#293241] text-[#A5ADBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#2563EB] flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">N</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg tracking-wider text-white block leading-none">
                  NEXORA
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8AB4FF]">
                  Technology. Elevated.
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Modern technology retail and enterprise hardware procurement. Engineered for performance, clarity, and reliability.
            </p>
            <p className="text-xs text-[#A5ADBA]/75 border border-[#293241] rounded-xl px-3 py-2 bg-[#151922]/60">
              Demonstration storefront: Checkout, forms, and admin analytics operate in client-side demo mode.
            </p>
          </div>

          {/* Commerce */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Storefront</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Enterprise</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/solutions" className="hover:text-white transition-colors">Business Solutions</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About NEXORA</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-[#8AB4FF] transition-colors">Admin Demo</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Product Briefings
            </h3>
            <p className="text-sm">
              Receive hardware release notes and enterprise procurement updates (demo form).
            </p>
            <form onSubmit={handleSubscribe} noValidate className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#A5ADBA] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email address for newsletter"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white placeholder-[#A5ADBA]/60 focus:border-[#4F8CFF] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2.5 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white text-sm font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              {subscribed && !error && (
                <p className="text-xs text-emerald-400">
                  Demo confirmation: Email validated locally (no external email sent).
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#293241] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} NEXORA Technology Platform. Demonstration Build.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Technology Philosophy</Link>
            <Link to="/solutions" className="hover:text-white transition-colors">Procurement</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
