import Seo from "@/components/Seo";

export default function ShippingReturnsPage() {
  return (
    <div>
      <Seo
        title="Shipping & Returns — Ameerah Clothing"
        description="Delivery timelines, shipping rates, and our exchange/return policy."
        canonicalPath="/shipping-returns"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: "white" }}>
          Shipping & Returns
        </h1>
        <p className="font-body mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          Transparent policies. No surprises.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl mb-4">Shipping</h2>
            <ul className="space-y-3 font-body text-sm text-foreground/80">
              <li>— Standard delivery: 3–5 business days (Pakistan)</li>
              <li>— Express delivery: 1–2 business days (selected cities)</li>
              <li>— Free shipping on orders above PKR 3,000</li>
              <li>— International: available on request via WhatsApp</li>
            </ul>
          </div>
          <div className="bg-card border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl mb-4">Returns & Exchanges</h2>
            <ul className="space-y-3 font-body text-sm text-foreground/80">
              <li>— Exchange request within 7 days of delivery</li>
              <li>— Item must be unused with tags intact</li>
              <li>— Custom stitching items are not returnable</li>
              <li>— Sale items: exchange only (no refunds)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-white/5 border border-border p-6 md:p-8">
          <h3 className="font-heading text-xl mb-2">Need help?</h3>
          <p className="font-body text-sm text-foreground/80">
            For urgent delivery or exchange support, message us on WhatsApp with your order ID.
          </p>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-5 bg-white/5 text-gold-light px-6 py-3 font-body font-semibold uppercase tracking-wider text-sm no-underline hover:bg-white/5-light transition-colors"
          >
            Chat on WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}

