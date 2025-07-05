// File: components/SummaryCards.tsx

import { ITransaction } from "@/lib/types";

export default function SummaryCards({
  transactions,
  loading = false,
}: {
  transactions: ITransaction[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        <div className="bg-gray-100 h-24 rounded-xl" />
        <div className="bg-gray-100 h-24 rounded-xl" />
        <div className="bg-gray-100 h-24 rounded-xl" />
      </div>
    );
  }

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  const categoryBreakdown = Object.values(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = acc[tx.category] || { category: tx.category, amount: 0 };
      acc[tx.category].amount += tx.amount;
      return acc;
    }, {} as Record<string, { category: string; amount: number }>)
  );

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Spent */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-center">
        <p className="text-sm text-gray-500">Total Spent</p>
        <p className="text-2xl font-semibold">₹{total}</p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow md:col-span-1">
        <p className="text-sm text-gray-500 mb-2">Category Breakdown</p>
        <ul className="text-sm space-y-1">
          {categoryBreakdown.map((cat) => (
            <li key={cat.category} className="flex justify-between">
              <span>{cat.category}</span>
              <span className="font-medium">₹{cat.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow md:col-span-1">
        <p className="text-sm text-gray-500 mb-2">Recent Transactions</p>
        <ul className="text-sm space-y-1">
          {recent.map((tx) => (
            <li key={tx.id} className="flex justify-between">
              <span>{tx.title}</span>
              <span className="text-gray-600">
                ₹{tx.amount} <span className="text-xs text-gray-400">({tx.category})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
