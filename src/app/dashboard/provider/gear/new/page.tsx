import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddGearForm from "../../_components/AddGearForm";

const AddGearPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/provider/gear">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Gear</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a new sports or outdoor equipment to your inventory.
          </p>
        </div>
      </div>
      <AddGearForm />
    </div>
  );
};

export default AddGearPage;
