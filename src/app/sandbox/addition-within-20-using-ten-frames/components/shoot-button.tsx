import React from 'react';
import { Button } from '@/components/custom_ui/button';
interface ShootButtonProps {
  onClick: () => void;
  disabled: boolean;
  position: 'left' | 'right';
}

export const ShootButton: React.FC<ShootButtonProps> = ({ onClick, disabled, position }) => {
  return (
    <Button
      id="shoot-button"
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${position === 'left' ? 'left-5' : 'right-5'} top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 rounded-none 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Shoot
    </Button>
  );
};