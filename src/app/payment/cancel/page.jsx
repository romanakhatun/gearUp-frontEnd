import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <XCircle className="mx-auto h-14 w-14" />

          <h1 className="mt-5 text-2xl font-bold">Payment Cancelled</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Your payment was cancelled. Your order has not been paid.
          </p>

          <Link href="/dashboard/customer/orders">
            <Button variant="outline" className="mt-6 w-full">
              Back to Orders
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
