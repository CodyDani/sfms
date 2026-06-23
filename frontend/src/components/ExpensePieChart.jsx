import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function ExpensePieChart({ data }) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category_name"
            outerRadius={100}
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
