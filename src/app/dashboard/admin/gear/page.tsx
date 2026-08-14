import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const gear = [
  ["Mountain Bike", "Sports World", "Cycling", "ACTIVE"],
  ["Camping Tent", "Outdoor Hub", "Camping", "ACTIVE"],
  ["Football", "Sports Corner", "Sports", "PENDING"],
];

const AdminGearPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gear Moderation</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage gear listings across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Gear</CardTitle>
            <Input className="sm:max-w-xs" placeholder="Search gear..." />
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {gear.map(([name, provider, category, status]) => (
            <div
              key={name}
              className="flex flex-col gap-4 border-b pb-5 last:border-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {provider} · {category}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge>{status}</Badge>

                <Button size="sm" variant="outline">
                  View
                </Button>

                {status === "PENDING" && <Button size="sm">Approve</Button>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGearPage;
