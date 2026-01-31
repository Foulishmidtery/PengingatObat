import express, { Request, Response } from "express";
import cors from "cors";

// Data Relational (Merged directly to avoid import issues on Vercel)
const users = [
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

const medicines = [
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

const schedules = [
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

const logs = [
  {
    id: 901,
    user_id: 1,
    schedule_id: 501,
    medicine_name: "Amlodipine",
    taken_at: "2023-10-26T07:05:00",
    status: "taken",
  },
];

const app = express();

app.use(cors());
app.use(express.json()); // Built-in express body parser

// Helper to handle both /api/route and /route (in case Vercel rewrites strip the prefix)
const routes = {
  login: ["/api/login", "/login"],
  schedules: ["/api/schedules/:userId", "/schedules/:userId"],
  takeMedicine: ["/api/take-medicine", "/take-medicine"],
  health: ["/api/health", "/health"],
};

// --- API ENDPOINTS ---

// Health Check
app.get(routes.health, (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Login
app.post(routes.login, (req: Request, res: Response): void => {
  try {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      res.json({ success: true, user });
      return;
    }

    res
      .status(401)
      .json({ success: false, message: "Username atau password salah." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get User Schedule
app.get(routes.schedules, (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId || "");

    const user = users.find((u) => u.id === userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // @ts-ignore
    const userSchedules = schedules.filter((s) => s.user_id === userId);

    const richSchedules = userSchedules.map((sch) => {
      // @ts-ignore
      const med = medicines.find((m) => m.id === sch.medicine_id);
      return {
        ...sch,
        medicine: med,
      };
    });

    richSchedules.sort((a, b) => a.time.localeCompare(b.time));

    res.json(richSchedules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Mark Schedule as Taken
app.post(routes.takeMedicine, (req: Request, res: Response) => {
  try {
    const { userId, scheduleId } = req.body;

    const schedule = schedules.find(
      // @ts-ignore
      (s) => s.id === scheduleId && s.user_id === userId,
    );
    if (!schedule) {
      res
        .status(404)
        .json({ success: false, message: "Jadwal tidak ditemukan." });
      return;
    }

    // @ts-ignore
    schedule.status = "taken";

    // @ts-ignore
    const med = medicines.find((m) => m.id === schedule.medicine_id);
    const newLog = {
      id: Date.now(),
      user_id: userId,
      schedule_id: scheduleId,
      medicine_name: med ? med.name : "Unknown",
      taken_at: new Date().toISOString(),
      status: "taken",
    };
    // @ts-ignore
    logs.push(newLog);

    res.json({ success: true, message: "Obat berhasil diminum!", log: newLog });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Export for Vercel
export default app;
