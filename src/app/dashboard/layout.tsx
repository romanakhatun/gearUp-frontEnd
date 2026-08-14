import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // TODO: পরে authenticated user থেকে role নেবে
  const role = "CUSTOMER" as "CUSTOMER" | "PROVIDER" | "ADMIN";

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <DashboardSidebar role={role} />

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
