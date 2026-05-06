import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await register(name, email, password);
      navigate('/generate');
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Cannot connect to server. Is the backend running?');
      } else {
        setError(err.response?.data?.error || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 flex justify-center px-4">
      <div className="card p-8 w-full max-w-md shadow-lg border-t-4 border-t-primary-500">
        <h2 className="text-3xl font-bold mb-2 text-center text-light-text dark:text-dark-text">Create Account</h2>
        <p className="text-center text-light-textMuted dark:text-dark-textMuted mb-8">Start generating full-stack boilerplates today</p>
        
        {error && <div className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              required 
              className="input-field" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="input-field pr-12" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                minLength={6}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-textMuted dark:text-dark-textMuted hover:text-light-text dark:hover:text-dark-text focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 flex justify-center items-center gap-2">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-light-textMuted dark:text-dark-textMuted">
          Already have an account? <Link to="/login" className="text-primary-500 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
