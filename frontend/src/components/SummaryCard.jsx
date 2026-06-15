function SummaryCard({ title, amount, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h3 className="text-2xl font-bold mt-2">{amount}</h3>
        </div>

        <div>{icon}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
