"use client";

import { useEffect, useState, useCallback } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import CategoryPieChart from "./CategoryPieChart";
import SummaryCards from "./SummaryCards";
import BudgetForm from "./BudgetForm";
import BudgetComparisonChart from "./BudgetComparisonChart";
import SpendingInsights from "./SpendingInsights";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type MonthlyExpense = {
  _id: number; // Month number (1-12)
  total: number;
};

type Budget = {
  category: string;
  amount: number;
};

type BudgetComparison = {
  category: string;
  budget: number;
  actual: number;
};

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function DashboardContent() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);
  const [budgetComparison, setBudgetComparison] = useState<BudgetComparison[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data: Transaction[] = await res.json();
    setTransactions(data);
  };

  const fetchMonthlyExpenses = async () => {
    const res = await fetch("/api/expenses/monthly");
    const data: MonthlyExpense[] = await res.json();
    const chartData = data.map((d) => ({
      month: months[d._id - 1],
      total: Math.abs(d.total),
    }));
    setMonthlyData(chartData);
  };

  const fetchBudgetsAndCompare = async () => {
    const [budgetRes, txnRes] = await Promise.all([
      fetch("/api/budgets", { cache: "no-store" }),
      fetch("/api/transactions", { cache: "no-store" }),
    ]);

    const budgets: Budget[] = await budgetRes.json();
    const txns: Transaction[] = await txnRes.json();

    const currentMonth = new Date().toISOString().slice(0, 7);

    const actualSpending: Record<string, number> = txns
      .filter((t) => t.date.startsWith(currentMonth))
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const comparisonData: BudgetComparison[] = budgets.map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actualSpending[b.category] || 0,
    }));

    setBudgetComparison(comparisonData);
  };

  const refreshData = useCallback(() => {
    fetchTransactions();
    fetchMonthlyExpenses();
    fetchBudgetsAndCompare();
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleNewTransaction = () => {
    refreshData();
  };

  const recentTransactions = transactions.slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>

      <AddTransactionForm onAdd={handleNewTransaction} />

      <TransactionList transactions={recentTransactions} />

      <MonthlyExpensesChart data={monthlyData} />

      <CategoryPieChart transactions={transactions} />

      <SummaryCards transactions={transactions} onRefresh={refreshData} />

      <BudgetForm onUpdate={refreshData} />

      <BudgetComparisonChart data={budgetComparison} />

      <SpendingInsights data={budgetComparison} />
    </main>
  );
}
