
import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GameHeader from '@/components/GameHeader';
import HeroIcon from '@/components/HeroIcon';
import HostageIcon from '@/components/HostageIcon';

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader />
      
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <div className="grid grid-cols-2 gap-8 mb-8 mt-4">
          <div className="flex flex-col items-center">
            <div className="border border-gray-300 bg-gray-100 p-4 mb-2 aspect-square w-36 md:w-48 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-gray-800">Locked underground</p>
                <p className="text-sm text-gray-800">tunnel gate system.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <HostageIcon status="trapped" />
          </div>
        </div>
        
        <div className="text-gray-600 text-sm max-w-md text-center mb-8">
          <p className="mb-1">About the game underground hero</p>
          <p className="mb-1">About the game underground hero</p>
          <p className="mb-1">About trground hero</p>
          <p className="mb-1">About the game underground hero</p>
          <p className="mb-1">About the game und hero</p>
          <p className="mb-1">About the game undergr</p>
          <Link to="/about" className="text-game-blue hover:underline">more</Link>
        </div>
        
        <Link 
          to="/problem"
          className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full max-w-md text-center mb-6"
        >
          Start
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" id="screenGuard" className="h-4 w-4 text-game-blue" />
          <label htmlFor="screenGuard">Enable screen Guard (optional)</label>
        </div>
      </main>
    </div>
  );
};

export default Index;
