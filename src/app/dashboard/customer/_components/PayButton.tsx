"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createPayment } from "@/app/dashboard/customer/_actions/createPayment";

type Props = {
  orderId: string;
};

const PayButton = ({ orderId }: Props) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const result = await createPayment(orderId);

      if (!result.success) {
        toast.error(result.message || "Unable to create payment");
        return;
      }

      if (!result.data?.paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      toast.success("Redirecting to secure payment...");

      window.location.href = result.data.paymentUrl;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Preparing Payment...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay with Stripe
        </>
      )}
    </Button>
  );
};

export default PayButton;
