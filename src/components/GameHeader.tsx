
import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onMenuClick?: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  title = "Underground",
  subtitle = "Hero!",
  showBackButton = false,
  showMenu = false,
  onBack,
  onMenuClick
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="relative flex items-center justify-center py-4 px-6">
      {showBackButton && (
        <button 
          onClick={handleBack}
          className="absolute left-4 text-gray-600"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      
      <div className="text-center">
        <h1 className="text-game-blue text-2xl font-bold">{title}</h1>
        <h2 className="text-black text-xl font-bold">{subtitle}</h2>
      </div>
      
      {showMenu && (
        <button 
          onClick={onMenuClick}
          className="absolute right-4 text-gray-600"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      )}
    </header>
  );
};

export default GameHeader;
