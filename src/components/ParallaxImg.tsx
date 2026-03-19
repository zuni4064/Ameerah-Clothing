import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  speed?: number; // 0..1, parallax depth
  overlay?: string; // tailwind class for overlay colour
}

/**
 * Full-width image that moves vertically at a reduced speed
 * to create a parallax / 3-D scroll depth effect.
 */
export default function ParallaxImg({ src, alt = '', className = '', speed = 0.35, overlay = 'from-background/90 via-background/50 to-transparent' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !imgRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const relPos = (rect.top + rect.height / 2) - viewH / 2;
      const offset = relPos * speed;
      imgRef.current.style.transform = `translateY(${offset}px) scale(1.15)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ transform: 'translateY(0) scale(1.15)' }}
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
    </div>
  );
}
