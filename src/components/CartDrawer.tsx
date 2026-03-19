import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { cart, cartOpen, hideCart, removeFromCart, changeQty, cartCount } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!cartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-charcoal/35 z-[3000]" onClick={hideCart} />
      <div className="fixed top-0 right-0 h-full w-[430px] max-w-full bg-card z-[3001] shadow-2xl flex flex-col" style={{ animation: 'slide-in-right 0.3s cubic-bezier(.4,0,.2,1)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-heading text-xl">Shopping Cart <span className="text-muted-foreground text-sm font-body">({cartCount})</span></h3>
          <button onClick={hideCart} className="bg-transparent border-none cursor-pointer p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-5xl">🛒</span>
              <p className="text-muted-foreground font-body">Your cart is empty</p>
              <button onClick={hideCart} className="bg-white/5 text-gold-light px-8 py-3 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors">
                Shop Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-border">
                  <img src={item.image} alt={item.name} className="w-[65px] h-[80px] object-cover object-top flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-muted-foreground font-body mt-1">{item.tag}</p>
                    <p className="text-sm font-semibold font-body text-gold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => changeQty(i, -1)} className="w-7 h-7 border border-border bg-transparent flex items-center justify-center cursor-pointer text-sm">−</button>
                      <span className="text-sm font-body w-6 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(i, 1)} className="w-7 h-7 border border-border bg-transparent flex items-center justify-center cursor-pointer text-sm">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(i)} className="bg-transparent border-none cursor-pointer p-1 self-start text-muted-foreground hover:text-destructive">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">Subtotal</span>
              <span className="font-heading text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground font-body">🚚 Free delivery on orders above PKR 3,000</p>
            <button
              onClick={() => {
                hideCart();
                navigate("/checkout");
              }}
              className="w-full bg-white/5 text-gold-light py-3 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors"
            >
              Proceed to Checkout →
            </button>
            <button onClick={hideCart} className="w-full bg-transparent border border-border text-foreground py-3 font-body text-sm cursor-pointer hover:bg-white/5 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
