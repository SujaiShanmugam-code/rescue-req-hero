import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import RequirementItem from '@/components/RequirementItem';
import { useGame } from '@/contexts/GameContext';

const ReviewPage = () => {
  const navigate = useNavigate();
  const { problemStatement, gameState, selectedRequirements } = useGame();

  if (!problemStatement) {
    navigate('/problem');
    return null;
  }

  const handleFinishReview = () => {
    navigate('/results');
  };

  const handleMenuToggle = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader showMenu={true} onMenuClick={handleMenuToggle} />
      
      <div className="px-6 mb-4">
        <h2 className="text-red-500 text-center">Review Your Answer (Read Only)</h2>
      </div>
      
      <main className="flex-1 flex flex-col px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 border border-gray-300">
          <div className="overflow-y-auto max-h-96">
            {problemStatement.requirements.map((req) => (
              <div key={req.id} className="border-b border-gray-100">
                <RequirementItem 
                  requirement={req}
                  isSelected={selectedRequirements.includes(req.id)}
                  isReviewMode={true}
                />
              </div>
            ))}
          </div>
          
          <div className="border-l border-gray-300 p-4">
            <div className="mb-4">
              <h3 className="text-center font-medium mb-1">Goal</h3>
              <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <div key={num} className="w-full aspect-square bg-green-500"></div>
                ))}
              </div>
            </div>
            
            <div className="py-2 px-4 border-t border-b border-gray-200">
              <p>Level: {gameState.currentLevel}</p>
            </div>
            
            <div className="py-2 px-4 border-b border-gray-200">
              <p>Score: {gameState.score}</p>
            </div>
            
            <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-between">
              <p>💎</p>
              <p>{gameState.diamonds}</p>
            </div>
            
            <div className="py-2 px-4 border-gray-200">
              <p>Attempts: {gameState.attempts}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleFinishReview}
          className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full max-w-md mx-auto mt-auto"
        >
          Finish Review
        </button>
      </main>
    </div>
  );
};

export default ReviewPage;
