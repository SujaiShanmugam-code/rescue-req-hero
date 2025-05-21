
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from '@/components/GameHeader';
import HeroIcon from '@/components/HeroIcon';
import HostageIcon from '@/components/HostageIcon';
import { useGame } from '@/contexts/GameContext';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { 
    problemStatement, 
    gameState, 
    selectedRequirements,
    completeLevel,
    timeRemaining,
    stopTimer
  } = useGame();
  
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!problemStatement) {
      navigate('/problem');
      return;
    }
    
    // Stop the timer
    stopTimer();
    
    // Calculate results
    const correctRequirements = problemStatement.requirements
      .filter(req => req.isCorrect)
      .map(req => req.id);
      
    const selectedCorrectCount = selectedRequirements
      .filter(id => correctRequirements.includes(id))
      .length;
    
    setCorrectCount(selectedCorrectCount);
    const win = selectedCorrectCount >= 6;
    setIsWin(win);
    
    // Calculate score
    const baseScore = selectedCorrectCount * 10;
    const timeBonus = timeRemaining ? Math.floor(timeRemaining / 10) : 0;
    const finalScore = baseScore + timeBonus;
    setScore(finalScore);
    
    // Save results to game context
    const timeSpent = problemStatement.timeLimit - (timeRemaining || 0);
    const mins = Math.floor(timeSpent / 60);
    const secs = timeSpent % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    completeLevel({
      level: gameState.currentLevel,
      attempts: gameState.attempts,
      score: finalScore,
      time: timeStr,
      isWin: win,
      selectedRequirements,
      correctRequirements,
    });
    
  }, [problemStatement, selectedRequirements, navigate, gameState, completeLevel, timeRemaining, stopTimer]);

  const handleRetry = () => {
    navigate('/gameplay');
  };
  
  const handleNextLevel = () => {
    navigate('/problem');
  };
  
  const handleReview = () => {
    navigate('/review');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader showMenu={true} />
      
      <div className="px-6 mb-4">
        <h2 className="font-medium text-center">
          Summary L : {gameState.currentLevel} {" "}
          {gameState.attempts > 0 && (
            <span className="text-gray-600 text-sm">
              {gameState.attempts.toString().padStart(2, '0')}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
            </span>
          )}
        </h2>
      </div>
      
      <div className="px-6 mb-6">
        <div className="border border-gray-300 p-3 flex justify-around">
          <div>
            <p className="text-gray-500">Score</p>
            <p className="text-center font-medium">{score}</p>
          </div>
          <div>
            <p className="text-gray-500">Attempted</p>
            <p className="text-center">{gameState.attempts}</p>
          </div>
          <div>
            <p className="text-gray-500">💎</p>
            <p className="text-center">{isWin ? 50 : 0}</p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <div className={`text-xl font-bold mb-4 ${isWin ? 'text-green-500' : 'text-red-500'}`}>
          {isWin ? 'You Win!' : 'You Lose!'}
        </div>
        
        <div className="flex items-center justify-around w-full mb-6">
          <HeroIcon status={isWin ? 'happy' : 'sad'} />
          <HostageIcon status={isWin ? 'freed' : 'trapped'} />
        </div>
        
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mb-10">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className={`aspect-square ${index < correctCount ? 'bg-green-500' : 'bg-red-400'}`}
            ></div>
          ))}
        </div>
        
        <button
          onClick={handleReview}
          className="text-green-600 font-medium mb-6"
        >
          Review
        </button>
        
        <button
          onClick={isWin ? handleNextLevel : handleRetry}
          className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg w-full max-w-md"
        >
          {isWin ? 'Next Level' : 'Retry'}
        </button>
      </main>
    </div>
  );
};

export default ResultsPage;
