import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { ShoppingBag, Heart, User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: "Home",         to: "/" },
  { label: "Shop",         to: "/products" },
  { label: "Collections",  to: "/collections" },
  { label: "New",          to: "/new-arrivals" },
  { label: "Eid",          to: "/eid-festive" },
  { label: "Sale",         to: "/sale",        isSale: true },
  { label: "Lookbook",     to: "/lookbook" },
  { label: "Craftsmanship",to: "/craftsmanship" },
  { label: "About",        to: "/about" },
  { label: "Contact",      to: "/contact" },
];

export default function Navbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const { showCart, cartCount } = useCart();
  const { showWishlist, wishlistCount } = useWishlist();
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <motion.nav
      className={`sticky top-0 z-[2000] transition-all duration-500 ${solid ? 'glass-nav shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex items-center justify-between h-16 md:h-[72px]">

        {/* ── Logo ── */}
        <button onClick={() => navigate('/')} className="flex items-baseline gap-px bg-transparent border-none cursor-pointer group select-none">
          <span className="font-heading text-2xl md:text-3xl font-bold text-ivory transition-colors group-hover:text-ivory/80">Ameerah</span>
          <motion.span
            className="font-heading text-3xl font-bold text-gradient"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >.</motion.span>
        </button>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 glass px-7 py-2.5 rounded-full">
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-[10px] xl:text-[11px] uppercase tracking-[.16em] font-semibold transition-colors duration-300 ${
                  link.isSale ? 'text-red-400 hover:text-red-300' : active ? 'text-gold' : 'text-ivory/60 hover:text-ivory'
                } ${active ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Icons ── */}
        <div className="flex items-center gap-3">

          {isAdmin && (
            <motion.button
              onClick={() => navigate('/admin')}
              title="Admin Dashboard"
              className="text-gold/70 hover:text-gold bg-transparent border-none cursor-pointer p-1"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <LayoutDashboard size={19} strokeWidth={1.5} />
            </motion.button>
          )}

          {/* Auth */}
          {user ? (
            <motion.button
              onClick={() => { if (window.confirm('Sign out?')) signOut(); }}
              title="Sign Out"
              className="text-ivory/60 hover:text-gold bg-transparent border-none cursor-pointer p-1"
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
            >
              <LogOut size={19} strokeWidth={1.5} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate('/login')}
              className="text-ivory/60 hover:text-gold bg-transparent border-none cursor-pointer p-1"
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
            >
              <User size={19} strokeWidth={1.5} />
            </motion.button>
          )}

          {/* Wishlist */}
          <motion.button
            aria-label="Wishlist"
            onClick={showWishlist}
            className="relative text-ivory/60 hover:text-rose-400 bg-transparent border-none cursor-pointer p-1"
            whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          >
            <Heart size={19} strokeWidth={1.5} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wc"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Cart */}
          <motion.button
            aria-label="Cart"
            onClick={showCart}
            className="relative text-ivory/60 hover:text-gold bg-transparent border-none cursor-pointer p-1"
            whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="cc"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <motion.button
            aria-label="Menu"
            onClick={onOpenMobile}
            className="lg:hidden text-ivory/70 hover:text-gold bg-transparent border-none cursor-pointer p-1 ml-1"
            whileTap={{ scale: 0.85 }}
          >
            <Menu size={22} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
