"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, Menu, User, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/logout";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

type NavbarProps = {
  user: User | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();

  const getDashboardPath = () => {
    switch (user?.role) {
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
    await logout();

    toast.success("Logged out successfully");

    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Dumbbell className="h-5 w-5" />
          GearUp
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/gear"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse Gear
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">
                {/* User Info */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{user.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>

                    <p className="text-xs font-medium text-primary">
                      {user.role}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Dashboard */}
                <DropdownMenuItem asChild>
                  <Link href={getDashboardPath()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                {/* Profile */}
                {/* <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem> */}

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
          )}

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
