import { formatCurrency } from "../utils/formatCurrency";

function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "Income";

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div>
        <p className="font-medium">{transaction.description}</p>

        <p className="text-xs text-slate-500">
          {new Date(transaction.created_at).toLocaleDateString()}
        </p>
      </div>

      <div
        className={`font-semibold ${
          isIncome ? "text-green-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
}

export default TransactionItem;
