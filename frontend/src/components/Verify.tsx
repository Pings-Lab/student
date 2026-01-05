import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Fingerprint, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';

import logo from '../assets/ping.jpg';
import useAuth from '../store/authStore';
import { useProfileStore } from '../store/profileStore'

const Verify = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const {
    message,
    setOtp,
    emailOtp,
    verifyOtp,
    loading, // Assuming your authStore has a loading state
  } = useAuth();

  const { verified, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (verified) {
      navigate("/");
    }
  }, [verified, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      verifyOtp();
    } else {
      emailOtp();
      setOtpSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      {/* Top Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50" />
      
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <img src={logo} alt="Ping's Lab" className="relative w-20 h-20 rounded-3xl object-cover border border-zinc-800 shadow-2xl" />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Security Check</h2>
          <p className="text-zinc-500 text-xs font-mono mt-2 tracking-widest uppercase">Protocol: Identity_Verification_v2</p>
        </div>

        {/* Verification Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {!otpSent ? (
              <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                  <Fingerprint size={32} />
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed px-4">
                  We need to verify your access. An OTP will be sent to your registered laboratory email address.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-2">
                  <KeyRound size={14} /> Transmission Received
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Enter 6-Digit OTP" 
                    maxLength={6}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-center text-xl font-black tracking-[0.5em] focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-800"
                    onChange={(e) => setOtp(e.target.value)} 
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full group bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : otpSent ? "VERIFY CODE" : "GENERATE OTP"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {message && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono text-center">
                ERROR: {message}
              </div>
            )}
          </form>

          {otpSent && (
            <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-center">
              <button 
                type="button"
                onClick={() => emailOtp()}
                className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold tracking-tighter uppercase transition-colors"
              >
                <RefreshCw size={14} /> Resend Transmission
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-zinc-800 font-mono text-[10px] uppercase tracking-[0.2em]">
          <ShieldCheck size={12} /> Encrypted Lab Connection
        </div>
      </div>
    </div>
  );
};

export default Verify;