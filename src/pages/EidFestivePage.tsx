import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";

const EID_BANNER = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200';

const EidFestivePage = () => {
  const { data: allProducts = [] } = useProducts();
  const eidProducts = allProducts.filter(p => p.category === 'festive');

  return (
    <div>
      <Seo
        title="Eid & Festive — Ameerah Clothing"
        description="Dress for every celebration with our festive collection—crafted for life's most cherished moments."
        canonicalPath="/eid-festive"
      />
      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: 'white' }}>☽ Eid & Festive</h1>
        <p className="font-body mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Dress for every celebration</p>
      </section>

      {/* Full width banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img src={EID_BANNER} alt="Eid Collection" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="font-heading text-3xl md:text-5xl mb-3" style={{ color: 'white' }}>
              Celebrate with <em className="text-gold">Grace</em>
            </h2>
            <p className="font-body text-sm md:text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Our festive collection is crafted for life's most cherished moments.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {eidProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default EidFestivePage;
