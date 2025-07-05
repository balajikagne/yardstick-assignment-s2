// File: /app/transactions/page.tsx

import Link from "next/link";
import { getTransactions, deleteTransaction } from "@/lib/actions";
import { ITransaction } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { format } from "date-fns";

export default async function TransactionsPage() {
  const transactions: ITransaction[] = await getTransactions();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <Link
        href="/transactions/new"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block mb-4"
      >
        + Add Transaction
      </Link>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-3">{tx.title}</td>
                <td className="p-3">₹{tx.amount}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3">{format(new Date(tx.date), "dd MMM yyyy")}</td>
                <td className="p-3 space-x-2">
                  <Link href={`/transactions/${tx.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  {/* You can implement delete functionality via a form or client-side logic */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
