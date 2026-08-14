import StatsCard from "../_components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProviderDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Provider Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your gear and rental orders.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Gear" value="24" />
        <StatsCard title="Active Rentals" value="8" />
        <StatsCard title="Pending Orders" value="4" />
      </div>

      <div className="flex justify-end">
        <Link href="/dashboard/provider/gear/new">
          <Button>Add New Gear</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {[
            ["ORD-1001", "Romana", "Mountain Bike", "PLACED"],
            ["ORD-1002", "Sara", "Camping Tent", "PAID"],
            ["ORD-1003", "Nila", "Football", "PICKED_UP"],
          ].map(([id, customer, gear, status]) => (
            <div
              key={id}
              className="flex flex-col gap-3 border-b pb-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{gear}</p>
                <p className="text-sm text-muted-foreground">
                  {customer} · {id}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge>{status}</Badge>

                <Link href="/dashboard/provider/orders">
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
