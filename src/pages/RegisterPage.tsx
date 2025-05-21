
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GameHeader from '@/components/GameHeader';
import HeroIcon from '@/components/HeroIcon';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Registration Successful",
      description: "Welcome, new Hero!",
    });

    // Redirect to the game
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="border border-gray-300 rounded-md mx-auto mt-8 p-4 w-full max-w-md">
        <GameHeader />
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <p className="text-gray-600 mb-6">Be a Hero</p>
        
        <HeroIcon />
        
        <form className="w-full max-w-md mt-8" onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-game-blue"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-game-blue"
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
            />
          </div>
          
          <button
            type="submit"
            className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full"
          >
            Register
          </button>
        </form>
        
        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-game-blue hover:underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
