import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GameHeader from '@/components/GameHeader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Login Successful",
      description: "Welcome back, Hero!",
    });

    // Redirect to the home page
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="border border-gray-300 rounded-md mx-auto mt-4 p-3 w-full max-w-sm md:max-w-md">
        <GameHeader />
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <p className="text-gray-600 mb-6">You are one step away!</p>
        
        <img src="/logo.png" alt="Underground Hero Logo" className="mx-auto mb-6 w-32" />
        
        <form className="w-full max-w-sm md:max-w-md mt-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-game-blue"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-game-blue"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-game-blue"
              />
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-game-blue hover:underline font-medium">
            Register here
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
