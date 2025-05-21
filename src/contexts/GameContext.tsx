
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  score: 0,
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
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Initialize game from localStorage if available
  useEffect(() => {
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
    localStorage.setItem('undergroundHero_gameState', JSON.stringify(gameState));
  }, [gameState]);

  // Save game history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('undergroundHero_gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => (prevTime !== null ? prevTime - 1 : null));
      }, 1000);
      setTimerId(timer);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      stopTimer();
      // Handle time's up scenario
      const result: Partial<GameResult> = {
        isWin: false,
        time: formatTime(problemStatement?.timeLimit || 0),
        score: Math.floor(gameState.score / 2) // Penalty for running out of time
      };
      completeLevel(result);
    }
    return undefined;
  }, [isTimerRunning, timeRemaining]);

  const startGame = () => {
    setGameState(initialGameState);
    startLevel(1);
  };

  const startLevel = (level: number) => {
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
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completeLevel = (result: Partial<GameResult>) => {
    stopTimer();
    
    // Calculate final score
    const finalScore = result.score || 0;
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      score: prev.score + finalScore,
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

  const resetLevel = () => {
    startLevel(gameState.currentLevel);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

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
