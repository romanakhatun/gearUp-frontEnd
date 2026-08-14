import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Dumbbell className="h-5 w-5" />
          GearUp
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/gear"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Browse Gear
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>

          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
