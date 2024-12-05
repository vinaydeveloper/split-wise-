import React from 'react';
import { Expense, User } from '../types';
import { Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  users: User[];
  onAddExpense: () => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, users, onAddExpense }) => {
  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          <Receipt size={20} />
          Add Expense
        </button>
      </div>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{expense.description}</h3>
                <p className="text-sm text-gray-500">
                  Paid by {getUserName(expense.paidBy)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${expense.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Split between: {expense.participants.map(p => getUserName(p)).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};