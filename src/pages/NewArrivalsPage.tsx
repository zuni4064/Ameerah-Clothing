import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Seo from "@/components/Seo";

const NewArrivalsPage = () => {
  const { data: allProducts = [] } = useProducts();
  const newArrivals = allProducts.filter(p => p.badge === 'NEW').slice(0, 12);

  return (
    <div>
      <Seo
        title="New Arrivals — Ameerah Clothing"
        description="Fresh styles added every week. Discover the newest lawn, velvet, festive, and couture pieces."
        canonicalPath="/new-arrivals"
      />
      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: 'white' }}>New Arrivals</h1>
        <p className="font-body mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Fresh styles added every week</p>
      </section>
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default NewArrivalsPage;
