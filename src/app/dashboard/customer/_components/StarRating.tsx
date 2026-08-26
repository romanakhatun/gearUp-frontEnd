"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const activeRating = hoverRating || rating;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= activeRating;

          return (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 rounded-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30 hover:text-muted-foreground/50"
                }`}
              />
            </button>
          );
        })}

        {/* Dynamic Label */}
        {activeRating > 0 && (
          <span className="ml-3 text-sm font-medium text-muted-foreground transition-all">
            {RATING_LABELS[activeRating]}
          </span>
        )}
      </div>
    </div>
  );
}
