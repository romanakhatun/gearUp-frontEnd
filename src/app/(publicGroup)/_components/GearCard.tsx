import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, PackageCheck, PackageX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  gear: {
    id: string;
    title: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    images: string[];
    location: string;
    stock: number;
  };
};

const GearCard = ({ gear }: Props) => {
  const isAvailable = gear.stock > 0;
  const imageSrc = gear.images?.[0] || "/placeholder-gear.jpg";

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg py-0">
      {/* Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={gear.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

        {/* Top Badges */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="backdrop-blur-md bg-background/80 text-[11px] font-medium tracking-wide text-foreground shadow-sm"
          >
            {gear.category}
          </Badge>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md shadow-sm ${
              isAvailable
                ? "bg-emerald-500/90 text-white"
                : "bg-destructive/90 text-destructive-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isAvailable ? "bg-white animate-pulse" : "bg-white/70"
              }`}
            />
            {isAvailable ? "Available" : "Out of Stock"}
          </span>
        </div>

        {/* Brand overlay on bottom-left of image */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90 drop-shadow-sm">
            {gear.brand}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Title & Description */}
          <Link
            href={`/gear/${gear.id}`}
            className="group/title focus-visible:outline-none"
          >
            <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover/title:text-primary">
              {gear.title}
            </h3>
          </Link>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {gear.description}
          </p>
        </div>

        {/* Specs, Location & Pricing Footer */}
        <div className="mt-4 space-y-3 pt-3 border-t border-border/40">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" />
              <span className="truncate max-w-[120px]">{gear.location}</span>
            </div>

            <div className="flex items-center gap-1">
              {isAvailable ? (
                <>
                  <PackageCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{gear.stock} in stock</span>
                </>
              ) : (
                <>
                  <PackageX className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>0 in stock</span>
                </>
              )}
            </div>
          </div>

          {/* Pricing and Action */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-xs text-muted-foreground font-normal">
                Rate
              </span>
              <p className="text-lg font-bold tracking-tight text-foreground">
                ${gear.price}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / day
                </span>
              </p>
            </div>

            <Button
              asChild
              size="sm"
              variant={isAvailable ? "default" : "secondary"}
              className="gap-1.5 text-xs font-medium transition-transform active:scale-95"
            >
              <Link href={`/gear/${gear.id}`}>
                View Details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GearCard;
