import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const PaymentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Complete Payment</h1>
        <p className="text-sm text-muted-foreground">
          Review your rental before continuing to secure payment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Summary</CardTitle>
            <Badge>CONFIRMED</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <p className="font-medium">Mountain Bike</p>
            <p className="text-sm text-muted-foreground">Aug 20 - Aug 23</p>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Rental</span>
              <span>$75</span>
            </div>

            <div className="flex justify-between">
              <span>Service fee</span>
              <span>$5</span>
            </div>

            <Separator />

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>$80</span>
            </div>
          </div>

          <Button className="w-full">Continue to Secure Payment</Button>

          <p className="text-center text-xs text-muted-foreground">
            You will be redirected to the secure payment gateway.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
