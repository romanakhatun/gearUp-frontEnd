import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  gear: {
    id: string;
    name: string;
    category: string;
    pricePerDay: number;
    image: string;
    available: boolean;
  };
};

const GearCard = ({ gear }: Props) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-muted">
        <Image src={gear.image} alt={gear.name} fill className="object-cover" />
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{gear.category}</Badge>

          <Badge variant={gear.available ? "default" : "destructive"}>
            {gear.available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <h3 className="mt-3 font-semibold">{gear.name}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          ${gear.pricePerDay} / day
        </p>

        <Link href={`/gear/${gear.id}`} className="mt-4 block">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default GearCard;
