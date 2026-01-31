import React from 'react';
import { X, Play } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  onTestVoice: () => void;
}

export function VoiceModal({
  isOpen,
  onClose,
  voices,
  selectedVoice,
  onVoiceChange,
  onTestVoice,
}: VoiceModalProps) {
  if (!isOpen) return null;

  const indonesianVoices = voices.filter(
    (voice) => voice.lang.includes('id') || voice.lang.includes('en-US')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-2xl font-bold text-gray-900">
            Pilih Aktor Suara
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-500 mb-4">
          Pilih suara yang terdengar paling nyaman bagi Anda.
        </p>

        <div className="space-y-4 mb-8">
          <select
            value={selectedVoice ? voices.indexOf(selectedVoice) : ''}
            onChange={(e) => onVoiceChange(voices[parseInt(e.target.value)])}
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg font-semibold bg-gray-50 focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none"
          >
            {indonesianVoices.length === 0 && (
              <option value="">Memuat Suara...</option>
            )}
            {indonesianVoices.map((voice, index) => {
              const originalIndex = voices.indexOf(voice);
              return (
                <option key={originalIndex} value={originalIndex}>
                  {voice.name} ({voice.lang})
                </option>
              );
            })}
          </select>

          <button
            onClick={onTestVoice}
            className="w-full bg-blue-100 hover:bg-blue-200 text-primary font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" /> Tes Suara
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-xl shadow-lg transition-all"
        >
          Simpan & Tutup
        </button>
      </div>
    </div>
  );
}
