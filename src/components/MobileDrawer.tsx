import { useLocation, useNavigate } from "react-router-dom";

const navLinks: { label: string; to: string; isSale?: boolean }[] = [
  { label: "Home", to: "/" },
  { label: "All Products", to: "/products" },
  { label: "Collections", to: "/collections" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale", to: "/sale", isSale: true },
  { label: "Eid & Festive", to: "/eid-festive" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-charcoal/35 z-[2500]" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-card z-[2600] shadow-2xl" style={{ animation: 'slide-in-right 0.3s cubic-bezier(.4,0,.2,1)' }}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-xl font-bold text-foreground">Ameerah</span>
            <span className="font-heading text-xl font-bold text-gold">Clothing</span>
          </div>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-1 text-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-6 gap-1">
          {navLinks.map(link => (
            <button
              key={link.to}
              onClick={() => { navigate(link.to); onClose(); }}
              className={`bg-transparent border-none text-left py-3 px-4 font-body text-base cursor-pointer transition-colors ${
                link.isSale
                  ? "text-destructive font-semibold"
                  : location.pathname === link.to
                    ? "text-gold font-semibold bg-white/5"
                    : "text-foreground hover:text-gold hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
