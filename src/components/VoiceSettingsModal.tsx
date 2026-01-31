import React from 'react';

interface VoiceSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    voices: SpeechSynthesisVoice[];
    preferredVoice: SpeechSynthesisVoice | null;
    onSelectVoice: (voice: SpeechSynthesisVoice) => void;
    onTestVoice: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsProps> = ({
    isOpen,
    onClose,
    voices,
    preferredVoice,
    onSelectVoice,
    onTestVoice
}) => {
    if (!isOpen) return null;

    return (
        <div id="voice-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-2xl font-bold text-gray-900">Pilih Aktor Suara</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <p className="text-gray-500 mb-4">Pilih suara yang terdengar paling nyaman bagi Anda.</p>

                <div className="space-y-4 mb-8">
                    <select
                        id="voice-select"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg font-semibold bg-gray-50 focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none"
                        value={preferredVoice ? voices.indexOf(preferredVoice) : -1}
                        onChange={(e) => onSelectVoice(voices[parseInt(e.target.value)])}
                        disabled={voices.length === 0}
                    >
                        {voices.length === 0 && <option value="-1">Memuat Suara...</option>}

                        {voices.map((v, idx) => (
                            (v.lang.includes('id') || v.lang.includes('en-US')) && (
                                <option key={idx} value={idx}>{v.name} ({v.lang})</option>
                            )
                        ))}
                    </select>

                    <button
                        id="test-voice-btn"
                        onClick={onTestVoice}
                        className="w-full bg-blue-100 hover:bg-blue-200 text-primary font-bold py-3 rounded-xl transition-colors"
                    >
                        <i className="fa-solid fa-play"></i> Tes Suara
                    </button>
                </div>

                <button onClick={onClose} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-xl shadow-lg transition-all">
                    Simpan & Tutup
                </button>
            </div>
        </div>
    );
};
