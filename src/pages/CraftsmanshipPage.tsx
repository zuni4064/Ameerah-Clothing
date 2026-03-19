import Seo from "@/components/Seo";

const STEPS = [
  {
    title: "Fabric selection",
    desc: "Hand-selected fabric chosen for drape, breathability, and durability—matched to the season and silhouette.",
  },
  {
    title: "Pattern & cut",
    desc: "Tailoring begins with balance: shoulder line, sleeve proportion, and length—designed to flatter and move.",
  },
  {
    title: "Embroidery & finishing",
    desc: "Tilla, resham, sequins—applied with restraint. Finishing is where a piece becomes heirloom-worthy.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <div>
      <Seo
        title="Craftsmanship — Ameerah Clothing"
        description="A look behind the seams: how our pieces are designed, stitched, and finished."
        canonicalPath="/craftsmanship"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600"
            alt="Craftsmanship"
            className="w-full h-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <p className="text-gold text-xs font-body font-semibold uppercase tracking-wider">
            Atelier
          </p>
          <h1 className="font-heading text-4xl md:text-6xl mt-3 leading-[1.05]" style={{ color: "white" }}>
            Crafted with patience.
            <br />
            Finished with intention.
          </h1>
          <p className="font-body mt-5 max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
            Every piece is designed to feel effortless—because effort has already been invested where it matters:
            fabric, tailoring, and finish.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.title} className="bg-card border border-border p-8">
              <p className="text-gold text-xs font-body font-semibold uppercase tracking-wider">✦ Step</p>
              <h2 className="font-heading text-2xl mt-2">{s.title}</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/5 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-heading text-3xl">Quality, without compromise</h3>
            <div className="w-14 h-0.5 bg-gold mt-3 mb-6" />
            <ul className="space-y-3 font-body text-sm text-foreground/80">
              <li>— Color-true fabric and consistent stitching standards</li>
              <li>— Embroidery placed for balance (not clutter)</li>
              <li>— Tailoring designed for real movement and comfort</li>
              <li>— Finishing details: seams, lining, edges, and fasteners</li>
            </ul>
          </div>
          <div className="bg-card border border-border p-8">
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              If you’re ordering for a special event, message us on WhatsApp with your measurements and timeline. We’ll
              guide sizing, stitching, and delivery so it arrives ready—no stress, no surprises.
            </p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 bg-white/5 text-gold-light px-6 py-3 font-body font-semibold uppercase tracking-wider text-sm no-underline hover:bg-white/5-light transition-colors"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

