
import React from 'react';
import { Requirement } from '../types/game.types';

interface RequirementItemProps {
  requirement: Requirement;
  isSelected: boolean;
  isReviewMode?: boolean;
  onClick?: () => void;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ 
  requirement, 
  isSelected, 
  isReviewMode = false,
  onClick 
}) => {
  // Determine background color based on state
  let bgColor = 'bg-gray-200';
  
  if (isReviewMode) {
    if (requirement.isCorrect && isSelected) {
      bgColor = 'bg-green-500';
    } else if (!requirement.isCorrect && isSelected) {
      bgColor = 'bg-red-500';
    } else if (requirement.isCorrect && !isSelected) {
      bgColor = 'bg-yellow-300';
    }
  } else if (isSelected) {
    bgColor = 'bg-gray-400';
  }

  return (
    <div 
      className={`${bgColor} p-2 rounded transition-colors cursor-pointer hover:opacity-90 ${isSelected ? 'font-medium' : ''}`}
      onClick={onClick}
    >
      {requirement.name}
    </div>
  );
};

export default RequirementItem;
