'use client';

import React, { useState } from 'react';

type TabType = 'home' | 'analytics' | 'add' | 'budgets' | 'profile';
type CategoryType = 'Food' | 'Transport' | 'Shopping' | 'Others';

interface Transaction {
  id: number;
  title: string;
  category: CategoryType;
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

function CategoryIcon({ cat }: { cat: string }) {
  if (cat === 'Transport') {
    return (
      <svg className="w-5 h-5 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-5zm2.5 2.5h.01M16.5 13.5h.01" />
      </svg>
    );
  }
  return (
    <div className="w-6 h-6 border border-[#DC2626] rounded flex items-center justify-center relative">
      <svg className="w-4 h-4 text-[#F87171]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[#FCA5A5] text-[12px] font-semibold select-none">
      <span>9:41</span>
      <div className="w-24 h-5 bg-black rounded-full mx-auto" />
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2px] h-1 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-1.5 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-2 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-2.5 bg-[#F87171] rounded-sm" />
        </div>
        <svg className="w-3.5 h-3.5 text-[#F87171]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z" />
        </svg>
        <div className="w-5 h-2.5 border border-[#F87171]/80 rounded-[3px] p-[1px] flex items-center">
          <div className="w-full h-full bg-[#F87171] rounded-[1px]" />
        </div>
      </div>
    </div>
  );
}

function BottomNav({ currentTab, onSelect }: { currentTab: TabType; onSelect: (t: TabType) => void }) {
  return (
    <div className="bg-[#F87171] px-4 py-2.5 rounded-t-2xl flex items-center justify-between text-[#260D10] mt-auto">
      <button
        type="button"
        onClick={() => onSelect('home')}
        className={`flex flex-col items-center gap-0.5 transition-opacity ${currentTab === 'home' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-100'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill={currentTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
        </svg>
        <span className="text-[10px]">Home</span>
      </button>

      <button
        type="button"
        onClick={() => onSelect('analytics')}
        className={`flex flex-col items-center gap-0.5 transition-opacity ${currentTab === 'analytics' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-100'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18v-6M10 18V8M14 18v-4M18 18V6" />
        </svg>
        <span className="text-[10px]">Analytics</span>
      </button>

      <button type="button" onClick={() => onSelect('add')} className="flex flex-col items-center -mt-6 group">
        <div className="w-11 h-11 rounded-full bg-[#4F1D22] text-white flex items-center justify-center shadow-lg border-2 border-[#1F0E10] group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <span className="text-[10px] mt-0.5 font-medium">Add</span>
      </button>

      <button
        type="button"
        onClick={() => onSelect('budgets')}
        className={`flex flex-col items-center gap-0.5 transition-opacity ${currentTab === 'budgets' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-100'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <span className="text-[10px]">Budgets</span>
      </button>

      <button
        type="button"
        onClick={() => onSelect('profile')}
        className={`flex flex-col items-center gap-0.5 transition-opacity ${currentTab === 'profile' ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-100'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px]">Profile</span>
      </button>
    </div>
  );
}

export default function ExpenseTrackerPrototype() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewAllScreens, setViewAllScreens] = useState<boolean>(false);

  const [balance, setBalance] = useState<number>(500.0);
  const [income] = useState<number>(3500.0);
  const [expenses, setExpenses] = useState<number>(3192.0);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<BudgetItem[]>(INITIAL_BUDGETS);

  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly'>('Monthly');
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType>('Food');
  const [date, setDate] = useState<string>('2026-11-12');
  const [notes, setNotes] = useState<string>('');
  const [receiptName, setReceiptName] = useState<string>('');

  const [showBudgetModal, setShowBudgetModal] = useState<boolean>(false);
  const [newBudgetTitle, setNewBudgetTitle] = useState<string>('');
  const [newBudgetLimit, setNewBudgetLimit] = useState<string>('500');

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
      { id: Date.now(), title: newBudgetTitle.trim(), spent: 0, limit: limitNum, daysLeft: 30 },
    ]);
    setNewBudgetTitle('');
    setNewBudgetLimit('500');
    setShowBudgetModal(false);
  };

  const renderHomeScreen = (onNavigate: (t: TabType) => void) => (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-2 pb-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4A1C21] flex items-center justify-center text-[#FCA5A5]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#FECACA]">Lorem Ipsum,</p>
              <p className="text-sm font-semibold text-white">Expense Tracker!</p>
            </div>
          </div>
          <button type="button" className="p-2 text-white/80 hover:text-white relative">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] absolute top-2 right-2" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#FCA5A5] to-[#EF4444] rounded-2xl p-5 text-[#260D10] shadow-lg">
          <p className="text-center text-xs font-medium opacity-80">Total Balance</p>
          <h2 className="text-center text-3xl font-extrabold tracking-tight mt-1 mb-4">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#260D10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium opacity-75">Income</p>
                <p className="text-xs font-bold">${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#260D10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium opacity-75">Expenses</p>
                <p className="text-xs font-bold">${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 my-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-2.5">Recent Transactions</h3>
          <div className="space-y-2.5">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="bg-[#241214] border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center justify-between hover:border-[#F87171]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#381C20] flex items-center justify-center">
                    <CategoryIcon cat={tx.category} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{tx.title}</p>
                    <p className="text-[11px] text-[#B8848A]">{tx.category}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#FECACA]">-${tx.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav currentTab="home" onSelect={onNavigate} />
    </div>
  );

  const renderAnalyticsScreen = (onNavigate: (t: TabType) => void) => {
    const barValues = timeframe === 'Monthly' ? [45, 82, 58, 42, 86, 74, 30] : [60, 40, 75, 50, 90, 65, 45];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const breakdown = timeframe === 'Monthly'
      ? [{ name: 'Food', pct: 70 }, { name: 'Transport', pct: 20 }, { name: 'Shopping', pct: 16 }]
      : [{ name: 'Food', pct: 55 }, { name: 'Transport', pct: 30 }, { name: 'Shopping', pct: 15 }];

    return (
      <div className="flex flex-col h-full">
        <div className="px-5 pt-2 pb-4 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Analytics</h2>
            <div className="bg-[#2E1619] p-0.5 rounded-lg flex text-[11px]">
              {(['Weekly', 'Monthly'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTimeframe(mode)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${timeframe === mode ? 'bg-[#63262C] text-white' : 'text-[#B8848A]'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#241214] border border-white/5 rounded-2xl p-4 mb-3.5">
            <p className="text-xs font-semibold text-[#FEE2E2] mb-3">Expense Categories</p>
            <div className="flex items-center justify-between px-2">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#471C21" strokeWidth="5.5" />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#F87171" strokeWidth="5.5" strokeDasharray="45 100" className="cursor-pointer hover:opacity-80" onClick={() => setSelectedSlice('Food (45%)')} />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#DC2626" strokeWidth="5.5" strokeDasharray="22 100" strokeDashoffset="-45" className="cursor-pointer hover:opacity-80" onClick={() => setSelectedSlice('Transport (22%)')} />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#991B1B" strokeWidth="5.5" strokeDasharray="18 100" strokeDashoffset="-67" className="cursor-pointer hover:opacity-80" onClick={() => setSelectedSlice('Shopping (18%)')} />
                </svg>
                {selectedSlice && (
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="text-[9px] font-semibold text-white bg-[#170A0C]/85 px-1.5 py-0.5 rounded">{selectedSlice}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-[11px] text-[#FECACA]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#F87171]" /><span>Food</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" /><span>Transport</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#991B1B]" /><span>Shopping</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#471C21]" /><span>Others</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#241214] border border-white/5 rounded-2xl p-4 mb-3.5">
            <div className="h-28 flex items-end justify-between gap-2.5 px-1 pt-3">
              {barValues.map((val, idx) => (
                <div key={days[idx]} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center h-20">
                    <div style={{ height: `${val}%` }} className="w-3.5 rounded-t-sm bg-[#F87171] hover:bg-[#FCA5A5] transition-all duration-300" />
                  </div>
                  <span className="text-[10px] text-[#C78D93]">{days[idx]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#241214] border border-white/5 rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#FEE2E2] mb-3">Category Breakdown</p>
            <div className="space-y-3">
              {breakdown.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#FECACA]">{item.name}</span>
                    <span className="text-[#C78D93]">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#421A1F] rounded-full overflow-hidden">
                    <div style={{ width: `${item.pct}%` }} className="h-full bg-[#EF4444] rounded-full transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav currentTab="analytics" onSelect={onNavigate} />
      </div>
    );
  };

  const renderAddExpenseScreen = (onNavigate: (t: TabType) => void) => {
    const keypadRows = [
      ['7', '8', '9', '÷'],
      ['4', '5', '6', '×'],
      ['1', '2', '3', '-'],
      ['C', '0', '.', '+'],
    ];

    return (
      <div className="flex flex-col h-full">
        <div className="px-5 pt-2 pb-4 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between mb-3">
            <div className="w-7" />
            <h2 className="text-sm font-semibold text-white">Add Expense</h2>
            <button type="button" onClick={() => onNavigate('home')} className="w-7 h-7 rounded-full bg-[#381C20] text-white/80 hover:text-white flex items-center justify-center text-xs">✕</button>
          </div>

          <div className="bg-[#33181C] rounded-xl py-3.5 px-4 text-center mb-3 border border-white/5">
            <span className="text-2xl font-bold text-[#FCA5A5] tracking-wide">${Number(calcDisplay || 0).toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {keypadRows.flat().map((key, idx) => {
              const isOperator = ['÷', '×', '-', '+'].includes(key);
              const isClear = key === 'C';
              return (
                <button
                  key={`${key}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (isClear) { setCalcDisplay('0'); setPrevValue(null); setOperator(null); }
                    else if (key === '.') { inputDot(); }
                    else if (isOperator) { performOperation(key); }
                    else { inputDigit(key); }
                  }}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isOperator ? 'bg-[#63262C] text-[#FECACA] hover:bg-[#7A2F36]'
                      : isClear ? 'bg-[#451B20] text-[#FCA5A5] hover:bg-[#572228]'
                      : 'bg-[#522026] text-white hover:bg-[#66282F]'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          <div className="space-y-2.5">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-[#2B1417] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#FECACA] appearance-none focus:outline-none focus:border-[#F87171]"
              >
                <option value="Food">Category: Food</option>
                <option value="Transport">Category: Transport</option>
                <option value="Shopping">Category: Shopping</option>
                <option value="Others">Category: Others</option>
              </select>
              <span className="absolute right-3 top-2.5 text-[#B8848A] text-xs pointer-events-none">⌄</span>
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#2B1417] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#FECACA] focus:outline-none focus:border-[#F87171]"
            />

            <textarea
              rows={2}
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#2B1417] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-[#9C6C72] focus:outline-none focus:border-[#F87171] resize-none"
            />

            <div>
              <p className="text-[11px] text-[#FECACA] mb-1.5">Upload Receipt</p>
              <label className="w-full h-14 bg-[#2B1417] border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#F87171]/60 transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setReceiptName(e.target.files?.[0]?.name || '')} />
                <svg className="w-5 h-5 text-[#F87171]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                {receiptName && <span className="text-[10px] text-[#FCA5A5] mt-0.5 truncate max-w-[200px]">{receiptName}</span>}
              </label>
            </div>

            <button
              type="button"
              onClick={handleSaveTransaction}
              className="w-full bg-[#F87171] hover:bg-[#FCA5A5] text-[#260D10] font-bold text-xs py-3 rounded-xl shadow-md transition-colors mt-1"
            >
              Save Transaction
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBudgetsScreen = (onNavigate: (t: TabType) => void) => (
    <div className="flex flex-col h-full relative">
      <div className="px-5 pt-2 pb-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Budgets</h2>
            <p className="text-xs text-[#FECACA] mt-0.5">Active Budgets</p>
          </div>
          <button type="button" onClick={() => setShowBudgetModal(true)} className="flex flex-col items-center group">
            <div className="w-8 h-8 rounded-full bg-[#F87171] text-[#260D10] flex items-center justify-center font-bold shadow group-hover:scale-105 transition-transform">+</div>
            <span className="text-[9px] text-[#FECACA] mt-0.5">Add New</span>
          </button>
        </div>

        <div className="space-y-2.5 mb-4">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            return (
              <div key={b.id} className="bg-[#241214] border border-white/5 rounded-xl p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#381C20] flex items-center justify-center shrink-0">
                    <CategoryIcon cat="Food" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold text-white">{b.title}</p>
                      <span className="text-[11px] font-semibold text-[#FECACA]">{pct}%</span>
                    </div>
                    <p className="text-[10px] text-[#B8848A]">spent vs. limit</p>
                    <div className="w-full h-1.5 bg-[#421A1F] rounded-full mt-1.5 overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-[#EF4444] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-[#C78D93] pt-0.5">
                  <span>${b.spent} of ${b.limit} spent</span>
                  <span>{b.daysLeft} days left</span>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white mb-2">Savings Goals</h3>
          <div className="grid grid-cols-3 gap-2">
            {[{ pct: 30, label: 'Emergency' }, { pct: 65, label: 'Travel' }, { pct: 20, label: 'Gadget' }].map((goal, idx) => (
              <div key={idx} className="bg-[#241214] border border-white/5 rounded-xl p-2.5 flex flex-col items-center">
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-11 h-11 -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#471C21" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F87171" strokeWidth="3.5" strokeDasharray={`${goal.pct} 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-white">{goal.pct}%</span>
                </div>
                <span className="text-[10px] text-[#FECACA] mt-1">{goal.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBudgetModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-5 z-50">
          <form onSubmit={handleAddBudget} className="w-full bg-[#2B1417] border border-[#F87171]/30 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">New Budget</h3>
              <button type="button" onClick={() => setShowBudgetModal(false)} className="text-xs text-[#FECACA] hover:text-white">✕</button>
            </div>
            <div>
              <label className="block text-[11px] text-[#FECACA] mb-1">Category Name</label>
              <input type="text" placeholder="e.g., Groceries" value={newBudgetTitle} onChange={(e) => setNewBudgetTitle(e.target.value)} className="w-full bg-[#1F0E10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F87171]" required />
            </div>
            <div>
              <label className="block text-[11px] text-[#FECACA] mb-1">Monthly Limit ($)</label>
              <input type="number" value={newBudgetLimit} onChange={(e) => setNewBudgetLimit(e.target.value)} className="w-full bg-[#1F0E10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F87171]" required />
            </div>
            <button type="submit" className="w-full bg-[#F87171] hover:bg-[#FCA5A5] text-[#260D10] font-bold text-xs py-2.5 rounded-xl transition-colors">Create Budget</button>
          </form>
        </div>
      )}

      <BottomNav currentTab="budgets" onSelect={onNavigate} />
    </div>
  );

  const renderProfileScreen = (onNavigate: (t: TabType) => void) => (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-2 pb-4 flex-1 overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-bold text-white mb-4">Profile</h2>
        <div className="flex flex-col items-center bg-[#241214] border border-white/5 rounded-2xl p-5 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#4A1C21] border-2 border-[#F87171] flex items-center justify-center text-[#FCA5A5] mb-2.5">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-white">User Account</p>
          <p className="text-xs text-[#B8848A]">user@example.com</p>
        </div>

        <div className="space-y-2">
          {['Account Settings', 'Currency (USD $)', 'Export CSV Report', 'Notifications'].map((item) => (
            <div key={item} className="bg-[#241214] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-[#FEE2E2] hover:border-[#F87171]/30 cursor-pointer transition-colors">
              <span>{item}</span>
              <span className="text-[#B8848A]">›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav currentTab="profile" onSelect={onNavigate} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#140A0B] flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setViewAllScreens(!viewAllScreens)}
          className="bg-[#381C20] hover:bg-[#4F1D22] text-[#FECACA] border border-[#F87171]/30 text-xs font-medium px-4 py-2 rounded-full transition-colors"
        >
          {viewAllScreens ? 'Single Phone View' : 'View All 4 Screens'}
        </button>
      </div>

      {viewAllScreens ? (
        <div className="flex flex-wrap justify-center gap-6">
          {[renderHomeScreen, renderAnalyticsScreen, renderAddExpenseScreen, renderBudgetsScreen].map((renderFn, i) => (
            <div key={i} className="w-[390px] h-[882px] bg-[#1F0E10] rounded-[44px] border-[6px] border-[#381C20] shadow-2xl overflow-hidden flex flex-col">
              <StatusBar />
              <div className="flex-1 overflow-hidden">{renderFn(setActiveTab)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[390px] h-[882px] bg-[#1F0E10] rounded-[44px] border-[6px] border-[#381C20] shadow-2xl overflow-hidden flex flex-col">
          <StatusBar />
          <div className="flex-1 overflow-hidden">
            {activeTab === 'home' && renderHomeScreen(setActiveTab)}
            {activeTab === 'analytics' && renderAnalyticsScreen(setActiveTab)}
            {activeTab === 'add' && renderAddExpenseScreen(setActiveTab)}
            {activeTab === 'budgets' && renderBudgetsScreen(setActiveTab)}
            {activeTab === 'profile' && renderProfileScreen(setActiveTab)}
          </div>
        </div>
      )}
    </div>
  );
}