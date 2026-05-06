import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Layers, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border fixed w-full z-50 top-0 left-0 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-500 p-1.5 rounded-lg">
                <Layers className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-light-text dark:text-dark-text">
                MicroStack <span className="text-primary-500">Builder</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/generate" className="text-sm font-medium hover:text-primary-500 transition-colors hidden sm:block">Generate</Link>
                <Link to="/history" className="text-sm font-medium hover:text-primary-500 transition-colors hidden sm:block">History</Link>
                <div className="h-6 w-px bg-light-border dark:bg-dark-border hidden sm:block"></div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="text-sm text-light-textMuted hover:text-red-500 dark:text-dark-textMuted dark:hover:text-red-400 p-2">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium hover:text-primary-500 transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
