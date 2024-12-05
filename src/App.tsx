import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { ExpenseList } from './components/ExpenseList';
import { UserBalances } from './components/UserBalances';
import { AddUserModal } from './components/AddUserModal';
import { AddExpenseModal } from './components/AddExpenseModal';
import { User, Expense } from './types';
import { storage } from './utils/storage';
import { calculateBalances } from './utils/calculations';
import { Wallet } from 'lucide-react';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  useEffect(() => {
    const savedUsers = storage.getUsers();
    const savedExpenses = storage.getExpenses();
    setUsers(savedUsers);
    setExpenses(savedExpenses);
  }, []);

  const handleAddUser = (data: { name: string; email: string }) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...data,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    storage.setUsers(updatedUsers);
  };

  const handleAddExpense = (data: {
    description: string;
    amount: number;
    paidBy: string;
    participants: string[];
    split: 'equal' | 'custom';
  }) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...data,
      date: new Date().toISOString(),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    storage.setExpenses(updatedExpenses);
  };

  const balances = calculateBalances(expenses, users);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Split Expenses</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserList users={users} onAddUser={() => setIsAddUserModalOpen(true)} />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <UserBalances balances={balances} users={users} />
              <ExpenseList
                expenses={expenses}
                users={users}
                onAddExpense={() => setIsAddExpenseModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onSubmit={handleAddExpense}
        users={users}
      />
    </div>
  );
}

export default App;