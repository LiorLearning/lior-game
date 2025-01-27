import React from 'react';
import { Position } from './types';

interface CatapultProps {
  position: Position;
  type: 'full' | 'half';
  side: 'left' | 'right';
}

export const Catapult: React.FC<CatapultProps> = ({ position, type, side }) => {
  const imageUrl = `https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/catapult-${type}${side === 'right' ? '-2' : ''}.png`;
  
  return (
    <img 
      src={imageUrl}
      alt="Catapult"
      className="absolute z-10 w-28 h-18"
      crossOrigin="anonymous"
      style={{
        top: position.y,
        left: position.x
      }}
    />
  );
};