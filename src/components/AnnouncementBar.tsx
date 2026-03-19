const AnnouncementBar = () => {
  const text = "✦  Free delivery on orders above PKR 3,000  ✦  Bridal Cordsets Now In Stock — Limited Pieces  ✦  Unstitched Summer Lawn Available  ✦  New Velvet Arrivals Every Week  ✦  Premium Eastern Wear for Women  ";
  const doubled = text + text;
  return (
    <div className="overflow-hidden py-2.5 bg-black/60 border-b border-white/[0.04]">
      <div className="animate-marquee whitespace-nowrap flex">
        <span
          className="text-[10px] font-body tracking-[.22em] uppercase"
          style={{ color: 'hsl(var(--gold-light))', opacity: .75 }}
        >
          {doubled}
        </span>
        <span
          className="text-[10px] font-body tracking-[.22em] uppercase"
          style={{ color: 'hsl(var(--gold-light))', opacity: .75 }}
        >
          {doubled}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;