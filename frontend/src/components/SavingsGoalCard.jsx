import { formatCurrency } from "../utils/formatCurrency";

function SavingsGoalCard({ goal }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{goal.goal_name}</span>

        <span>{goal.progress_percentage}%</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{
            width: `${goal.progress_percentage}%`,
          }}
        />
      </div>

      <div className="text-xs text-slate-500 mt-1">
        {formatCurrency(goal.current_amount)}

        {" / "}

        {formatCurrency(goal.target_amount)}
      </div>
    </div>
  );
}

export default SavingsGoalCard;
