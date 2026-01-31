import { useState, useEffect, useCallback } from "react";

export function useTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      console.log("TTS Loop: Voices Loaded", available.length);
      setVoices(available);

      // Priority: "Ava" (User Request) -> "Natural" (Microsoft) -> "Microsoft" -> "Google" -> "Indonesia"
      const ava = available.find(
        (v) =>
          v.name.toLowerCase().includes("ava") &&
          v.name.toLowerCase().includes("multilingual"),
      );
      const natural = available.find(
        (v) =>
          v.name.toLowerCase().includes("natural") &&
          v.name.toLowerCase().includes("indone"),
      );
      const microsoft = available.find(
        (v) => v.name.includes("Microsoft") && v.name.includes("Indonesia"),
      );
      const google = available.find(
        (v) => v.name.includes("Google") && v.lang.includes("id"),
      );
      const anyIndo = available.find((v) => v.lang === "id-ID");

      const selected =
        ava || natural || microsoft || google || anyIndo || available[0];
      setPreferredVoice(selected || null);
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.lang = "id-ID";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      window.speechSynthesis.speak(utterance);
    },
    [preferredVoice],
  );

  return { speak, voices, preferredVoice, setPreferredVoice };
}
