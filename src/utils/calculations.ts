import { User, Expense } from '../types';

export interface Balance {
  userId: string;
  totalPaid: number;
  totalOwed: number;
  netBalance: number;
}

export const calculateBalances = (expenses: Expense[], users: User[]): Balance[] => {
  const balances = users.map(user => ({
    userId: user.id,
    totalPaid: 0,
    totalOwed: 0,
    netBalance: 0,
  }));

  expenses.forEach(expense => {
    const payer = balances.find(b => b.userId === expense.paidBy);
    if (!payer) return;

    payer.totalPaid += expense.amount;

    if (expense.split === 'equal') {
      const splitAmount = expense.amount / expense.participants.length;
      expense.participants.forEach(participantId => {
        const participant = balances.find(b => b.userId === participantId);
        if (participant) {
          participant.totalOwed += splitAmount;
        }
      });
    } else if (expense.split === 'custom' && expense.shares) {
      Object.entries(expense.shares).forEach(([participantId, share]) => {
        const participant = balances.find(b => b.userId === participantId);
        if (participant) {
          participant.totalOwed += share;
        }
      });
    }
  });

  return balances.map(balance => ({
    ...balance,
    netBalance: balance.totalPaid - balance.totalOwed,
  }));
};