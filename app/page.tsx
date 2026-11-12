'use client';

import React, { useState } from 'react';

type TabType = 'home' | 'analytics' | 'add' | 'budgets' | 'profile';

interface Transaction {
  id: number;
  title: string;
  category: 'Food' | 'Transport' | 'Shopping' | 'Others';
  amount: number;
  date: string;
  notes?: string;
}

interface BudgetItem {
  id: number;
  title: string;
  spent: number;
  limit: number;
  daysLeft: number;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Lorem Ipsum', category: 'Food', amount: 0.0, date: '2026-11-12' },
  { id: 2, title: 'Lorem Ipsum', category: 'Others', amount: 0.0, date: '2026-11-11' },
  { id: 3, title: 'Lorem Ipsum', category: 'Transport', amount: 0.0, date: '2026-11-10' },
  { id: 4, title: 'Lorem Ipsum', category: 'Shopping', amount: 0.0, date: '2026-11-09' },
  { id: 5, title: 'Lorem Ipsum', category: 'Others', amount: 0.0, date: '2026-11-08' },
];

const INITIAL_BUDGETS: BudgetItem[] = [
  { id: 1, title: 'Food & Dining', spent: 350, limit: 500, daysLeft: 12 },
  { id: 2, title: 'Entertainment', spent: 350, limit: 500, daysLeft: 12 },
  { id: 3, title: 'Utilities', spent: 350, limit: 500, daysLeft: 12 },
  { id: 4, title: 'Entertainment', spent: 350, limit: 500, daysLeft: 12 },
];

export default function ExpenseTrackerPrototype() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewAllScreens, setViewAllScreens] = useState<boolean>(false);

  // App Data State
  const [balance, setBalance] = useState<number>(500.0);
  const [income] = useState<number>(3500.0);
  const [expenses, setExpenses] = useState<number>(3192.0);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<BudgetItem[]>(INITIAL_BUDGETS);

  // Analytics State
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly'>('Monthly');
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

  // Add Expense Calculator State
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [category, setCategory] = useState<'Food' | 'Transport' | 'Shopping' | 'Others'>('Food');
  const [date, setDate] = useState<string>('2026-11-12');
  const [notes, setNotes] = useState<string>('');
  const [receiptName, setReceiptName] = useState<string>('');

  // Add Budget Modal State
  const [showBudgetModal, setShowBudgetModal] = useState<boolean>(false);
  const [newBudgetTitle, setNewBudgetTitle] = useState<string>('');
  const [newBudgetLimit, setNewBudgetLimit] = useState<string>('500');

  // Calculator Handlers
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setCalcDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setCalcDisplay(calcDisplay === '0' ? digit : calcDisplay.length < 9 ? calcDisplay + digit : calcDisplay);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setCalcDisplay('0.');
      setWaitingForOperand(false);
    } else if (!calcDisplay.includes('.')) {
      setCalcDisplay(calcDisplay + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(calcDisplay);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;
      if (operator === '+') newValue = currentValue + inputValue;
      if (operator === '-') newValue = currentValue - inputValue;
      if (operator === '×') newValue = currentValue * inputValue;
      if (operator === '÷') newValue = inputValue !== 0 ? currentValue / inputValue : 0;

      setPrevValue(newValue);
      setCalcDisplay(String(Number(newValue.toFixed(2))));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleSaveTransaction = () => {
    let finalAmount = parseFloat(calcDisplay);
    if (prevValue !== null && operator) {
      if (operator === '+') finalAmount = prevValue + finalAmount;
      if (operator === '-') finalAmount = prevValue - finalAmount;
      if (operator === '×') finalAmount = prevValue * finalAmount;
      if (operator === '÷') finalAmount = finalAmount !== 0 ? prevValue / finalAmount : 0;
    }

    const amount = isNaN(finalAmount) ? 0 : Number(finalAmount.toFixed(2));
    const newTx: Transaction = {
      id: Date.now(),
      title: notes.trim() || `${category} Expense`,
      category,
      amount,
      date,
      notes,
    };

    setTransactions([newTx, ...transactions]);
    setBalance((prev) => Number((prev - amount).toFixed(2)));
    setExpenses((prev) => Number((prev + amount).toFixed(2)));

    // Reset Calculator
    setCalcDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setNotes('');
    setReceiptName('');
    setActiveTab('home');
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetTitle.trim()) return;
    const limitNum = parseFloat(newBudgetLimit) || 500;
    setBudgets([
      ...budgets,
      {
        id: Date.now(),
        title: newBudgetTitle.trim(),
        spent: 0,
        limit: limitNum,
        daysLeft: 30,
      },
    ]);
    setNewBudgetTitle('');
    setNewBudgetLimit('500');
    setShowBudgetModal(false);
  };

  // Category Icon Helper
  const renderCategoryIcon = (cat: string) => {
    if (cat === 'Transport') {
      return (
        <svg className="w-5 h-5 text-[#9B8CE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-5zm2.5 2.5h.01M16.5 13.5h.0
