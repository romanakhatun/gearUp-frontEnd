import Link from "next/link";
import { CreditCard, Eye } from "lucide-react";

import { getPayments } from "../_actions/getPayments";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PaymentHistoryPage = async () => {
  const result = await getPayments();

  const payments = result?.data || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment History</h1>

        <p className="mt-2 text-muted-foreground">
          View your rental payment history and transaction details.
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <CreditCard className="h-10 w-10 text-muted-foreground" />

            <h2 className="mt-4 font-semibold">No payments yet</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your completed rental payments will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: any) => (
            <Card key={payment.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">
                      {payment.order?.gearItem?.title || "Gear Rental"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Transaction: {payment.transactionId || "Pending"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">${payment.amount}</p>

                      <Badge
                        variant={
                          payment.status === "COMPLETED"
                            ? "default"
                            : "secondary"
                        }
                        className="mt-1"
                      >
                        {payment.status}
                      </Badge>
                    </div>

                    <Link href={`/dashboard/customer/payments/${payment.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
