import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistOpen: boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (index: number) => void;
  moveToCart: (index: number) => void;
  moveAllToCart: () => void;
  showWishlist: () => void;
  hideWishlist: () => void;
  isWishlisted: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export const WishlistProvider = ({ children, addToCart }: { children: ReactNode; addToCart: (item: { id: string; name: string; price: number; image: string; tag: string }) => void }) => {
  const storageKey = useMemo(() => "ameerah.wishlist.v1", []);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
    } catch {
      return [];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }, [wishlist, storageKey]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.findIndex(w => w.id === item.id);
      if (exists >= 0) return prev.filter((_, i) => i !== exists);
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((index: number) => {
    setWishlist(prev => prev.filter((_, i) => i !== index));
  }, []);

  const moveToCart = useCallback((index: number) => {
    setWishlist(prev => {
      const item = prev[index];
      if (item) addToCart(item);
      return prev.filter((_, i) => i !== index);
    });
  }, [addToCart]);

  const moveAllToCart = useCallback(() => {
    wishlist.forEach(item => addToCart(item));
    setWishlist([]);
  }, [wishlist, addToCart]);

  const showWishlist = useCallback(() => setWishlistOpen(true), []);
  const hideWishlist = useCallback(() => setWishlistOpen(false), []);
  const isWishlisted = useCallback((id: string) => wishlist.some(w => w.id === id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistOpen, toggleWishlist, removeFromWishlist, moveToCart, moveAllToCart, showWishlist, hideWishlist, isWishlisted, wishlistCount: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};
