import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <p>Welcome to your financial dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        <SummaryCard title="Total Income" amount="₦250,000" />
        <SummaryCard title="Total Expenses" amount="₦150,000" />
        <SummaryCard title="Balance" amount="₦50,000" />
        <SummaryCard title="Saving Goals" amount="₦100,000" />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
