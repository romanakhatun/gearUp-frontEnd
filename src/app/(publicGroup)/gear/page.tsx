import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GearCard from "../_components/GearCard";

const demoGear = [
  {
    id: "1",
    name: "Mountain Bike",
    category: "Cycling",
    pricePerDay: 25,
    image: "/gear/bike.jpg",
    available: true,
  },
  {
    id: "2",
    name: "Camping Tent",
    category: "Camping",
    pricePerDay: 18,
    image: "/gear/tent.jpg",
    available: true,
  },
  {
    id: "3",
    name: "Football",
    category: "Sports",
    pricePerDay: 8,
    image: "/gear/football.jpg",
    available: false,
  },
];

const GearPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Gear</h1>
        <p className="mt-2 text-muted-foreground">
          Find the equipment you need for your next adventure.
        </p>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_200px_160px_auto]">
        <Input placeholder="Search gear..." />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="cycling">Cycling</SelectItem>
            <SelectItem value="camping">Camping</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="low">Under $10</SelectItem>
            <SelectItem value="medium">$10 - $30</SelectItem>
            <SelectItem value="high">$30+</SelectItem>
          </SelectContent>
        </Select>

        <Button>Filter</Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoGear.map((gear) => (
          <GearCard key={gear.id} gear={gear} />
        ))}
      </div>
    </div>
  );
};

export default GearPage;
