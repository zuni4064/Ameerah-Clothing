import { useState } from 'react';
import Seo from "@/components/Seo";
import Reveal from "@/components/motion/Reveal";

const CONTACT_INFO = [
  { icon: '📍', title: 'Location',   text: 'Shop #12, Liberty Market,\nLahore, Pakistan' },
  { icon: '📞', title: 'Phone',      text: '+92 300 1234567\nMon–Sat, 10 AM – 8 PM' },
  { icon: '✉️', title: 'Email',      text: 'info@ameerahclothing.com' },
  { icon: '🕐', title: 'Hours',      text: 'Mon–Sat 10 AM – 8 PM\nSun 12 PM – 6 PM' },
];

const SUBJECTS = [
  { value: '',           label: 'Select a subject' },
  { value: 'general',   label: 'General Inquiry' },
  { value: 'order',     label: 'Order Help' },
  { value: 'stitching', label: 'Custom Stitching' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'other',     label: 'Other' },
];

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label
    className="font-body text-[10.5px] font-medium uppercase tracking-[.14em] mb-1.5 block"
    style={{ color: 'rgba(255,255,255,.4)' }}
  >
    {children}
  </label>
);

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <Seo
        title="Contact — Ameerah Clothing"
        description="Get in touch with Ameerah Clothing for order help, stitching, wholesale, or general inquiries."
        canonicalPath="/contact"
      />

      {/* Header */}
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
            Get in Touch
          </span>
          <h1
            className="font-heading font-light"
            style={{ fontSize: 'clamp(36px,5vw,60px)', color: 'hsl(var(--ivory))' }}
          >
            Contact Us
          </h1>
          <p
            className="font-body text-base mt-4"
            style={{ color: 'rgba(255,255,255,.42)' }}
          >
            We're here to help with any question.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">

          {/* Contact Info */}
          <Reveal className="space-y-4">
            {CONTACT_INFO.map(info => (
              <div
                key={info.title}
                className="flex gap-4 p-5 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,.025)',
                  border: '1px solid rgba(255,255,255,.07)',
                }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{info.icon}</span>
                <div>
                  <h4
                    className="font-heading text-base font-light mb-1"
                    style={{ color: 'hsl(var(--ivory))' }}
                  >
                    {info.title}
                  </h4>
                  <p
                    className="font-body text-[12.5px] leading-[1.7] whitespace-pre-line"
                    style={{ color: 'rgba(255,255,255,.45)' }}
                  >
                    {info.text}
                  </p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full py-3.5 rounded-sm no-underline flex items-center justify-center gap-2 mt-2"
            >
              💬 Chat on WhatsApp
            </a>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 space-y-4"
              style={{
                background: 'rgba(255,255,255,.025)',
                border: '1px solid rgba(255,255,255,.07)',
              }}
            >
              <h2
                className="font-heading text-[22px] font-light mb-6"
                style={{ color: 'hsl(var(--ivory))' }}
              >
                Send a Message
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>First Name</FieldLabel>
                  <input
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    className="field"
                    placeholder="Ayesha"
                    required
                  />
                </div>
                <div>
                  <FieldLabel>Last Name</FieldLabel>
                  <input
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    className="field"
                    placeholder="Khan"
                    required
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Email Address</FieldLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="field"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div>
                <FieldLabel>Subject</FieldLabel>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="field cursor-pointer"
                  required
                >
                  {SUBJECTS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Message</FieldLabel>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="field min-h-[120px] resize-y"
                  placeholder="Your message…"
                  required
                />
              </div>

              <div className="pt-1">
                <button type="submit" className="btn-gold w-full py-4 rounded-sm">
                  Send Message →
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;