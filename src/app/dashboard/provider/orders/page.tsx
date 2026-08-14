import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orders = [
  {
    customer: "Romana",
    gear: "Mountain Bike",
    dates: "Aug 20 - Aug 23",
    status: "PLACED",
  },
  {
    customer: "Sara",
    gear: "Camping Tent",
    dates: "Aug 18 - Aug 20",
    status: "PAID",
  },
  {
    customer: "Nila",
    gear: "Football",
    dates: "Aug 10 - Aug 12",
    status: "PICKED_UP",
  },
];

const ProviderOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage incoming rental requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={`${order.customer}-${order.gear}`}
                className="grid gap-4 border-b pb-5 last:border-0 md:grid-cols-[1fr_1fr_auto_auto]"
              >
                <div>
                  <p className="font-medium">{order.gear}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">{order.dates}</p>

                <Badge className="w-fit">{order.status}</Badge>

                <div>
                  {order.status === "PLACED" && (
                    <Button size="sm">Confirm</Button>
                  )}

                  {order.status === "PAID" && (
                    <Button size="sm">Mark Picked Up</Button>
                  )}

                  {order.status === "PICKED_UP" && (
                    <Button size="sm" variant="outline">
                      Mark Returned
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOrdersPage;
