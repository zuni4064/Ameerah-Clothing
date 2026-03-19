import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from '@/data/products';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Seo from "@/components/Seo";
import { Heart, ChevronDown, ChevronUp, Minus, Plus, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailPage = () => {
  const { id }       = useParams<{ id: string }>();
  const navigate     = useNavigate();
  const { addToCart }            = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const { data: product, isLoading } = useProduct(id ?? '');
  const [qty,          setQty]          = useState(1);
  const [type,         setType]         = useState<'Stitched' | 'Unstitched'>('Stitched');
  const [size,         setSize]         = useState('M');
  const [activeImg,    setActiveImg]    = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [addedAnim,    setAddedAnim]    = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div
          className="w-9 h-9 rounded-full animate-spin"
          style={{ border: '2px solid rgba(180,140,90,.2)', borderTopColor: 'hsl(var(--gold))' }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Seo title="Product not found — Ameerah Clothing" canonicalPath="/products" />
        <div className="text-center">
          <p className="font-heading text-2xl font-light mb-4" style={{ color: 'hsl(var(--ivory))' }}>Product not found</p>
          <button onClick={() => navigate('/products')} className="btn-outline px-6 py-3 rounded-sm">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images     = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id:    product.id,
        name:  product.name,
        price: product.price,
        image: product.image,
        tag:   `${product.tag} · ${type}${type === 'Stitched' ? ` · ${size}` : ''}`,
      });
    }
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1600);
  };

  const accordions = [
    { id: 'fabric',   label: 'Fabric & Material',   body: 'Premium quality fabric with intricate embroidery work. The material is carefully selected for comfort and durability. Available in cotton, lawn, chiffon, and velvet depending on the collection.' },
    { id: 'sizing',   label: 'Sizing Guide',         body: 'S (Bust 34", Length 38") · M (Bust 36", Length 39") · L (Bust 38", Length 40") · XL (Bust 40", Length 41") · XXL (Bust 42", Length 42"). For unstitched, standard fabric lengths are provided.' },
    { id: 'care',     label: 'Care Instructions',    body: 'Dry clean recommended for embroidered pieces. Machine wash cold for lawn and cotton. Iron on medium heat. Store in a cool, dry place.' },
    { id: 'delivery', label: 'Delivery & Returns',   body: 'Free delivery on orders above PKR 3,000. Standard delivery: 3–5 business days. Express delivery available. 7-day exchange policy for unused items with tags attached.' },
  ];

  return (
    <div>
      <Seo
        title={`${product.name} — Ameerah Clothing`}
        description={product.description ?? `Discover ${product.name} from our ${product.category} collection.`}
        canonicalPath={`/product/${product.id}`}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1480px] mx-auto px-5 md:px-10 py-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer transition-colors group"
          style={{ color: 'rgba(255,255,255,.35)' }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--gold))'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,.35)'}
        >
          <ArrowLeft size={14} strokeWidth={1.3} />
          <span className="font-body text-[11px] uppercase tracking-[.14em]">Back</span>
        </button>
      </div>

      {/* Main grid */}
      <div className="max-w-[1480px] mx-auto px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Images ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', border: '1px solid rgba(255,255,255,.07)' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .5 }}
                />
              </AnimatePresence>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`tag-pill ${
                    product.badge === 'SALE' || product.badge === 'HOT' ? 'tag-pill-red' :
                    product.badge === 'NEW'    ? 'tag-pill-ice' : 'tag-pill-gold'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden cursor-pointer bg-transparent border-none p-0 transition-all"
                  style={{
                    aspectRatio: '3/4',
                    border: `1px solid ${i === activeImg ? 'hsl(var(--gold))' : 'rgba(255,255,255,.07)'}`,
                    opacity: i === activeImg ? 1 : 0.55,
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Details ── */}
          <div className="py-2">
            {/* Category + name */}
            <span
              className="font-body text-[9.5px] font-semibold uppercase tracking-[.22em]"
              style={{ color: 'hsl(var(--gold))' }}
            >
              {product.category.toUpperCase()} COLLECTION
            </span>
            <h1
              className="font-heading font-light mt-2 mb-3 leading-[1.1]"
              style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'hsl(var(--ivory))' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2.5 mb-4">
                <span style={{ color: 'hsl(var(--gold))', fontSize: '13px' }}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,.35)' }}>
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="font-heading text-[28px] font-light"
                style={{ color: 'hsl(var(--gold))' }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  className="font-body text-base line-through"
                  style={{ color: 'rgba(255,255,255,.28)' }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p
                className="font-body text-[13.5px] leading-[1.8] mb-6"
                style={{ color: 'rgba(255,255,255,.55)' }}
              >
                {product.description}
              </p>
            )}

            <div
              className="pt-5 space-y-5"
              style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}
            >
              {/* Type */}
              <div>
                <label
                  className="font-body text-[10.5px] font-medium uppercase tracking-[.16em] mb-3 block"
                  style={{ color: 'rgba(255,255,255,.4)' }}
                >
                  Type
                </label>
                <div className="flex gap-2.5">
                  {(['Stitched', 'Unstitched'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className="px-5 py-2.5 font-body text-xs cursor-pointer transition-all"
                      style={{
                        background: type === t ? 'rgba(180,140,90,.12)' : 'transparent',
                        border:     type === t ? '1px solid hsl(var(--gold))' : '1px solid rgba(255,255,255,.1)',
                        color:      type === t ? 'hsl(var(--gold-light))' : 'rgba(255,255,255,.55)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              {type === 'Stitched' && (
                <div>
                  <label
                    className="font-body text-[10.5px] font-medium uppercase tracking-[.16em] mb-3 block"
                    style={{ color: 'rgba(255,255,255,.4)' }}
                  >
                    Size
                  </label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className="w-11 h-11 font-body text-xs cursor-pointer transition-all"
                        style={{
                          background: size === s ? 'rgba(180,140,90,.12)' : 'transparent',
                          border:     size === s ? '1px solid hsl(var(--gold))' : '1px solid rgba(255,255,255,.1)',
                          color:      size === s ? 'hsl(var(--gold-light))' : 'rgba(255,255,255,.55)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty */}
              <div>
                <label
                  className="font-body text-[10.5px] font-medium uppercase tracking-[.16em] mb-3 block"
                  style={{ color: 'rgba(255,255,255,.4)' }}
                >
                  Quantity
                </label>
                <div
                  className="inline-flex items-center"
                  style={{ border: '1px solid rgba(255,255,255,.12)' }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors hover:bg-white/5"
                    style={{ color: 'rgba(255,255,255,.5)' }}
                  >
                    <Minus size={12} />
                  </button>
                  <span
                    className="w-11 h-11 flex items-center justify-center font-body text-sm"
                    style={{ color: 'hsl(var(--ivory))', borderLeft: '1px solid rgba(255,255,255,.1)', borderRight: '1px solid rgba(255,255,255,.1)' }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors hover:bg-white/5"
                    style={{ color: 'rgba(255,255,255,.5)' }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 btn-gold py-4 rounded-sm relative overflow-hidden"
                  whileTap={{ scale: .98 }}
                >
                  <AnimatePresence mode="wait">
                    {addedAnim ? (
                      <motion.span
                        key="added"
                        initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: .2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        ✓ Added to Bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: .2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        Add to Bag
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="opacity-0">Add to Bag</span>
                </motion.button>

                <button
                  onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag })}
                  className="w-14 h-14 flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    background:   wishlisted ? 'rgba(220,60,80,.12)' : 'transparent',
                    border:       wishlisted ? '1px solid rgba(220,60,80,.35)' : '1px solid rgba(255,255,255,.12)',
                    color:        wishlisted ? '#e1556a' : 'rgba(255,255,255,.45)',
                  }}
                >
                  <Heart size={17} strokeWidth={1.3} fill={wishlisted ? '#e1556a' : 'none'} />
                </button>
              </div>

              <p
                className="font-body text-[11px]"
                style={{ color: 'rgba(255,255,255,.28)' }}
              >
                🚚 Free delivery on orders above PKR 3,000
              </p>
            </div>

            {/* Accordions */}
            <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
              {accordions.map(item => (
                <div
                  key={item.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-left group"
                  >
                    <span
                      className="font-body text-[12.5px] font-medium tracking-[.06em] transition-colors"
                      style={{ color: openAccordion === item.id ? 'hsl(var(--gold))' : 'rgba(255,255,255,.65)' }}
                    >
                      {item.label}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,.3)' }}>
                      {openAccordion === item.id
                        ? <ChevronUp size={14} strokeWidth={1.3} />
                        : <ChevronDown size={14} strokeWidth={1.3} />
                      }
                    </span>
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: .3, ease: [.2,.8,.2,1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="font-body text-[12.5px] leading-[1.85] pb-4"
                          style={{ color: 'rgba(255,255,255,.45)' }}
                        >
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;