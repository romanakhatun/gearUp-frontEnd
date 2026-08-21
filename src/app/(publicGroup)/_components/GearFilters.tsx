"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

type FilterProps = {
  categories: string[];
  brands?: string[];
};

export default function GearFilters({ categories, brands = [] }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("priceMin") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("priceMax") || "");

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearch = useDebouncedCallback((val: string) => {
    updateParam("search", val);
  }, 350);

  const debouncedMinPrice = useDebouncedCallback((val: string) => {
    updateParam("priceMin", val);
  }, 400);

  const debouncedMaxPrice = useDebouncedCallback((val: string) => {
    updateParam("priceMax", val);
  }, 400);

  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("brand") ||
    searchParams.get("priceMin") ||
    searchParams.get("priceMax"),
  );

  const FilterBody = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Category
        </Label>
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(val) => updateParam("category", val)}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand (Optional) */}
      {/* {brands.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Brand
          </Label>
          <Select
            value={searchParams.get("brand") || "all"}
            onValueChange={(val) => updateParam("brand", val)}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )} */}

      {/* Price Range */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range ($)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              debouncedMinPrice(e.target.value);
            }}
            className="w-full bg-background"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              debouncedMaxPrice(e.target.value);
            }}
            className="w-full bg-background"
          />
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full gap-2 border-dashed"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-4">
      {/* Search Input (Global Bar) */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search gear by name, model..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              debouncedSearch(e.target.value);
            }}
          />
        </div>

        {/* Mobile Trigger Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[380px]">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <FilterBody />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar Layout */}
      <div className="hidden lg:block">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-card-foreground">Filters</h2>
            {isPending && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Updating...
              </span>
            )}
          </div>
          <FilterBody />
        </div>
      </div>
    </div>
  );
}
