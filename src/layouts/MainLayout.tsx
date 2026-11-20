import { useState, type ReactNode } from 'react';
import { CartDrawer } from '../components/layout/CartDrawer';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { SearchOverlay } from '../components/layout/SearchOverlay';
import { ToastContainer } from '../components/ui/ToastContainer';

export function MainLayout({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D12] text-white">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ToastContainer />
    </div>
  );
}
