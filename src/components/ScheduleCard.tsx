import React from 'react';
import { Schedule } from '../data/mockData';
import { medicineIconMap } from '../data/medicineIcons';
import { Clock, Volume2, Info, Stethoscope, CheckCircle, Pill } from 'lucide-react';

interface ScheduleCardProps {
  schedule: Schedule;
  isNext: boolean;
  index: number;
  onSpeak: (text: string) => void;
  onTakeMedicine: (id: number) => void;
}

export function ScheduleCard({
  schedule,
  isNext,
  index,
  onSpeak,
  onTakeMedicine,
}: ScheduleCardProps) {
  const med = schedule.medicine!;
  const isTaken = schedule.status === 'taken';

  let cardClass = `bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md animate-in relative overflow-hidden group`;

  if (isTaken) {
    cardClass += ' bg-green-50/60 opacity-80 grayscale-[0.3]';
  } else if (isNext) {
    cardClass += ' ring-2 ring-offset-2 ring-primary/20';
  }

  const ttsText = `Ini adalah obat ${med.name}. Fungsinya untuk ${med.indication}. Dosisnya ${med.dosage}.`;

  const IconComponent = medicineIconMap[med.icon] || Pill;

  return (
    <div
      className={cardClass}
      style={{
        animationDelay: `${index * 0.15}s`,
        order: isTaken ? 99 : undefined,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-gray-100 text-gray-800 font-bold px-3 py-1 rounded-lg flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" /> {schedule.time}
        </span>
        <button
          onClick={() => onSpeak(ttsText)}
          aria-label="Info Suara"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${med.color} shadow-inner`}
        >
          <IconComponent className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {med.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {med.dosage} • {med.type}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Info className="w-5 h-5 text-primary" />
          <span>{med.indication}</span>
        </div>

        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-gray-400" />
          <span>{med.doctor}</span>
        </div>
      </div>

      <div className="mt-auto">
        {isTaken ? (
          <div className="font-bold text-green-700 flex items-center gap-2 bg-green-100 w-full justify-center py-3 rounded-xl">
            <CheckCircle className="w-5 h-5" /> SUDAH DIMINUM
          </div>
        ) : (
          <button
            onClick={() => onTakeMedicine(schedule.id)}
            className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Minum Obat
          </button>
        )}
      </div>
    </div>
  );
}
