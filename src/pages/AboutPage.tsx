
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import HeroIcon from '@/components/HeroIcon';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader showBackButton={true} />
      
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-game-blue mb-4">About Underground Hero</h2>
          
          <div className="flex justify-center mb-6">
            <HeroIcon size="lg" />
          </div>
          
          <div className="prose">
            <p className="mb-4">
              Underground Hero is an educational mobile game focused on requirements engineering concepts. 
              Players must analyze problem statements and select appropriate requirements to rescue people trapped underground.
            </p>
            
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <ol className="list-decimal pl-5 mb-4">
              <li className="mb-2">Read the problem statement carefully</li>
              <li className="mb-2">Select exactly 6 requirements from the available options</li>
              <li className="mb-2">Submit your selection by clicking "Group"</li>
              <li className="mb-2">Review your performance and learn from feedback</li>
              <li className="mb-2">Progress through increasingly complex levels</li>
            </ol>
            
            <h3 className="text-lg font-bold mb-2">Game Rules</h3>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">You must select exactly 6 requirements</li>
              <li className="mb-2">The more correct requirements you select, the higher your score</li>
              <li className="mb-2">Complete levels faster for bonus points</li>
              <li className="mb-2">Earn diamonds for successful rescues</li>
              <li className="mb-2">Review your performance to improve your understanding</li>
            </ul>
            
            <h3 className="text-lg font-bold mb-2">Educational Value</h3>
            <p className="mb-4">
              This game teaches important concepts in requirements engineering:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">Functional vs. Non-functional requirements</li>
              <li className="mb-2">Requirements analysis and prioritization</li>
              <li className="mb-2">Stakeholder needs identification</li>
              <li className="mb-2">System specification development</li>
              <li className="mb-2">Requirements validation and verification</li>
            </ul>
            
            <div className="mt-8 text-center">
              <Link to="/" className="text-game-blue hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        All rights reserved Underground Hero 2025
      </footer>
    </div>
  );
};

export default AboutPage;
