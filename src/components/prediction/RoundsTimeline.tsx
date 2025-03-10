import { useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { RoundCard } from "@/components/prediction/RoundCard";
import { PredictionsTable } from "@/components/prediction/PredictionsTable";
import { useRounds } from "@/hooks/useRounds";
import { usePredictions } from "@/hooks/usePredictions";

const RoundsTimeline = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { rounds, relevantRound } = useRounds();
  const { userPredictions, submitPrediction } = usePredictions(rounds);

  useEffect(() => {
    if (scrollContainerRef.current && relevantRound) {
      const container = scrollContainerRef.current;
      const relevantCard = container.querySelector(
        `[data-round-id="${relevantRound.id}"]`
      );

      if (relevantCard) {
        const containerPadding = 128;
        const containerWidth = container.clientWidth - containerPadding * 2;
        const cardLeft = (relevantCard as HTMLElement).offsetLeft;
        const cardWidth = (relevantCard as HTMLElement).offsetWidth;
        const scrollPosition =
          cardLeft - containerWidth / 2 - containerPadding + cardWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  }, [relevantRound?.id]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    const container = scrollContainerRef.current;
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative w-screen -mx-8">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-300" />
          </button>
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20">
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Rounds carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto px-32 py-4 scrollbar-hide scroll-smooth"
          style={{ paddingRight: "calc(128px + 280px)" }}
        >
          {rounds.map((round) => (
            <RoundCard
              key={round.id}
              round={round}
              isRelevant={relevantRound?.id === round.id}
              onPredictionSubmit={submitPrediction}
              userPrediction={userPredictions[round.id]}
              data-round-id={round.id}
            />
          ))}
        </div>
      </div>

      {/* Add predictions table */}
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Your Predictions
        </h2>
        <PredictionsTable predictions={userPredictions} />
      </div>
    </div>
  );
};

export default RoundsTimeline;
