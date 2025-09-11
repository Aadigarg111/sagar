"use client";

import { User, LogIn, LogOut, Settings, Shield, Award, MapPin, UserPlus } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  user: any;
  onLogin: () => void;
  onRegister: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogin, onRegister }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={onLogin}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <LogIn className="h-5 w-5" />
          <span>Login</span>
        </button>
        <button
          onClick={onRegister}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          <span>Sign Up</span>
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="font-medium">{user.name}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-64 z-50">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-gray-600">{user.reputation} pts</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">{user.location}</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="px-3 py-2 border-b border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Badges</p>
            <div className="flex flex-wrap gap-1">
              {user.badges.map((badge: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <DropdownMenu.Group>
            <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenu.Item>
            
            <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenu.Item>
            
            <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <DropdownMenu.Item 
            className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserProfile;
