// Data Relational untuk Aplikasi Pengingat Obat Lansia
export const users = [
  {
    id: 1,
    username: "budi123",
    password: "password",
    fullName: "Bapak Budi Santoso",
    age: 72,
    caregiver_contact: "08123456789 (Anak)",
    avatar: "fa-solid fa-user-tie",
  },
  {
    id: 2,
    username: "siti123",
    password: "password",
    fullName: "Ibu Siti Aminah",
    age: 68,
    caregiver_contact: "08987654321 (Suami)",
    avatar: "fa-solid fa-user-nurse",
  },
];

export const medicines = [
  {
    id: 101,
    name: "Amlodipine",
    indication: "Hipertensi (Darah Tinggi)",
    type: "Pil",
    dosage: "5mg",
    icon: "fa-solid fa-pills",
    color: "bg-blue-50 text-blue-600",
    doctor: "Dr. Hartono, Sp.PD",
    facility: "RSUD Sehat Sentosa",
    instructions: "Telan utuh, jangan dikunyah.",
  },
  {
    id: 102,
    name: "Metformin",
    indication: "Diabetes Melitus (Gula)",
    type: "Tablet",
    dosage: "500mg",
    icon: "fa-solid fa-tablets",
    color: "bg-red-50 text-red-600",
    doctor: "Dr. Siti Rahma",
    facility: "Klinik Pratama Jaya",
    instructions: "Minum bersama suapan nasi pertama.",
  },
  {
    id: 103,
    name: "Vitamin C",
    indication: "Menjaga Daya Tahan Tubuh",
    type: "Kapsul",
    dosage: "500g",
    icon: "fa-solid fa-capsules",
    color: "bg-orange-50 text-orange-600",
    doctor: "Dr. Umum (Beli Sendiri)",
    facility: "Apotek Kimia Farma",
    instructions: "Minum setelah makan.",
  },
  {
    id: 104,
    name: "OBH Kombi",
    indication: "Batuk Berdahak",
    type: "Sirup",
    dosage: "1 Sendok Makan",
    icon: "fa-solid fa-bottle-droplet",
    color: "bg-green-50 text-green-600",
    doctor: "Resep Mandiri",
    facility: "Apotek K24",
    instructions: "Kocok dahulu sebelum diminum.",
  },
];

export const schedules = [
  // Budi's Schedule
  {
    id: 501,
    user_id: 1,
    medicine_id: 101, // Amlodipine (Pagi)
    time: "07:00",
    label: "Pagi Hari",
    status: "pending",
  },
  {
    id: 505,
    user_id: 1,
    medicine_id: 103, // Vit C (Siang)
    time: "12:00",
    label: "Siang Hari",
    status: "pending",
  },
  {
    id: 502,
    user_id: 1,
    medicine_id: 102, // Metformin (Malam)
    time: "19:00",
    label: "Malam Hari",
    status: "pending",
  },

  // Siti's Schedule
  {
    id: 503,
    user_id: 2,
    medicine_id: 103, // Vitamin C
    time: "08:00",
    label: "Pagi",
    status: "pending",
  },
  {
    id: 504,
    user_id: 2,
    medicine_id: 104, // OBH
    time: "12:00",
    label: "Siang",
    status: "pending",
  },
  {
    id: 505,
    user_id: 2,
    medicine_id: 104, // OBH
    time: "20:00",
    label: "Malam",
    status: "pending",
  },
];

export const logs = [
  {
    id: 901,
    user_id: 1,
    schedule_id: 501,
    medicine_name: "Amlodipine",
    taken_at: "2023-10-26T07:05:00",
    status: "taken",
  },
];
