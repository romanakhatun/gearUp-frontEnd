import { Users, Package, ClipboardList } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getAdminUsers } from "./_actions/getAdminUsers";
import { getAdminGear } from "./_actions/getAdminGear";
import { getAdminRentals } from "./_actions/getAdminRentals";

const AdminDashboard = async () => {
  const [usersData, gearData, rentalsData] = await Promise.all([
    getAdminUsers(),
    getAdminGear(),
    getAdminRentals(),
  ]);

  const users = usersData?.data ?? [];
  const gear = gearData?.data ?? [];
  const rentals = rentalsData?.data ?? [];

  console.log(usersData);

  const activeGear = gear.filter((item: any) => item.stock > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>

        <p className="text-muted-foreground">
          Overview of your GearUp platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>

            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Gear</CardTitle>

            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{activeGear.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>

            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{rentals.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
