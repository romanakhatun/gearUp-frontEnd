import StatsCard from "../_components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor and manage the GearUp platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Users" value="1,240" />
        <StatsCard title="Active Gear" value="320" />
        <StatsCard title="Total Rentals" value="890" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Active Providers</p>
            <p className="mt-2 text-xl font-bold">86</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Active Rentals</p>
            <p className="mt-2 text-xl font-bold">142</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Pending Orders</p>
            <p className="mt-2 text-xl font-bold">28</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
