import Seo from "@/components/Seo";

const LOOKS = [
  {
    title: "The Lawn Edit",
    subtitle: "Airy silhouettes for sunlit days",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400",
  },
  {
    title: "Velvet Evenings",
    subtitle: "Rich texture, soft glow",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400",
  },
  {
    title: "Festive Light",
    subtitle: "A quiet statement for every celebration",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1400",
  },
];

export default function LookbookPage() {
  return (
    <div>
      <Seo
        title="Lookbook — Ameerah Clothing"
        description="An editorial look at our newest pieces—crafted for the modern woman, rooted in tradition."
        canonicalPath="/lookbook"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <p className="text-gold text-xs font-body font-semibold uppercase tracking-wider">
          Editorial
        </p>
        <h1 className="font-heading text-4xl md:text-5xl mt-2" style={{ color: "white" }}>
          Lookbook
        </h1>
        <p className="font-body mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          A curated story of fabric, light, and silhouette.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LOOKS.map((l) => (
            <article key={l.title} className="bg-card border border-border overflow-hidden">
              <div className="relative" style={{ aspectRatio: "3/4" }}>
                <img
                  src={l.image}
                  alt={l.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-body font-semibold uppercase tracking-wider">
                    New Season
                  </p>
                  <h2 className="font-heading text-2xl mt-2" style={{ color: "white" }}>
                    {l.title}
                  </h2>
                  <p className="font-body text-sm mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {l.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 bg-white/5 border border-border p-8 md:p-10">
          <h3 className="font-heading text-2xl mb-3">Styling notes</h3>
          <p className="font-body text-sm text-foreground/80 leading-relaxed max-w-3xl">
            Luxury is in the details—balanced proportions, thoughtful drape, and embroidery that catches light without
            shouting. Pair lawn with minimal jewelry, let velvet sit close to the skin, and keep festive looks grounded
            with one bold accent.
          </p>
        </div>
      </section>
    </div>
  );
}

