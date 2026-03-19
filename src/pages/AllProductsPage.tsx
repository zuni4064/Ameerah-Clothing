import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';
type Category = 'all' | 'lawn' | 'velvet' | 'casual' | 'party' | 'festive' | 'bridal' | 'unstitched';

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Lawn', value: 'lawn' },
  { label: 'Velvet', value: 'velvet' },
  { label: 'Casual', value: 'casual' },
  { label: 'Party Wear', value: 'party' },
  { label: 'Festive', value: 'festive' },
  { label: 'Bridal', value: 'bridal' },
  { label: 'Unstitched', value: 'unstitched' },
];

const AllProductsPage = () => {
  const [sort, setSort] = useState<SortOption>('featured');
  const [category, setCategory] = useState<Category>('all');
  const [q, setQ] = useState("");

  const { data: dbProducts = [], isLoading } = useProducts();

  const products = useMemo(() => {
    let list = [...dbProducts];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter((p) => {
        const hay = `${p.name} ${p.tag} ${p.category} ${p.badge ?? ""}`.toLowerCase();
        return hay.includes(needle);
      });
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.reverse(); break;
    }
    return list;
  }, [sort, category, q]);

  return (
    <div>
      <Seo
        title="All Products — Ameerah Clothing"
        description="Explore our complete collection: lawn, velvet, bridal, festive, unstitched and more."
        canonicalPath="/products"
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gold/8 blur-[80px] rounded-full" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-10 py-8">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[.25em] text-gold">Complete Range</span>
            <h1 className="font-heading text-4xl md:text-6xl text-ivory mt-2">All Products</h1>
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-5" />
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        {/* Filters */}
        <Reveal className="mb-8">
          <div className="glass rounded-xl p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest rounded-full border cursor-pointer transition-all ${
                      category === c.value
                        ? 'bg-gold text-black border-gold'
                        : 'bg-transparent border-white/10 text-ivory/60 hover:border-gold/40 hover:text-ivory'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products…"
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 font-body text-sm text-ivory outline-none focus:border-gold/50 w-full sm:w-[260px] transition-colors"
                  aria-label="Search products"
                />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortOption)}
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 font-body text-sm text-ivory cursor-pointer outline-none"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-body text-ivory/40">
              <span>{products.length} results</span>
              {q.trim() ? <button className="bg-transparent border-none cursor-pointer hover:text-gold text-ivory/40 transition-colors" onClick={() => setQ("")}>Clear search</button> : <span />}
            </div>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <Reveal>
            <div className="bg-card border border-border p-10 text-center shadow-lux">
              <p className="font-heading text-2xl mb-2">No results</p>
              <p className="font-body text-muted-foreground">
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
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
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
