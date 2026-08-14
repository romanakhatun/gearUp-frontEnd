import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const users = [
  ["Romana", "romana@example.com", "CUSTOMER", "ACTIVE"],
  ["Sara", "sara@example.com", "PROVIDER", "ACTIVE"],
  ["Nila", "nila@example.com", "CUSTOMER", "SUSPENDED"],
];

const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage platform users and account status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Users</CardTitle>
            <Input className="sm:max-w-xs" placeholder="Search users..." />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {users.map(([name, email, role, status]) => (
              <div
                key={email}
                className="flex flex-col gap-4 border-b pb-5 last:border-0 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">{role}</Badge>

                  <Badge
                    variant={status === "ACTIVE" ? "default" : "destructive"}
                  >
                    {status}
                  </Badge>

                  <Button
                    size="sm"
                    variant={status === "ACTIVE" ? "destructive" : "outline"}
                  >
                    {status === "ACTIVE" ? "Suspend" : "Activate"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
