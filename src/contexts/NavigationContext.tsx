import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type PageId = 'home' | 'all-products' | 'collections' | 'new-arrivals' | 'sale' | 'eid-festive' | 'about' | 'contact' | 'product-detail';

interface NavigationContextType {
  currentPage: PageId;
  productDetailId: string | null;
  goTo: (page: PageId) => void;
  openProductDetail: (productId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [productDetailId, setProductDetailId] = useState<string | null>(null);

  const goTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    setProductDetailId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openProductDetail = useCallback((productId: string) => {
    setProductDetailId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, productDetailId, goTo, openProductDetail }}>
      {children}
    </NavigationContext.Provider>
  );
};
