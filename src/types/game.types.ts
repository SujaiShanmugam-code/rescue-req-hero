
export type Requirement = {
  id: number;
  name: string;
  isCorrect: boolean;
};

export type ProblemStatement = {
  id: number;
  title: string;
  description: string;
  requirements: Requirement[];
  level: number;
  timeLimit: number; // in seconds
};

export type GameState = {
  currentLevel: number;
  attempts: number;
  score: number;
  diamonds: number;
};

export type GameResult = {
  level: number;
  attempts: number;
  time: string;
  score: number;
  isWin: boolean;
  selectedRequirements: number[];
  correctRequirements: number[];
};

export type UserHistory = {
  id: string;
  level: number;
  attempts: number;
  time: string;
  status: "Win" | "Lose";
};
