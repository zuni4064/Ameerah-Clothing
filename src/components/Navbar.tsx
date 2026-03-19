import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { ShoppingBag, Heart, User, LogOut, Menu, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: "Shop",          to: "/products" },
  { label: "Collections",   to: "/collections" },
  { label: "New In",        to: "/new-arrivals" },
  { label: "Festive",       to: "/eid-festive" },
  { label: "Sale",          to: "/sale",        isSale: true },
  { label: "Lookbook",      to: "/lookbook" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "About",         to: "/about" },
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
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <motion.nav
      className={`sticky top-0 z-[2000] transition-all duration-500 ${solid ? 'glass-nav shadow-[0_1px_0_rgba(255,255,255,.04)]' : 'bg-transparent'}`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1480px] mx-auto px-5 md:px-10 flex items-center justify-between h-[60px] md:h-[68px]">

        {/* ── Logo ── */}
        <button
          onClick={() => navigate('/')}
          className="flex items-baseline gap-[2px] bg-transparent border-none cursor-pointer group select-none"
        >
          <span
            className="font-heading text-[22px] md:text-[26px] font-light tracking-[.06em] transition-opacity group-hover:opacity-80"
            style={{ color: 'hsl(var(--ivory))' }}
          >
            AMEERAH
          </span>
          <motion.span
            className="font-heading text-[28px] font-light"
            style={{ color: 'hsl(var(--gold))' }}
            animate={{ opacity: [.5, 1, .5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            .
          </motion.span>
        </button>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-[10px] xl:text-[10.5px] uppercase tracking-[.18em] font-medium transition-colors duration-300 ${
                  link.isSale
                    ? 'text-rose-400/90 hover:text-rose-300'
                    : active
                      ? 'text-[hsl(var(--gold))]'
                      : 'text-white/50 hover:text-white/90'
                } ${active ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Icons ── */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {isAdmin && (
            <motion.button
              onClick={() => navigate('/admin')}
              title="Admin"
              className="text-white/40 hover:text-[hsl(var(--gold))] bg-transparent border-none cursor-pointer p-1.5 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .9 }}
            >
              <LayoutDashboard size={17} strokeWidth={1.4} />
            </motion.button>
          )}

          {user ? (
            <motion.button
              onClick={() => { if (window.confirm('Sign out?')) signOut(); }}
              title="Sign Out"
              className="text-white/40 hover:text-[hsl(var(--gold))] bg-transparent border-none cursor-pointer p-1.5 transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}
            >
              <LogOut size={17} strokeWidth={1.4} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate('/login')}
              className="text-white/40 hover:text-white/90 bg-transparent border-none cursor-pointer p-1.5 transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}
            >
              <User size={17} strokeWidth={1.4} />
            </motion.button>
          )}

          <motion.button
            aria-label="Wishlist"
            onClick={showWishlist}
            className="relative text-white/40 hover:text-rose-400 bg-transparent border-none cursor-pointer p-1.5 transition-colors"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}
          >
            <Heart size={17} strokeWidth={1.4} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wc"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold leading-none"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            aria-label="Cart"
            onClick={showCart}
            className="relative text-white/40 hover:text-[hsl(var(--gold))] bg-transparent border-none cursor-pointer p-1.5 transition-colors"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}
          >
            <ShoppingBag size={17} strokeWidth={1.4} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="cc"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[hsl(var(--gold))] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold leading-none"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            aria-label="Menu"
            onClick={onOpenMobile}
            className="lg:hidden text-white/50 hover:text-white/90 bg-transparent border-none cursor-pointer p-1.5 ml-1 transition-colors"
            whileTap={{ scale: .85 }}
          >
            <Menu size={20} strokeWidth={1.4} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}