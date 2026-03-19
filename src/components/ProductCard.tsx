import { useState } from 'react';
import { motion } from 'framer-motion';
import { type Product, formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from 'lucide-react';

const badgeConfig: Record<string, { label: string; className: string }> = {
  NEW:        { label: 'New',      className: 'bg-white/10 text-ivory border border-white/15' },
  HOT:        { label: 'Hot',      className: 'bg-gold/90 text-black' },
  EID:        { label: 'Eid',      className: 'bg-amber-900/60 text-gold border border-gold/20' },
  BRIDAL:     { label: 'Bridal',   className: 'bg-rose-900/50 text-rose-200' },
  SALE:       { label: 'Sale',     className: 'bg-red-500 text-white' },
  UNSTITCHED: { label: 'Fabric',   className: 'bg-white/10 text-ivory/80' },
  DISABLED:   { label: 'Hidden',   className: 'bg-black/60 text-white/40' },
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [heartAnim, setHeartAnim] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const badge = product.badge ? badgeConfig[product.badge] : null;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag });
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 420);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag });
  };

  return (
    <motion.div
      className="group cursor-pointer relative"
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer glass backdrop-blur-sm"
          whileTap={{ scale: 0.85 }}
          animate={heartAnim ? { scale: [1, 1.3, 0.9, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Heart
            size={15}
            className={wishlisted ? 'fill-rose-400 text-rose-400' : 'text-ivory/80'}
          />
        </motion.button>

        {/* Add to Cart — slides up from bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <motion.button
            onClick={handleAddToCart}
            className="w-full btn-gold py-2.5 gap-2 rounded-md"
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </motion.button>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute -inset-full translate-x-[-50%] translate-y-[-50%] group-hover:translate-x-[150%] group-hover:translate-y-[150%] transition-transform duration-1000 ease-in-out w-1/2 h-full bg-gradient-to-br from-white/0 via-white/12 to-white/0 rotate-12" />
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 px-1">
        <h3 className="font-heading text-sm md:text-base text-ivory leading-snug truncate">{product.name}</h3>
        <p className="text-[10px] text-ivory/40 font-body uppercase tracking-wider mt-0.5 mb-1">{product.tag}</p>
        <div className="flex items-center gap-2">
          <span className="font-body font-semibold text-gold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-ivory/30 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
