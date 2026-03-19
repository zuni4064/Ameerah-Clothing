import { useState, useEffect, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCollections } from '@/hooks/useProducts';
import Seo from "@/components/Seo";

const COLLECTION_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
];

const CollectionsPage = () => {
  const { data: collections = [], isLoading } = useCollections();
  const { data: allProducts = [] } = useProducts();
  const [active, setActive] = useState<string>('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (collections.length > 0 && !active) {
      setActive(collections[0].id);
    }
  }, [collections, active]);

  const jumpTo = (id: string) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id.replace('col-', ''));
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Seo
        title="Collections — Ameerah Clothing"
        description="Browse our curated collections: Summer Lawn, Velvet Formal, Bridal Couture, Eid & Festive, and more."
        canonicalPath="/collections"
      />
      {/* Mobile pill tabs */}
      <div className="lg:hidden bg-card border-b border-border overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 p-4">
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => jumpTo(col.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-body border cursor-pointer whitespace-nowrap ${
                active === col.id ? 'bg-white/5 text-gold-light border-emerald' : 'bg-transparent border-border text-foreground'
              }`}
            >
              {col.emoji} {col.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-[220px] flex-shrink-0 bg-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="font-heading text-lg text-gold p-6 pb-4">Collections</h3>
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => jumpTo(col.id)}
              className={`w-full text-left px-6 py-3 font-body text-sm cursor-pointer border-none flex items-center gap-2 transition-colors ${
                active === col.id ? 'text-gold border-l-2 border-l-gold bg-white/5-light/50' : 'text-gold-light/70 hover:text-gold-light hover:bg-white/5-light/30'
              }`}
              style={active === col.id ? { borderLeft: '3px solid hsl(var(--gold))' } : {}}
            >
              <span>{col.emoji}</span>
              <span className="flex-1">{col.name}</span>
              <span className="text-xs text-gold-light/40">{col.count}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {collections.map((col, i) => {
            const products = allProducts.filter(p => p.category === col.id).slice(0, 6);
            return (
              <div key={col.id} id={`col-${col.id}`} ref={el => { sectionRefs.current[col.id] = el; }}>
                {/* Banner */}
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <img src={COLLECTION_IMAGES[i]} alt={col.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-charcoal/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
                    <div>
                      <h2 className="font-heading text-2xl md:text-4xl mb-2" style={{ color: 'white' }}>{col.emoji} {col.name}</h2>
                      <p className="font-body text-sm max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>{col.description}</p>
                      <p className="text-gold text-xs font-body mt-2">{col.count} pieces</p>
                    </div>
                    <span className="text-6xl md:text-8xl font-heading font-bold" style={{ color: 'rgba(255,255,255,0.1)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="p-4 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
