import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  ["ORD-1001", "Romana", "Mountain Bike", "CONFIRMED"],
  ["ORD-1002", "Sara", "Camping Tent", "PAID"],
  ["ORD-1003", "Nila", "Football", "RETURNED"],
  ["ORD-1004", "Mina", "Tennis Racket", "CANCELLED"],
];

const AdminOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Orders</h1>
        <p className="text-sm text-muted-foreground">
          View all rental orders across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {orders.map(([id, customer, gear, status]) => (
              <div
                key={id}
                className="grid gap-3 border-b pb-5 last:border-0 md:grid-cols-[120px_1fr_1fr_auto]"
              >
                <p className="text-sm font-medium">{id}</p>

                <p className="text-sm">{customer}</p>

                <p className="text-sm text-muted-foreground">{gear}</p>

                <Badge className="w-fit">{status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
