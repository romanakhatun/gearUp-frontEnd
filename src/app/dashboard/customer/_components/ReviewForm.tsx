// app/dashboard/customer/reviews/new/_components/ReviewForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview, ActionState } from "../_actions/createReview";
import { StarRating } from "./StarRating";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ReviewForm({ gearId }: { gearId: string }) {
  const [rating, setRating] = useState<number>(0);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createReview,
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/customer/orders");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-5">
          {/* Automatically pass the gearId */}
          <input type="hidden" name="gearItemId" value={gearId} />
          <input type="hidden" name="rating" value={rating || ""} />

          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Feedback</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="How was the equipment condition? Did it perform well?"
              className="min-h-32 resize-none"
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || rating === 0}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Review...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4 fill-primary-foreground" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
