// ─── EidFestivePage ────────────────────────────────────────────────────────────
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const EID_BANNER = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400';

export const EidFestivePage = () => {
  const { data: allProducts = [] } = useProducts();
  const eidProducts = allProducts.filter(p => p.category === 'festive');

  return (
    <div>
      <Seo title="Eid & Festive — Ameerah Clothing" description="Dress for every celebration." canonicalPath="/eid-festive" />

      {/* Hero banner */}
      <section className="relative h-[420px] md:h-[540px] overflow-hidden flex items-center">
        <img src={EID_BANNER} alt="Eid Festive" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" style={{ opacity: .38 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,8,5,.92) 30%, rgba(10,8,5,.5) 70%, rgba(10,8,5,.2))' }} />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
        />
        <div className="relative z-10 max-w-[1480px] mx-auto px-5 md:px-10 w-full">
          <Reveal>
            <span className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3" style={{ color: 'hsl(var(--gold))' }}>
              Limited Collection
            </span>
            <h1 className="font-heading font-light leading-[1.05]" style={{ fontSize: 'clamp(38px,6vw,72px)', color: 'hsl(var(--ivory))' }}>
              ☽ Eid &amp; Festive
            </h1>
            <p className="font-body text-base mt-4 max-w-md" style={{ color: 'rgba(255,255,255,.55)' }}>
              Dress for every celebration. Crafted for life's most cherished moments.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1480px] mx-auto px-5 md:px-10 py-14">
        {eidProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-heading text-xl font-light" style={{ color: 'rgba(255,255,255,.35)' }}>
              New festive pieces arriving soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {eidProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
};

// ─── NewArrivalsPage ────────────────────────────────────────────────────────────
export const NewArrivalsPage = () => {
  const { data: allProducts = [] } = useProducts();
  const newArrivals = allProducts.filter(p => p.badge === 'NEW').slice(0, 16);

  return (
    <div>
      <Seo title="New Arrivals — Ameerah Clothing" description="Fresh styles added every week." canonicalPath="/new-arrivals" />

      <section className="relative pt-20 pb-14 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(180,140,90,.35), transparent)' }} />
        <Reveal>
          <span className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3" style={{ color: 'hsl(var(--gold))' }}>
            Just Landed
          </span>
          <h1 className="font-heading font-light" style={{ fontSize: 'clamp(36px,5vw,60px)', color: 'hsl(var(--ivory))' }}>
            New Arrivals
          </h1>
          <p className="font-body text-base mt-4" style={{ color: 'rgba(255,255,255,.42)' }}>
            Fresh styles added every week.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1480px] mx-auto px-5 md:px-10 pb-20">
        {newArrivals.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-heading text-xl font-light" style={{ color: 'rgba(255,255,255,.35)' }}>
              New pieces arriving soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
};

// ─── LookbookPage ────────────────────────────────────────────────────────────
const LOOKS = [
  { title: 'The Lawn Edit',     subtitle: 'Airy silhouettes for sunlit days',        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200' },
  { title: 'Velvet Evenings',   subtitle: 'Rich texture, soft glow',                 image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200' },
  { title: 'Festive Light',     subtitle: 'A quiet statement for every celebration', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200' },
];

export const LookbookPage = () => (
  <div>
    <Seo title="Lookbook — Ameerah Clothing" description="An editorial look at our newest pieces." canonicalPath="/lookbook" />

    <section className="relative pt-20 pb-14 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(180,140,90,.35), transparent)' }} />
      <Reveal>
        <span className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3" style={{ color: 'hsl(var(--gold))' }}>Editorial</span>
        <h1 className="font-heading font-light" style={{ fontSize: 'clamp(36px,5vw,60px)', color: 'hsl(var(--ivory))' }}>Lookbook</h1>
        <p className="font-body text-base mt-4" style={{ color: 'rgba(255,255,255,.42)' }}>A curated story of fabric, light, and silhouette.</p>
      </Reveal>
    </section>

    <section className="max-w-[1480px] mx-auto px-5 md:px-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {LOOKS.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.1}>
            <article className="group overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.07)' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={l.image}
                  alt={l.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,8,5,.92) 0%, rgba(10,8,5,.2) 50%, transparent 75%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[.22em]" style={{ color: 'hsl(var(--gold))' }}>New Season</span>
                  <h2 className="font-heading text-xl font-light mt-1.5" style={{ color: 'hsl(var(--ivory))' }}>{l.title}</h2>
                  <p className="font-body text-xs mt-1.5" style={{ color: 'rgba(255,255,255,.6)' }}>{l.subtitle}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 p-8 md:p-10" delay={0.2}>
        <div style={{ background: 'rgba(180,140,90,.04)', border: '1px solid rgba(180,140,90,.1)' }}>
          <h3 className="font-heading text-2xl font-light mb-3" style={{ color: 'hsl(var(--ivory))' }}>Styling Notes</h3>
          <p className="font-body text-[13.5px] leading-[1.85]" style={{ color: 'rgba(255,255,255,.55)', maxWidth: '680px' }}>
            Luxury is in the details — balanced proportions, thoughtful drape, and embroidery that catches light without shouting. Pair lawn with minimal jewellery, let velvet sit close to the skin, and keep festive looks grounded with one bold accent.
          </p>
        </div>
      </Reveal>
    </section>
  </div>
);

// ─── CraftsmanshipPage ──────────────────────────────────────────────────────
const STEPS = [
  { title: 'Fabric Selection', desc: 'Hand-selected fabric chosen for drape, breathability, and durability — matched to the season and silhouette.' },
  { title: 'Pattern & Cut',    desc: 'Tailoring begins with balance: shoulder line, sleeve proportion, and length — designed to flatter and move.' },
  { title: 'Embroidery & Finishing', desc: 'Tilla, resham, sequins — applied with restraint. Finishing is where a piece becomes heirloom-worthy.' },
];

export const CraftsmanshipPage = () => (
  <div>
    <Seo title="Craftsmanship — Ameerah Clothing" description="A look behind the seams: how our pieces are designed, stitched, and finished." canonicalPath="/craftsmanship" />

    {/* Hero */}
    <section className="relative min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600"
        alt="Craftsmanship"
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(10,8,5,.75)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(180,140,90,.05) 0%, transparent 65%)' }} />
      <div className="relative z-10 max-w-[1480px] mx-auto px-5 md:px-10 w-full py-20">
        <Reveal>
          <span className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3" style={{ color: 'hsl(var(--gold))' }}>Atelier</span>
          <h1 className="font-heading font-light leading-[1.05]" style={{ fontSize: 'clamp(38px,6vw,72px)', color: 'hsl(var(--ivory))' }}>
            Crafted with patience.
            <br />
            Finished with intention.
          </h1>
          <p className="font-body text-base mt-5 max-w-2xl" style={{ color: 'rgba(255,255,255,.6)' }}>
            Every piece is designed to feel effortless — because effort has already been invested where it matters: fabric, tailoring, and finish.
          </p>
        </Reveal>
      </div>
    </section>

    {/* Steps */}
    <section className="max-w-[1480px] mx-auto px-5 md:px-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="p-8 h-full" style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}>
              <span className="font-body text-[9px] font-semibold uppercase tracking-[.22em]" style={{ color: 'hsl(var(--gold))' }}>✦ Step {i + 1}</span>
              <h2 className="font-heading text-xl font-light mt-2" style={{ color: 'hsl(var(--ivory))' }}>{s.title}</h2>
              <p className="font-body text-[13.5px] leading-[1.85] mt-3" style={{ color: 'rgba(255,255,255,.5)' }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Quality section */}
    <section className="pb-20">
      <div className="max-w-[1480px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <div className="p-8" style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}>
              <span className="gold-rule mb-3" />
              <h3 className="font-heading text-2xl font-light" style={{ color: 'hsl(var(--ivory))' }}>Quality, without compromise</h3>
              <div className="mt-5 space-y-3.5">
                {[
                  'Colour-true fabric and consistent stitching standards',
                  'Embroidery placed for balance, not clutter',
                  'Tailoring designed for real movement and comfort',
                  'Finishing details: seams, lining, edges, and fasteners',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-4 h-px flex-shrink-0" style={{ background: 'hsl(var(--gold))', opacity: .55 }} />
                    <span className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,.55)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8" style={{ background: 'rgba(180,140,90,.04)', border: '1px solid rgba(180,140,90,.1)' }}>
              <p className="font-body text-[13.5px] leading-[1.85]" style={{ color: 'rgba(255,255,255,.6)' }}>
                If you're ordering for a special event, message us on WhatsApp with your measurements and timeline. We'll guide sizing, stitching, and delivery so it arrives ready — no stress, no surprises.
              </p>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex mt-6 px-7 py-3.5 rounded-sm no-underline"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
);

export default EidFestivePage;