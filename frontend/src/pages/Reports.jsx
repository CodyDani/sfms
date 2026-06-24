import { useEffect, useState } from "react";
import ExpensePieChart from "../components/ExpensePieChart";
import {
  getCategoryReport,
  getFinancialOverview,
  getMonthlyReport,
  getCategoryBreakdown,
} from "../api/reports";

function Reports() {
  const [categoryReport, setCategoryReport] = useState([]);
  const [overview, setOverview] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);

  useEffect(() => {
    loadOverview();
    loadCategoryReport();
    loadMonthlyReport();
    loadCategoryBreakdown();
  }, []);

  const loadCategoryReport = async () => {
    try {
      const response = await getCategoryReport();

      setCategoryReport(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadOverview = async () => {
    try {
      const response = await getFinancialOverview();

      setOverview(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMonthlyReport = async () => {
    try {
      const response = await getMonthlyReport();

      setMonthlyReport(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategoryBreakdown = async () => {
    try {
      const response = await getCategoryBreakdown();

      const formattedData = response.data.map((item) => ({
        ...item,
        total: Number(item.total),
      }));

      setCategoryBreakdown(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => {
          window.open(
            "http://localhost/sfms/backend/reports/export_pdf.php",
            "_blank",
          );
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-slate-500">Total Income</h3>

          <p className="text-2xl font-bold mt-2">
            ₦{Number(overview.total_income || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-slate-500">Total Expenses</h3>

          <p className="text-2xl font-bold mt-2">
            ₦{Number(overview.total_expenses || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-slate-500">Balance</h3>

          <p className="text-2xl font-bold mt-2">
            ₦{Number(overview.balance || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-slate-500">Savings Rate</h3>

          <p className="text-2xl font-bold mt-2">
            {Number(overview.savings_rate || 0)}%
          </p>
        </div>
      </div>

      {/* Monthly Report */}

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Monthly Financial Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-slate-500">Income</p>

            <p className="text-xl font-bold">
              ₦{Number(monthlyReport.income || 0).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Expenses</p>

            <p className="text-xl font-bold">
              ₦{Number(monthlyReport.expenses || 0).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Balance</p>

            <p className="text-xl font-bold">
              ₦{Number(monthlyReport.balance || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Spending Breakdown */}

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Spending Breakdown</h2>

        <ExpensePieChart data={categoryBreakdown} />
      </div>

      {/* Category Budget Analysis */}

      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Category Budget Analysis</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Category</th>

                <th className="text-left py-3">Budget</th>

                <th className="text-left py-3">Spent</th>

                <th className="text-left py-3">Remaining</th>

                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {categoryReport.map((item) => (
                <tr key={item.category_name} className="border-b">
                  <td className="py-3">{item.category_name}</td>

                  <td className="py-3">
                    ₦{Number(item.budget_amount).toLocaleString()}
                  </td>

                  <td className="py-3">
                    ₦{Number(item.spent).toLocaleString()}
                  </td>

                  <td className="py-3">
                    ₦{Number(item.remaining).toLocaleString()}
                  </td>

                  <td className="py-3">
                    {Number(item.remaining) >= 0 ? (
                      <span
                        className="
                  px-3 py-1
                  bg-green-100
                  text-green-700
                  rounded-full
                  text-sm
                "
                      >
                        Within Budget
                      </span>
                    ) : (
                      <span
                        className="
                  px-3 py-1
                  bg-red-100
                  text-red-700
                  rounded-full
                  text-sm
                "
                      >
                        Exceeded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
