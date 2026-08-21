import Link from "next/link";
import {
  CalendarDays,
  CreditCard,
  Package,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CustomerDashboardPage = async () => {
  // Later replace these with API data
  const stats = {
    totalOrders: 12,
    activeRentals: 2,
    completedRentals: 8,
    totalPayments: 245,
  };

  const recentOrders = [
    {
      id: "ORD-001",
      gear: "Mountain Bike",
      dates: "Aug 20 - Aug 22",
      amount: 75,
      status: "CONFIRMED",
    },
    {
      id: "ORD-002",
      gear: "Camping Tent",
      dates: "Aug 24 - Aug 26",
      amount: 50,
      status: "PAID",
    },
    {
      id: "ORD-003",
      gear: "Hiking Backpack",
      dates: "Aug 28 - Aug 29",
      amount: 20,
      status: "RETURNED",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your rentals, payments, and orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
        />

        <StatCard
          title="Active Rentals"
          value={stats.activeRentals}
          icon={Package}
        />

        <StatCard
          title="Completed Rentals"
          value={stats.completedRentals}
          icon={CalendarDays}
        />

        <StatCard
          title="Total Payments"
          value={`$${stats.totalPayments}`}
          icon={CreditCard}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-3">
          <Link href="/gear">
            <Button>
              Browse Gear
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/dashboard/customer/orders">
            <Button variant="outline">View My Orders</Button>
          </Link>

          <Link href="/dashboard/customer/payments">
            <Button variant="outline">Payment History</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Orders</CardTitle>

          <Link href="/dashboard/customer/orders">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <p className="font-medium">{order.gear}</p>

                  <p className="text-sm text-muted-foreground">
                    {order.id} · {order.dates}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <p className="font-medium">${order.amount}</p>

                  <OrderStatus status={order.status} />

                  <Link href={`/dashboard/customer/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* =========================
   Stat Card
========================= */

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

/* =========================
   Order Status
========================= */

const OrderStatus = ({ status }: { status: string }) => {
  const variants: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    PLACED: "secondary",
    CONFIRMED: "default",
    PAID: "secondary",
    PICKED_UP: "default",
    RETURNED: "outline",
    CANCELLED: "destructive",
  };

  return (
    <Badge variant={variants[status] ?? "outline"}>
      {status.replace("_", " ")}
    </Badge>
  );
};

export default CustomerDashboardPage;
