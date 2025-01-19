import React from 'react';
import { sounds } from '../utils/sounds';
import { Triangle } from 'lucide-react';

interface ProceedProps {
  onComplete: () => void;
}

const Proceed: React.FC<ProceedProps> = ({ onComplete }) => {
  return (
    <button
      onClick={() => {
        sounds.button();
        onComplete();
      }}

      className="flex gap-2 font-bold text-2xl justify-center items-center bg-transparent hover:bg-transparent"
    >
      PROCEED
      <Triangle className="w-8 h-8 text-green-500 fill-green-500 rotate-90" />
    </button>
  );
};

export default Proceed; 