"use client";

import { useActionState, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { createRentalOrder, RentalActionState } from "@/app/actions/rental";
import { Loader2 } from "lucide-react";
import {
  createRentalOrder,
  RentalActionState,
} from "../_actions/createRentalOrder";

interface RentCardFormProps {
  gear: {
    id: string;
    price: number;
    stock: number;
  };
  isAvailable: boolean;
  user?: any;
}

const initialState: RentalActionState = {
  success: false,
  message: "",
};

export function RentCardForm({ gear, isAvailable, user }: RentCardFormProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // useActionState Hook
  const [state, formAction, isPending] = useActionState(
    createRentalOrder,
    initialState,
  );

  const today = new Date().toISOString().split("T")[0];

  // Dynamic Days & Total Calculation
  const calculateDurationAndTotal = () => {
    if (!startDate || !endDate) {
      return { days: 0, total: 0, isValid: false };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) {
      return { days: 0, total: 0, isValid: false };
    }

    return {
      days: diffDays,
      total: diffDays * gear.price,
      isValid: true,
    };
  };

  const { days, total, isValid } = calculateDurationAndTotal();

  return (
    <Card className="mt-7">
      <CardHeader>
        <CardTitle className="text-lg">Rent this gear</CardTitle>
      </CardHeader>

      <CardContent>
        {/* পুরো ফর্মটিকে form tag দিয়ে র‍্যাপ করা হয়েছে */}
        <form action={formAction} className="space-y-4">
          {/* Hidden inputs দিয়ে বাড়তি ডেটা ব্যাকএন্ডে পাঠানো হচ্ছে */}
          <input type="hidden" name="gearItemId" value={gear.id} />
          <input type="hidden" name="totalAmount" value={total} />

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate" // name attribute আবশ্যক FormData-র জন্য
                type="date"
                min={today}
                value={startDate}
                required
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (endDate && e.target.value > endDate) {
                    setEndDate("");
                  }
                }}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate" // name attribute আবশ্যক FormData-র জন্য
                type="date"
                min={startDate || today}
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Dynamic Rental Summary */}
          <div className="rounded-md bg-muted p-4">
            <div className="flex justify-between text-sm">
              <span>Price per day</span>
              <span>${gear.price}</span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span>Rental duration</span>
              <span
                className={days === 0 ? "text-muted-foreground" : "font-medium"}
              >
                {days > 0
                  ? `${days} ${days === 1 ? "day" : "days"}`
                  : "Select dates"}
              </span>
            </div>

            <Separator className="my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg text-primary">
                ${days > 0 ? total : 0}
              </span>
            </div>
          </div>

          {/* Date validation error hint */}
          {startDate && endDate && !isValid && (
            <p className="text-xs text-destructive">
              End date must be on or after start date.
            </p>
          )}

          {/* Server Action Response Message */}
          {state?.message && (
            <p
              className={`text-xs ${
                state.success ? "text-green-600" : "text-destructive"
              }`}
            >
              {state.message}
            </p>
          )}

          {/* Submit Action Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isAvailable || !isValid || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Request...
              </>
            ) : !isAvailable ? (
              "Out of Stock"
            ) : (
              "Rent Now"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
