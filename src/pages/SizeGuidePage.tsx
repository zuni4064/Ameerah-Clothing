import Seo from "@/components/Seo";

export default function SizeGuidePage() {
  return (
    <div>
      <Seo
        title="Size Guide — Ameerah Clothing"
        description="Find your perfect fit with our stitched sizing guide and measuring tips."
        canonicalPath="/size-guide"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: "white" }}>
          Size Guide
        </h1>
        <p className="font-body mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          A fit that feels effortless.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-card border border-border p-6 md:p-8">
          <h2 className="font-heading text-2xl mb-4">Stitched sizing (inches)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border border-border">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="p-3 font-body text-sm">Size</th>
                  <th className="p-3 font-body text-sm">Bust</th>
                  <th className="p-3 font-body text-sm">Length</th>
                  <th className="p-3 font-body text-sm">Sleeve</th>
                  <th className="p-3 font-body text-sm">Hip</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm">
                {[
                  { s: "S", bust: 34, len: 38, sleeve: 21, hip: 38 },
                  { s: "M", bust: 36, len: 39, sleeve: 21.5, hip: 40 },
                  { s: "L", bust: 38, len: 40, sleeve: 22, hip: 42 },
                  { s: "XL", bust: 40, len: 41, sleeve: 22.5, hip: 44 },
                  { s: "XXL", bust: 42, len: 42, sleeve: 23, hip: 46 },
                ].map((r) => (
                  <tr key={r.s} className="border-t border-border">
                    <td className="p-3">{r.s}</td>
                    <td className="p-3">{r.bust}</td>
                    <td className="p-3">{r.len}</td>
                    <td className="p-3">{r.sleeve}</td>
                    <td className="p-3">{r.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "How to measure", d: "Measure bust at fullest point, hip at widest point, and length from shoulder to desired hem." },
              { t: "Between sizes?", d: "If you prefer a relaxed fit, size up. For a tailored fit, choose your exact bust measurement." },
              { t: "Unstitched", d: "Unstitched pieces include standard fabric lengths. For custom tailoring, message us on WhatsApp." },
            ].map((c) => (
              <div key={c.t} className="bg-white/5 border border-border p-6">
                <h3 className="font-heading text-lg">{c.t}</h3>
                <p className="font-body text-sm text-foreground/80 mt-2">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

