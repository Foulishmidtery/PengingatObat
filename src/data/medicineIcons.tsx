import { HeartPulse, Droplet, TestTube, Pill, Sun } from 'lucide-react';

export const medicineIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'fa-solid fa-heart-pulse': HeartPulse,
  'fa-solid fa-droplet': Droplet,
  'fa-solid fa-flask': TestTube,
  'fa-solid fa-tablets': Pill,
  'fa-solid fa-sun': Sun,
};
