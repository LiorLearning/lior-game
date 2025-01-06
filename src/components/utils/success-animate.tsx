import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SuccessAnimation = () => {
  // Define the type for the square objects
  type Square = {
    id: number;
    x: number;
    delay: number;
    duration: number;
    color: string;
  };

  // Set the state with the defined type
  const [squares, setSquares] = useState<Square[]>([]);

  // Color palette matching the context
  const colors = ['#FFD700', '#FF6347', '#00CED1', '#FF69B4'];

  // Enhanced randomization functions
  const getRandomColor = () => 
    colors[Math.floor(Math.random() * colors.length)];

  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 1,
    duration: Math.random() * 3 + 2,
  });

  // Continuous square generation with staggered approach
  useEffect(() => {
    const generateNewSquare = () => {
      const newSquare = {
        id: Date.now(),
        color: getRandomColor(),
        ...getRandomPosition()
      };
      
      setSquares(prevSquares => {
        // Keep a maximum of 100 squares to prevent performance issues
        const updatedSquares = [...prevSquares, newSquare];
        return updatedSquares.slice(-40);
      });
    };

    const interval = setInterval(generateNewSquare, 50);
    const timeout = setTimeout(() => clearInterval(interval), 5000); // Stop after 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {squares.map((squareObj) => (
          <motion.div
            key={squareObj.id}
            initial={{ 
              y: -100, 
              x: squareObj.x, 
              opacity: 1,
            }}
            animate={{ 
              y: window.innerHeight + 100, 
              opacity: [1, 1, 0],
              x: squareObj.x + (Math.random() * 100 - 50)
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: squareObj.duration, 
              delay: squareObj.delay,
              ease: "easeInOut"
            }}
            className="absolute animate-fall"
            style={{ 
              left: squareObj.x,
              backgroundColor: squareObj.color,
              width: '10px',
              height: '10px'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuccessAnimation;