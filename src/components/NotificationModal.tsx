import React from 'react';
import { Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function NotificationModal({
  isOpen,
  onClose,
  title,
  message,
}: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full mx-4 shadow-2xl transform scale-100 animate-[popIn_0.3s_ease-out]">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p
            className="text-gray-600 text-xl leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: message }}
          />
          <button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg transition-all duration-200"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
