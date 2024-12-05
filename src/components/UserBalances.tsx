import React from 'react';
import { User } from '../types';
import { Balance } from '../utils/calculations';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';

interface UserBalancesProps {
  balances: Balance[];
  users: User[];
}

export const UserBalances: React.FC<UserBalancesProps> = ({ balances, users }) => {
  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown';
  };

  const getBalanceColor = (amount: number) => {
    if (amount > 0) return 'text-green-600';
    if (amount < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getBalanceIcon = (amount: number) => {
    if (amount > 0) return <ArrowUpCircle className="text-green-600" size={20} />;
    if (amount < 0) return <ArrowDownCircle className="text-red-600" size={20} />;
    return <MinusCircle className="text-gray-600" size={20} />;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Balance Summary</h2>
      <div className="space-y-4">
        {balances.map((balance) => (
          <div
            key={balance.userId}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getBalanceIcon(balance.netBalance)}
              <div>
                <p className="font-medium">{getUserName(balance.userId)}</p>
                <p className="text-sm text-gray-500">
                  Paid: ${balance.totalPaid.toFixed(2)} • Owes: ${balance.totalOwed.toFixed(2)}
                </p>
              </div>
            </div>
            <div className={`font-semibold ${getBalanceColor(balance.netBalance)}`}>
              {balance.netBalance > 0 ? '+' : ''}${balance.netBalance.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};