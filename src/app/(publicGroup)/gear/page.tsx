import GearCard from "../_components/GearCard";
import { getGear } from "../_actions/getGear";
import { getGearCategories } from "../_actions/getGearCategories";
import GearFilters from "../_components/GearFilters";

const GearPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const [gearData, categoriesData] = await Promise.all([
    getGear(params),
    getGearCategories(),
  ]);

  const categories = categoriesData?.data || [];
  const gears = gearData?.data || [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse Gear
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Find top-tier equipment tailored for your next adventure.
        </p>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] items-start">
        {/* Filters */}
        <aside className="w-full">
          <GearFilters categories={categories} />
        </aside>

        {/* Products */}
        <section aria-labelledby="products-heading" className="w-full">
          <h2 id="products-heading" className="sr-only">
            Gear Listings
          </h2>

          {gears.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                No gear found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try clearing filters or changing your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {gears.map((gear: any) => (
                <GearCard key={gear.id} gear={gear} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default GearPage;
