import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { users, medicines, schedules, logs } from "./api/data";

export const expressPlugin = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // --- API ENDPOINTS ---

  // 1. Login
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      res.json({ success: true, user });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Username atau password salah." });
    }
  });

  // 2. Get User Schedule
  app.get("/api/schedules/:userId", (req, res) => {
    // @ts-ignore
    const userId = parseInt(req.params.userId);

    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });

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
  app.post("/api/take-medicine", (req, res) => {
    const { userId, scheduleId } = req.body;

    const schedule = schedules.find(
      // @ts-ignore
      (s) => s.id === scheduleId && s.user_id === userId,
    );
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Jadwal tidak ditemukan." });
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

  return {
    name: "express-plugin",
    configureServer(server) {
      server.middlewares.use(app);
    },
  };
};
