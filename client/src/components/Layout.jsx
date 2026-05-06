import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Generator from '../pages/Generator';
import History from '../pages/History';
import Login from '../pages/Login';
import Register from '../pages/Register';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/generate" element={<PrivateRoute><Generator /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        </Routes>
      </main>
      <footer className="py-6 border-t border-light-border dark:border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium text-light-textMuted dark:text-dark-textMuted">
          &copy; {new Date().getFullYear()} MicroStack Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
