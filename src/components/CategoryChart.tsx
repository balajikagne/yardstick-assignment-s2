"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ITransaction } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57", "#8dd1e1", "#d88884"];

export default function CategoryChart({ transactions }: { transactions: ITransaction[] }) {
  const data = CATEGORIES.map((cat) => ({
    name: cat,
    value: transactions.filter((t) => t.category === cat).reduce((sum, t) => sum + t.amount, 0),
  })).filter((d) => d.value > 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <h4 className="font-bold mb-4">Category Breakdown</h4>
      <PieChart width={400} height={300}>
        <Pie data={data} cx="50%" cy="50%" label outerRadius={80} dataKey="value">
          {data.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
