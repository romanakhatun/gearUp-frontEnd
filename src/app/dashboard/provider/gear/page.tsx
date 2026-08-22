import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProviderGear } from "../_actions/getProviderGear";

const gear = [
  ["Mountain Bike", "Cycling", "$25/day", true],
  ["Camping Tent", "Camping", "$18/day", true],
  ["Football", "Sports", "$8/day", false],
];

const ProviderGearPage = async () => {
  const gearData = await getProviderGear();
  console.log(gearData?.data);
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
            {gearData?.data?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border-b pb-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{item?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item?.category} · {item?.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={item?.stock > 0 ? "default" : "secondary"}>
                    {item?.stock > 0 ? "Available" : "Unavailable"}
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
