import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (index: number) => void;
  changeQty: (index: number, delta: number) => void;
  clearCart: () => void;
  showCart: () => void;
  hideCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storageKey = useMemo(() => "ameerah.cart.v1", []);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }, [cart, storageKey]);

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.findIndex(c => c.id === item.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + 1 };
        return updated;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const changeQty = useCallback((index: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty: updated[index].qty + delta };
      if (updated[index].qty <= 0) return updated.filter((_, i) => i !== index);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const showCart = useCallback(() => setCartOpen(true), []);
  const hideCart = useCallback(() => setCartOpen(false), []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartOpen, addToCart, removeFromCart, changeQty, clearCart, showCart, hideCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
