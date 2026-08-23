import { getGearById } from "@/app/(publicGroup)/_actions/getGear";
import { updateGear } from "../../_actions/updateGear";
import { getGearCategories } from "@/app/(publicGroup)/_actions/getGearCategories";
import GearForm from "../../_components/GearForm";

const UpdateGearPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [gearResult, categoriesResult] = await Promise.all([
    getGearById(id),
    getGearCategories(),
  ]);

  const gear = gearResult?.data;

  const categories = categoriesResult?.data || [];

  if (!gear) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-xl font-semibold">Gear not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Update Gear</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your gear information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <GearForm
          categories={categories}
          initialData={gear}
          action={updateGear}
        />
      </div>
    </div>
  );
};

export default UpdateGearPage;
