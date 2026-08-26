"use client";

import {
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/services/logout";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type DashboardHeaderProps = {
  user: User;
};

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getDashboardPath = () => {
    switch (user.role) {
      case "CUSTOMER":
        return "/dashboard/customer";

      case "PROVIDER":
        return "/dashboard/provider";

      case "ADMIN":
        return "/dashboard/admin";

      default:
        return "/";
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      {/* Mobile menu */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Dashboard title */}
      <div className="hidden md:block">
        <p className="text-sm font-medium">Dashboard</p>

        <p className="text-xs text-muted-foreground">
          Manage your GearUp account
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notification */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium">{user.name}</p>

                <p className="text-xs capitalize text-muted-foreground">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            {/* User information */}
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{user.name}</p>

                <p className="text-xs text-muted-foreground">{user.email}</p>

                <p className="text-xs font-medium text-primary">{user.role}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Dashboard */}
            <DropdownMenuItem onClick={() => router.push(getDashboardPath())}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
