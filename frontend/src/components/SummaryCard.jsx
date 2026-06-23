function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div>{icon}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
