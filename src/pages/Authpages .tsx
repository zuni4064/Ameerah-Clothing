import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/Seo';
import Reveal from '@/components/motion/Reveal';
import { Eye, EyeOff } from 'lucide-react';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label
    className="font-body text-[10.5px] font-medium uppercase tracking-[.16em] mb-1.5 block"
    style={{ color: 'rgba(255,255,255,.4)' }}
  >
    {children}
  </label>
);

export const LoginPage = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else navigate('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-5"
      style={{ background: 'hsl(var(--background))' }}
    >
      <Seo title="Sign In — Ameerah Clothing" canonicalPath="/login" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(180,140,90,.06) 0%, transparent 65%)' }}
      />

      <Reveal className="w-full max-w-[400px] relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <span
            className="font-heading text-2xl font-light tracking-[.08em]"
            style={{ color: 'hsl(var(--ivory))' }}
          >
            AMEERAH
          </span>
          <span className="font-heading text-2xl font-light text-gradient">.</span>
        </div>

        <div
          className="p-8 relative"
          style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.08)' }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, hsl(var(--gold))/.5, transparent)' }}
          />

          <div className="text-center mb-8">
            <h1
              className="font-heading text-2xl font-light mb-1.5"
              style={{ color: 'hsl(var(--ivory))' }}
            >
              Welcome Back
            </h1>
            <p
              className="font-body text-[12px]"
              style={{ color: 'rgba(255,255,255,.4)' }}
            >
              Sign in to your private atelier.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div
                className="p-3 text-center font-body text-xs"
                style={{ background: 'rgba(220,60,60,.08)', border: '1px solid rgba(220,60,60,.2)', color: 'rgba(220,100,100,.9)' }}
              >
                {error}
              </div>
            )}

            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <FieldLabel>Password</FieldLabel>
                <Link
                  to="#"
                  className="font-body text-[10.5px] no-underline transition-colors"
                  style={{ color: 'rgba(180,140,90,.7)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--gold))'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(180,140,90,.7)'}
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="field pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  style={{ color: 'rgba(255,255,255,.3)' }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed tracking-[.18em]"
              >
                {loading ? 'Authenticating…' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-7 text-center" style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '1.5rem' }}>
            <p className="font-body text-[12.5px]" style={{ color: 'rgba(255,255,255,.38)' }}>
              New to Ameerah?{' '}
              <Link
                to="/register"
                className="no-underline font-semibold transition-colors"
                style={{ color: 'hsl(var(--gold))' }}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export const RegisterPage = () => {
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw,          setShowPw]          = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState('');
  const [success,         setSuccess]         = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Passwords do not match');
    setLoading(true); setError(''); setSuccess('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else {
      setSuccess('Account created! Redirecting to sign in…');
      setTimeout(() => navigate('/login'), 2200);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-5"
      style={{ background: 'hsl(var(--background))' }}
    >
      <Seo title="Register — Ameerah Clothing" canonicalPath="/register" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(180,140,90,.06) 0%, transparent 65%)' }}
      />

      <Reveal className="w-full max-w-[400px] relative z-10">
        <div className="text-center mb-10">
          <span className="font-heading text-2xl font-light tracking-[.08em]" style={{ color: 'hsl(var(--ivory))' }}>
            AMEERAH
          </span>
          <span className="font-heading text-2xl font-light text-gradient">.</span>
        </div>

        <div
          className="p-8 relative"
          style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.08)' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(180,140,90,.5), transparent)' }}
          />

          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-light mb-1.5" style={{ color: 'hsl(var(--ivory))' }}>
              Join Ameerah
            </h1>
            <p className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,.4)' }}>
              Create an account to track orders and save your favourites.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 text-center font-body text-xs" style={{ background: 'rgba(220,60,60,.08)', border: '1px solid rgba(220,60,60,.2)', color: 'rgba(220,100,100,.9)' }}>
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-center font-body text-xs" style={{ background: 'rgba(80,180,100,.08)', border: '1px solid rgba(80,180,100,.2)', color: 'rgba(80,180,100,.9)' }}>
                {success}
              </div>
            )}

            <div>
              <FieldLabel>Email</FieldLabel>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="field" placeholder="you@example.com" />
            </div>
            <div>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="field pr-10"
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer" style={{ color: 'rgba(255,255,255,.3)' }}>
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <FieldLabel>Confirm Password</FieldLabel>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="field"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed tracking-[.18em]">
                {loading ? 'Creating Account…' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-7 text-center" style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '1.5rem' }}>
            <p className="font-body text-[12.5px]" style={{ color: 'rgba(255,255,255,.38)' }}>
              Already have an account?{' '}
              <Link to="/login" className="no-underline font-semibold transition-colors" style={{ color: 'hsl(var(--gold))' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default LoginPage;