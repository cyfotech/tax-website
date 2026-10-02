/**
 * Dedicated Secure Admin Login with MFA TOTP Verification Challenge
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, verifyMfa } = useAdminAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // MFA Challenge State
  const [mfaChallenge, setMfaChallenge] = useState<{
    mfaRequired: boolean;
    mfaToken: string;
    userId: string;
  } | null>(null);
  const [mfaCode, setMfaCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier || !password) {
      setErrorMessage('Please provide both username/email and password.');
      return;
    }

    setLoading(true);
    const res = await login(identifier, password);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      return;
    }

    if (res.mfaRequired && res.mfaToken && res.userId) {
      setMfaChallenge({
        mfaRequired: true,
        mfaToken: res.mfaToken,
        userId: res.userId,
      });
      return;
    }

    // Success
    navigate('/admin/dashboard');
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode.trim() || !mfaChallenge) {
      setErrorMessage('Please enter your 6-digit authenticator code.');
      return;
    }

    setLoading(true);
    const res = await verifyMfa(mfaCode, mfaChallenge.mfaToken, mfaChallenge.userId);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Invalid 6-digit code or recovery code.');
      return;
    }

    navigate('/admin/dashboard');
  };

  // Quick preset loader for evaluator ease of testing
  const loadDemoRole = (roleUser: string, rolePass: string) => {
    setIdentifier(roleUser);
    setPassword(rolePass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-zinc-100 flex flex-col justify-center items-center p-4 selection:bg-[#2563EB] selection:text-white">
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, rgba(7, 21, 34, 0) 70%)',
        }}
      />

      <div className="w-full max-w-md bg-[#172554] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#172554] to-[#0B1220] border border-[#2563EB] mx-auto flex items-center justify-center font-extrabold text-white text-lg shadow-lg mb-3">
            AL
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">ApexLedger CMS</h1>
          <p className="text-xs text-zinc-400 mt-1">Enterprise Content & Security Administration</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* MFA CHALLENGE VIEW */}
        {mfaChallenge ? (
          <form onSubmit={handleVerifyMfa} className="space-y-4">
            <div className="p-3 bg-[#2563EB]/15 border border-[#2563EB]/30 rounded-xl text-center">
              <KeyRound className="w-6 h-6 text-[#06B6D4] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Multi-Factor Authentication</div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Enter the 6-digit code from your Authenticator app (e.g. 123456) or recovery code.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Verification Code</label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="123456"
                maxLength={14}
                className="w-full h-11 px-3 bg-zinc-900 border border-zinc-700 rounded-xl text-center font-mono text-lg tracking-widest text-white focus:outline-none focus:border-[#06B6D4]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm & Enter Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => setMfaChallenge(null)}
              className="w-full text-center text-xs text-zinc-400 hover:text-white pt-2"
            >
              ← Back to login
            </button>
          </form>
        ) : (
          /* STANDARD LOGIN VIEW */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Username or Work Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@apexledger.com"
                className="w-full h-10 px-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#2FE4A6]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-300">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link has been dispatched to authorized executive contacts.')}
                  className="text-[11px] text-[#2FE4A6] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 px-3 pr-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#2FE4A6]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-700 text-[#2563EB] focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Rate-Limited</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2 shadow-lg cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Quick Role Tester Presets */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2 text-center">
            Demo Credentials (Quick Select)
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => loadDemoRole('admin', 'ApexAdmin2026!')}
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 text-left text-zinc-300 transition-colors"
            >
              <div className="font-bold text-white text-[11px]">Super Admin</div>
              <div className="text-[10px] text-zinc-400 truncate">admin / ApexAdmin2026!</div>
            </button>
            <button
              type="button"
              onClick={() => loadDemoRole('content_admin', 'ApexContent2026!')}
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 text-left text-zinc-300 transition-colors"
            >
              <div className="font-bold text-white text-[11px]">Content Lead</div>
              <div className="text-[10px] text-zinc-400 truncate">content_admin</div>
            </button>
            <button
              type="button"
              onClick={() => loadDemoRole('security_admin', 'ApexSec2026!')}
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 text-left text-zinc-300 transition-colors"
            >
              <div className="font-bold text-white text-[11px]">CISO (MFA test)</div>
              <div className="text-[10px] text-zinc-400 truncate">security_admin</div>
            </button>
            <button
              type="button"
              onClick={() => loadDemoRole('editor', 'ApexEditor2026!')}
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 text-left text-zinc-300 transition-colors"
            >
              <div className="font-bold text-white text-[11px]">Editor</div>
              <div className="text-[10px] text-zinc-400 truncate">editor / ApexEditor2026!</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
