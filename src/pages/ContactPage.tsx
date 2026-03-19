import { useState } from 'react';
import Seo from "@/components/Seo";

const ContactPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });

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
      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: 'white' }}>Contact Us</h1>
        <p className="font-body mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>We're here to help</p>
      </section>

      <section className="bg-white/5 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: '📍', title: 'Location', text: 'Shop #12, Liberty Market,\nLahore, Pakistan' },
              { icon: '📞', title: 'Phone', text: '+92 300 1234567\nMon–Sat, 10 AM – 8 PM' },
              { icon: '✉️', title: 'Email', text: 'info@ameerahclothing.com' },
              { icon: '🕐', title: 'Hours', text: 'Mon–Sat 10 AM – 8 PM\nSun 12 PM – 6 PM' },
            ].map(info => (
              <div key={info.title} className="bg-card p-6 border border-border flex gap-4">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <h4 className="font-heading text-base mb-1">{info.title}</h4>
                  <p className="font-body text-sm text-muted-foreground whitespace-pre-line">{info.text}</p>
                </div>
              </div>
            ))}
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 text-gold-light px-6 py-3 font-body font-semibold text-sm uppercase tracking-wider no-underline hover:bg-white/5-light transition-colors">
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 border border-border space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm text-foreground mb-1 block">First Name</label>
                <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent" placeholder="First name" required />
              </div>
              <div>
                <label className="font-body text-sm text-foreground mb-1 block">Last Name</label>
                <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent" placeholder="Last name" required />
              </div>
            </div>
            <div>
              <label className="font-body text-sm text-foreground mb-1 block">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="font-body text-sm text-foreground mb-1 block">Subject</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-card cursor-pointer" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Help</option>
                <option value="stitching">Custom Stitching</option>
                <option value="wholesale">Wholesale</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-foreground mb-1 block">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent min-h-[120px] resize-y" placeholder="Your message..." required />
            </div>
            <button type="submit" className="w-full bg-white/5 text-gold-light py-3.5 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
