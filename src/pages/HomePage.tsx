import { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from '@/components/ParticleCanvas';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCollections } from '@/hooks/useProducts';
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const HERO_IMAGE       = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400';
const COLLECTION_IMGS  = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700',
];

const Hero3D = lazy(() => import("@/components/Hero3D"));

const STATS = [
  { num: '500+', label: 'Happy Customers' },
  { num: '200+', label: 'Unique Designs' },
  { num: '6',    label: 'Years of Craft' },
  { num: '4.9★', label: 'Average Rating' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { data: allProducts = [] } = useProducts();
  const { data: collections  = [] } = useCollections();

  const featured = useMemo(
    () => allProducts.filter(p => ['HOT','NEW','BRIDAL'].includes(p.badge || '')).slice(0, 8),
    [allProducts]
  );

  const enable3d = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.innerWidth < 1024) return false;
    try {
      const c = document.createElement('canvas');
      return Boolean(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch { return false; }
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Ameerah Clothing — Where Grace Meets Tradition"
        description="Premium Pakistani Eastern wear for women. From breezy summer lawn to opulent bridal couture."
        canonicalPath="/"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Ameerah hero"
            className="w-full h-full object-cover object-[center_20%] opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[hsl(var(--background))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,8,5,0.75)_100%)]" />
        </div>

        <ParticleCanvas />

        {enable3d && (
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-screen pointer-events-none">
            <Suspense fallback={null}><Hero3D /></Suspense>
          </div>
        )}

        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-[8%] w-[360px] h-[360px] rounded-full pointer-events-none animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(180,140,90,.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-[10%] w-[280px] h-[280px] rounded-full pointer-events-none animate-orb-d"
          style={{ background: 'radial-gradient(circle, rgba(180,140,90,.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-[1480px] mx-auto px-5 md:px-10 w-full pt-20">
          <div className="max-w-[620px]">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-9"
                style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.09)', backdropFilter: 'blur(12px)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-breathe"
                  style={{ background: 'hsl(var(--gold))' }}
                />
                <span
                  className="font-body text-[9.5px] font-semibold uppercase tracking-[.22em]"
                  style={{ color: 'hsl(var(--gold))' }}
                >
                  Est. 2019 · Lahore
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="font-heading leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(52px, 7vw, 88px)', color: 'hsl(var(--ivory))' }}
              >
                Draped in
                <br />
                <em className="text-gradient not-italic" style={{ paddingRight: '4px' }}>Elegance.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="font-body text-base md:text-lg mb-10 leading-relaxed"
                style={{ color: 'rgba(255,255,255,.58)', maxWidth: '440px' }}
              >
                From breezy summer lawn to opulent bridal couture — Ameerah brings Pakistan's finest Eastern wear to the modern woman.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-3.5">
                <button
                  onClick={() => navigate('/collections')}
                  className="btn-gold px-8 py-4 rounded-sm"
                >
                  Discover Collection
                </button>
                <button
                  onClick={() => navigate('/lookbook')}
                  className="btn-outline px-8 py-4 rounded-sm"
                >
                  The Lookbook
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-body text-[9px] uppercase tracking-[.24em]" style={{ color: 'rgba(255,255,255,.25)' }}>Scroll</span>
          <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
            <motion.div
              className="w-full"
              style={{ height: '50%', background: 'hsl(var(--gold))' }}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 py-12 border-y" style={{ borderColor: 'rgba(255,255,255,.05)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(180,140,90,.025)' }}
        />
        <div className="max-w-[1480px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="font-heading text-3xl md:text-4xl text-gradient">{s.num}</p>
                <p
                  className="font-body text-[11px] uppercase tracking-[.16em] mt-1.5"
                  style={{ color: 'rgba(255,255,255,.4)' }}
                >
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section className="py-28 relative z-10">
        <div className="max-w-[1480px] mx-auto px-5 md:px-10">
          <Reveal className="mb-14">
            <span className="gold-rule mb-3" />
            <span
              className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em]"
              style={{ color: 'hsl(var(--gold))' }}
            >
              Curated
            </span>
            <div className="flex items-end justify-between mt-2">
              <h2
                className="font-heading font-light"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'hsl(var(--ivory))' }}
              >
                The Collections
              </h2>
              <button
                onClick={() => navigate('/collections')}
                className="btn-ghost px-5 py-2.5 rounded-sm text-[10px] tracking-[.14em] hidden md:flex"
              >
                View All
              </button>
            </div>
          </Reveal>

          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-6 snap-x">
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                onClick={() => navigate('/collections')}
                className="snap-start flex-shrink-0 relative overflow-hidden cursor-pointer group"
                style={{ width: '260px', borderRadius: '2px', border: '1px solid rgba(255,255,255,.06)' }}
                whileHover={{ y: -4 }}
                transition={{ duration: .35 }}
              >
                <div className="overflow-hidden" style={{ height: '360px' }}>
                  <img
                    src={COLLECTION_IMGS[i % COLLECTION_IMGS.length]}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07] opacity-65 group-hover:opacity-80"
                  />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,8,5,.95) 0%, rgba(10,8,5,.2) 50%, transparent 75%)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: '1px solid rgba(180,140,90,.18)' }}
                />
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <span className="block text-xl mb-2">{col.emoji}</span>
                  <h3
                    className="font-heading text-base font-light mb-1"
                    style={{ color: 'hsl(var(--ivory))' }}
                  >
                    {col.name}
                  </h3>
                  <p
                    className="font-body text-[10px] uppercase tracking-[.16em]"
                    style={{ color: 'hsl(var(--gold))' }}
                  >
                    {col.count} pieces
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section
        className="py-28 relative z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,.25), transparent)' }}
      >
        <div className="max-w-[1480px] mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-16">
            <span className="gold-rule-center mb-3" />
            <span
              className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em]"
              style={{ color: 'hsl(var(--gold))' }}
            >
              Atelier Picks
            </span>
            <h2
              className="font-heading font-light mt-2"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'hsl(var(--ivory))' }}
            >
              Featured Masterpieces
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => navigate('/products')}
              className="btn-outline px-10 py-4 rounded-full text-[10px] tracking-[.18em]"
            >
              View All Arrivals →
            </button>
          </div>
        </div>
      </section>

      {/* ── FESTIVE BANNER ── */}
      <section
        className="py-36 relative overflow-hidden flex items-center justify-center border-y"
        style={{ borderColor: 'rgba(255,255,255,.05)' }}
      >
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Festive" className="w-full h-full object-cover opacity-10" />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(10,8,5,.92)', backdropFilter: 'blur(2px)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(180,140,90,.06) 0%, transparent 70%)' }}
          />
        </div>

        <Reveal className="relative z-10 text-center max-w-[720px] px-6">
          <span
            className="font-heading text-5xl block mb-8"
            style={{ color: 'hsl(var(--gold))', opacity: .6 }}
          >
            ✦
          </span>
          <h2
            className="font-heading font-light leading-[1.15] mb-7"
            style={{ fontSize: 'clamp(32px, 5vw, 58px)', color: 'hsl(var(--ivory))' }}
          >
            Celebrate the magic of the{' '}
            <em className="text-gradient not-italic">Festive Season</em>
          </h2>
          <p
            className="font-body text-base leading-relaxed mb-10 mx-auto"
            style={{ color: 'rgba(255,255,255,.5)', maxWidth: '480px' }}
          >
            Heavy embellishments, intricate zardozi, and resham detailing for nights you will remember forever.
          </p>
          <button
            onClick={() => navigate('/eid-festive')}
            className="btn-gold px-10 py-4 rounded-sm"
          >
            Shop Festive Edit
          </button>
        </Reveal>
      </section>

      {/* ── CRAFT SECTION ── */}
      <section className="py-28 relative z-10">
        <div className="max-w-[1480px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div
                className="relative overflow-hidden"
                style={{ height: '480px', border: '1px solid rgba(255,255,255,.06)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(10,8,5,.5) 0%, transparent 60%)' }}
                />
                <div
                  className="absolute bottom-6 left-6 right-6 px-5 py-4"
                  style={{ background: 'rgba(10,8,5,.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(180,140,90,.15)' }}
                >
                  <p
                    className="font-heading text-base font-light"
                    style={{ color: 'hsl(var(--ivory))' }}
                  >
                    "Crafted with patience. Finished with intention."
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="space-y-7">
              <div>
                <span className="gold-rule mb-3" />
                <span
                  className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em]"
                  style={{ color: 'hsl(var(--gold))' }}
                >
                  Atelier
                </span>
                <h2
                  className="font-heading font-light mt-2"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'hsl(var(--ivory))' }}
                >
                  The Art of Pakistani Craft
                </h2>
              </div>
              <p
                className="font-body text-[13.5px] leading-[1.85]"
                style={{ color: 'rgba(255,255,255,.58)' }}
              >
                Each piece begins with hand-selected fabric — chosen for its drape, weight, and seasonal harmony. Our artisans apply tilla, resham, and zardozi with measured intent, creating embroideries that elevate without overwhelming.
              </p>
              <div className="space-y-3.5">
                {[
                  'Hand-selected seasonal fabrics',
                  'Embroidery placed for visual balance',
                  'Tailoring for real movement and comfort',
                  'Finished seams, lining, and fasteners',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="w-4 h-px flex-shrink-0"
                      style={{ background: 'hsl(var(--gold))', opacity: .6 }}
                    />
                    <span
                      className="font-body text-[13px]"
                      style={{ color: 'rgba(255,255,255,.58)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => navigate('/craftsmanship')}
                  className="btn-gold px-7 py-3.5 rounded-sm"
                >
                  Our Process
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="btn-outline px-7 py-3.5 rounded-sm"
                >
                  Shop Now
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;