import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

import logo from '../assets/ping.jpg';
import useAuth from '../store/authStore';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
  const {
    message,
    loading,
    isAuthenticated,
    setEmail,
    setPassword,
    loginUser,
    setF_name,
    setL_name,
    setMobile,
    signupUser,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signupUser();
    } else {
      loginUser();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans selection:bg-blue-500/30">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="w-full max-w-md">
        {/* Header/Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-zinc-950 border border-zinc-900 mb-4">
            <img src={logo} alt="Ping's Lab" className="w-12 h-12 rounded-xl object-cover" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">
            {isSignUp ? "Initialize Identity" : "Access Laboratory"}
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-mono">
            {isSignUp ? "PROJECT_JOIN_PROTOCOL_v4.0" : "AUTH_VALIDATION_REQUIRED"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow inside card */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John"
                    onChange={(e) => setF_name(e.target.value)} 
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Doe"
                    onChange={(e) => setL_name(e.target.value)} 
                    required
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Mobile Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      type="text" 
                      className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+1 (555) 000-0000"
                      onChange={(e) => setMobile(e.target.value)} 
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Lab Credentials</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="email" 
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="name@university.edu"
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="password" 
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
            >
              {loading ? "PROCESSING..." : isSignUp ? "INITIALIZE" : "DECRYPT & ENTER"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {message && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center animate-shake">
                {message}
              </div>
            )}
          </form>

          {/* Toggle Switch */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <p className="text-zinc-500 text-xs mb-4">
              {isSignUp ? "Already recognized by the system?" : "New to the Laboratory ecosystem?"}
            </p>
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white text-sm font-bold hover:text-blue-500 transition-colors underline underline-offset-4"
            >
              {isSignUp ? "Switch to Login" : "Initialize New Identity"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-zinc-700 font-mono text-[10px] uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" /> Secure Lab Access Point
        </div>
      </div>
    </div>
  );
};

export default Auth;