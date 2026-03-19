import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice } from '@/data/products';

const WishlistDrawer = () => {
  const { wishlist, wishlistOpen, hideWishlist, removeFromWishlist, moveToCart, moveAllToCart, wishlistCount } = useWishlist();

  if (!wishlistOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-charcoal/35 z-[3000]" onClick={hideWishlist} />
      <div className="fixed top-0 right-0 h-full w-[430px] max-w-full bg-card z-[3001] shadow-2xl flex flex-col" style={{ animation: 'slide-in-right 0.3s cubic-bezier(.4,0,.2,1)' }}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-heading text-xl">My Wishlist <span className="text-muted-foreground text-sm font-body">({wishlistCount})</span></h3>
          <button onClick={hideWishlist} className="bg-transparent border-none cursor-pointer p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-5xl">♡</span>
              <p className="text-muted-foreground font-body">Your wishlist is empty</p>
              <button onClick={hideWishlist} className="bg-white/5 text-gold-light px-8 py-3 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors">
                Explore Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {wishlist.map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-border">
                  <img src={item.image} alt={item.name} className="w-[65px] h-[80px] object-cover object-top flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground font-body mt-1">{item.tag}</p>
                    <p className="text-sm font-semibold font-body text-gold mt-1">{formatPrice(item.price)}</p>
                    <button onClick={() => moveToCart(i)} className="mt-2 text-xs text-gold font-body font-semibold cursor-pointer bg-transparent border-none hover:underline">
                      Move to Cart →
                    </button>
                  </div>
                  <button onClick={() => removeFromWishlist(i)} className="bg-transparent border-none cursor-pointer p-1 self-start text-muted-foreground hover:text-destructive">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="border-t border-border p-6">
            <button onClick={moveAllToCart} className="w-full bg-white/5 text-gold-light py-3 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors">
              Move All to Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
