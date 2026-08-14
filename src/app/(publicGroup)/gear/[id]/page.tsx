import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GearDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src="/gear/bike.jpg"
              alt="Mountain Bike"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative aspect-square overflow-hidden rounded-md bg-muted"
              >
                <Image
                  src="/gear/bike.jpg"
                  alt={`Gear image ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <Badge>Available</Badge>

          <h1 className="mt-4 text-3xl font-bold">Mountain Bike</h1>

          <p className="mt-2 text-muted-foreground">
            A reliable mountain bike for outdoor adventures and weekend trips.
          </p>

          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-3xl font-bold">$25</span>
            <span className="text-muted-foreground">/ day</span>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5" />
              <div>
                <p className="font-medium">Verified Provider</p>
                <p className="text-sm text-muted-foreground">Sports World</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="h-5 w-5" />
              <div>
                <p className="font-medium">Pickup Location</p>
                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <Card className="mt-7">
            <CardHeader>
              <CardTitle className="text-lg">Rent this gear</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <div className="flex justify-between text-sm">
                  <span>Rental price</span>
                  <span>$25 × 3 days</span>
                </div>

                <div className="mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$75</span>
                </div>
              </div>

              <Link href="/dashboard/customer/orders/1/pay">
                <Button className="w-full">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Rent Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Specifications</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Spec title="Brand" value="Trek" />
          <Spec title="Category" value="Cycling" />
          <Spec title="Weight" value="12 kg" />
          <Spec title="Condition" value="Excellent" />
        </div>
      </section>
    </div>
  );
};

const Spec = ({ title, value }: { title: string; value: string }) => (
  <Card>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 font-medium">{value}</p>
    </CardContent>
  </Card>
);

export default GearDetailsPage;
