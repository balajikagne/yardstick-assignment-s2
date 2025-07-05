// File: components/PieChartClient.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { category: string; amount: number }[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#d0ed57", "#a4de6c"];

export default function PieChartClient({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
