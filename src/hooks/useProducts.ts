import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/data/products';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      // Map DB snake_case columns to camelCase expected by the app
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        image: item.image,
        category: item.category_id,
        badge: item.badge,
        tag: item.tag,
        description: item.description,
        rating: item.rating ? Number(item.rating) : undefined,
        reviews: item.reviews_count || 0
      })) as Product[];
    }
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        price: Number(data.price),
        originalPrice: data.original_price ? Number(data.original_price) : undefined,
        image: data.image,
        category: data.category_id,
        badge: data.badge,
        tag: data.tag,
        description: data.description,
        rating: data.rating ? Number(data.rating) : undefined,
        reviews: data.reviews_count || 0
      } as Product;
    },
    enabled: !!id,
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        count: item.count,
        description: item.description
      }));
    }
  });
}
