import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import MobileDrawer from "@/components/MobileDrawer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { ScrollToTop } from "@/routes/ScrollToTop";

const LayoutContent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { addToCart } = useCart();
  const location = useLocation();

  return (
    <WishlistProvider addToCart={addToCart}>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <AnnouncementBar />
        <Navbar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1">
          <div key={location.pathname} className="page-fade">
            <Outlet />
          </div>
        </main>
        <Footer />
        <FloatingButtons />
        <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <CartDrawer />
        <WishlistDrawer />
      </div>
    </WishlistProvider>
  );
};

export default function AppLayout() {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  );
}

