import DashboardSidebar from "../_components/DashboardSidebar";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
      <DashboardSidebar role="CUSTOMER" />

      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
};

export default CustomerLayout;
