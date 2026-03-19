import Seo from "@/components/Seo";

export default function PrivacyPage() {
  return (
    <div>
      <Seo
        title="Privacy Policy — Ameerah Clothing"
        description="How we collect, use, and protect your information."
        canonicalPath="/privacy"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: "white" }}>
          Privacy Policy
        </h1>
        <p className="font-body mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          Respectful by design.
        </p>
      </section>

      <section className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-card border border-border p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-heading text-2xl">Information we collect</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              When you place an order or contact us, we may collect your name, phone number, email, city, and address.
              We collect only what’s necessary to fulfill your request.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">How we use it</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              We use your information to confirm orders, arrange delivery, provide support, and improve the shopping
              experience. We do not sell your personal data.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Data storage</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              This website may store cart, wishlist, and order details in your browser for convenience. You can clear
              your browser data at any time to remove stored information.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Contact</h2>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              Questions about privacy? Email us at <span className="font-semibold">info@ameerahclothing.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

