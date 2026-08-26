import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentCancelPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

const PaymentCancelPage = async ({ searchParams }: PaymentCancelPageProps) => {
  const params = await searchParams;
  const orderId = params.orderId;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Payment Cancelled
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The transaction was not completed and your card was not charged. You
            can retry anytime.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            {/* যদি URL-এ orderId থাকে, তাহলে সরাসরি রি-ট্রাই বা ওই অর্ডারে যাওয়ার অপশন */}
            {orderId ? (
              <Link href={`/dashboard/customer/orders`}>
                <Button className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" /> Retry Payment
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard/customer/orders">
                <Button className="w-full">View My Orders</Button>
              </Link>
            )}

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
