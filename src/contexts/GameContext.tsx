import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GameState, GameResult, UserHistory, ProblemStatement } from '../types/game.types';
import { problemStatements } from '../data/problemStatements';

interface GameContextProps {
  gameState: GameState;
  problemStatement: ProblemStatement | null;
  gameHistory: UserHistory[];
  selectedRequirements: number[];
  setSelectedRequirements: React.Dispatch<React.SetStateAction<number[]>>;
  startGame: () => void;
  startLevel: (level: number) => void;
  completeLevel: (result: Partial<GameResult>) => void;
  resetLevel: () => void;
  timeRemaining: number | null;
  isTimerRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
}

const initialGameState: GameState = {
  currentLevel: 1,
  attempts: 0,
  score: 100,
  diamonds: 0
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [problemStatement, setProblemStatement] = useState<ProblemStatement | null>(null);
  const [gameHistory, setGameHistory] = useState<UserHistory[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Use useRef for timer ID

  // Helper function to format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Stop timer function
  const stopTimer = () => {
    console.log('stopTimer called'); // Log when stopTimer is called
    setIsTimerRunning(false);
    if (timerRef.current) {
      console.log('Clearing timer with ID:', timerRef.current); // Log timer ID being cleared
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Complete level function (simplified score handling)
  const completeLevel = (result: Partial<GameResult>) => {
    stopTimer();
    
    // Update game state with score provided in result
    setGameState(prev => ({
      ...prev,
      score: result.score || 0, // Use score from result
      diamonds: result.isWin ? prev.diamonds + 10 : prev.diamonds
    }));
    
    // Add to history
    const historyEntry: UserHistory = {
      id: Date.now().toString(),
      level: gameState.currentLevel,
      attempts: gameState.attempts,
      time: result.time || formatTime(problemStatement?.timeLimit || 0),
      status: result.isWin ? "Win" : "Lose"
    };
    
    setGameHistory(prev => [historyEntry, ...prev]);
  };

  // Start timer function
  const startTimer = () => {
    console.log('startTimer called'); // Log when startTimer is called
    setIsTimerRunning(true);
  };

  // Start level function
  const startLevel = (level: number) => {
    console.log('startLevel called for level:', level); // Log when startLevel is called
    const currentProblem = problemStatements.find(p => p.level === level);
    if (currentProblem) {
      setProblemStatement(currentProblem);
      setTimeRemaining(currentProblem.timeLimit);
      setSelectedRequirements([]);
      setGameState(prev => ({
        ...prev,
        currentLevel: level,
        attempts: prev.currentLevel === level ? prev.attempts + 1 : 1
      }));
      setIsTimerRunning(true); // Start the timer here
    }
  };

  const startGame = () => {
    console.log('startGame called'); // Log when startGame is called
    setGameState(initialGameState);
    startLevel(1);
  };

  const resetLevel = () => {
    console.log('resetLevel called'); // Log when resetLevel is called
    startLevel(gameState.currentLevel);
  };

  // Initialize game from localStorage if available
  useEffect(() => {
    console.log('GameContext initial useEffect running'); // Log initial effect
    const savedGameState = localStorage.getItem('undergroundHero_gameState');
    const savedGameHistory = localStorage.getItem('undergroundHero_gameHistory');
    
    if (savedGameState) {
      setGameState(JSON.parse(savedGameState));
    }
    
    if (savedGameHistory) {
      setGameHistory(JSON.parse(savedGameHistory));
    }
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    console.log('gameState useEffect running', gameState); // Log gameState changes
    localStorage.setItem('undergroundHero_gameState', JSON.stringify(gameState));
  }, [gameState]);

  // Save game history to localStorage when it changes
  useEffect(() => {
    console.log('gameHistory useEffect running', gameHistory); // Log gameHistory changes
    localStorage.setItem('undergroundHero_gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Timer effect
  useEffect(() => {
    console.log('Timer useEffect running. isTimerRunning:', isTimerRunning, 'timeRemaining:', timeRemaining); // Log timer effect status
    if (!isTimerRunning || timeRemaining === null || timeRemaining <= 0) {
      if (timeRemaining === 0) {
        console.log('Time is up!'); // Log time up
      }
      return; // Stop the timer if not running or time is up
    }

    timerRef.current = setTimeout(() => {
      console.log('Decrementing time'); // Log time decrement
      setTimeRemaining(prevTime => (prevTime !== null ? prevTime - 1 : null));
    }, 1000);

    // Cleanup function to clear the timeout
    return () => {
      console.log('Timer useEffect cleanup running'); // Log cleanup
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining, stopTimer, formatTime, problemStatement, completeLevel, gameState.score, gameState.currentLevel]); // Added relevant dependencies

  // Handle time's up scenario when timeRemaining becomes 0
  useEffect(() => {
    if (timeRemaining === 0) {
      stopTimer();
      // Handle time's up scenario (Loss)
      const result: Partial<GameResult> = {
        isWin: false,
        time: formatTime(problemStatement?.timeLimit || 0),
        score: Math.floor((problemStatement?.timeLimit || 0) / 2) // Penalty based on total time
      };
      completeLevel(result);
    }
  }, [timeRemaining, stopTimer, formatTime, problemStatement, completeLevel]); // Dependencies updated

  // Clear timer on component unmount
  useEffect(() => {
    return () => { stopTimer(); };
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        problemStatement,
        gameHistory,
        selectedRequirements,
        setSelectedRequirements,
        startGame,
        startLevel,
        completeLevel,
        resetLevel,
        timeRemaining,
        isTimerRunning,
        startTimer,
        stopTimer
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
