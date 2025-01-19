import React from 'react';
import { Triangle } from 'lucide-react';

interface ProceedProps {
  onComplete: () => void;
  text?: string;
}

const Proceed = ({ onComplete = () => {}, text = 'PROCEED' }: ProceedProps) => {
  return (
    <button
      onClick={() => {
        onComplete();
      }}

      className="flex gap-2 font-bold text-2xl justify-center max-w-xs mx-auto px-8 py-2 text-white shadow-[-5px_5px_1px_rgba(0,0,0,1)] items-center bg-red-500 hover:bg-red-600"
    >
      {text}
    </button>
  );
};

export default Proceed; 