import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D12]/85 backdrop-blur-xl border-b border-[#293241]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#2563EB] flex items-center justify-center shadow-lg shadow-[#4F8CFF]/25">
              <span className="font-heading font-bold text-white text-lg tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-wider text-white leading-none">
                NEXORA
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8AB4FF] mt-0.5">
                Technology. Elevated.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-[#151922] border border-[#293241]'
                      : 'text-[#A5ADBA] hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              title="Demo Admin Dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#4F8CFF]" aria-hidden="true" />
              <span>Admin Demo</span>
            </Link>

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search products"
              className="p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistItems.length} items)`}
              className="relative p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#4F8CFF] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Shopping cart (${itemCount} items)`}
              className="relative p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#4F8CFF] text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-[#293241] bg-[#0B0D12]"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/30'
                        : 'text-[#A5ADBA] hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#A5ADBA] hover:text-white hover:bg-white/5"
              >
                <ShieldCheck className="w-4 h-4 text-[#4F8CFF]" />
                <span>Admin Dashboard (Demo)</span>
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
