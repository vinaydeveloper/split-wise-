import React from 'react';
import { User } from '../types';
import { UserPlus } from 'lucide-react';

interface UserListProps {
  users: User[];
  onAddUser: () => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onAddUser }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Group Members</h2>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <UserPlus size={20} />
          Add Member
        </button>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};