import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, CreditCard } from "lucide-react";
import { getCustomerOrders } from "../_actions/getCustomerOrders";

const CustomerOrdersPage = async () => {
  const data = await getCustomerOrders();
  const orders = data?.data || [];

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
            {orders.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No rental orders found.
              </div>
            ) : (
              orders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 border-b pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-base">
                      {order.gearItem?.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      Order ID: {order.id}
                    </p>

                    <p className="mt-1.5 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Rental Period:
                      </span>{" "}
                      {new Date(order.startDate).toLocaleDateString()} –{" "}
                      {new Date(order.endDate).toLocaleDateString()}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-primary">
                      Total: ${order.totalAmount}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Dynamic Status Badge */}
                    <Badge
                      variant={
                        order.status === "PLACED"
                          ? "secondary"
                          : order.status === "CONFIRMED"
                            ? "outline"
                            : order.status === "PAID"
                              ? "default"
                              : order.status === "RETURNED"
                                ? "secondary"
                                : order.status === "CANCELLED"
                                  ? "destructive"
                                  : "default"
                      }
                    >
                      {order.status}
                    </Badge>

                    {/* Pay Now Button (Only when CONFIRMED) */}
                    {order.status === "CONFIRMED" && (
                      <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                        <Button size="sm" className="gap-1.5">
                          <CreditCard className="h-4 w-4" />
                          Pay Now
                        </Button>
                      </Link>
                    )}

                    {/* Review Button with specific gear & order params (Only when RETURNED) */}
                    {order.status === "RETURNED" && (
                      <Link
                        href={`/dashboard/customer/reviews/new?gearId=${order.gearItem?.id || order.gearItemId}&orderId=${order.id}`}
                      >
                        <Button size="sm" variant="outline" className="gap-1.5">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          Leave Review
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrdersPage;
