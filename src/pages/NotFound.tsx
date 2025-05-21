
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroIcon from "@/components/HeroIcon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        <HeroIcon status="sad" size="lg" />
        
        <h1 className="text-4xl font-bold mb-4 text-game-blue">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! This tunnel seems to be blocked
        </p>
        
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>
        
        <Link 
          to="/" 
          className="bg-game-blue text-white px-8 py-3 rounded-md font-medium text-lg inline-block"
        >
          Return to Safety
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
