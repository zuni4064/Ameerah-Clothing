import Seo from "@/components/Seo";

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600';

const AboutPage = () => (
  <div>
    <Seo
      title="About — Ameerah Clothing"
      description="Our story, our craft, and the values behind every piece."
      canonicalPath="/about"
    />
    <section className="bg-white/5 py-12 md:py-16 text-center">
      <h1 className="font-heading text-4xl md:text-5xl" style={{ color: 'white' }}>About Ameerah</h1>
      <p className="font-body mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Our story, our craft</p>
    </section>

    {/* Brand Story */}
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading text-3xl mb-4">Our Story</h2>
          <div className="w-12 h-0.5 bg-gold mb-6" />
          <p className="font-body text-foreground/80 leading-relaxed mb-4">
            Born from a love of Pakistani craftsmanship, Ameerah Clothing was founded in 2019 in the heart of Lahore. We believe every woman deserves to feel like royalty — whether she's attending a wedding, a dinner party, or simply celebrating everyday life.
          </p>
          <p className="font-body text-foreground/80 leading-relaxed">
            Our pieces are crafted with hand-selected fabrics, intricate embroideries, and a deep respect for Eastern tradition.
          </p>
        </div>
        <img src={ABOUT_IMAGE} alt="Ameerah Story" className="w-full h-[400px] object-cover object-top" />
      </div>
    </section>

    {/* Values */}
    <section className="bg-white/5 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: '🧵', title: 'Handcrafted Excellence', desc: 'Every piece is made with meticulous attention to detail by skilled artisans.' },
            { emoji: '🌿', title: 'Sustainable Fabrics', desc: 'We source responsibly, ensuring quality and environmental consciousness.' },
            { emoji: '💍', title: 'Made for Real Women', desc: 'All sizes, all occasions — fashion that celebrates every woman.' },
          ].map(v => (
            <div key={v.title} className="bg-card p-8 border border-border text-center">
              <span className="text-4xl mb-4 block">{v.emoji}</span>
              <h3 className="font-heading text-xl mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-white/5 py-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-wrap justify-center gap-8 md:gap-16">
        {[
          { num: '500+', label: 'Happy Customers' },
          { num: '200+', label: 'Designs' },
          { num: '6', label: 'Years of Craftsmanship' },
          { num: '4.9★', label: 'Average Rating' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="font-heading text-3xl md:text-4xl text-gold">{s.num}</p>
            <p className="font-body text-sm text-gold-light/70 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
      <h2 className="font-heading text-3xl mb-2">Meet the Makers</h2>
      <div className="w-12 h-0.5 bg-gold mx-auto mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {[
          { name: 'Ameerah Khan', role: 'Founder & Creative Director' },
          { name: 'Sara Ahmed', role: 'Head Designer' },
          { name: 'Hina Malik', role: 'Customer Relations' },
        ].map(t => (
          <div key={t.name} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/5 border border-gold/30 flex items-center justify-center mb-4 rounded-full !rounded-full">
              <span className="text-3xl text-gold font-heading">{t.name[0]}</span>
            </div>
            <h4 className="font-heading text-base">{t.name}</h4>
            <p className="font-body text-xs text-muted-foreground mt-1">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPage;
