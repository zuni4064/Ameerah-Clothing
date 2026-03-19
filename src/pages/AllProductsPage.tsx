import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';
type Category   = 'all' | 'lawn' | 'velvet' | 'casual' | 'party' | 'festive' | 'bridal' | 'unstitched';

const categories: { label: string; value: Category }[] = [
  { label: 'All',        value: 'all' },
  { label: 'Lawn',       value: 'lawn' },
  { label: 'Velvet',     value: 'velvet' },
  { label: 'Casual',     value: 'casual' },
  { label: 'Party Wear', value: 'party' },
  { label: 'Festive',    value: 'festive' },
  { label: 'Bridal',     value: 'bridal' },
  { label: 'Unstitched', value: 'unstitched' },
];

const AllProductsPage = () => {
  const [sort,     setSort]     = useState<SortOption>('featured');
  const [category, setCategory] = useState<Category>('all');
  const [q,        setQ]        = useState('');

  const { data: dbProducts = [], isLoading } = useProducts();

  const products = useMemo(() => {
    let list = [...dbProducts];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(p =>
        `${p.name} ${p.tag} ${p.category} ${p.badge ?? ''}`.toLowerCase().includes(needle)
      );
    }
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.reverse(); break;
    }
    return list;
  }, [sort, category, q, dbProducts]);

  return (
    <div>
      <Seo
        title="All Products — Ameerah Clothing"
        description="Explore our complete collection: lawn, velvet, bridal, festive, unstitched and more."
        canonicalPath="/products"
      />

      {/* Page header */}
      <section className="relative overflow-hidden pt-20 pb-16 text-center">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(180,140,90,.07) 0%, transparent 70%)' }}
        />
        <Reveal>
          <span
            className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3"
            style={{ color: 'hsl(var(--gold))' }}
          >
            Complete Range
          </span>
          <h1
            className="font-heading font-light"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: 'hsl(var(--ivory))' }}
          >
            All Products
          </h1>
          <div
            className="mx-auto mt-5"
            style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, hsl(var(--gold)), transparent)' }}
          />
        </Reveal>
      </section>

      <section className="max-w-[1480px] mx-auto px-5 md:px-10 pb-20">
        {/* Filter bar */}
        <Reveal className="mb-8">
          <div
            className="p-4 md:p-5"
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className="px-4 py-1.5 text-[9.5px] font-semibold uppercase tracking-[.16em] cursor-pointer transition-all duration-200"
                    style={{
                      background:   category === c.value ? 'hsl(var(--gold))' : 'transparent',
                      color:        category === c.value ? '#0a0805' : 'rgba(255,255,255,.5)',
                      border:       category === c.value ? '1px solid hsl(var(--gold))' : '1px solid rgba(255,255,255,.1)',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-shrink-0">
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'rgba(255,255,255,.3)' }}
                  />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search products…"
                    className="field pl-9 pr-9 w-full sm:w-[240px]"
                    style={{ paddingLeft: '2.25rem' }}
                    aria-label="Search products"
                  />
                  {q && (
                    <button
                      onClick={() => setQ('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      style={{ color: 'rgba(255,255,255,.3)' }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <SlidersHorizontal
                    size={12}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'rgba(255,255,255,.3)' }}
                  />
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="field pl-9 cursor-pointer appearance-none pr-4 w-full sm:w-auto"
                    style={{ paddingLeft: '2.25rem' }}
                    aria-label="Sort products"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className="font-body text-[11px]"
                style={{ color: 'rgba(255,255,255,.3)' }}
              >
                {products.length} result{products.length !== 1 ? 's' : ''}
              </span>
              {(q.trim() || category !== 'all') && (
                <button
                  onClick={() => { setQ(''); setCategory('all'); }}
                  className="font-body text-[11px] bg-transparent border-none cursor-pointer transition-colors"
                  style={{ color: 'rgba(255,255,255,.35)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--gold))'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,.35)'}
                >
                  Clear filters ×
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div
              className="w-8 h-8 rounded-full animate-spin"
              style={{ border: '2px solid rgba(180,140,90,.2)', borderTopColor: 'hsl(var(--gold))' }}
            />
          </div>
        ) : products.length === 0 ? (
          <Reveal>
            <div
              className="p-16 text-center"
              style={{ border: '1px solid rgba(255,255,255,.07)' }}
            >
              <p
                className="font-heading text-2xl font-light mb-2"
                style={{ color: 'hsl(var(--ivory))' }}
              >
                No results
              </p>
              <p
                className="font-body text-sm"
                style={{ color: 'rgba(255,255,255,.35)' }}
              >
                Try a different search or remove filters.
              </p>
            </div>
          </Reveal>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products.map(p => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllProductsPage;