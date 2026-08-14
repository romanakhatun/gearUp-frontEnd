import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const orders = [
  {
    id: "ORD-1001",
    gear: "Mountain Bike",
    dates: "Aug 20 - Aug 23",
    amount: "$75",
    status: "CONFIRMED",
  },
  {
    id: "ORD-1002",
    gear: "Camping Tent",
    dates: "Aug 10 - Aug 12",
    amount: "$54",
    status: "RETURNED",
  },
  {
    id: "ORD-1003",
    gear: "Football",
    dates: "Sep 02 - Sep 04",
    amount: "$24",
    status: "PLACED",
  },
];

const CustomerOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your rental orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 border-b pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{order.gear}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.id} · {order.dates}
                  </p>
                  <p className="mt-1 text-sm font-medium">{order.amount}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      order.status === "RETURNED"
                        ? "secondary"
                        : order.status === "PLACED"
                          ? "outline"
                          : "default"
                    }
                  >
                    {order.status}
                  </Badge>

                  {order.status === "CONFIRMED" && (
                    <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                      <Button size="sm">Pay Now</Button>
                    </Link>
                  )}

                  {order.status === "RETURNED" && (
                    <Button size="sm" variant="outline">
                      Review
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

export default CustomerOrdersPage;
