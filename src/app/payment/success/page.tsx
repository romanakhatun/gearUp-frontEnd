import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { confirmPayment } from "@/app/payment/_actions/confirmPayment";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

const PaymentSuccessPage = async ({
  searchParams,
}: PaymentSuccessPageProps) => {
  const params = await searchParams;
  const sessionId = params.session_id;

  let confirmed = false;
  let errorMessage = "";

  if (sessionId) {
    try {
      const result = await confirmPayment(sessionId);
      confirmed = result.success;
      if (!result.success) {
        errorMessage = result.message || "Failed to verify payment.";
      }
    } catch (err: any) {
      confirmed = false;
      errorMessage = err.message || "Something went wrong.";
    }
  } else {
    errorMessage = "No payment session found.";
  }

  // পেমেন্ট ফেইল করলে বা সেশন না থাকলে ফেইলিউর কার্ড
  if (!confirmed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-md border-destructive/30">
          <CardContent className="p-8 text-center">
            <XCircle className="mx-auto h-14 w-14 text-destructive" />
            <h1 className="mt-5 text-2xl font-bold">Verification Failed</h1>
            <p className="mt-2 text-muted-foreground text-sm">
              {errorMessage || "We could not verify your transaction."}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/dashboard/customer">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // পেমেন্ট সফল হলে সাকসেস কার্ড
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

          <h1 className="mt-5 text-2xl font-bold">Payment Successful</h1>

          <p className="mt-2 text-muted-foreground">
            Your rental payment has been processed successfully.
          </p>

          <p className="mt-3 text-sm font-medium text-green-600">
            Your order has been marked as paid.
          </p>

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
