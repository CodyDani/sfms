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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadOverview();
    loadMonthlyReport();
    loadCategoryReport();
    loadCategoryBreakdown();
  }, [month, year]);

  const loadCategoryReport = async () => {
    try {
      const response = await getCategoryReport(month, year);

      setCategoryReport(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadOverview = async () => {
    try {
      const response = await getFinancialOverview(month, year);

      setOverview(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMonthlyReport = async () => {
    try {
      const response = await getMonthlyReport(month, year);

      setMonthlyReport(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategoryBreakdown = async () => {
    try {
      const response = await getCategoryBreakdown(month, year);

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

      <div className="flex gap-4 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded-lg p-2"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-lg p-2"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
        </select>
      </div>

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
                    ₦{Number(item.amount_spent).toLocaleString()}
                  </td>

                  <td className="py-3">
                    ₦{Number(item.remaining_budget).toLocaleString()}
                  </td>

                  <td className="py-3">
                    {item.status === "Safe" ? (
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

                  {/* <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
      ${
        item.status === "Safe"
          ? "bg-green-100 text-green-700"
          : item.status === "Warning"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
      }`}
                    >
                      {item.status}
                    </span>
                  </td> */}
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
