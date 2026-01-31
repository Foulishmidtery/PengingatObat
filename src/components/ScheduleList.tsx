import React from 'react';
import { Schedule } from '../hooks/useData';
import { useTTS } from '../hooks/useTTS';

interface ScheduleListProps {
    schedules: Schedule[];
    onTake: (id: number, name: string) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onTake }) => {
    const { speak } = useTTS();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {schedules.map((schedule, index) => {
                const med = schedule.medicine;
                const isTaken = schedule.status === 'taken';
                // Find the first pending med to highlight
                const isNext = !isTaken && schedules.find(s => s.status !== 'taken')?.id === schedule.id;

                const ttsText = `Ini adalah obat ${med.name}. Fungsinya untuk ${med.indication}. Dosisnya ${med.dosage}.`;

                return (
                    <div
                        key={schedule.id}
                        className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md animate-in relative overflow-hidden group flex flex-col
                            ${isTaken ? 'bg-green-50/60 opacity-80 grayscale-[0.3]' : ''}
                            ${isNext ? 'ring-2 ring-offset-2 ring-primary/20' : ''}
                        `}
                        style={{ order: isTaken ? 99 : 0, animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-gray-100 text-gray-800 font-bold px-3 py-1 rounded-lg flex items-center gap-2">
                                <i className="fa-regular fa-clock text-gray-500"></i> {schedule.time}
                            </span>
                            <button onClick={() => speak(ttsText)} aria-label="Info Suara" className="text-gray-400 hover:text-primary transition-colors">
                                <i className="fa-solid fa-volume-high text-lg"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 ${med.color} shadow-inner`}>
                                <i className={med.icon}></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{med.name}</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">{med.dosage} • {med.type}</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <i className="fa-solid fa-circle-info text-primary w-5"></i>
                                <span>{med.indication}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-user-doctor text-gray-400 w-5"></i>
                                <span>{med.doctor}</span>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="mt-auto">
                            {isTaken ? (
                                <div className="font-bold text-green-700 flex items-center gap-2 bg-green-100 w-full justify-center py-3 rounded-xl">
                                    <i className="fa-solid fa-check-circle"></i> SUDAH DIMINUM
                                </div>
                            ) : (
                                <button onClick={() => onTake(schedule.id, med.name)} className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-bold transition-all shadow-sm">
                                    <i className="fa-regular fa-circle-check"></i> Minum Obat
                                </button>
                            )}
                        </div>

                    </div>
                );
            })}
        </div>
    );
};
