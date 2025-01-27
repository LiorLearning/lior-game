import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/custom_ui/button';
import { COLORS } from '../utils/constants';

interface CounterProps {
  finalAnswer: number;
  onIncrement: () => void;
}
export const Counter: React.FC<CounterProps> = ({ finalAnswer, onIncrement }) => {
  return (
    <div className="absolute h-24 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
      <div className="flex items-center ml-10">
        <p className="text-5xl px-4 mx-8 font-bold border-2 bg-white" style={{
          color: COLORS.blue,
          borderColor: COLORS.blue,
        }}>
          count
        </p>
        <Button variant="link" onClick={onIncrement} id="increment-button" style={{
          color: COLORS.blue,
        }}>
          <Plus strokeWidth={6} size={48} />
        </Button>
      </div>
      <p className="text-5xl font-bold" style={{
        color: COLORS.blue,
      }}>
        {finalAnswer}
      </p>
    </div>
  );
};