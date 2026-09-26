"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
  });

  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(localStorage.getItem("fitlog-saved") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      return false;
    }

    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      return false;
    }

    setPlan([...plan, workout]);
    return true;
  };

  const addToSaved = (workout) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      return false;
    }

    setSaved([...saved, workout]);
    return true;
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}