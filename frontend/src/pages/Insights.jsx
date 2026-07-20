import { useState, useEffect } from "react";
import {
  getBudgetAnalysis,
  getSmartInsights,
  getFinancialOverview,
} from "../api/insights";
import { MonitorCheck } from "lucide-react";

function Insights() {
  const [budgetAnalysis, setBudgetAnalysis] = useState([]);
  const [smartInsights, setSmartInsights] = useState([]);
  const [overview, setOverview] = useState({});
  const [highestCategory, setHighestCategory] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadBudgetAnalysis();
    loadSmartInsights();
    loadOverview();
  }, [month, year]);

  const loadBudgetAnalysis = async () => {
    try {
      const response = await getBudgetAnalysis(month, year);

      setBudgetAnalysis(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSmartInsights = async () => {
    try {
      const response = await getSmartInsights();

      setSmartInsights(response.insights || []);

      setHighestCategory(response.highest_category);
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

  const safeCategories = budgetAnalysis.filter(
    (item) => item.status === "Safe",
  ).length;

  const warningCategories = budgetAnalysis.filter(
    (item) => item.status === "Warning",
  ).length;

  const exceededCategories = budgetAnalysis.filter(
    (item) => item.status === "Exceeded",
  ).length;

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-3">Highest Spending Category</h2>

        {highestCategory ? (
          <>
            <p className="text-2xl font-bold">{highestCategory.name}</p>

            <p className="text-slate-500 mt-2">
              ₦{highestCategory.amount.toLocaleString()}
            </p>
          </>
        ) : (
          <p>No spending data available</p>
        )}
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-2">Spending Behaviour</h2>
        <p className="text-slate-500">Categories Analysed</p>
        <p className="text-3xl font-bold">{budgetAnalysis.length}</p>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Budget Health</h2>

        {/* <div className="space-y-2">
          <p>
            Safe:
            <strong> {safeCategories}</strong>
          </p>

          <p>
            Warning:
            <strong> {warningCategories}</strong>
          </p>

          <p>
            Exceeded:
            <strong> {exceededCategories}</strong>
          </p>
        </div> */}

        <div className="space-y-4">
          {budgetAnalysis.map((item) => (
            <div key={item.category_name}>
              <div className="flex justify-between mb-1">
                <span>{item.category_name}</span>

                <span>{item.usage_percentage}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    item.status === "Exceeded"
                      ? "bg-red-500"
                      : item.status === "Warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(item.usage_percentage, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Savings Analysis</h2>

        <p className="text-3xl mb-2 font-bold">{overview.savings_rate || 0}%</p>

        {/* <p className="text-slate-500 mt-2">
          {overview.savings_rate >= 50
            ? "Excellent Saving Habit"
            : overview.savings_rate >= 20
              ? "Moderate Saving Habit"
              : "Needs Improvement"}
        </p> */}

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            overview.savings_rate >= 50
              ? "bg-green-100 text-green-700"
              : overview.savings_rate >= 20
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {overview.savings_rate >= 50
            ? "Excellent"
            : overview.savings_rate >= 20
              ? "Moderate"
              : "Poor"}
        </span>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Personalized Recommendations</h2>

        <div className="space-y-3">
          {smartInsights.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 border-l-4 border-blue-500 pl-4 py-2"
            >
              <span>💡</span>

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Insights;
