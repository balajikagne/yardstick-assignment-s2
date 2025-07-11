// File: lib/actions.ts

import { connectToDB } from "./db";
import { Transaction } from "./models/Transaction";
import { ITransaction } from "./types";


/**
 * Fetch all transactions and convert MongoDB _id to id
 */
import { Types } from "mongoose";

type LeanTransaction = {
  _id: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: string;
};

/**
 * Fetch all transactions and convert MongoDB _id to id
 */
export const getTransactions = async (): Promise<ITransaction[]> => {
  await connectToDB();

  const transactions = await Transaction.find().lean<LeanTransaction[]>();

  return transactions.map((t) => ({
    id: t._id.toString(),
    title: t.title,
    amount: t.amount,
    category: t.category,
    date: t.date,
  }));
};

/**
 * Fetch a single transaction by ID
 */
export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
  await connectToDB();

  if (!Types.ObjectId.isValid(id)) return null;

  const t = await Transaction.findById(id).lean<LeanTransaction>();

  if (!t) return null;

  return {
    id: t._id.toString(),
    title: t.title,
    amount: t.amount,
    category: t.category,
    date: t.date,
  };
};



/**
 * Add a new transaction
 */
export const addTransaction = async (tx: ITransaction): Promise<void> => {
  await connectToDB();

  await Transaction.create({
    title: tx.title,
    amount: tx.amount,
    category: tx.category,
    date: tx.date,
  });
};

/**
 * Update an existing transaction
 */
export const updateTransaction = async (id: string, updated: Partial<ITransaction>): Promise<void> => {
  await connectToDB();

  if (!Types.ObjectId.isValid(id)) return;

  await Transaction.findByIdAndUpdate(id, updated);
};

/**
 * Delete a transaction
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  await connectToDB();

  if (!Types.ObjectId.isValid(id)) return;

  await Transaction.findByIdAndDelete(id);
};
