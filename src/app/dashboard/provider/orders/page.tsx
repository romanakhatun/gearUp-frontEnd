import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UpdateOrderStatusButton from "../_components/UpdateOrderStatusButton";
import { getProviderRentals } from "../_actions/getProviderRentals";

const ProviderOrdersPage = async () => {
  const result = await getProviderRentals();

  const orders = result?.data?.data || [];

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
            {orders.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No rental orders found.
              </div>
            ) : (
              orders.map((order: any) => (
                <div
                  key={order.id}
                  className="grid gap-4 border-b pb-5 last:border-0 md:grid-cols-[1fr_1fr_auto_auto]"
                >
                  {/* Customer + Gear */}
                  <div>
                    <p className="font-medium">{order.gearItem?.title}</p>

                    <p className="text-sm text-muted-foreground">
                      Customer: {order.customer?.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {order.customer?.email}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {new Date(order.startDate).toLocaleDateString()} -{" "}
                      {new Date(order.endDate).toLocaleDateString()}
                    </p>

                    <p className="mt-1">Total: ${order.totalAmount}</p>
                  </div>

                  {/* Status */}

                  <Badge
                    variant={
                      order.status === "PLACED"
                        ? "secondary"
                        : order.status === "CONFIRMED"
                          ? "outline"
                          : order.status === "PAID"
                            ? "default"
                            : order.status === "CANCELLED"
                              ? "destructive"
                              : "secondary"
                    }
                    className="w-fit"
                  >
                    {order.status}
                  </Badge>

                  {/* Action */}
                  <div>
                    {order.status !== "RETURNED" &&
                      order.status !== "CANCELLED" && (
                        <UpdateOrderStatusButton
                          orderId={order.id}
                          status={order.status}
                        />
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

export default ProviderOrdersPage;
