import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold">404</p>

        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>

        <p className="mt-2 text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Link href="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
