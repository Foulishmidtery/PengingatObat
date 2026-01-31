import React from 'react';
import { User } from '../hooks/useData';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onVoiceSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onVoiceSettings }) => {
    // Greeting Logic
    const getGreeting = () => {
        const hr = new Date().getHours();
        if (hr < 11) return "Selamat Pagi";
        if (hr < 15) return "Selamat Siang";
        if (hr < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    return (
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-heart-pulse text-4xl text-accent"></i>
                <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Pengingat Obat
                    </h1>
                    <p className="text-sm md:text-base text-gray-500">Sehat Bersama</p>
                </div>
            </div>

            {/* User Info - Only show if user is logged in */}
            {user && (
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="font-semibold text-lg md:text-xl hidden md:block text-gray-700">
                        {getGreeting()}, <b>{user.fullName}</b>
                    </span>

                    <button
                        onClick={onVoiceSettings}
                        aria-label="Pengaturan Suara"
                        className="bg-blue-50 hover:bg-blue-100 text-primary font-semibold w-10 h-10 md:w-auto md:px-4 md:py-2 border border-blue-200 rounded-full transition duration-200 shadow-sm flex items-center justify-center gap-2"
                        title="Ganti Suara"
                    >
                        <i className="fa-solid fa-sliders"></i>
                        <span className="hidden md:inline">Suara</span>
                    </button>

                    <button
                        onClick={onLogout}
                        aria-label="Keluar"
                        className="bg-white hover:bg-red-50 text-accent font-semibold w-10 h-10 md:w-auto md:px-6 md:py-2 border-2 border-red-100 rounded-full transition duration-200 shadow-sm flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="hidden sm:inline">Keluar</span>
                    </button>
                </div>
            )}
        </header>
    );
};
