import { getAdminUsers } from "../_actions/getAdminUsers";
import UserTable from "../_components/UserTable";

const AdminUsersPage = async () => {
  const result = await getAdminUsers();
  console.log(result);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>

        <p className="text-sm text-muted-foreground">
          Manage GearUp users and account status.
        </p>
      </div>

      <UserTable users={result?.data ?? []} />
    </div>
  );
};

export default AdminUsersPage;
