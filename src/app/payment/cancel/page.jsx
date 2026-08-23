import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <XCircle className="mx-auto h-14 w-14 text-destructive" />

          <h1 className="mt-5 text-2xl font-bold">Payment Cancelled</h1>

          <p className="mt-2 text-muted-foreground">
            Your payment was cancelled. No payment was completed.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <Link href="/dashboard/customer/orders">
              <Button className="w-full">Back to Orders</Button>
            </Link>

            <Link href="/gear">
              <Button variant="outline" className="w-full">
                Browse More Gear
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
