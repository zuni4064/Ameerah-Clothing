import { useState, useEffect } from 'react';

const FloatingButtons = () => {
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBack(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[1500] flex flex-col gap-3">
      {showBack && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white/5 text-gold-light flex items-center justify-center border-none cursor-pointer shadow-lg hover:bg-white/5-light transition-colors text-lg"
        >
          ↑
        </button>
      )}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 text-accent-foreground flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors text-xl"
      >
        💬
      </a>
    </div>
  );
};

export default FloatingButtons;
