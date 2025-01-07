import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/custom_ui/button';
import { useGameState } from '../state-utils';

interface CounterProps {
  onIncrement: () => void;
  onDecrement: () => void;
}
export const Counter: React.FC<CounterProps> = ({ onIncrement, onDecrement }) => {
  const { gameStateRef } = useGameState();
  return (
    <div className="absolute h-10 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
      <div className="flex items-center ml-10">
        <p className="text-2xl px-4 mx-8 font-bold border-2 border-purple-500 bg-white text-purple-500">
          count
        </p>
        <Button variant="link" onClick={onIncrement} className="text-purple-500 text-2xl" id="increment-button">
          <Plus size={24} strokeWidth={6} />
        </Button>
      </div>
      <p className="text-4xl font-bold text-purple-500">
        {gameStateRef.current.state1.finalAnswer}
      </p>
    </div>
  );
};