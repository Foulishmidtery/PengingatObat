import React, { useState } from 'react';
import { User } from '../data/mockData';
import { LockKeyhole, User as UserIcon, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dummy Login - Direct login tanpa validasi (untuk testing)
  const handleDummyLogin = () => {
    const { users } = require('../data/mockData');
    const dummyUser = users[0]; // Langsung ambil user pertama (Budi Santoso)
    onLogin(dummyUser);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(
          'Maaf, nama pengguna atau kata sandi tidak ditemukan. Mohon coba lagi.'
        );
      }
    } catch (err) {
      // Fallback to mock login for demo
      const { users } = await import('../data/mockData');
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError(
          'Maaf, nama pengguna atau kata sandi tidak ditemukan. Mohon coba lagi.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto transition-all duration-500 ease-in-out">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <LockKeyhole className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-500 text-lg">
            Silakan masuk untuk melihat jadwal.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2 text-lg"
            >
              Nama Pengguna
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <UserIcon className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-gray-50"
                placeholder="budi123"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2 text-lg"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                placeholder="Masukkan kata sandi"
                required
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                aria-label="Lihat Sandi"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-5 rounded-xl text-xl transition-all duration-200 uppercase tracking-wide flex justify-center items-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                MEMUAT...
              </>
            ) : (
              <>
                <span>Masuk Aplikasi</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl text-center font-semibold border border-red-200 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Dummy Login Button - Untuk Testing */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500 mb-3">
            Atau coba mode demo:
          </p>
          <button
            type="button"
            onClick={handleDummyLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg transition-all duration-200 flex justify-center items-center gap-2"
          >
            <UserIcon className="w-5 h-5" />
            <span>Masuk Sebagai Budi Santoso (Demo)</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            Username: budi123 | Password: 12345
          </p>
        </div>
      </div>
    </section>
  );
}