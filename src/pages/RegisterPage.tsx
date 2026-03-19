import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/Seo';
import Reveal from '@/components/motion/Reveal';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess('Account created! You can now sign in.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
      <Seo title="Register — Ameerah Clothing" canonicalPath="/register" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <Reveal className="w-full max-w-md relative z-10">
        <div className="glass-panel p-10 rounded-xl relative">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold text-ivory mb-2 tracking-wide">Join Ameerah</h1>
            <p className="text-ivory/60 font-body text-sm">Create an account to track orders and save your favorites.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body text-center rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-body text-center rounded-md">
                {success}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ivory/60 uppercase tracking-widest font-body ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-ivory font-body outline-none focus:border-gold/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ivory/60 uppercase tracking-widest font-body ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-ivory font-body outline-none focus:border-gold/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ivory/60 uppercase tracking-widest font-body ml-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-ivory font-body outline-none focus:border-gold/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full lux-btn py-4 text-sm tracking-[0.2em] mt-8"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-sm font-body text-ivory/60">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:text-gold-light no-underline font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default RegisterPage;
