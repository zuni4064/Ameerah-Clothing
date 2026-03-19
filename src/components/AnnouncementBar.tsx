const AnnouncementBar = () => {
  const text = "✦ Free delivery on orders above PKR 3,000 ✦ Bridal Cordsets Now In Stock — Limited Pieces ✦ Unstitched Summer Lawn Available ✦ New Velvet Arrivals Every Week ✦ Premium Eastern Wear — Only for Women ✦";
  return (
    <div className="bg-white/5 overflow-hidden py-2">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-gold-light text-sm font-body tracking-wide mx-8">{text}</span>
        <span className="text-gold-light text-sm font-body tracking-wide mx-8">{text}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
