"use client";

import { useGlobalState } from "./common.ts";
import { Log } from "../../types.ts";

export function useHistory() {
  const [history, setHistory] = useGlobalState("history", <Log[]> []);

  const fetchHistory = async () => {
    const response = await fetch("/api/logs").then<{ logs: Log[] }>((res) =>
      res.json()
    );
    setHistory(response.logs.reverse());
  };

  return {
    history: history ?? [],
    fetchHistory,
  };
}
