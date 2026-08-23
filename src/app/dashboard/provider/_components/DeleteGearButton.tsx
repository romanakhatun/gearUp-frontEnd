"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteGear } from "../_actions/deleteGear";

interface DeleteGearButtonProps {
  gearId: string;
}

const DeleteGearButton = ({ gearId }: DeleteGearButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gear?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const result = await deleteGear(gearId);

      if (result.success) {
        toast.success(result.message || "Gear deleted successfully");

        // refresh server component data
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to delete gear");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </>
      )}
    </Button>
  );
};

export default DeleteGearButton;
