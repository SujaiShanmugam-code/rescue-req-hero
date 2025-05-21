
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { gameHistory } = useGame();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-6 px-6 flex items-center">
        <button 
          onClick={handleBack}
          className="text-gray-600"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h1 className="text-2xl font-bold text-center flex-1">Your History</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        {gameHistory.length > 0 ? (
          gameHistory.map((entry, index) => (
            <div 
              key={entry.id}
              className={`border ${
                entry.status === 'Win' ? 'border-green-500' : 'border-red-500'
              } rounded-md mb-4 w-full max-w-md overflow-hidden`}
            >
              <table className="w-full text-left">
                <thead>
                  <tr className={`${
                    entry.status === 'Win' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <th className="py-2 px-4 border-r border-gray-300">Level</th>
                    <th className="py-2 px-4 border-r border-gray-300">Attempts</th>
                    <th className="py-2 px-4 border-r border-gray-300">Time</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-r border-gray-300">{entry.level.toString().padStart(2, '0')}</td>
                    <td className="py-2 px-4 border-r border-gray-300">{entry.attempts.toString().padStart(2, '0')}</td>
                    <td className="py-2 px-4 border-r border-gray-300">{entry.time}</td>
                    <td className={`py-2 px-4 ${
                      entry.status === 'Win' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {entry.status}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={`text-center py-2 ${
                entry.status === 'Win' ? 'text-green-500' : 'text-red-500'
              }`}>
                <button onClick={() => navigate('/review')}>Review</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-8">No history available yet. Play some games!</p>
        )}
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        All rights reserved Underground Hero 2025
      </footer>
    </div>
  );
};

export default HistoryPage;
