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
    stopTimer,
    gameHistory
  } = useGame();
  
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

  useEffect(() => {
    console.log('ResultsPage useEffect running'); // Log when this effect runs

    if (!problemStatement) {
      navigate('/problem');
      return;
    }
    
    // Ensure the timer is stopped when the results page is displayed
    console.log('Calling stopTimer from ResultsPage'); // Log before calling stopTimer
    stopTimer();
    console.log('stopTimer called'); // Log after calling stopTimer
    
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
    let finalScore = 0; // Initialize final score

    console.log('Calculating score. currentLevel:', gameState.currentLevel, 'win:', win); // Log score calculation conditions
    if (gameState.currentLevel === 1 && win) {
      finalScore = 100;
      console.log('Level 1 win, setting score to 100'); // Log when score is set to 100
    } else {
      // Existing score calculation for other levels or losses on level 1
      const baseScore = selectedCorrectCount * 10;
      const timeBonus = timeRemaining ? Math.floor(timeRemaining / 10) : 0; // Use timeRemaining for bonus if needed
      finalScore = baseScore + timeBonus;
      console.log('Calculating score for loss/other level. Base:', baseScore, 'Time Bonus:', timeBonus, 'Final:', finalScore); // Log other score calculation
    }

    setScore(finalScore);
    console.log('Score set to:', finalScore); // Log the score that is set

    // Calculate time spent
    const timeSpent = problemStatement.timeLimit - (timeRemaining || 0);
    const mins = Math.floor(timeSpent / 60);
    const secs = timeSpent % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    console.log('Time spent:', timeStr); // Log time spent
    
    // Save results to game context
    completeLevel({
      level: gameState.currentLevel,
      attempts: gameState.attempts,
      score: finalScore,
      time: timeStr, // Pass the calculated time spent
      isWin: win,
      selectedRequirements,
      correctRequirements,
    });
    console.log('completeLevel called with score:', finalScore, 'and time:', timeStr); // Log completeLevel call with time
    
    // Cleanup function to ensure timer is stopped on unmount as well (should be handled by context, but adding here for debug)
    return () => {
      console.log('ResultsPage useEffect cleanup: Calling stopTimer');
      stopTimer();
    };

  }, [problemStatement, selectedRequirements, navigate, gameState, completeLevel, stopTimer, timeRemaining]); // Added timeRemaining to dependencies

  const handleRetry = () => {
    navigate('/gameplay');
  };
  
  const handleNextLevel = () => {
    navigate('/problem');
  };
  
  const handleReview = () => {
    navigate('/review');
  };

  // Function to toggle menu visibility
  const handleMenuToggle = () => {
    navigate('/menu');
  };

  // Get the time from the most recent game history entry
  const latestGameHistoryEntry = gameHistory.length > 0 ? gameHistory[0] : null; // Get the latest history entry
  const latestGameTime = latestGameHistoryEntry ? latestGameHistoryEntry.time : '00:00';
  const problemTimeLimit = problemStatement?.timeLimit ? Math.floor(problemStatement.timeLimit / 60).toString().padStart(2, '0') + ':' + (problemStatement.timeLimit % 60).toString().padStart(2, '0') : '00:00';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameHeader 
        showMenu={true} 
        onMenuClick={handleMenuToggle} // Pass the toggle function
      />
      
      <div className="px-6 mb-4">
        <h2 className="font-medium text-center">
          Summary L : {gameState.currentLevel} {" "}
          <span className="text-gray-600 text-sm">
            {latestGameTime} / {problemTimeLimit}
          </span>
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
