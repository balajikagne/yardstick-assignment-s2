// File: app/transactions/[id]/page.tsx

import { getTransactionById } from "@/lib/actions";
import TransactionForm from "@/components/TransactionForm";
import { notFound } from "next/navigation";

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const transaction = await getTransactionById(id);
  if (!transaction) return notFound();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
      <TransactionForm initialData={transaction} />
    </div>
  );
}
