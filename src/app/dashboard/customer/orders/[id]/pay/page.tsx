import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import PayButton from "@/app/dashboard/customer/_components/PayButton";

const PayPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // এখানে তোমার getOrderById action দিয়ে order আনবে
  // const result = await getOrderById(id);

  // Example data
  const order = {
    id,
    gearTitle: "Mountain Bike",
    startDate: "Aug 25, 2026",
    endDate: "Aug 28, 2026",
    totalAmount: 75,
    status: "CONFIRMED",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/dashboard/customer/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Complete Payment</h1>

        <p className="mt-2 text-muted-foreground">
          Review your rental details and continue to secure payment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{order.gearTitle}</CardTitle>

            <Badge>{order.status}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Rental Start</p>

              <p className="mt-1 font-medium">{order.startDate}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Rental End</p>

              <p className="mt-1 font-medium">{order.endDate}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-medium">Total Amount</span>

            <span className="text-2xl font-bold">${order.totalAmount}</span>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0" />

              <div>
                <p className="font-medium">Secure Payment</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  You will be redirected to Stripe Checkout to securely complete
                  your payment.
                </p>
              </div>
            </div>
          </div>

          <PayButton orderId={order.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PayPage;
