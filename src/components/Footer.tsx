import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

const footerCols = [
  {
    title: "Collections",
    links: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Summer Lawn", to: "/collections" },
      { label: "Velvet Formal", to: "/collections" },
      { label: "Bridal Couture", to: "/collections" },
      { label: "Eid & Festive", to: "/eid-festive" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Lookbook", to: "/lookbook" },
      { label: "Craftsmanship", to: "/craftsmanship" },
      { label: "About Ameerah", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Sale", to: "/sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Size Guide", to: "/size-guide" },
      { label: "Shipping & Returns", to: "/shipping-returns" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Glow line */}
      <div className="section-glow absolute top-0 left-0 right-0 h-px" />

      <div className="glass bg-black/50 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

            {/* Brand */}
            <div className="lg:col-span-2">
              <button onClick={() => navigate('/')} className="flex items-baseline gap-px bg-transparent border-none cursor-pointer mb-5">
                <span className="font-heading text-3xl font-bold text-ivory">Ameerah</span>
                <span className="font-heading text-3xl font-bold text-gradient">.</span>
              </button>
              <p className="font-body text-sm text-ivory/50 leading-relaxed max-w-[280px] mb-8">
                Premium Pakistani Eastern wear crafted with uncompromising quality and timeless elegance. Lahore, Pakistan.
              </p>

              {/* Socials */}
              <div className="flex gap-3">
                {[
                  { icon: <Instagram size={16} />, href: "#" },
                  { icon: <Facebook size={16} />, href: "#" },
                  { icon: <Twitter size={16} />, href: "#" },
                ].map((s, i) => (
                  <motion.a
                    key={i} href={s.href}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold/30 transition-colors"
                    whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.9 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 className="text-[10px] font-bold uppercase tracking-[.22em] text-gold mb-5 font-body">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <Link
                      key={l.label} to={l.to}
                      className="text-sm text-ivory/50 hover:text-ivory transition-colors hover:translate-x-1 inline-block no-underline font-body"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/30 font-body">
            <p>© {new Date().getFullYear()} Ameerah Clothing. All rights reserved.</p>
            <p>Made with ♡ in Lahore, Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
