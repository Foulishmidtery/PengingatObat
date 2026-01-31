import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { users, medicines, schedules, logs } from "./data";

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
});

// 2. Get User Schedule
app.get(routes.schedules, (req: Request, res: Response) => {
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
});

// 3. Mark Schedule as Taken
app.post(routes.takeMedicine, (req: Request, res: Response) => {
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
});

// Export for Vercel
export default app;
