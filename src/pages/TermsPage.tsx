import Seo from "@/components/Seo";

export default function TermsPage() {
  return (
    <div>
      <Seo
        title="Terms & Conditions — Ameerah Clothing"
        description="Website terms, ordering terms, and customer responsibilities."
        canonicalPath="/terms"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: "white" }}>
          Terms & Conditions
        </h1>
        <p className="font-body mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          Clear terms. Fair service.
        </p>
      </section>

      <section className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-card border border-border p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-heading text-2xl">Orders</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              Orders are confirmed after we receive your order details and you confirm via WhatsApp (or email where
              applicable). Product availability may vary.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Pricing</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              Prices are shown in PKR. Promotions may change without notice. We aim to keep pricing accurate at all
              times.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Delivery</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              Delivery timelines are estimates and can vary due to courier operations, weather, or holidays.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Exchanges</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              Exchanges are subject to item condition and policy constraints. See Shipping & Returns for details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

