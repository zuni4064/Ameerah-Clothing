import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800';

const STATS = [
  { num: '500+', label: 'Happy Customers' },
  { num: '200+', label: 'Designs' },
  { num: '6',    label: 'Years of Craft' },
  { num: '4.9★', label: 'Average Rating' },
];

const VALUES = [
  {
    icon: '🧵',
    title: 'Handcrafted Excellence',
    desc:  'Every piece is made with meticulous attention to detail by skilled artisans trained in traditional Pakistani embroidery.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Fabrics',
    desc:  'We source responsibly, ensuring quality and environmental consciousness in every yard of fabric we select.',
  },
  {
    icon: '💍',
    title: 'Made for Real Women',
    desc:  'All sizes, all occasions — fashion that celebrates every woman, her heritage, and her individual grace.',
  },
];

const TEAM = [
  { name: 'Ameerah Khan', role: 'Founder & Creative Director' },
  { name: 'Sara Ahmed',   role: 'Head Designer' },
  { name: 'Hina Malik',   role: 'Customer Relations' },
];

const AboutPage = () => (
  <div>
    <Seo
      title="About — Ameerah Clothing"
      description="Our story, our craft, and the values behind every piece."
      canonicalPath="/about"
    />

    {/* Hero */}
    <section className="relative pt-20 pb-16 text-center overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(180,140,90,.35), transparent)' }}
      />
      <Reveal>
        <span
          className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3"
          style={{ color: 'hsl(var(--gold))' }}
        >
          Our Heritage
        </span>
        <h1
          className="font-heading font-light"
          style={{ fontSize: 'clamp(36px,5vw,60px)', color: 'hsl(var(--ivory))' }}
        >
          About Ameerah
        </h1>
        <p
          className="font-body text-base mt-4 max-w-md mx-auto"
          style={{ color: 'rgba(255,255,255,.42)' }}
        >
          Our story, our craft, our commitment to timeless elegance.
        </p>
      </Reveal>
    </section>

    {/* Story */}
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div
            className="relative overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,.07)', aspectRatio: '4/5' }}
          >
            <img
              src={ABOUT_IMAGE}
              alt="Ameerah Story"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(10,8,5,.6))' }}
            />
          </div>
        </Reveal>
        <Reveal delay={0.12} className="space-y-6">
          <div>
            <span className="gold-rule mb-3" />
            <span
              className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em]"
              style={{ color: 'hsl(var(--gold))' }}
            >
              Est. 2019
            </span>
            <h2
              className="font-heading font-light mt-2"
              style={{ fontSize: 'clamp(24px,3.5vw,36px)', color: 'hsl(var(--ivory))' }}
            >
              Our Story
            </h2>
          </div>
          <p
            className="font-body text-[13.5px] leading-[1.85]"
            style={{ color: 'rgba(255,255,255,.55)' }}
          >
            Born from a deep love of Pakistani craftsmanship, Ameerah Clothing was founded in 2019 in the heart of Lahore. We believe every woman deserves to feel like royalty — whether she's attending a wedding, a dinner party, or simply celebrating everyday life.
          </p>
          <p
            className="font-body text-[13.5px] leading-[1.85]"
            style={{ color: 'rgba(255,255,255,.45)' }}
          >
            Our pieces are crafted with hand-selected fabrics, intricate embroideries, and a deep respect for Eastern tradition — reimagined for the modern woman.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-7 py-3 rounded-sm no-underline"
            >
              💬 Chat with Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Stats */}
    <section
      className="py-14 relative"
      style={{ background: 'rgba(180,140,90,.03)', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <p className="font-heading text-3xl md:text-4xl text-gradient">{s.num}</p>
              <p
                className="font-body text-[10.5px] uppercase tracking-[.16em] mt-1.5"
                style={{ color: 'rgba(255,255,255,.38)' }}
              >
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
      <Reveal className="text-center mb-12">
        <span className="gold-rule-center mb-3" />
        <h2
          className="font-heading font-light"
          style={{ fontSize: 'clamp(26px,3.5vw,38px)', color: 'hsl(var(--ivory))' }}
        >
          What We Stand For
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.1}>
            <div
              className="p-8 h-full transition-all duration-400"
              style={{
                background: 'rgba(255,255,255,.025)',
                border: '1px solid rgba(255,255,255,.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(180,140,90,.2)';
                el.style.background  = 'rgba(180,140,90,.04)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,.07)';
                el.style.background  = 'rgba(255,255,255,.025)';
              }}
            >
              <span className="text-3xl block mb-5">{v.icon}</span>
              <h3
                className="font-heading text-xl font-light mb-3"
                style={{ color: 'hsl(var(--ivory))' }}
              >
                {v.title}
              </h3>
              <p
                className="font-body text-[13px] leading-[1.8]"
                style={{ color: 'rgba(255,255,255,.45)' }}
              >
                {v.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Team */}
    <section
      className="py-20"
      style={{ background: 'rgba(255,255,255,.02)', borderTop: '1px solid rgba(255,255,255,.05)' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
        <Reveal className="mb-12">
          <span className="gold-rule-center mb-3" />
          <h2
            className="font-heading font-light"
            style={{ fontSize: 'clamp(26px,3.5vw,38px)', color: 'hsl(var(--ivory))' }}
          >
            Meet the Makers
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[700px] mx-auto">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'rgba(180,140,90,.1)',
                  border: '1px solid rgba(180,140,90,.22)',
                }}
              >
                <span
                  className="font-heading text-2xl font-light text-gradient"
                  style={{ lineHeight: 1 }}
                >
                  {t.name[0]}
                </span>
              </div>
              <h4
                className="font-heading text-base font-light"
                style={{ color: 'hsl(var(--ivory))' }}
              >
                {t.name}
              </h4>
              <p
                className="font-body text-[11.5px] mt-1"
                style={{ color: 'rgba(255,255,255,.38)' }}
              >
                {t.role}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;