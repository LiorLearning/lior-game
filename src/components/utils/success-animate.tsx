import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded and more diverse emoji list
const celebrationEmojis = [ '🎉', '🎊', '🎈', '🥳', '✨', '🚀', '💥', '🌟', '🏆' ];

const SuccessAnimation = () => {
  // Define the type for the emoji objects
  type Emoji = {
    id: number;
    emoji: string;
    x: number;
    delay: number;
    duration: number;
  };

  // Set the state with the defined type
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  // Enhanced randomization functions
  const getRandomEmoji = () => 
    celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];

  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 1,
    duration: Math.random() * 3 + 2,
  });

  // Continuous emoji generation with staggered approach
  useEffect(() => {
    const generateNewEmoji = () => {
      const newEmoji = {
        id: Date.now(),
        emoji: getRandomEmoji(),
        ...getRandomPosition()
      };
      
      setEmojis(prevEmojis => {
        // Keep a maximum of 100 emojis to prevent performance issues
        const updatedEmojis = [...prevEmojis, newEmoji];
        return updatedEmojis.slice(-40);
      });
    };

    const interval = setInterval(generateNewEmoji, 50);
    const timeout = setTimeout(() => clearInterval(interval), 5000); // Stop after 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {emojis.map((emojiObj) => (
          <motion.div
            key={emojiObj.id}
            initial={{ 
              y: -100, 
              x: emojiObj.x, 
              opacity: 1,
            }}
            animate={{ 
              y: window.innerHeight + 100, 
              opacity: [1, 1, 0],
              x: emojiObj.x + (Math.random() * 100 - 50)
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: emojiObj.duration, 
              delay: emojiObj.delay,
              ease: "easeInOut"
            }}
            className="absolute select-none text-4xl"
            style={{ 
              left: emojiObj.x, 
            }}
          >
            {emojiObj.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuccessAnimation;