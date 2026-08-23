"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import router from "next/router";
import { toast } from "sonner";

type GearFormProps = {
  categories: string[];
  initialData?: {
    id: string;
    title: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    location: string;
    images: string[];
  };
  action: any;
};

interface FormState {
  success: boolean;
  message?: string;
  data?: any;
}

const GearForm = ({ categories, initialData, action }: GearFormProps) => {
  const [state, formAction, pending] = useActionState<FormState>(action, {
    success: false,
    message: "",
    data: null,
  });
  console.log(state, formAction, pending);

  const isEdit = Boolean(initialData);

  useEffect(() => {
    console.log("STATE FROM SERVER ACTION:", state);
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Gear updated successfully!");
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {/* ID - only update এর জন্য */}
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Gear Title</Label>

        <Input
          id="title"
          name="title"
          placeholder="Enter gear title"
          defaultValue={initialData?.title || ""}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Describe your gear"
          defaultValue={initialData?.description || ""}
          required
        />
      </div>

      {/* Category + Brand */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>

          <Select name="category" defaultValue={initialData?.category || ""}>
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
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>

          <Input
            id="brand"
            name="brand"
            placeholder="e.g. Trek, Nike, Bosch"
            defaultValue={initialData?.brand || ""}
            required
          />
        </div>
      </div>

      {/* Price + Stock */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price / Day</Label>

          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={initialData?.price ?? ""}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>

          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={initialData?.stock ?? ""}
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>

        <Input
          id="location"
          name="location"
          placeholder="Dhaka"
          defaultValue={initialData?.location || ""}
          required
        />
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label htmlFor="images">Image URLs</Label>

        <Textarea
          id="images"
          name="images"
          placeholder="Paste image URLs separated by comma"
          defaultValue={initialData?.images?.join(", ") || ""}
          required
        />

        {/* <p className="text-xs text-muted-foreground">
          Add multiple image URLs separated by comma.
        </p> */}
      </div>

      {/* Error / Success */}
      {/* {state?.message && (
        <p
          className={
            state.success
              ? "text-sm text-green-600"
              : "text-sm text-destructive"
          }
        >
          {state.message}
        </p>
      )} */}

      {/* Submit */}
      <Button type="submit" disabled={pending} className="w-full">
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

        {isEdit ? "Update Gear" : "Add Gear"}
      </Button>
    </form>
  );
};

export default GearForm;
