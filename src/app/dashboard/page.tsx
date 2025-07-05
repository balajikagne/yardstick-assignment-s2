// File: app/dashboard/page.tsx (or wherever you use it)

import { getTransactions } from "@/lib/actions";
import SummaryCards from "@/components/SummaryCards";
import CategoryChart from "@/components/CategoryChart";

export default async function DashboardPage() {
  const transactions = await getTransactions();

  const isLoading = !transactions || transactions.length === 0;

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      {/* Summary Cards */}
      <SummaryCards transactions={transactions} loading={isLoading} />

      {/* Category Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Category-wise Chart</h3>
        <CategoryChart transactions={transactions} />
      </div>
    </div>
  );
}
