export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
  split: 'equal' | 'custom';
  shares?: Record<string, number>;
}