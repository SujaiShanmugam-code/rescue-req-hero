
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MenuPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate('/');
  };
  
  const handleDeleteAccount = () => {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-blue-300">
      <header className="py-6 px-6 flex items-center">
        <button 
          onClick={handleBack}
          className="text-white"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h1 className="text-2xl font-bold text-white text-center flex-1">MENU</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center px-6 py-8 space-y-4">
        <button 
          onClick={() => navigate('/leaderboard')}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">📊</span>
          <span className="text-lg font-medium">Hero Leader Board</span>
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">🖼️</span>
          <span className="text-lg font-medium">Players Profile</span>
        </button>
        
        <button 
          onClick={() => navigate('/achievements')}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">🏆</span>
          <span className="text-lg font-medium">Players Achievement</span>
        </button>
        
        <button 
          onClick={() => navigate('/themes')}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">🎨</span>
          <span className="text-lg font-medium">Theme Picker</span>
        </button>
        
        <button 
          onClick={() => navigate('/history')}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">👤</span>
          <span className="text-lg font-medium">Players History</span>
        </button>
        
        <div className="grow"></div>
        
        <button 
          onClick={handleLogout}
          className="bg-blue-800 hover:bg-blue-900 text-white w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">↩️</span>
          <span className="text-lg font-medium">Logout</span>
        </button>
        
        <button 
          onClick={handleDeleteAccount}
          className="bg-blue-800 hover:bg-blue-900 text-red-400 w-full max-w-md rounded-full py-4 px-6 flex items-center gap-4"
        >
          <span className="text-2xl">🗑️</span>
          <span className="text-lg font-medium">Delete Account</span>
        </button>
      </main>
      
      <footer className="py-4 text-center text-sm text-white">
        All rights reserved Underground Hero 2025
      </footer>
    </div>
  );
};

export default MenuPage;
