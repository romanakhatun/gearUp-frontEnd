"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  PlusCircle,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

interface DashboardSidebarProps {
  role: Role;
}

const navItems = {
  CUSTOMER: [
    {
      label: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "My Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
    {
      label: "Payments",
      href: "/dashboard/customer/payments",
      icon: Package,
    },
    {
      label: "Reviews",
      href: "/dashboard/customer/reviews",
      icon: ShieldCheck,
    },
  ],

  PROVIDER: [
    {
      label: "Overview",
      href: "/dashboard/provider",
      icon: LayoutDashboard,
    },
    {
      label: "My Gear",
      href: "/dashboard/provider/gear",
      icon: Package,
    },
    {
      label: "Add Gear",
      href: "/dashboard/provider/gear/new",
      icon: PlusCircle,
    },
    {
      label: "Orders",
      href: "/dashboard/provider/orders",
      icon: ShoppingBag,
    },
  ],

  ADMIN: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Gear",
      href: "/dashboard/admin/gear",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/dashboard/admin/orders",
      icon: ShoppingBag,
    },
  ],
};

const roleTitle = {
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
  ADMIN: "Admin",
};

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const items = navItems[role];

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="text-xl font-bold">
          GearUp
        </Link>
      </div>

      {/* User Role */}
      <div className="border-b p-4">
        <div className="rounded-lg bg-muted px-3 py-2">
          <p className="text-xs text-muted-foreground">Dashboard</p>

          <p className="mt-1 font-medium">{roleTitle[role]}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
