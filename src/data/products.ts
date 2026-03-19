export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'lawn' | 'velvet' | 'casual' | 'party' | 'bridal' | 'unstitched' | 'festive';
  badge?: 'NEW' | 'HOT' | 'EID' | 'BRIDAL' | 'SALE' | 'UNSTITCHED';
  tag: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

const IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400',
];

const img = (i: number) => IMAGES[i % IMAGES.length];

export const allProducts: Product[] = [
  // Lawn
  { id: 'sunlit-lawn-suit', name: 'Sunlit Lawn Suit', price: 4200, image: img(0), category: 'lawn', badge: 'NEW', tag: 'Lawn · Stitched', description: 'A radiant lawn suit perfect for sunny days. Features delicate embroidery on the neckline and sleeves with a comfortable cotton blend fabric.', rating: 4.8, reviews: 124 },
  { id: 'sage-garden-lawn', name: 'Sage Garden Lawn', price: 3600, image: img(1), category: 'lawn', badge: 'NEW', tag: 'Lawn · Stitched', rating: 4.7, reviews: 89 },
  { id: 'lemon-zest-2-piece', name: 'Lemon Zest 2-Piece', price: 2900, image: img(2), category: 'lawn', badge: 'NEW', tag: 'Lawn · Stitched', rating: 4.6, reviews: 67 },
  { id: 'peach-bloom-lawn', name: 'Peach Bloom Lawn', price: 3200, image: img(3), category: 'lawn', badge: 'NEW', tag: 'Lawn · Stitched', rating: 4.5, reviews: 45 },
  { id: 'golden-lawn-3-piece', name: 'Golden Lawn 3-Piece', price: 5800, image: img(0), category: 'lawn', badge: 'NEW', tag: 'Lawn · 3-Piece', rating: 4.9, reviews: 156 },
  { id: 'champagne-lawn-suit', name: 'Champagne Lawn Suit', price: 4800, image: img(1), category: 'lawn', tag: 'Lawn · Stitched', rating: 4.7, reviews: 98 },

  // Velvet
  { id: 'ivory-velvet-3-piece', name: 'Ivory Velvet 3-Piece', price: 12500, image: img(2), category: 'velvet', badge: 'HOT', tag: 'Velvet · Formal', description: 'Luxurious ivory velvet 3-piece ensemble with intricate gold thread embroidery. Perfect for formal winter occasions and evening events.', rating: 4.9, reviews: 203 },
  { id: 'midnight-velvet-suit', name: 'Midnight Velvet Suit', price: 14200, image: img(3), category: 'velvet', badge: 'HOT', tag: 'Velvet · Formal', rating: 4.8, reviews: 167 },
  { id: 'blush-velvet-suit', name: 'Blush Velvet Suit', price: 11800, image: img(0), category: 'velvet', badge: 'NEW', tag: 'Velvet · Formal', rating: 4.7, reviews: 134 },
  { id: 'wine-velvet-formal', name: 'Wine Velvet Formal', price: 13400, image: img(1), category: 'velvet', badge: 'NEW', tag: 'Velvet · Formal', rating: 4.8, reviews: 112 },
  { id: 'crimson-velvet-3-pc', name: 'Crimson Velvet 3-Pc', price: 15200, image: img(2), category: 'velvet', tag: 'Velvet · Formal', rating: 4.9, reviews: 89 },
  { id: 'emerald-velvet-set', name: 'Emerald Velvet Set', price: 12900, image: img(3), category: 'velvet', tag: 'Velvet · Formal', rating: 4.6, reviews: 78 },

  // Casual
  { id: 'blossom-casual-set', name: 'Blossom Casual Set', price: 3800, image: img(0), category: 'casual', tag: 'Casual · Pret', rating: 4.5, reviews: 234 },
  { id: 'rose-mist-kameez', name: 'Rose Mist Kameez', price: 2600, image: img(1), category: 'casual', badge: 'NEW', tag: 'Casual · Pret', rating: 4.4, reviews: 189 },
  { id: 'casual-chic-2-piece', name: 'Casual Chic 2-Piece', price: 3100, image: img(2), category: 'casual', badge: 'NEW', tag: 'Casual · Pret', rating: 4.6, reviews: 145 },
  { id: 'floral-pret-set', name: 'Floral Pret Set', price: 2800, image: img(3), category: 'casual', badge: 'NEW', tag: 'Casual · Pret', rating: 4.3, reviews: 167 },

  // Party
  { id: 'champagne-cordset', name: 'Champagne Cordset', price: 8900, image: img(0), category: 'party', badge: 'HOT', tag: 'Party · Formal', description: 'Exquisite champagne cordset featuring hand-embellished sequin work and delicate thread embroidery. A show-stopping piece for special occasions.', rating: 4.9, reviews: 178 },
  { id: 'gold-thread-formal', name: 'Gold Thread Formal', price: 9800, image: img(1), category: 'party', tag: 'Party · Formal', rating: 4.8, reviews: 134 },
  { id: 'gota-work-party-suit', name: 'Gota Work Party Suit', price: 7600, image: img(2), category: 'party', tag: 'Party · Formal', rating: 4.7, reviews: 98 },
  { id: 'pearl-embossed-suit', name: 'Pearl Embossed Suit', price: 11200, image: img(3), category: 'party', tag: 'Party · Formal', rating: 4.8, reviews: 112 },

  // Bridal
  { id: 'blush-bridal-set', name: 'Blush Bridal Set', price: 24500, image: img(0), category: 'bridal', badge: 'BRIDAL', tag: 'Bridal · Couture', description: 'A breathtaking bridal ensemble in soft blush tones with heavy Zardozi and Dabka embroidery. Handcrafted over 200 hours by master artisans.', rating: 5.0, reviews: 67 },
  { id: 'ivory-zardozi-cordset', name: 'Ivory Zardozi Cordset', price: 18900, image: img(1), category: 'bridal', badge: 'BRIDAL', tag: 'Bridal · Couture', rating: 4.9, reviews: 45 },
  { id: 'golden-bridal-set', name: 'Golden Bridal Set', price: 32000, image: img(2), category: 'bridal', badge: 'BRIDAL', tag: 'Bridal · Couture', rating: 5.0, reviews: 34 },
  { id: 'navy-bridal-cordset', name: 'Navy Bridal Cordset', price: 21500, image: img(3), category: 'bridal', badge: 'BRIDAL', tag: 'Bridal · Couture', rating: 4.9, reviews: 56 },

  // Unstitched
  { id: 'gota-work-unstitched', name: 'Gota Work Unstitched', price: 2800, image: img(0), category: 'unstitched', badge: 'UNSTITCHED', tag: 'Unstitched · Fabric', description: 'Premium quality unstitched fabric featuring beautiful Gota work embroidery. Includes kameez, dupatta, and trouser fabric.', rating: 4.6, reviews: 234 },
  { id: 'pastel-lawn-fabric', name: 'Pastel Lawn Fabric', price: 1900, image: img(1), category: 'unstitched', badge: 'UNSTITCHED', tag: 'Unstitched · Fabric', rating: 4.5, reviews: 189 },
  { id: 'cotton-jacquard-set', name: 'Cotton Jacquard Set', price: 2400, image: img(2), category: 'unstitched', badge: 'UNSTITCHED', tag: 'Unstitched · Fabric', rating: 4.4, reviews: 156 },
  { id: 'silk-blend-fabric', name: 'Silk Blend Fabric', price: 3600, image: img(3), category: 'unstitched', badge: 'UNSTITCHED', tag: 'Unstitched · Fabric', rating: 4.7, reviews: 123 },

  // Festive / Eid
  { id: 'gulnaar-eid-suit', name: 'Gulnaar Eid Suit', price: 7800, image: img(0), category: 'festive', badge: 'EID', tag: 'Festive · Eid', description: 'A stunning Eid collection piece featuring intricate Resham and Tilla embroidery on pure chiffon. Perfect for celebrations.', rating: 4.9, reviews: 145 },
  { id: 'noor-e-sehar-anarkali', name: 'Noor-e-Sehar Anarkali', price: 11200, image: img(1), category: 'festive', badge: 'EID', tag: 'Festive · Anarkali', rating: 4.8, reviews: 123 },
  { id: 'gul-e-rana-formal', name: 'Gul-e-Rana Formal', price: 9400, image: img(2), category: 'festive', badge: 'EID', tag: 'Festive · Formal', rating: 4.7, reviews: 98 },
  { id: 'rivaaj-gharara', name: 'Rivaaj Gharara', price: 9600, image: img(3), category: 'festive', badge: 'EID', tag: 'Festive · Gharara', rating: 4.8, reviews: 112 },
  { id: 'bahar-festive-3-pc', name: 'Bahar Festive 3-Pc', price: 13200, image: img(0), category: 'festive', badge: 'EID', tag: 'Festive · 3-Piece', rating: 4.9, reviews: 67 },
  { id: 'sitara-unstitched', name: 'Sitara Unstitched', price: 4200, image: img(1), category: 'festive', badge: 'EID', tag: 'Festive · Unstitched', rating: 4.6, reviews: 89 },
  { id: 'tabassum-formal-suit', name: 'Tabassum Formal Suit', price: 8600, image: img(2), category: 'festive', badge: 'EID', tag: 'Festive · Formal', rating: 4.7, reviews: 78 },
  { id: 'khwaab-sharara-set', name: 'Khwaab Sharara Set', price: 12800, image: img(3), category: 'festive', badge: 'EID', tag: 'Festive · Sharara', rating: 4.8, reviews: 56 },
];

// Sale products
export const saleProducts: Product[] = [
  { id: 'champagne-lawn-suit-sale', name: 'Champagne Lawn Suit', price: 3360, originalPrice: 4800, image: img(0), category: 'lawn', badge: 'SALE', tag: 'Lawn · Stitched' },
  { id: 'sage-velvet-suit-sale', name: 'Sage Velvet Suit', price: 7840, originalPrice: 11200, image: img(1), category: 'velvet', badge: 'SALE', tag: 'Velvet · Formal' },
  { id: 'printed-cotton-2-pc', name: 'Printed Cotton 2-Pc', price: 2240, originalPrice: 3200, image: img(2), category: 'casual', badge: 'SALE', tag: 'Casual · Pret' },
  { id: 'solid-pret-kurta', name: 'Solid Pret Kurta', price: 1820, originalPrice: 2600, image: img(3), category: 'casual', badge: 'SALE', tag: 'Casual · Pret' },
  { id: 'maroon-majesty-suit', name: 'Maroon Majesty Suit', price: 5880, originalPrice: 8400, image: img(0), category: 'party', badge: 'SALE', tag: 'Party · Formal' },
  { id: 'sage-embroidered-suit', name: 'Sage Embroidered Suit', price: 4760, originalPrice: 6800, image: img(1), category: 'party', badge: 'SALE', tag: 'Party · Formal' },
  { id: 'festive-unstitched-set', name: 'Festive Unstitched Set', price: 2380, originalPrice: 3400, image: img(2), category: 'unstitched', badge: 'SALE', tag: 'Unstitched · Fabric' },
];

export const featuredProducts = allProducts.filter(p =>
  ['sunlit-lawn-suit', 'ivory-velvet-3-piece', 'blossom-casual-set', 'champagne-cordset', 'royal-anarkali-suit', 'midnight-velvet-suit', 'gota-work-unstitched', 'blush-bridal-set'].includes(p.id)
).slice(0, 8);

// Pad featured to 8 if needed
export const getFeaturedProducts = (): Product[] => {
  const featured = [...featuredProducts];
  if (featured.length < 8) {
    const remaining = allProducts.filter(p => !featured.find(f => f.id === p.id));
    featured.push(...remaining.slice(0, 8 - featured.length));
  }
  return featured.slice(0, 8);
};

export const newArrivals = allProducts.filter(p => p.badge === 'NEW').slice(0, 12);

export const eidProducts = allProducts.filter(p => p.category === 'festive');

export const collections = [
  { id: 'lawn', name: 'Summer Lawn', emoji: '🌿', count: 18, description: 'Light, breezy lawn suits perfect for the Pakistani summer. Featuring vibrant prints and comfortable cotton blends.' },
  { id: 'velvet', name: 'Velvet Formal', emoji: '🖤', count: 14, description: 'Opulent velvet ensembles for winter formals and evening occasions. Rich textures with intricate embroidery.' },
  { id: 'casual', name: 'Casual Pret', emoji: '👗', count: 22, description: 'Effortlessly chic ready-to-wear pieces for everyday elegance. Modern cuts with traditional touches.' },
  { id: 'party', name: 'Party Wear', emoji: '🎉', count: 16, description: 'Statement pieces designed to turn heads at every gathering. Bold embellishments and luxurious fabrics.' },
  { id: 'festive', name: 'Eid & Festive', emoji: '🌙', count: 12, description: 'Celebrate every occasion with our festive collection. From Eid to Mehndi, find your perfect outfit.' },
  { id: 'bridal', name: 'Bridal Couture', emoji: '💍', count: 8, description: 'Handcrafted bridal masterpieces for your most special day. Heavy embroidery, premium fabrics, timeless silhouettes.' },
  { id: 'unstitched', name: 'Unstitched Fabric', emoji: '🧵', count: 20, description: 'Premium unstitched fabrics for custom tailoring. Choose your fabric, design your dream outfit.' },
];

export const reviews = [
  { name: 'Fatima A.', rating: 5, text: 'Absolutely stunning quality! The embroidery work on my lawn suit was impeccable. Will definitely order again.', product: 'Sunlit Lawn Suit' },
  { name: 'Zara K.', rating: 5, text: 'The stitching is impeccable and the fabric feels so luxurious. Best online shopping experience for Eastern wear.', product: 'Ivory Velvet 3-Piece' },
  { name: 'Ayesha M.', rating: 5, text: 'Ordered for my sister\'s wedding and received so many compliments. The bridal collection is truly breathtaking.', product: 'Blush Bridal Set' },
  { name: 'Sana R.', rating: 5, text: 'Finally found a brand that understands Pakistani fashion. The designs are modern yet rooted in tradition.', product: 'Champagne Cordset' },
  { name: 'Nadia H.', rating: 5, text: 'The unstitched fabric quality is premium. Colors are exactly as shown online. Very satisfied with my purchase.', product: 'Gota Work Unstitched' },
  { name: 'Mehreen T.', rating: 5, text: 'Customer service was excellent. They helped me with sizing and the suit fits perfectly. Love the attention to detail.', product: 'Gulnaar Eid Suit' },
];

export const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;
