import { useState } from 'react';
import { useData } from './hooks/useData';
import { useTTS } from './hooks/useTTS';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';

function App() {
  const { user, login, logout, loading, error } = useData();
  const { speak, voices, preferredVoice, setPreferredVoice } = useTTS();
  const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleLogin = async (u: string, p: string) => {
    const loggedInUser = await login(u, p);
    if (loggedInUser) {
      // Restoration of Original Logic: "Pro" Greeting
      const hr = new Date().getHours();
      let greeting = 'Selamat Pagi';
      if (hr >= 11) greeting = 'Selamat Siang';
      if (hr >= 15) greeting = 'Selamat Sore';
      if (hr >= 18) greeting = 'Selamat Malam';

      const welcomeMsg = `
            ${greeting}, Bapak ${loggedInUser.fullName}. 
            Senang bertemu Anda kembali. 
            Mari kita periksa jadwal kesehatan Anda hari ini.
        `;
      speak(welcomeMsg);
    }
  };

  return (
    <div className="bg-[var(--bg-color)] font-sans text-gray-900 antialiased min-h-screen">
      {/* Main Container - Matches #app-container in index.html */}
      <div id="app-container" className="max-w-5xl mx-auto px-4 py-6 md:py-10">

        <Header
          user={user}
          onLogout={logout}
          onVoiceSettings={() => setVoiceModalOpen(true)}
        />

        {!user ? (
          <Login onLogin={handleLogin} loading={loading} error={error} />
        ) : (
          <Dashboard />
        )}
      </div>

      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        voices={voices}
        preferredVoice={preferredVoice}
        onSelectVoice={setPreferredVoice}
        onTestVoice={() => speak("Tes, satu dua tiga. Apakah suara ini terdengar seperti manusia?")}
      />
    </div>
  );
}

export default App;
