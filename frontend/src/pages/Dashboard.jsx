import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardSummary } from "../api/dashboard";
import { Wallet, Receipt, Landmark, PiggyBank } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import BudgetProgressCard from "../components/BudgetProgressCard";
import { getBudgetProgress } from "../api/budget";
import { getRecentTransactions } from "../api/transactions";
import TransactionItem from "../components/TransactionItem";
import { getSavingsGoals } from "../api/savings";
import SavingsGoalCard from "../components/SavingsGoalCard";
import ExpensePieChart from "../components/ExpensePieChart";
import { getCategoryBreakdown, getMonthlyOverview } from "../api/charts";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { getSmartInsights } from "../api/insights";
import { getCurrentUser } from "../api/dashboard";

function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    active_goals: 0,
  });
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadSummary();
    loadBudgets();
    loadTransactions();
    loadGoals();
    loadCharts();
    loadInsights();
    loadUser();
  }, []);

  const loadUser = async () => {
    const response = await getCurrentUser();

    if (response.success) {
      setUser(response.user);
    }
  };

  const userName = user?.full_name || "User";

  const loadSummary = async () => {
    try {
      setLoading(true);
      const response = await getDashboardSummary();
      setSummary(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBudgets = async () => {
    const response = await getBudgetProgress();
    setBudgets(response.data);
  };

  const loadTransactions = async () => {
    try {
      const response = await getRecentTransactions();

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadGoals = async () => {
    try {
      const response = await getSavingsGoals();

      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCharts = async () => {
    try {
      const categoryResponse = await getCategoryBreakdown();

      const formattedData = categoryResponse.data.map((item) => ({
        ...item,
        total: Number(item.total),
      }));

      setCategoryData(formattedData);

      const monthlyResponse = await getMonthlyOverview();

      setMonthlyData(monthlyResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const loadInsights = async () => {
    try {
      const response = await getSmartInsights();
      setInsights(response.insights);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-8 border">
          <h2 className="text-lg font-semibold">Loading Dashboard...</h2>
        </div>
      </div>
      //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      //   {[1,2,3,4].map((item) => (

      //     <div
      //       key={item}
      //       className="
      //       h-32
      //       bg-slate-200
      //       rounded-xl
      //       animate-pulse
      //       "
      //     />

      //   ))}

      // </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* <p>Welcome to your financial dashboard.</p> */}

      <div className="bg-blue-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold">Welcome Back, {userName} 👋</h1>
        <p className="opacity-90 mt-2">
          Here's a summary of your financial activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        <SummaryCard
          title="Total Income"
          value={formatCurrency(summary.total_income)}
          icon={<Wallet />}
        />

        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(summary.total_expenses)}
          icon={<Receipt />}
        />

        <SummaryCard
          title="Current Balance"
          value={formatCurrency(summary.balance)}
          icon={<Landmark />}
        />

        <SummaryCard
          title="Savings Goals"
          value={summary.active_goals}
          icon={<PiggyBank />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Budget Progress */}

        <div className="bg-white rounded-xl border p-6 mt-8">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Budget Progress</h3>
          </div>

          {budgets.slice(0, 5).map((budget) => (
            <BudgetProgressCard key={budget.id} category={budget} />
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
          </div>

          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id + transaction.type}
                transaction={transaction}
              />
            ))
          ) : (
            <p className="text-slate-500">No transactions found.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Savings Goals</h3>
        </div>

        {goals.length > 0 ? (
          goals
            .slice(0, 3)
            .map((goal) => <SavingsGoalCard key={goal.id} goal={goal} />)
        ) : (
          <p className="text-slate-500">No savings goals yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Expense Breakdown</h3>

          <ExpensePieChart data={categoryData} />
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Income vs Expenses</h3>

          {monthlyData && (
            <IncomeExpenseChart
              income={monthlyData.income}
              expenses={monthlyData.expenses}
            />
          )}
        </div>
      </div>

      {/* <div className="bg-white rounded-xl border p-6 mt-8">
        <h3 className="font-semibold mb-4">Smart Financial Insights</h3>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
            >
              <span className="text-blue-600">💡</span>

              <p className="text-sm text-slate-700">{insight}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="bg-white rounded-xl border p-6 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💡</span>

          <h2 className="text-lg font-semibold">Smart Financial Insights</h2>
        </div>

        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="
            p-4
            bg-blue-50
            border
            border-blue-100
            rounded-lg
          "
              >
                <p className="text-slate-700">{insight}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
      p-4
      bg-slate-50
      rounded-lg
      text-slate-500
    "
          >
            No insights available yet.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
