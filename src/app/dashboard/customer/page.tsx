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
import { getCustomerOrders } from "./_actions/getCustomerOrders";

const CustomerDashboardPage = async () => {
  const data = await getCustomerOrders();

  const orders = data?.data ?? [];

  // Calculate dashboard stats from real orders
  const totalOrders = orders.length;

  const activeStatuses = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"];

  const activeRentals = orders.filter((order: any) =>
    activeStatuses.includes(order.status),
  ).length;

  const completedRentals = orders.filter(
    (order: any) => order.status === "RETURNED",
  ).length;

  const totalPayments = orders.reduce(
    (total: number, order: any) => total + Number(order.totalAmount || 0),
    0,
  );

  // Show latest 3 orders
  const recentOrders = orders.slice(0, 3);

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
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} />

        <StatCard title="Active Rentals" value={activeRentals} icon={Package} />

        <StatCard
          title="Completed Rentals"
          value={completedRentals}
          icon={CalendarDays}
        />

        <StatCard
          title="Total Payments"
          value={`$${totalPayments}`}
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
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                You have no rental orders yet.
              </p>

              <Link href="/gear" className="mt-4 inline-block">
                <Button size="sm">Browse Gear</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: any) => {
                const startDate = new Date(order.startDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                );

                const endDate = new Date(order.endDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                );

                return (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {order.gearItem?.title || "Rental Gear"}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {startDate} - {endDate}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="font-medium">
                        ${Number(order.totalAmount).toFixed(2)}
                      </p>

                      <OrderStatus status={order.status} />

                      <Link href={`/dashboard/customer/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
