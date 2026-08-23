import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { confirmPayment } from "@/app/dashboard/customer/_actions/confirmPayment";

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
  }>;
}) => {
  const params = await searchParams;

  let confirmed = false;

  if (params.session_id) {
    const result = await confirmPayment(params.session_id);

    confirmed = result.success;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

          <h1 className="mt-5 text-2xl font-bold">Payment Successful</h1>

          <p className="mt-2 text-muted-foreground">
            Your rental payment has been processed successfully.
          </p>

          {confirmed && (
            <p className="mt-3 text-sm font-medium">
              Your order has been marked as paid.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <Link href="/dashboard/customer/orders">
              <Button className="w-full">View My Orders</Button>
            </Link>

            <Link href="/dashboard/customer/payments">
              <Button variant="outline" className="w-full">
                Payment History
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
