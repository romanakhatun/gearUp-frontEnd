import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14" />

          <h1 className="mt-5 text-2xl font-bold">Payment Successful</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Your rental has been successfully paid for.
          </p>

          <Link href="/dashboard/customer/orders">
            <Button className="mt-6 w-full">View My Orders</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
