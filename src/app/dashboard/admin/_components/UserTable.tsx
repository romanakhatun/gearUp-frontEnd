"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateUserStatus } from "../_actions/updateUserStatus";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserTable = ({ users }: { users: any[] }) => {
  const router = useRouter();

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateUserStatus(id, status);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update status");
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-5 gap-4 border-b p-4 text-sm font-medium">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-5 items-center gap-4 border-b p-4 text-sm last:border-0"
        >
          <span>{user.name}</span>

          <span className="text-muted-foreground">{user.email}</span>

          <Badge variant="secondary">{user.role}</Badge>

          <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
            {user.status}
          </Badge>

          <Button
            size="sm"
            variant={user.status === "ACTIVE" ? "destructive" : "default"}
            onClick={() =>
              handleStatusChange(
                user.id,
                user.status === "ACTIVE" ? "SUSPEND" : "ACTIVE",
              )
            }
          >
            {user.status === "ACTIVE" ? "Suspend" : "Activate"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
