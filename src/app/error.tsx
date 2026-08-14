"use client";

import { Button } from "@/components/ui/button";

const ErrorPage = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't load this page.
        </p>

        <Button onClick={reset} className="mt-5">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
