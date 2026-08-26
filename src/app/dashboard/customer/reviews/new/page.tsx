import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "../../_components/ReviewForm";

interface PageProps {
  searchParams: Promise<{
    gearId?: string;
    orderId?: string;
  }>;
}

export default async function NewReviewPage({ searchParams }: PageProps) {
  const { gearId, orderId } = await searchParams;

  if (!gearId) {
    notFound();
  }

  // গিয়ারের তথ্য ফেচ করা (Server-Side)
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
    cache: "no-store",
  });
  const gearData = await res.json();
  const gear = gearData?.data;

  if (!gear) {
    return (
      <p className="p-8 text-center text-muted-foreground">Gear not found.</p>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/customer/orders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Write a Review</h1>
          <p className="text-sm text-muted-foreground">
            Share feedback for your completed rental.
          </p>
        </div>
      </div>

      {/* Selected Gear Preview Card */}
      <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
        {gear.images?.[0] ? (
          <Image
            src={gear.images[0]}
            alt={gear.title}
            width={70}
            height={70}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-muted" />
        )}
        <div>
          <h3 className="font-semibold">{gear.title}</h3>
          <p className="text-xs text-muted-foreground capitalize">
            Brand: {gear.brand} • ${gear.price}/day
          </p>
        </div>
      </div>

      {/* Interactive Review Form */}
      <ReviewForm gearId={gear.id} />
    </div>
  );
}
