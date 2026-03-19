// ─────────────────────────────────────────────────
// CollectionsPage.tsx
// ─────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCollections } from '@/hooks/useProducts';
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const COLLECTION_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200',
];

export const CollectionsPage = () => {
  const { data: collections = [] } = useCollections();
  const { data: allProducts = []  } = useProducts();
  const [active, setActive]         = useState('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (collections.length > 0 && !active) setActive(collections[0].id);
  }, [collections, active]);

  const jumpTo = (id: string) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.replace('col-', '')); }),
      { rootMargin: '-100px 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <Seo title="Collections — Ameerah Clothing" description="Browse our curated collections." canonicalPath="/collections" />

      {/* Mobile tabs */}
      <div className="lg:hidden overflow-x-auto hide-scrollbar sticky top-[60px] z-10" style={{ background: 'rgba(6,5,4,.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="flex gap-2 p-3.5">
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => jumpTo(col.id)}
              className="flex-shrink-0 px-4 py-2 font-body text-[10px] font-medium uppercase tracking-[.14em] cursor-pointer border-none whitespace-nowrap transition-all"
              style={{
                background: active === col.id ? 'rgba(180,140,90,.12)' : 'transparent',
                border:     `1px solid ${active === col.id ? 'rgba(180,140,90,.35)' : 'rgba(255,255,255,.1)'}`,
                color:      active === col.id ? 'hsl(var(--gold))' : 'rgba(255,255,255,.45)',
              }}
            >
              {col.emoji} {col.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:block w-[200px] flex-shrink-0 sticky top-[68px] h-[calc(100vh-4.25rem)] overflow-y-auto hide-scrollbar"
          style={{ background: 'rgba(255,255,255,.02)', borderRight: '1px solid rgba(255,255,255,.06)' }}
        >
          <div className="px-5 pt-6 pb-2">
            <p className="font-body text-[9px] font-semibold uppercase tracking-[.22em]" style={{ color: 'hsl(var(--gold))' }}>
              Collections
            </p>
          </div>
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => jumpTo(col.id)}
              className="w-full text-left px-5 py-3 font-body text-[11.5px] cursor-pointer border-none flex items-center gap-2.5 transition-all relative"
              style={{
                background:  active === col.id ? 'rgba(180,140,90,.06)' : 'transparent',
                color:       active === col.id ? 'hsl(var(--gold))' : 'rgba(255,255,255,.4)',
                borderLeft:  active === col.id ? '2px solid hsl(var(--gold))' : '2px solid transparent',
              }}
            >
              <span>{col.emoji}</span>
              <span className="flex-1 truncate">{col.name}</span>
              <span className="font-body text-[9.5px]" style={{ color: 'rgba(255,255,255,.25)' }}>{col.count}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {collections.map((col, i) => {
            const products = allProducts.filter(p => p.category === col.id).slice(0, 6);
            return (
              <div key={col.id} id={`col-${col.id}`} ref={el => { sectionRefs.current[col.id] = el; }}>
                {/* Banner */}
                <div className="relative h-[280px] md:h-[360px] overflow-hidden">
                  <img src={COLLECTION_IMAGES[i]} alt={col.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,8,5,.85) 35%, rgba(10,8,5,.35) 70%, rgba(10,8,5,.1) 100%)' }} />
                  <div className="absolute inset-0 flex items-end p-8 md:p-10">
                    <div className="max-w-xl">
                      <span className="font-body text-[9px] font-semibold uppercase tracking-[.22em]" style={{ color: 'hsl(var(--gold))' }}>
                        Collection {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-heading font-light mt-1.5 leading-[1.1]" style={{ fontSize: 'clamp(24px,4vw,42px)', color: 'hsl(var(--ivory))' }}>
                        {col.emoji} {col.name}
                      </h2>
                      <p className="font-body text-[13px] mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,.6)', maxWidth: '420px' }}>
                        {col.description}
                      </p>
                      <p className="font-body text-[10.5px] uppercase tracking-[.16em] mt-3" style={{ color: 'hsl(var(--gold))' }}>
                        {col.count} pieces
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products grid */}
                <div className="p-5 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
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