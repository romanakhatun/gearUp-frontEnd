import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const gear = [
  ["Mountain Bike", "Cycling", "$25/day", true],
  ["Camping Tent", "Camping", "$18/day", true],
  ["Football", "Sports", "$8/day", false],
];

const ProviderGearPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Gear</h1>
          <p className="text-sm text-muted-foreground">
            Manage your available rental equipment.
          </p>
        </div>

        <Link href="/dashboard/provider/gear/new">
          <Button>Add Gear</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {gear.map(([name, category, price, available], index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border-b pb-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category} · {price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={available ? "default" : "secondary"}>
                    {available ? "Available" : "Unavailable"}
                  </Badge>

                  <Button size="sm" variant="outline">
                    Edit
                  </Button>

                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderGearPage;
