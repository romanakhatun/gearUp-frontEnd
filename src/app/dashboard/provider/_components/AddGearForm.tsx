"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createGear } from "../_actions/createGear";
import { toast } from "sonner";

const AddGearForm = () => {
  const [state, action, pending] = useActionState(createGear, null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log("STATE FROM SERVER ACTION:", state);
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Gear created successfully!");
      setImageUrl("");
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state]);

  return (
    <>
      <form action={action}>
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the basic details about your gear.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Gear Title</Label>

                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Mountain Bike"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your gear..."
                    className="min-h-28 resize-none"
                    required
                  />
                </div>

                {/* Category + Brand */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="e.g. Mountain Bike"
                      required
                    />

                    {/* <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>

                    <Input
                      id="brand"
                      name="brand"
                      placeholder="e.g. Trek, Sony, Bosch"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rental Information */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Information</CardTitle>
                <CardDescription>
                  Set your rental price and available stock.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Day</Label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        $
                      </span>

                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        // step="0.01"
                        placeholder="25"
                        className="pl-7"
                        required
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>

                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="10"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Pickup Location</Label>

                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Dhaka, Bangladesh"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle>Gear Image</CardTitle>

                <CardDescription>
                  Add an image URL for your gear.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Gear preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <ImagePlus className="mb-3 h-8 w-8 text-muted-foreground" />

                      <p className="text-sm font-medium">Image Preview</p>

                      <p className="mt-1 px-4 text-xs text-muted-foreground">
                        Paste an image URL below
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>

                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {pending ? "Adding Gear..." : "Add Gear"}
                  </Button>

                  <Link href="/dashboard/provider/gear" className="block">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddGearForm;
