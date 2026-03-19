import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Check if the currently logged-in user has the 'admin' role.
 * This looks up the `user_roles` table in Supabase.
 */
export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }

    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setIsAdmin(data?.role === 'admin');
        setIsChecking(false);
      });
  }, [user]);

  return { isAdmin, isChecking };
}
