import { createContext, useEffect, useRef, useState } from "react";
import { getStreak } from "../api/moodApi";

export const StreakContext = createContext();

export const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [broken, setBroken] = useState(false);
  const prevStreak = useRef(0);

  const refreshStreak = async () => {
    try {
      const value = await getStreak(1); // static userId for now
      const safeValue = Number.isFinite(value) ? value : 0;

      if (prevStreak.current > 0 && safeValue === 0) {
        setBroken(true);
        setTimeout(() => setBroken(false), 2500);
      }

      prevStreak.current = safeValue;
      setStreak(safeValue);
    } catch {
      setStreak(0);
    }
  };

  useEffect(() => {
    refreshStreak();
  }, []);

  return (
    <StreakContext.Provider value={{ streak, broken, refreshStreak }}>
      {children}
    </StreakContext.Provider>
  );
};
