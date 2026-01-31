import React from 'react';
import { Schedule } from '../hooks/useData';
import { useTTS } from '../hooks/useTTS';

interface PriorityCardProps {
  schedule: Schedule;
  onTake: (id: number, name: string) => void;
}

export const PriorityCard: React.FC<PriorityCardProps> = ({ schedule, onTake }) => {
  const { speak } = useTTS();
  const med = schedule.medicine;

  const handleSpeak = () => {
    const doctorName = med.doctor.replace('Dr.', 'Dokter');
    const text = `
            Permisi Bapak, ini waktunya minum obat. 
            Pukul ${schedule.time.replace(':', ' lewat ')}. 
            Anda perlu meminum ${med.name}, ${med.dosage}. 
            Obat ini dari ${doctorName}, untuk mengatasi ${med.indication}. 
            ${med.instructions}.
        `.replace(/\s+/g, ' ');
    speak(text);
  };

  return (
    <div className="bg-gradient-to-br from-white to-red-50 border-2 border-red-100 rounded-3xl shadow-xl p-6 md:p-8 relative overflow-hidden animate-in mb-10">

      {/* Badge */}
      <div className="absolute top-0 right-0 bg-accent text-white font-bold py-2 px-6 rounded-bl-3xl text-sm md:text-base shadow-sm z-10 flex items-center gap-2">
        <i className="fa-solid fa-star fa-spin-pulse" style={{ animationDuration: '3s' }}></i> PENTING
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative z-0">

        {/* Icon & Time */}
        <div className="flex flex-col items-center gap-4 w-full md:w-auto text-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-7xl text-accent shadow-lg border-4 border-red-50 animate-[pulse_3s_infinite]">
            <i className={med.icon}></i>
          </div>
          <div className="bg-black/5 text-gray-800 font-black text-3xl px-6 py-2 rounded-2xl tracking-tight">
            {schedule.time}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 w-full">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-primary-dark font-bold px-3 py-1 rounded-lg mb-2 text-sm uppercase tracking-wide">
              <i className="fa-solid fa-stethoscope mr-2"></i> {med.indication}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight leading-none">
              {med.name}
            </h2>
            <p className="text-2xl text-gray-600 font-medium">{med.dosage} ({med.type})</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-primary">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase">Dokter</div>
                <div className="font-bold text-gray-800">{med.doctor}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center text-green-600">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase">Fasilitas</div>
                <div className="font-bold text-gray-800">{med.facility}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 col-span-1 sm:col-span-2">
              <div className="bg-orange-50 w-10 h-10 rounded-full flex items-center justify-center text-orange-600">
                <i className="fa-solid fa-clipboard-check"></i>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase">Catatan Penting:</div>
                <div className="font-bold text-gray-800">{med.instructions || schedule.label}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleSpeak} className="flex-1 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold py-4 rounded-xl text-xl flex items-center justify-center gap-3 transition-colors group">
              <i className="fa-solid fa-ear-listen group-hover:scale-110 transition-transform"></i> Penjelasan
            </button>
            <button onClick={() => onTake(schedule.id, med.name)} className="flex-[2] bg-accent hover:bg-red-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg shadow-red-200 transition-transform active:scale-[0.98] flex items-center justify-center gap-3">
              <i className="fa-solid fa-hand-holding-medical"></i> SAYA SUDAH MINUM
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
