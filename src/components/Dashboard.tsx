import React from 'react';
import { useData } from '../hooks/useData';
import { PriorityCard } from './PriorityCard';
import { ScheduleList } from './ScheduleList';

export const Dashboard: React.FC = () => {
  const { user, schedules, takeMedicine } = useData();

  if (!user) return null;

  const nextMed = schedules.find(s => s.status !== 'taken');



  return (
    <div className="min-h-screen pb-20 animate-in">
      {/* Main Content */}
      <main className="transition-opacity duration-500">
        {/* Empty State / Priority Card */}
        {!nextMed && schedules.length > 0 && schedules.every(s => s.status === 'taken') ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 animate-in">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl text-green-500 mx-auto mb-6">
              <i className="fa-solid fa-medal"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Luar Biasa!</h2>
            <p className="text-xl text-gray-500">Semua obat hari ini sudah diminum.</p>
          </div>
        ) : (
          nextMed && <PriorityCard schedule={nextMed} onTake={takeMedicine} />
        )}

        {/* List */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <i className="fa-regular fa-calendar-check text-primary"></i> Jadwal Hari Ini
        </h3>

        <ScheduleList schedules={schedules} onTake={takeMedicine} />
      </main>


    </div>
  );
};
