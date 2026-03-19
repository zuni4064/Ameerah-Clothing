import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';

/**
 * Protects admin routes. Redirects to /login if not authenticated,
 * or to / if authenticated but not an admin.
 */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin, isChecking } = useIsAdmin();

  if (authLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
