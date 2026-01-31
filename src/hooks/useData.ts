import { useState, useEffect, useCallback } from "react";

// Types
export interface User {
  id: number;
  username: string;
  fullName: string;
  age: number;
}

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  type: string; // 'Obat Minum', 'Suntik'
  icon: string; // FontAwesome class
  color: string; // Tailwind color class
  indication: string;
  doctor: string;
  facility: string;
  instructions: string;
}

export interface Schedule {
  id: number;
  userId: number;
  medicineId: number;
  time: string;
  status: "pending" | "taken" | "skipped";
  label: string; // 'Sesudah Makan'
  medicine: Medicine;
}

export function useData() {
  const [user, setUser] = useState<User | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial check for storage (optional, or just rely on manual login for safety)
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<User | null> => {
      setLoading(true);
      setError(null);
      try {
        // Using relative path assuming Vite proxy is set OR CORS is open on Server
        // Fixed: Use relative URL for integrated middleware
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
          localStorage.setItem("currentUser", JSON.stringify(data.user));
          return data.user;
        } else {
          setError(
            "Maaf, nama pengguna atau kata sandi tidak ditemukan. Mohon coba lagi.",
          );
          return null;
        }
      } catch (err) {
        console.error(err);
        setError("Gagal terhubung ke server.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("currentUser");
  }, []);

  const fetchSchedules = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/schedules/${user.id}`);
      const data = await res.json();
      // Sort for Elderly Cognitive Ease: Time Ascending
      data.sort(
        (a: Schedule, b: Schedule) =>
          a.time.localeCompare(b.time) || a.id - b.id,
      );
      setSchedules(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, [user]);

  // Auto-fetch when user changes
  useEffect(() => {
    if (user) {
      fetchSchedules();
      // Optional: Poll every 30s?
    }
  }, [user, fetchSchedules]);

  const takeMedicine = useCallback(
    async (scheduleId: number) => {
      if (!user) return;
      try {
        const res = await fetch("/api/take-medicine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, scheduleId }),
        });
        const data = await res.json();
        if (data.success) {
          // Optimistic or Refetch
          fetchSchedules();
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    [user, fetchSchedules],
  );

  return {
    user,
    schedules,
    loading,
    error,
    login,
    logout,
    takeMedicine,
    refresh: fetchSchedules,
  };
}
