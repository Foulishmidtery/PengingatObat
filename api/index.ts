import express, { Request, Response } from "express";
import cors from "cors";

// --- DATA (Embedded) ---
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
  {
    id: 501,
    user_id: 1,
    medicine_id: 101,
    time: "07:00",
    label: "Pagi Hari",
    status: "pending",
  },
  {
    id: 505,
    user_id: 1,
    medicine_id: 103,
    time: "12:00",
    label: "Siang Hari",
    status: "pending",
  },
  {
    id: 502,
    user_id: 1,
    medicine_id: 102,
    time: "19:00",
    label: "Malam Hari",
    status: "pending",
  },
  {
    id: 503,
    user_id: 2,
    medicine_id: 103,
    time: "08:00",
    label: "Pagi",
    status: "pending",
  },
  {
    id: 504,
    user_id: 2,
    medicine_id: 104,
    time: "12:00",
    label: "Siang",
    status: "pending",
  },
  {
    id: 505,
    user_id: 2,
    medicine_id: 104,
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

// --- APP SETUP ---
console.log("Setting up Express App...");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  try {
    if (req.body && Object.keys(req.body).length > 0) {
      console.log("Body:", JSON.stringify(req.body));
    }
  } catch (e) {
    console.error("Error logging body:", e);
  }
  next();
});

// --- HANDLERS ---

const healthHandler = (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

const loginHandler = (req: Request, res: Response) => {
  try {
    if (!req.body) {
      console.error("Body is missing in login request");
      res.status(400).json({ success: false, message: "Request body missing" });
      return;
    }
    const { username, password } = req.body;
    console.log(`Login attempt for: ${username}`);

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      console.log("Login success");
      res.json({ success: true, user });
      return;
    }

    console.log("Login failed: invalid credentials");
    res
      .status(401)
      .json({ success: false, message: "Username atau password salah." });
  } catch (error: any) {
    console.error("Login Handler Fatal Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const scheduleHandler = (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId || "0");
    console.log(`Fetching schedules for user: ${userId}`);

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
    console.error("Schedule Handler Fatal Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const takeMedicineHandler = (req: Request, res: Response) => {
  try {
    const { userId, scheduleId } = req.body;
    console.log(`Taking medicine: User ${userId}, Schedule ${scheduleId}`);

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
    console.error("Take Medicine Fatal Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- ROUTE REGISTRATION ---
// Use explicit calls to avoid TS errors with string arrays
// 1. Health
app.get("/api/health", healthHandler);
app.get("/health", healthHandler);

// 2. Login
app.post("/api/login", loginHandler);
app.post("/login", loginHandler);

// 3. Schedules
app.get("/api/schedules/:userId", scheduleHandler);
app.get("/schedules/:userId", scheduleHandler);

// 4. Take Medicine
app.post("/api/take-medicine", takeMedicineHandler);
app.post("/take-medicine", takeMedicineHandler);

console.log("Express App Configured.");

export default app;
