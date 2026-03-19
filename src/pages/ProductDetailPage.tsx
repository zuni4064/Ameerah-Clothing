import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from '@/data/products';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Seo from "@/components/Seo";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const { data: product, isLoading } = useProduct(id ?? '');
  const [qty, setQty] = useState(1);
  const [type, setType] = useState<'Stitched' | 'Unstitched'>('Stitched');
  const [size, setSize] = useState('M');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <Seo title="Product not found — Ameerah Clothing" canonicalPath="/products" />
          <p className="font-heading text-2xl mb-4">Product not found</p>
          <button onClick={() => navigate("/products")} className="bg-white/5 text-gold-light px-6 py-3 font-body font-semibold text-sm uppercase tracking-wider border-none cursor-pointer">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, tag: `${product.tag} · ${type}${type === 'Stitched' ? ` · ${size}` : ''}` });
    }
  };

  const accordionItems = [
    { id: 'fabric', title: '✦ Fabric & Material', content: 'Premium quality fabric with intricate embroidery work. The material is carefully selected for comfort and durability. Available in cotton, lawn, chiffon, and velvet depending on the collection.' },
    { id: 'sizing', title: '✦ Sizing Guide', content: 'S (Bust 34", Length 38") | M (Bust 36", Length 39") | L (Bust 38", Length 40") | XL (Bust 40", Length 41") | XXL (Bust 42", Length 42"). For unstitched options, standard fabric lengths are provided.' },
    { id: 'care', title: '✦ Care Instructions', content: 'Dry clean recommended for embroidered pieces. Machine wash cold for lawn and cotton. Iron on medium heat. Store in a cool, dry place.' },
    { id: 'delivery', title: '✦ Delivery & Returns', content: 'Free delivery on orders above PKR 3,000. Standard delivery: 3-5 business days. Express delivery available. 7-day exchange policy for unused items with tags attached.' },
  ];

  return (
    <div>
      <Seo
        title={`${product.name} — Ameerah Clothing`}
        description={product.description ?? `Discover ${product.name} from our ${product.category} collection.`}
        canonicalPath={`/product/${product.id}`}
      />
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground flex-wrap">
          <button onClick={() => navigate(-1)} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-gold">← Back</button>
          <span>·</span>
          <span>Ameerah Clothing</span>
          <span>·</span>
          <span className="capitalize">{product.category}</span>
          <span>·</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div>
            <div className="mb-4" style={{ aspectRatio: '3/4' }}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" decoding="async" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="border border-border cursor-pointer hover:border-gold transition-colors" style={{ aspectRatio: '3/4' }}>
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="text-gold text-xs font-body font-semibold uppercase tracking-wider">
              {product.category.toUpperCase()} COLLECTION
            </span>
            <h1 className="font-heading text-3xl md:text-4xl mt-2 mb-3">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gold text-sm">{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-2xl font-bold text-gold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {product.description && (
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Type selector */}
            <div className="mb-4">
              <label className="font-body text-sm font-medium text-foreground mb-2 block">Type</label>
              <div className="flex gap-2">
                {(['Stitched', 'Unstitched'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`px-6 py-2.5 font-body text-sm border cursor-pointer transition-colors ${
                      type === t ? 'bg-white/5 text-gold-light border-emerald' : 'bg-transparent border-border text-foreground hover:border-gold'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            {type === 'Stitched' && (
              <div className="mb-4">
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Size</label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`w-12 h-12 font-body text-sm border cursor-pointer transition-colors ${
                        size === s ? 'bg-white/5 text-gold-light border-emerald' : 'bg-transparent border-border text-foreground hover:border-gold'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-6">
              <label className="font-body text-sm font-medium text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-0 w-fit border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 bg-transparent border-none cursor-pointer text-lg flex items-center justify-center hover:bg-white/5">−</button>
                <span className="w-12 h-12 flex items-center justify-center font-body border-x border-border">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-12 h-12 bg-transparent border-none cursor-pointer text-lg flex items-center justify-center hover:bg-white/5">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart}
                className="flex-1 bg-white/5 text-gold-light py-3.5 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors">
                Add to Cart
              </button>
              <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag })}
                className={`w-14 h-14 border flex items-center justify-center cursor-pointer transition-colors ${
                  wishlisted ? 'bg-pink-50 border-pink-200' : 'bg-transparent border-border hover:border-gold'
                }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? '#e11d48' : 'none'} stroke={wishlisted ? '#e11d48' : 'currentColor'} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <p className="font-body text-sm text-muted-foreground mb-6">🚚 Free delivery on orders above PKR 3,000</p>

            {/* Accordions */}
            <div className="border-t border-border">
              {accordionItems.map(item => (
                <div key={item.id} className="border-b border-border">
                  <button onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-left">
                    <span className="font-body text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-muted-foreground">{openAccordion === item.id ? '−' : '+'}</span>
                  </button>
                  {openAccordion === item.id && (
                    <div className="pb-4">
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  )}
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
