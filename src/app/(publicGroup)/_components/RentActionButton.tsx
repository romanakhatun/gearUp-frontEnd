import Link from "next/link";
import { CalendarDays, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentButtonProps {
  gearId: string;
  isAvailable: boolean;
  user?: {
    id: string;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    status: string;
  } | null;
}

export function RentActionButton({
  gearId,
  isAvailable,
  user,
}: RentButtonProps) {
  if (!isAvailable) {
    return (
      <Button className="w-full" disabled variant="secondary">
        Currently Unavailable
      </Button>
    );
  }

  if (!user) {
    const loginUrl = `/auth/login?redirect=/gear/${gearId}`;
    return (
      <Button asChild className="w-full">
        <Link href={loginUrl}>
          <CalendarDays className="mr-2 h-4 w-4" />
          Sign In to Rent
        </Link>
      </Button>
    );
  }

  if (user.role !== "CUSTOMER") {
    return (
      <Button className="w-full" variant="outline" disabled>
        <AlertCircle className="mr-2 h-4 w-4" />
        Switch to Customer Account to Rent
      </Button>
    );
  }
  return (
    <Button asChild className="w-full">
      <Link href={`/dashboard/customer/orders/new?gearId=${gearId}`}>
        <CalendarDays className="mr-2 h-4 w-4" />
        Rent Now
      </Link>
    </Button>
  );
}
