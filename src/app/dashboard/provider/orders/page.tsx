import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProviderRentals } from "../_actions/getProviderRentals";

const ProviderOrdersPage = async () => {
  const result = await getProviderRentals();

  const orders = result?.data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Rental Orders</h1>

        <p className="text-sm text-muted-foreground">
          Manage incoming rental requests.
        </p>
      </div>

      {/* Orders Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders</CardTitle>

            <Badge variant="secondary">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {orders.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-medium">No rental orders found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                New rental requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div key={order.id} className="rounded-lg border p-4">
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
                    {/* Gear + Customer */}
                    <div>
                      <p className="font-semibold">{order.gearItem?.title}</p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.customer?.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {order.customer?.email}
                      </p>
                    </div>

                    {/* Rental Information */}
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Rental: </span>
                        {new Date(order.startDate).toLocaleDateString()} -{" "}
                        {new Date(order.endDate).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="text-muted-foreground">Total: </span>

                        <span className="font-semibold">
                          ${order.totalAmount}
                        </span>
                      </p>
                    </div>

                    {/* Status + Action */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          order.status === "PLACED"
                            ? "secondary"
                            : order.status === "PAID"
                              ? "default"
                              : order.status === "PICKED_UP"
                                ? "outline"
                                : order.status === "RETURNED"
                                  ? "default"
                                  : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>

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
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOrdersPage;
