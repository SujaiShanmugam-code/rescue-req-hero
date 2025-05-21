import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import RequirementItem from '@/components/RequirementItem';
import { useGame } from '@/contexts/GameContext';

const GameplayPage = () => {
  const navigate = useNavigate();
  const { 
    problemStatement, 
    gameState, 
    selectedRequirements, 
    setSelectedRequirements,
    timeRemaining,
    startTimer,
    isTimerRunning,
    startLevel
  } = useGame();

  const [showError, setShowError] = useState(false);

  // Start level and timer when component mounts if no problemStatement
  useEffect(() => {
    if (!problemStatement) {
      startLevel(gameState.currentLevel);
    }
  }, [problemStatement, startLevel, gameState.currentLevel]);

  if (!problemStatement) {
    return null;
  }

  const toggleRequirement = (requirementId: number) => {
    setShowError(false);
    
    if (selectedRequirements.includes(requirementId)) {
      // Remove requirement
      setSelectedRequirements(selectedRequirements.filter(id => id !== requirementId));
    } else {
      // Add requirement if less than 6 are selected
      if (selectedRequirements.length < 6) {
        setSelectedRequirements([...selectedRequirements, requirementId]);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGroupRequirements = () => {
    if (selectedRequirements.length < 6) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    navigate('/results');
  };

  const handleBackToProblem = () => {
    navigate('/problem');
  };

  const handleMenuToggle = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader showMenu={true} onMenuClick={handleMenuToggle} />
      
      <div className="px-6 mb-4 flex items-center">
        <button 
          onClick={handleBackToProblem}
          className="text-gray-600 text-sm flex items-center"
        >
          ← Return to problem statement
        </button>
      </div>
      
      <div className="px-6 mb-2 flex items-center justify-between">
        <div className="text-gray-600 text-sm">
          Highlight 6 requirements
        </div>
        <div className="text-sm">
          {formatTime(timeRemaining)} / {formatTime(problemStatement.timeLimit)}
        </div>
      </div>
      
      <main className="flex-1 flex flex-col px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 border border-gray-300">
          <div className="overflow-y-auto">
            {problemStatement.requirements.map((req) => (
              <div key={req.id} className={`border-b border-gray-100 ${selectedRequirements.includes(req.id) ? 'bg-gray-200' : ''}`}>
                <RequirementItem 
                  requirement={req}
                  isSelected={selectedRequirements.includes(req.id)}
                  onClick={() => toggleRequirement(req.id)}
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
        
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {selectedRequirements.length < 6 
              ? "Please select exactly 6 requirements." 
              : "You can only select 6 requirements."}
          </div>
        )}
        
        <button
          onClick={handleGroupRequirements}
          disabled={selectedRequirements.length !== 6}
          className={`${
            selectedRequirements.length === 6 
              ? "bg-game-blue text-white" 
              : "bg-gray-400 text-gray-700"
          } px-8 py-3 rounded-md font-medium text-lg w-full max-w-md mx-auto mb-6`}
        >
          Group
        </button>
        
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="aspect-square bg-gray-300"
            ></div>
          ))}
        </div>
        
        <p className="text-center text-gray-600 text-sm mt-2">
          Highlighted {selectedRequirements.length}/6 requirements
        </p>
      </main>
    </div>
  );
};

export default GameplayPage;
