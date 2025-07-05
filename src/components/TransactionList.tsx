"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTransaction, updateTransaction } from "@/lib/actions";
import { ITransaction } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";

export default function TransactionForm({ initialData }: { initialData?: ITransaction }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState<ITransaction>({
    id: initialData?.id || uuidv4(),
    title: initialData?.title || "",
    amount: initialData?.amount || 0,
    category: initialData?.category || CATEGORIES[0],
    date: initialData?.date || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "amount" ? +value : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateTransaction(form.id, form);
    } else {
      await addTransaction(form);
    }
    router.push("/transactions");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEdit ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
}
