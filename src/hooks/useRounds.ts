import { useState, useEffect } from "react";
import { Round, Epoch } from "@/types/prediction";

export const useRounds = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [relevantRound, setRelevantRound] = useState<Round | null>(null);

  const fetchCurrentEpoch = async (): Promise<Epoch | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/epochs/current`
      );
      if (!response.ok) {
        console.warn("No current epoch found");
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching current epoch:", error);
      return null;
    }
  };

  const fetchEpochRounds = async (epochId: number): Promise<Round[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/epochs/${epochId}/rounds`
      );
      if (!response.ok) {
        console.warn("No rounds found for epoch");
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching epoch rounds:", error);
      return [];
    }
  };

  const fetchRoundsData = async () => {
    const currentEpoch = await fetchCurrentEpoch();
    if (!currentEpoch) return;

    const epochRounds = await fetchEpochRounds(currentEpoch.id);
    setRounds(epochRounds);

    const relevantRound = epochRounds.find((round) =>
      ["active", "calculating", "locked"].includes(round.status)
    );
    setRelevantRound(relevantRound || null);
  };

  useEffect(() => {
    fetchRoundsData();
    const interval = setInterval(fetchRoundsData, 2000);
    return () => clearInterval(interval);
  }, []);

  return {
    rounds: rounds.sort((a, b) => a.id - b.id),
    relevantRound,
  };
};
