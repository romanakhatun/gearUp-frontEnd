import Link from "next/link";
import { ArrowRight, ShieldCheck, CalendarDays, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              SPORTS & OUTDOOR GEAR RENTAL
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Rent the gear you need.
              <span className="block text-muted-foreground">
                Adventure starts here.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-muted-foreground">
              Find reliable sports and outdoor equipment, choose your dates, and
              rent instantly from trusted providers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/gear">
                <Button size="lg">
                  Browse Gear
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button size="lg" variant="outline">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <CalendarDays className="mb-4 h-6 w-6" />
              <h3 className="font-semibold">Flexible Rentals</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select the exact dates you need your equipment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <ShieldCheck className="mb-4 h-6 w-6" />
              <h3 className="font-semibold">Trusted Providers</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Rent equipment from verified gear providers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Zap className="mb-4 h-6 w-6" />
              <h3 className="font-semibold">Simple Checkout</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reserve your gear and complete payment securely.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Page;
