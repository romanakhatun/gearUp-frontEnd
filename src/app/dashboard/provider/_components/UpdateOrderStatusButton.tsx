"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "../_actions/updateOrderStatus";

interface UpdateOrderStatusButtonProps {
  orderId: string;
  status: string;
}

const UpdateOrderStatusButton = ({
  orderId,
  status,
}: UpdateOrderStatusButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // বর্তমান স্ট্যাটাস অনুযায়ী পরবর্তী টার্গেট স্ট্যাটাস নির্ধারণ
  const getNextStatus = () => {
    switch (status) {
      case "PLACED":
        return "CONFIRMED";
      case "PAID":
        return "PICKED_UP";
      case "PICKED_UP":
        return "RETURNED";
      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "PLACED":
        return "Confirm";
      case "PAID":
        return "Mark Picked Up";
      case "PICKED_UP":
        return "Mark Returned";
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();
  const buttonText = getButtonText();

  // যদি স্ট্যাটাস CONFIRMED হয়, তখন কোনো অ্যাকশন বাটন থাকবে না
  if (!nextStatus || !buttonText) {
    return (
      <span className="text-xs text-muted-foreground italic">
        {status === "CONFIRMED" ? "Awaiting customer payment" : "Completed"}
      </span>
    );
  }

  const handleUpdate = async () => {
    setIsPending(true);

    try {
      const result = await updateOrderStatus(orderId, nextStatus);

      if (result.success) {
        toast.success(result.message || "Order status updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update order status");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={status === "PICKED_UP" ? "outline" : "default"}
      onClick={handleUpdate}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default UpdateOrderStatusButton;
