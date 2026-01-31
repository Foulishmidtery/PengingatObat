import React, { useState } from 'react';

interface LoginProps {
    onLogin: (u: string, p: string) => Promise<any>;
    error: string | null;
    loading: boolean;
}

export const Login: React.FC<LoginProps> = ({ onLogin, error, loading }) => {
    const [username, setUsername] = useState('budi123'); // Default for demo
    const [password, setPassword] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <section id="login-page" className="w-full max-w-md mx-auto transition-all duration-500 ease-in-out">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-3xl">
                        <i className="fa-solid fa-user-lock"></i>
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-2">Selamat Datang</h2>
                    <p className="text-gray-500 text-lg">
                        Silakan masuk untuk melihat jadwal.
                    </p>
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2 text-lg">Nama Pengguna</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input
                                type="text"
                                id="username"
                                className="w-full pl-12 pr-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-gray-50"
                                placeholder="budi123"
                                required
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-lg">Kata Sandi</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fa-solid fa-lock text-gray-400 text-xl"></i>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                placeholder="Masukkan kata sandi"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                id="toggle-password"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                aria-label="Lihat Sandi"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-5 rounded-xl text-xl transition-all duration-200 uppercase tracking-wide flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span><i className="fa-solid fa-spinner fa-spin"></i> MEMUAT...</span>
                        ) : (
                            <>
                                <span>Masuk Aplikasi</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </>
                        )}
                    </button>

                    {error && (
                        <div id="login-error" className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl text-center font-semibold border border-red-200 flex items-center justify-center gap-2 animate-in">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{error}</span>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};
