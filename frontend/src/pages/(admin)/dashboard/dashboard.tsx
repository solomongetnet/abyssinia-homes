import DashboardWrapper from "./_components/dashboard-wrapper";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen space-y-10">
      <header className="" data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      </header>

      <DashboardWrapper />
    </div>
  );
};

export default AdminDashboardPage;