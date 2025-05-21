import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import { useGame } from '@/contexts/GameContext';

const ProblemPage = () => {
  const { problemStatement, startGame } = useGame();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Start a new game when this component mounts
    startGame();
  }, [startGame]);

  const handleSkip = () => {
    navigate('/gameplay');
  };

  const handleMenuToggle = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader showMenu={true} onMenuClick={handleMenuToggle} />
      
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <h2 className="text-gray-600 text-lg mb-4">Problem statement</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-md w-full max-w-md p-4 mb-6">
          <h3 className="text-center bg-gray-100 py-2 mb-4">Software Description</h3>
          
          <div className="text-red-500 mb-4">
            <p>There is a problem here!</p>
            <p>Please read this carefully</p>
            <p>This will help you to select the right requirements from the mixed requirements generated in the next screen :)</p>
          </div>
          
          <div className="text-gray-600">
            <p className="mb-2">
              Mary needs a software system that is able to detect smoke level...................and so on.
            </p>
            {problemStatement && (
              <div className="text-gray-700 mt-4">
                <p>{problemStatement.description}</p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleSkip}
          className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full max-w-md mb-8"
        >
          Skip
        </button>
        
        <div className="w-full max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <h4 className="mb-2 text-center">Win all 6 cells</h4>
              <div className="grid grid-cols-3 gap-1 w-40 mx-auto">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={num} className="w-full aspect-square bg-green-500"></div>
                ))}
              </div>
              <p className="text-center mt-2">Guard</p>
            </div>
            
            <div>
              <h4 className="mb-2 text-center">Lose if less than 6 cells</h4>
              <div className="grid grid-cols-3 gap-1 w-40 mx-auto">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="w-full aspect-square bg-green-500"></div>
                ))}
                <div className="w-full aspect-square bg-red-400"></div>
              </div>
              <p className="text-center mt-2">Guard</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProblemPage;
