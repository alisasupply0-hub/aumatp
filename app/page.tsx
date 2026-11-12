'use client';

import React, { useState } from 'react';
import {
  Bell,
  ArrowUp,
  ArrowDown,
  Home,
  BarChart2,
  Plus,
  PieChart,
  User,
  X,
  Calendar,
  Image as ImageIcon,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Film,
  MoreHorizontal,
  Wifi,
  Battery,
  Signal,
  CheckCircle2,
  Trash2,
  ChevronDown,
  Target,
  Settings,
  LogOut,
  Shield,
  CreditCard,
} from 'lucide-react';

type Tab = 'home' | 'analytics' | 'add' | 'budgets' | 'profile';

interface Transaction {
  id: string;
  title: string;
  category: 'Food' | 'Transport' | 'Shopping' | 'Utilities' | 'Entertainment' | 'Others';
  amount: number;
  date: string;
  notes?: string;
}

interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  daysLeft: number;
}

interface SavingsGoal {
  id: string;
  title: string;
  current: number;
  target: number;
}

export default function ExpenseTrackerPrototype() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [analyticsPeriod, setAnalyticsPeriod] = useState<'Weekly' | 'Monthly'>('Monthly');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Financial State
  const [income, setIncome] = useState<number>(3500.0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Artisan Coffee & Brunch', category: 'Food', amount: 24.5, date: '2026-11-12', notes: 'Morning cafe' },
    { id: '2', title: 'Metro Express Pass', category: 'Transport', amount: 45.0, date: '2026-11-11', notes: 'Weekly pass' },
    { id: '3', title: 'Wireless Headphones', category: 'Shopping', amount: 189.0, date: '2026-11-10', notes: 'Electronics' },
    { id: '4', title: 'Cloud & Fiber Internet', category: 'Utilities', amount: 65.0, date: '2026-11-08', notes: 'Monthly bill' },
    { id: '5', title: 'Cinema IMAX Tickets', category: 'Entertainment', amount: 32.0, date: '2026-11-06', notes: 'Weekend movie' },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 'b1', category: 'Food & Dining', spent: 350, limit: 500, daysLeft: 12 },
    { id: 'b2', category: 'Entertainment', spent: 350, limit: 500, daysLeft: 12 },
    { id: 'b3', category: 'Utilities', spent: 350, limit: 500, daysLeft: 12 },
    { id: 'b4', category: 'Shopping', spent: 350, limit: 500, daysLeft: 12 },
  ]);

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    { id: 's1', title: 'Emergency Fund', current: 3000, target: 10000 },
    { id: 's2', title: 'Japan Trip', current: 2400, target: 4000 },
    { id: 's3', title: 'New MacBook', current: 400, target: 2000 },
  ]);

  // Add Expense Form State
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Transaction['category']>('Food');
  const [expenseDate, setExpenseDate] = useState<string>('2026-11-12');
  const [expenseNotes, setExpenseNotes] = useState<string>('');
  const [receiptAttached, setReceiptAttached] = useState<boolean>(false);

  // Add Budget Modal State
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [newBudgetName, setNewBudgetName] = useState<string>('');
  const [newBudgetLimit, setNewBudgetLimit] = useState<string>('500');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  // Derived Totals
  const baseExpenses = 2836.5;
  const totalExpenses = baseExpenses + transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = income - totalExpenses + 3383.5;

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

      const rounded = Math.round(newValue * 100) / 100;
      setCalcDisplay(String(rounded));
      setPrevValue(rounded);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const clearCalc = () => {
    setCalcDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleSaveTransaction = () => {
    let finalAmount = parseFloat(calcDisplay);
    if (operator && prevValue !== null && !waitingForOperand) {
      if (operator === '+') finalAmount = prevValue + finalAmount;
      if (operator === '-') finalAmount = prevValue - finalAmount;
      if (operator === '×') finalAmount = prevValue * finalAmount;
      if (operator === '÷') finalAmount = finalAmount !== 0 ? prevValue / finalAmount : 0;
    }

    if (isNaN(finalAmount) || finalAmount <= 0) {
      triggerToast('Enter an amount greater than $0.00');
      return;
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: expenseNotes.trim() || `${selectedCategory} Expense`,
      category: selectedCategory,
      amount: Math.round(finalAmount * 100) / 100,
      date: expenseDate,
      notes: expenseNotes,
    };

    setTransactions([newTx, ...transactions]);

    setBudgets((prev) =>
      prev.map((b) => {
        if (
          (selectedCategory === 'Food' && b.category.includes('Food')) ||
          b.category.toLowerCase() === selectedCategory.toLowerCase()
        ) {
          return { ...b, spent: Math.round((b.spent + newTx.amount) * 100) / 100 };
        }
        return b;
      })
    );

    clearCalc();
    setExpenseNotes('');
    setReceiptAttached(false);
    setActiveTab('home');
    triggerToast(`Saved -$${newTx.amount.toFixed(2)} to ${selectedCategory}`);
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const limitNum = parseFloat(newBudgetLimit);
    if (!newBudgetName.trim() || isNaN(limitNum) || limitNum <= 0) return;
    setBudgets([
      ...budgets,
      {
        id: Date.now().toString(),
        category: newBudgetName.trim(),
        spent: 0,
        limit: limitNum,
        daysLeft: 15,
      },
    ]);
    setNewBudgetName('');
    setNewBudgetLimit('500');
    setShowAddBudgetModal(false);
    triggerToast('New budget category added');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return <Utensils className="w-4 h-4 text-[#A799FF]" />;
      case 'Transport':
        return <Car className="w-4 h-4 text-[#A799FF]" />;
      case 'Shopping':
        return <ShoppingBag className="w-4 h-4 text-[#A799FF]" />;
      case 'Utilities':
        return <Zap className="w-4 h-4 text-[#A799FF]" />;
      case 'Entertainment':
        return <Film className="w-4 h-4 text-[#A799FF]" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-[#A799FF]" />;
    }
  };

  const weeklyBars = [
    { day: 'Sun', height: 38, amount: '$42' },
    { day: 'Mon', height: 82, amount: '$115' },
    { day: 'Tue', height: 52, amount: '$68' },
    { day: 'Wed', height: 36, amount: '$39' },
    { day: 'Thu', height: 92, amount: '$142' },
    { day: 'Fri', height: 68, amount: '$94' },
    { day: 'Sat', height: 26, amount: '$28' },
  ];

  const monthlyBars = [
    { day: 'Sun', height: 55, amount: '$210' },
    { day: 'Mon', height: 70, amount: '$340' },
    { day: 'Tue', height: 90, amount: '$480' },
    { day: 'Wed', height: 48, amount: '$195' },
    { day: 'Thu', height: 76, amount: '$390' },
    { day: 'Fri', height: 86, amount: '$445' },
    { day: 'Sat', height: 62, amount: '$270' },
  ];

  const activeBars = analyticsPeriod === 'Weekly' ? weeklyBars : monthlyBars;

  return (
    <div className="min-h-screen w-full bg-[#2E2744] flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#A799FF] selection:text-[#141122]">
      {/* Quick Screen Switcher */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 bg-[#141122]/80 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
        <span className="text-xs text-[#9C97B5] px-2 font-medium">Prototype Screens:</span>
        {(['home', 'analytics', 'add', 'budgets', 'profile'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#A799FF] text-[#141122] shadow-sm'
                : 'text-[#9C97B5] hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'add' ? '+ Add Expense' : tab}
          </button>
        ))}
      </div>

      {/* Simulated Mobile Device Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-[#141122] rounded-[48px] border-[10px] border-[#0B0914] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col text-white">
        {/* Top Dynamic Island & Status Bar */}
        <div className="relative pt-3 pb-2 px-7 flex items-center justify-between text-xs font-semibold text-white z-20 shrink-0 select-none">
          <span>9:41</span>
          <div className="w-[104px] h-[26px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a172e] border border-white/10" />
          </div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#A799FF] text-[#141122] px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4" />
            {toastMessage}
          </div>
        )}

        {/* ==================== SCREEN 1: HOME ==================== */}
        {activeTab === 'home' && (
          <div className="flex-1 flex flex-col px-5 pt-3 pb-24 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#3A3552] flex items-center justify-center border border-white/10">
                  <User className="w-5 h-5 text-[#9C97B5]" />
                </div>
                <div>
                  <p className="text-xs text-[#9C97B5] font-medium">Alex Morgan,</p>
                  <h1 className="text-[15px] font-bold text-white tracking-tight">Expense Tracker!</h1>
                </div>
              </div>
              <button
                onClick={() => triggerToast('No new notifications')}
                className="w-10 h-10 rounded-full bg-[#1F1B33] hover:bg-[#2A2444] flex items-center justify-center border border-white/5 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-white/80" />
                <span className="w-2 h-2 rounded-full bg-[#A799FF] absolute top-2.5 right-2.5" />
              </button>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-[#B4A7FF] to-[#9888FC] rounded-[26px] p-5 text-[#141122] shadow-[0_12px_30px_rgba(167,153,255,0.22)]">
              <p className="text-center text-xs font-semibold text-[#141122]/75 mb-1">Total Balance</p>
              <h2 className="text-center text-4xl font-extrabold tracking-tight mb-5">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/35 flex items-center justify-center">
                    <ArrowUp className="w-4 h-4 text-[#141122]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#141122]/70">Income</p>
                    <p className="text-sm font-bold text-[#141122]">
                      ${income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/35 flex items-center justify-center">
                    <ArrowDown className="w-4 h-4 text-[#141122]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#141122]/70">Expenses</p>
                    <p className="text-sm font-bold text-[#141122]">
                      ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 my-3.5">
              <span className="w-2 h-2 rounded-full bg-[#A799FF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            </div>

            {/* Recent Transactions */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-white">Recent Transactions</h3>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-xs text-[#A799FF] hover:underline font-medium"
              >
                See all
              </button>
            </div>

            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-[#1F1B33] hover:bg-[#26213E] transition-colors rounded-2xl p-3 flex items-center justify-between border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#2D2747] border border-[#A799FF]/25 flex items-center justify-center shrink-0">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{tx.title}</p>
                      <p className="text-xs text-[#9C97B5] mt-0.5">{tx.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white">-${tx.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN 2: ANALYTICS ==================== */}
        {activeTab === 'analytics' && (
          <div className="flex-1 flex flex-col px-5 pt-3 pb-24 overflow-y-auto">
            {/* Header & Toggle */}
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
              <div className="bg-[#1F1B33] p-1 rounded-full flex items-center border border-white/5">
                {(['Weekly', 'Monthly'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setAnalyticsPeriod(period)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      analyticsPeriod === period
                        ? 'bg-[#352E54] text-white shadow-sm'
                        : 'text-[#9C97B5] hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Expense Categories Donut Card */}
            <div className="bg-[#1F1B33] rounded-3xl p-4 mb-4 border border-white/5">
              <h2 className="text-sm font-semibold text-white mb-3">Expense Categories</h2>
              <div className="flex items-center justify-around py-1">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                    <circle cx="18" cy="18" r="13" fill="transparent" stroke="#312B4B" strokeWidth="6" />
                    <circle
                      cx="18"
                      cy="18"
                      r="13"
                      fill="transparent"
                      stroke="#A799FF"
                      strokeWidth="6"
                      strokeDasharray="44 82"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="13"
                      fill="transparent"
                      stroke="#7D6EE7"
                      strokeWidth="6"
                      strokeDasharray="18 82"
                      strokeDashoffset="-44"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="13"
                      fill="transparent"
                      stroke="#574B90"
                      strokeWidth="6"
                      strokeDasharray="12 82"
                      strokeDashoffset="-62"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[#9C97B5]">Total</span>
                    <span className="text-xs font-bold text-white">
                      {analyticsPeriod === 'Weekly' ? '$528' : '$2,330'}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#A799FF]" />
                    <span className="text-[#D2CEE6]">Food</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#7D6EE7]" />
                    <span className="text-[#D2CEE6]">Transport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#574B90]" />
                    <span className="text-[#D2CEE6]">Shopping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#312B4B]" />
                    <span className="text-[#D2CEE6]">Others</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Spending Bar Chart */}
            <div className="bg-[#1F1B33] rounded-3xl p-4 mb-4 border border-white/5">
              <div className="h-32 flex items-end justify-between gap-2.5 px-2 pt-4">
                {activeBars.map((bar) => (
                  <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full h-24 flex items-end justify-center relative">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 text-[10px] font-bold text-[#A799FF]">
                        {bar.amount}
                      </span>
                      <div
                        style={{ height: `${bar.height}%` }}
                        className="w-3.5 rounded-t-md bg-gradient-to-t from-[#9687FA] to-[#C8BEFF] transition-all duration-300 group-hover:brightness-110"
                      />
                    </div>
                    <span className="text-[11px] text-[#9C97B5] font-medium">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-[#1F1B33] rounded-3xl p-4 border border-white/5">
              <h2 className="text-sm font-semibold text-white mb-3.5">Category Breakdown</h2>
              <div className="space-y-3.5">
                {[
                  { name: 'Food', pct: 70 },
                  { name: 'Transport', pct: 20 },
                  { name: 'Shopping', pct: 16 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#D2CEE6] font-medium">{item.name}</span>
                      <span className="text-white font-semibold">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#2E2849] overflow-hidden">
                      <div
                        style={{ width: `${item.pct}%` }}
                        className="h-full rounded-full bg-[#A799FF]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN 3: ADD EXPENSE ==================== */}
        {activeTab === 'add' && (
          <div className="flex-1 flex flex-col px-5 pt-2 pb-24 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-8" />
              <h1 className="text-base font-bold text-white">Add Expense</h1>
              <button
                onClick={() => setActiveTab('home')}
                className="w-8 h-8 rounded-full bg-[#26213E] hover:bg-[#322B52] flex items-center justify-center text-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Amount Display */}
            <div className="bg-[#1F1B33] rounded-2xl py-3.5 px-4 mb-3 border border-white/5 relative flex items-center justify-center">
              <span className="text-3xl font-extrabold text-[#A799FF] tracking-tight">
                ${Number(calcDisplay || 0).toLocaleString('en-US', {
                  minimumFractionDigits: calcDisplay.includes('.') ? 2 : 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {calcDisplay !== '0' && (
                <button
                  onClick={clearCalc}
                  title="Clear"
                  className="absolute right-3 text-xs text-[#9C97B5] hover:text-white bg-white/5 px-2 py-1 rounded-lg"
                >
                  C
                </button>
              )}
            </div>

            {/* Calculator Keypad */}
            <div className="grid grid-cols-4 gap-2 mb-3.5">
              {[
                { label: '7', action: () => inputDigit('7'), type: 'num' },
                { label: '8', action: () => inputDigit('8'), type: 'num' },
                { label: '9', action: () => inputDigit('9'), type: 'num' },
                { label: '÷', action: () => performOperation('÷'), type: 'op' },
                { label: '4', action: () => inputDigit('4'), type: 'num' },
                { label: '5', action: () => inputDigit('5'), type: 'num' },
                { label: '6', action: () => inputDigit('6'), type: 'num' },
                { label: '×', action: () => performOperation('×'), type: 'op' },
                { label: '1', action: () => inputDigit('1'), type: 'num' },
                { label: '2', action: () => inputDigit('2'), type: 'num' },
                { label: '3', action: () => inputDigit('3'), type: 'num' },
                { label: '−', action: () => performOperation('-'), type: 'op' },
                { label: '00', action: () => { inputDigit('0'); inputDigit('0'); }, type: 'num' },
                { label: '0', action: () => inputDigit('0'), type: 'num' },
                { label: '.', action: inputDot, type: 'num' },
                { label: '+', action: () => performOperation('+'), type: 'op' },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.action}
                  className={`h-10 rounded-xl font-semibold text-base transition-all active:scale-95 ${
                    btn.type === 'op'
                      ? 'bg-[#352F52] text-[#C5BAFF] hover:bg-[#423B66]'
                      : 'bg-[#292442] text-white hover:bg-[#342E54]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Form Inputs */}
            <div className="space-y-2.5 mb-3.5">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Transaction['category'])}
                  className="w-full appearance-none bg-[#1F1B33] text-white text-xs font-medium px-3.5 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#A799FF]"
                >
                  <option value="Food">Food & Dining</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Others">Others</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#9C97B5] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full bg-[#1F1B33] text-white text-xs font-medium px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#A799FF] [color-scheme:dark]"
                />
              </div>

              <input
                type="text"
                placeholder="Notes (e.g., Lunch with team)"
                value={expenseNotes}
                onChange={(e) => setExpenseNotes(e.target.value)}
                className="w-full bg-[#1F1B33] text-white placeholder-[#9C97B5] text-xs font-medium px-3.5 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#A799FF]"
              />
            </div>

            {/* Upload Receipt */}
            <div className="mb-4">
              <p className="text-xs font-medium text-[#D2CEE6] mb-1.5">Upload Receipt</p>
              <button
                type="button"
                onClick={() => {
                  setReceiptAttached(!receiptAttached);
                  triggerToast(receiptAttached ? 'Receipt removed' : 'Receipt image attached');
                }}
                className={`w-full h-14 rounded-2xl border border-dashed flex items-center justify-center gap-2 transition-colors ${
                  receiptAttached
                    ? 'bg-[#A799FF]/15 border-[#A799FF] text-[#A799FF]'
                    : 'bg-[#1F1B33] border-white/15 text-[#9C97B5] hover:border-[#A799FF]/50'
                }`}
              >
                <ImageIcon className="w-5 h-5" />
                {receiptAttached && <span className="text-xs font-semibold">receipt_01.jpg attached</span>}
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveTransaction}
              className="w-full py-3.5 rounded-2xl bg-[#A799FF] hover:bg-[#B7ABFF] active:scale-[0.99] text-[#141122] font-bold text-sm shadow-[0_8px_25px_rgba(167,153,255,0.3)] transition-all"
            >
              Save Transaction
            </button>
          </div>
        )}

        {/* ==================== SCREEN 4: BUDGETS ==================== */}
        {activeTab === 'budgets' && (
          <div className="flex-1 flex flex-col px-5 pt-3 pb-24 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Budgets</h1>
                <p className="text-xs font-semibold text-[#D2CEE6] mt-2">Active Budgets</p>
              </div>
              <button
                onClick={() => setShowAddBudgetModal(true)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#A799FF] group-hover:bg-[#B8ACFF] text-[#141122] flex items-center justify-center shadow-md transition-colors">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-medium text-[#D2CEE6]">Add New</span>
              </button>
            </div>

            {/* Active Budget Cards */}
            <div className="space-y-3 mb-5">
              {budgets.map((b) => {
                const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
                return (
                  <div
                    key={b.id}
                    className="bg-[#1F1B33] rounded-2xl p-3.5 border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#2D2747] border border-[#A799FF]/25 flex items-center justify-center shrink-0">
                        <Target className="w-4 h-4 text-[#A799FF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white leading-tight">{b.category}</h3>
                          <span className="text-xs font-bold text-white">{pct}%</span>
                        </div>
                        <p className="text-[11px] text-[#9C97B5]">spent vs. limit</p>
                        <div className="w-full h-1.5 rounded-full bg-[#2E2849] mt-1.5 overflow-hidden">
                          <div
                            style={{ width: `${pct}%` }}
                            className={`h-full rounded-full transition-all duration-300 ${
                              pct >= 90 ? 'bg-rose-400' : 'bg-[#A799FF]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#9C97B5] pt-0.5">
                      <span>
                        ${b.spent} of ${b.limit} spent
                      </span>
                      <span>{b.daysLeft} days left</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Savings Goals */}
            <h2 className="text-sm font-bold text-white mb-3">Savings Goals</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {savingsGoals.map((goal) => {
                const pct = Math.round((goal.current / goal.target) * 100);
                const circumference = 2 * Math.PI * 18;
                const strokeDashoffset = circumference - (pct / 100) * circumference;

                return (
                  <div
                    key={goal.id}
                    onClick={() => {
                      setSavingsGoals((prev) =>
                        prev.map((g) =>
                          g.id === goal.id
                            ? { ...g, current: Math.min(g.target, g.current + 200) }
                            : g
                        )
                      );
                      triggerToast(`+$200 added to ${goal.title}`);
                    }}
                    className="bg-[#1F1B33] hover:bg-[#272240] cursor-pointer rounded-2xl p-3 flex flex-col items-center border border-white/5 transition-colors"
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center mb-1.5">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          fill="transparent"
                          stroke="#2E2849"
                          strokeWidth="4"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          fill="transparent"
                          stroke="#A799FF"
                          strokeWidth="4"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-white">{pct}%</span>
                    </div>
                    <p className="text-[10px] font-semibold text-center text-[#D2CEE6] line-clamp-1">
                      {goal.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Add Budget Modal */}
            {showAddBudgetModal && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-5">
                <form
                  onSubmit={handleAddBudget}
                  className="w-full bg-[#1F1B33] rounded-3xl p-5 border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white">New Monthly Budget</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddBudgetModal(false)}
                      className="text-[#9C97B5] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-[#9C97B5] block mb-1">Category Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Health & Fitness"
                        value={newBudgetName}
                        onChange={(e) => setNewBudgetName(e.target.value)}
                        className="w-full bg-[#141122] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#A799FF]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#9C97B5] block mb-1">Monthly Limit ($)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newBudgetLimit}
                        onChange={(e) => setNewBudgetLimit(e.target.value)}
                        className="w-full bg-[#141122] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#A799FF]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#A799FF] text-[#141122] font-bold text-xs"
                  >
                    Create Budget
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== SCREEN 5: PROFILE ==================== */}
        {activeTab === 'profile' && (
          <div className="flex-1 flex flex-col px-5 pt-3 pb-24 overflow-y-auto">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-5">Profile</h1>

            <div className="bg-[#1F1B33] rounded-3xl p-5 flex flex-col items-center text-center border border-white/5 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#A799FF]/20 border-2 border-[#A799FF] flex items-center justify-center mb-3">
                <User className="w-8 h-8 text-[#A799FF]" />
              </div>
              <h2 className="text-base font-bold text-white">Alex Morgan</h2>
              <p className="text-xs text-[#9C97B5]">alex.morgan@example.com</p>
              <span className="mt-2.5 px-3 py-1 rounded-full bg-[#A799FF]/15 text-[#A799FF] text-[11px] font-semibold">
                Pro Plan Active
              </span>
            </div>

            <div className="bg-[#1F1B33] rounded-3xl p-4 border border-white/5 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Monthly Income Setting</span>
                <span className="text-xs font-bold text-[#A799FF]">${income.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-[#A799FF]"
              />
            </div>

            <div className="space-y-2">
              {[
                { icon: CreditCard, label: 'Connected Accounts' },
                { icon: Shield, label: 'Security & Biometrics' },
                { icon: Settings, label: 'App Preferences' },
                { icon: Trash2, label: 'Reset Demo Data', action: () => triggerToast('Demo data synced') },
                { icon: LogOut, label: 'Sign Out' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action || (() => triggerToast(`${item.label} opened`))}
                  className="w-full bg-[#1F1B33] hover:bg-[#26213E] rounded-2xl p-3.5 flex items-center gap-3 border border-white/5 text-left transition-colors"
                >
                  <item.icon className="w-4 h-4 text-[#A799FF]" />
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== BOTTOM NAVIGATION BAR ==================== */}
        <div className="absolute bottom-0 inset-x-0 bg-[#A799FF] px-4 pt-2 pb-5 rounded-t-[26px] flex items-center justify-between text-[#141122] z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.35)]">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 w-14 transition-opacity ${
              activeTab === 'home' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px]">Home</span>
          </button>

          {/* Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center gap-0.5 w-14 transition-opacity ${
              activeTab === 'analytics' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <BarChart2 className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px]">Analytics</span>
          </button>

          {/* Center Floating Add Button */}
          <div className="flex flex-col items-center w-14 -mt-7">
            <button
              onClick={() => setActiveTab('add')}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#141122] transition-transform active:scale-95 ${
                activeTab === 'add'
                  ? 'bg-[#141122] text-[#A799FF]'
                  : 'bg-[#2C254A] text-white hover:bg-[#1E1935]'
              }`}
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </button>
            <span className="text-[10px] font-semibold mt-1 text-[#141122]">Add</span>
          </div>

          {/* Budgets */}
          <button
            onClick={() => setActiveTab('budgets')}
            className={`flex flex-col items-center gap-0.5 w-14 transition-opacity ${
              activeTab === 'budgets' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <PieChart className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px]">Budgets</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 w-14 transition-opacity ${
              activeTab === 'profile' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px]">Profile</span>
          </button>

          {/* iOS Home Indicator */}
          <div className="w-32 h-1 bg-[#141122]/80 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
