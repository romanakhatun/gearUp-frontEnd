import { Badge } from "@/components/ui/badge";
import { getAdminGear } from "../_actions/getAdminGear";

const AdminGearPage = async () => {
  const result = await getAdminGear();

  const gear = result?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gear Management</h1>

        <p className="text-sm text-muted-foreground">
          Inspect all gear listings on the platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gear.map((item: any) => (
          <div key={item.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{item.title}</h2>

            <p className="text-sm text-muted-foreground">{item.brand}</p>

            <p className="mt-2">${item.price} / day</p>

            <p className="text-sm text-muted-foreground">Stock: {item.stock}</p>

            <Badge className="mt-3">{item.category}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGearPage;
