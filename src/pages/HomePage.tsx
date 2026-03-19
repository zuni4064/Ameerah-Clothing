import { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from '@/components/ParticleCanvas';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/data/products';
import { useProducts, useCollections } from '@/hooks/useProducts';
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const HERO_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200';
const COLLECTION_IMAGES = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600',
];

const Hero3D = lazy(() => import("@/components/Hero3D"));

const HomePage = () => {
  const navigate = useNavigate();

  const { data: allProducts = [] } = useProducts();
  const { data: collections = [] } = useCollections();

  const featured = useMemo(() => {
    const list = allProducts.filter(p => ['HOT', 'NEW', 'BRIDAL'].includes(p.badge || ''));
    return list.slice(0, 8);
  }, [allProducts]);

  const eidProducts = useMemo(() => {
    return allProducts.filter(p => p.category === 'festive');
  }, [allProducts]);

  const enable3d = useMemo(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return false;
    if (window.innerWidth < 1024) return false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return Boolean(gl);
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Ameerah Clothing — Where Grace Meets Tradition"
        description="Premium Pakistani Eastern wear for women. From breezy summer lawn to opulent bridal couture."
        canonicalPath="/"
      />

      {/* LUXURY HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Ameerah Collection" className="w-full h-full object-cover object-[center_20%] opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,18,21,0.8)_100%)]" />
        </div>

        <ParticleCanvas />

        {enable3d ? (
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
            <Suspense fallback={null}><Hero3D /></Suspense>
          </div>
        ) : null}

        <div className="absolute top-1/4 left-[10%] w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full animate-orb pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse inline-block" />
                <span className="text-gold tracking-[0.2em] text-xs font-semibold uppercase">Est. 2025 · Lahore</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-[84px] leading-[1.1] text-ivory mb-6 tracking-tight">
                Draped in <br/>
                <span className="text-gradient italic pr-4">
                  Elegance
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-body text-lg text-ivory/70 max-w-lg mb-10 leading-relaxed">
                From breezy summer lawn to opulent bridal couture — Ameerah Clothing brings Pakistan's finest Eastern wear to the modern woman.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/collections")}
                className="btn-gold px-8 py-4 rounded-md text-xs tracking-[0.2em]"
              >
                Discover Collection
              </button>
              <button
                onClick={() => navigate("/lookbook")}
                className="btn-outline px-8 py-4 rounded-md text-xs tracking-[0.2em]"
              >
                The Lookbook
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COLLECTIONS ROW */}
      <section className="py-24 relative z-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Reveal className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <span className="gold-line mb-3" />
              <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase">Curated</span>
              <h2 className="font-heading text-4xl text-ivory mt-2">The Collections</h2>
            </div>
          </Reveal>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x">
            {collections.map((col, i) => (
              <div
                key={col.id}
                onClick={() => navigate("/collections")}
                className="snap-start flex-shrink-0 w-[280px] relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={COLLECTION_IMAGES[i % COLLECTION_IMAGES.length]}
                  alt={col.name}
                  className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-gold/20 rounded-xl transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <span className="text-2xl mb-2 block">{col.emoji}</span>
                  <h3 className="font-heading text-lg text-ivory mb-1">{col.name}</h3>
                  <p className="text-xs font-body text-gold uppercase tracking-wider">{col.count} pieces</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-background via-black/20 to-background">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <span className="gold-line mx-auto mb-3" />
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase">Atelier Picks</span>
            <h2 className="font-heading text-4xl text-ivory mt-2">Featured Masterpieces</h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate("/products")}
              className="btn-outline px-10 py-4 rounded-full text-xs tracking-widest"
            >
              View All Arrivals →
            </button>
          </div>
        </div>
      </section>

      {/* FESTIVE BANNER */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center border-y border-white/5">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Festive" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        </div>

        <Reveal className="relative z-10 text-center max-w-3xl px-6">
          <span className="text-gold text-5xl block mb-6 font-heading">✦</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 leading-tight">
            Celebrate the magic of the <em className="text-gradient">Festive Season</em>
          </h2>
          <p className="font-body text-ivory/60 mb-10 max-w-lg mx-auto leading-relaxed">
            Heavy embellishments, intricate zardozi, and reshm detailing for nights that you will remember forever.
          </p>
          <button
            onClick={() => navigate("/eid-festive")}
            className="btn-gold px-10 py-4 rounded-md text-xs tracking-[0.2em]"
          >
            Shop Festive Edit
          </button>
        </Reveal>
      </section>
    </div>
  );
};

export default HomePage;
