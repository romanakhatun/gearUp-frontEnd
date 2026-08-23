import { Badge } from "@/components/ui/badge";
import { getAdminRentals } from "../_actions/getAdminRentals";

const AdminRentalsPage = async () => {
  const result = await getAdminRentals();

  const rentals = result?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Management</h1>

        <p className="text-sm text-muted-foreground">
          Monitor all rental orders across GearUp.
        </p>
      </div>

      <div className="rounded-lg border">
        {rentals.map((rental: any) => (
          <div
            key={rental.id}
            className="flex items-center justify-between border-b p-4 last:border-0"
          >
            <div>
              <p className="font-medium">{rental.id}</p>

              <p className="text-sm text-muted-foreground">{rental.status}</p>
            </div>

            <Badge>{rental.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRentalsPage;
