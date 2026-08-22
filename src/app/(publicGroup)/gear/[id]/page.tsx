import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ShieldCheck, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGearById } from "../../_actions/getGear";

type Gear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  images: string[];
  location: string;
  stock: number;
  providerId: string;
  createdAt: string;
  updatedAt: string;
};

type GearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear;
};

const GearDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const result = await getGearById(id);
  const gear = result.data;
  const isAvailable = gear.stock > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* =========================
            Images
        ========================= */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src={gear.images?.[0] || "/placeholder.jpg"}
              alt={gear.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Image Gallery */}
          {gear.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gear.images.slice(0, 4).map((image: string, index: number) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={image}
                    alt={`${gear.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            Gear Details
        ========================= */}
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{gear.category}</Badge>

            <Badge variant={isAvailable ? "default" : "destructive"}>
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-bold">{gear.title}</h1>

          <p className="mt-2 text-muted-foreground">{gear.description}</p>

          {/* Brand */}
          <p className="mt-3 text-sm text-muted-foreground">
            Brand:{" "}
            <span className="font-medium text-foreground">{gear.brand}</span>
          </p>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-3xl font-bold">${gear.price}</span>

            <span className="text-muted-foreground">/ day</span>
          </div>

          <Separator className="my-6" />

          {/* Provider / Location / Stock */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0" />

              <div>
                <p className="font-medium">Verified Provider</p>

                <p className="text-sm text-muted-foreground">
                  Provider ID: {gear.providerId}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0" />

              <div>
                <p className="font-medium">Pickup Location</p>

                <p className="text-sm text-muted-foreground">{gear.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package className="h-5 w-5 shrink-0" />

              <div>
                <p className="font-medium">Availability</p>

                <p className="text-sm text-muted-foreground">
                  {gear.stock} {gear.stock === 1 ? "item" : "items"} available
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              Rent Card
          ========================= */}
          <Card className="mt-7">
            <CardHeader>
              <CardTitle className="text-lg">Rent this gear</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>

                  <Input
                    id="startDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>

                  <Input
                    id="endDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Rental Summary */}
              <div className="rounded-md bg-muted p-4">
                <div className="flex justify-between text-sm">
                  <span>Price per day</span>

                  <span>${gear.price}</span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span>Rental duration</span>

                  <span>3 days</span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>

                  <span>${gear.price * 3}</span>
                </div>
              </div>

              {/* Rent Button */}
              {isAvailable ? (
                <Link
                  href={`/dashboard/customer/orders/new?gearId=${gear.id}`}
                  className="block"
                >
                  <Button className="w-full">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Rent Now
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" disabled>
                  Currently Unavailable
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* =========================
          Specifications
      ========================= */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Specifications</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Spec title="Brand" value={gear.brand} />

          <Spec title="Category" value={gear.category} />

          <Spec title="Location" value={gear.location} />

          <Spec title="Stock" value={`${gear.stock} available`} />
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
