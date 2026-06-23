import { formatCurrency } from "../utils/formatCurrency";

function BudgetProgressCard({ category }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{category.category_name}</span>

        <span className="text-sm text-slate-500">{category.percentage}%</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{
            width: `${Math.min(category.percentage, 100)}%`,
          }}
        />
      </div>

      <div className="text-xs text-slate-500 mt-1">
        {formatCurrency(category.spent_amount)}
        {" / "}
        {formatCurrency(category.budget_amount)}
      </div>
    </div>
  );
}

export default BudgetProgressCard;
