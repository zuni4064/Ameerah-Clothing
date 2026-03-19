import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";

const categories = ['All Sale', 'Lawn', 'Velvet', 'Casual', 'Party Wear', 'Unstitched', 'Festive'];
const catMap: Record<string, string> = { 'All Sale': 'all', Lawn: 'lawn', Velvet: 'velvet', Casual: 'casual', 'Party Wear': 'party', Unstitched: 'unstitched', Festive: 'festive' };

const SalePage = () => {
  const [cat, setCat] = useState('All Sale');
  const { data: allProducts = [] } = useProducts();

  const products = useMemo(() => {
    const saleProducts = allProducts.filter(p => p.badge === 'SALE');
    const key = catMap[cat];
    if (key === 'all') return saleProducts;
    return saleProducts.filter(p => p.category === key);
  }, [cat, allProducts]);

  return (
    <div>
      <Seo
        title="Sale — Ameerah Clothing"
        description="Limited-time offers on selected styles. Up to 40% off."
        canonicalPath="/sale"
      />
      <section className="py-12 md:py-16 text-center" style={{ background: 'linear-gradient(135deg, #2F3E46 0%, #3d1c1c 100%)' }}>
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: 'white' }}>SALE</h1>
        <p className="font-body mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Up to 40% off selected styles</p>
      </section>
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-sm font-body border cursor-pointer transition-colors ${
                cat === c ? 'bg-white/5 text-gold-light border-emerald' : 'bg-transparent border-border text-foreground hover:border-gold'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default SalePage;
