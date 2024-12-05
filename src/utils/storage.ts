import { User, Expense } from '../types';

export const storage = {
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },
  
  setUsers: (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  getExpenses: (): Expense[] => {
    return JSON.parse(localStorage.getItem('expenses') || '[]');
  },
  
  setExpenses: (expenses: Expense[]) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
};