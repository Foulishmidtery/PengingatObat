// Mock Database - Ported from server
export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: string;
}

export interface Medicine {
  id: number;
  name: string;
  type: string;
  dosage: string;
  indication: string;
  doctor: string;
  facility: string;
  instructions: string;
  icon: string;
  color: string;
}

export interface Schedule {
  id: number;
  user_id: number;
  medicine_id: number;
  time: string;
  label: string;
  status: string;
  medicine?: Medicine;
}

export interface Log {
  id: number;
  user_id: number;
  schedule_id: number;
  medicine_name: string;
  taken_at: string;
  status: string;
}

export const users: User[] = [
  {
    id: 1,
    username: "budi123",
    password: "12345",
    fullName: "Budi Santoso",
    role: "patient",
  },
  {
    id: 2,
    username: "siti88",
    password: "password",
    fullName: "Siti Nurhaliza",
    role: "patient",
  },
];

export const medicines: Medicine[] = [
  {
    id: 1,
    name: "Amlodipine",
    type: "Tablet",
    dosage: "5 mg",
    indication: "Tekanan Darah Tinggi",
    doctor: "Dr. Ahmad Hidayat, Sp.JP",
    facility: "RS Harapan Kita",
    instructions: "Diminum setelah makan pagi",
    icon: "fa-solid fa-heart-pulse",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    name: "Metformin",
    type: "Tablet",
    dosage: "500 mg",
    indication: "Diabetes Tipe 2",
    doctor: "Dr. Siti Rahmawati, Sp.PD",
    facility: "Klinik Sehat Mandiri",
    instructions: "Diminum bersama makanan",
    icon: "fa-solid fa-droplet",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    name: "Simvastatin",
    type: "Tablet",
    dosage: "20 mg",
    indication: "Kolesterol Tinggi",
    doctor: "Dr. Ahmad Hidayat, Sp.JP",
    facility: "RS Harapan Kita",
    instructions: "Diminum malam hari sebelum tidur",
    icon: "fa-solid fa-flask",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "Aspirin",
    type: "Tablet",
    dosage: "100 mg",
    indication: "Pencegahan Stroke",
    doctor: "Dr. Ahmad Hidayat, Sp.JP",
    facility: "RS Harapan Kita",
    instructions: "Diminum setelah makan",
    icon: "fa-solid fa-tablets",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 5,
    name: "Vitamin D3",
    type: "Kapsul",
    dosage: "1000 IU",
    indication: "Kesehatan Tulang",
    doctor: "Dr. Siti Rahmawati, Sp.PD",
    facility: "Klinik Sehat Mandiri",
    instructions: "Diminum pagi hari",
    icon: "fa-solid fa-sun",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export const initialSchedules: Schedule[] = [
  {
    id: 1,
    user_id: 1,
    medicine_id: 1,
    time: "07:00",
    label: "Pagi - Setelah Sarapan",
    status: "pending",
  },
  {
    id: 2,
    user_id: 1,
    medicine_id: 2,
    time: "07:30",
    label: "Pagi - Bersama Makanan",
    status: "pending",
  },
  {
    id: 3,
    user_id: 1,
    medicine_id: 5,
    time: "08:00",
    label: "Pagi",
    status: "pending",
  },
  {
    id: 4,
    user_id: 1,
    medicine_id: 4,
    time: "12:00",
    label: "Siang - Setelah Makan",
    status: "pending",
  },
  {
    id: 5,
    user_id: 1,
    medicine_id: 2,
    time: "19:00",
    label: "Malam - Bersama Makanan",
    status: "pending",
  },
  {
    id: 6,
    user_id: 1,
    medicine_id: 3,
    time: "21:00",
    label: "Malam - Sebelum Tidur",
    status: "pending",
  },
];

export let logs: Log[] = [];
