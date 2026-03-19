import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, cartOpen, hideCart, removeFromCart, changeQty, cartCount } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000]"
            onClick={hideCart}
          />

          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: .38, ease: [.32,.72,0,1] }}
            className="fixed top-0 right-0 h-full w-[400px] max-w-full z-[3001] flex flex-col"
            style={{ background: 'hsl(var(--card))', borderLeft: '1px solid rgba(255,255,255,.07)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} strokeWidth={1.3} style={{ color: 'hsl(var(--gold))' }} />
                <h3 className="font-heading text-[18px] font-light tracking-wide" style={{ color: 'hsl(var(--ivory))' }}>
                  Your Bag
                </h3>
                {cartCount > 0 && (
                  <span
                    className="text-[10px] font-body font-semibold tracking-[.1em] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(180,140,90,.15)', color: 'hsl(var(--gold-light))' }}
                  >
                    {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
                  </span>
                )}
              </div>
              <button
                onClick={hideCart}
                className="bg-transparent border-none cursor-pointer p-1.5 transition-colors"
                style={{ color: 'rgba(255,255,255,.4)' }}
              >
                <X size={18} strokeWidth={1.3} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-16">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}
                  >
                    <ShoppingBag size={24} strokeWidth={1} style={{ color: 'rgba(255,255,255,.25)' }} />
                  </div>
                  <p className="font-heading text-lg font-light" style={{ color: 'rgba(255,255,255,.4)' }}>Your bag is empty</p>
                  <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,.25)' }}>Add something exquisite</p>
                  <button
                    onClick={hideCart}
                    className="btn-outline px-7 py-3 rounded-sm text-[10px] mt-2"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y" style={{ '--tw-divide-opacity': '0.06', divideColor: 'rgb(255 255 255 / var(--tw-divide-opacity))' } as React.CSSProperties}>
                  {cart.map((item, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      className="flex gap-4 py-5"
                    >
                      <div className="w-[64px] h-[82px] flex-shrink-0 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.07)' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-heading text-sm font-light leading-snug"
                          style={{ color: 'hsl(var(--ivory))' }}
                        >
                          {item.name}
                        </h4>
                        <p
                          className="font-body text-[11px] mt-1"
                          style={{ color: 'rgba(255,255,255,.38)' }}
                        >
                          {item.tag}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-0" style={{ border: '1px solid rgba(255,255,255,.1)' }}>
                            <button
                              onClick={() => changeQty(i, -1)}
                              className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors hover:bg-white/5"
                              style={{ color: 'rgba(255,255,255,.5)' }}
                            >
                              <Minus size={11} />
                            </button>
                            <span
                              className="w-7 h-7 flex items-center justify-center font-body text-xs"
                              style={{ color: 'hsl(var(--ivory))', borderLeft: '1px solid rgba(255,255,255,.08)', borderRight: '1px solid rgba(255,255,255,.08)' }}
                            >
                              {item.qty}
                            </span>
                            <button
                              onClick={() => changeQty(i, 1)}
                              className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors hover:bg-white/5"
                              style={{ color: 'rgba(255,255,255,.5)' }}
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="font-body text-sm font-semibold" style={{ color: 'hsl(var(--gold))' }}>
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(i)}
                        className="bg-transparent border-none cursor-pointer self-start p-1 transition-colors mt-0.5"
                        style={{ color: 'rgba(255,255,255,.22)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,60,60,.7)'}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,.22)'}
                      >
                        <X size={13} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 pt-4 pb-6 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
                <div className="flex items-center justify-between py-2">
                  <span className="font-body text-xs uppercase tracking-[.14em]" style={{ color: 'rgba(255,255,255,.4)' }}>
                    Subtotal
                  </span>
                  <span className="font-heading text-xl font-light" style={{ color: 'hsl(var(--ivory))' }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-body text-[10.5px]" style={{ color: 'rgba(255,255,255,.3)' }}>
                  🚚 Free delivery on orders above PKR 3,000
                </p>
                <button
                  onClick={() => { hideCart(); navigate("/checkout"); }}
                  className="btn-gold w-full py-3.5 rounded-sm"
                >
                  Proceed to Checkout →
                </button>
                <button
                  onClick={hideCart}
                  className="btn-ghost w-full py-2.5 rounded-sm text-[10.5px] tracking-[.12em]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;