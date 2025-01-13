import { Input } from "@/components/custom_ui/input"
import { Check } from 'lucide-react'
import { useEffect } from "react";
import { getInputColor, getState, INCORRECT } from '../utils/helper';

interface FractionInputProps {
  multiplier: number;
  numerator: string;
  denominator: string;
  onNumeratorChange: (value: string) => void;
  onDenominatorChange: (value: string) => void;
  onIncorrect: () => void;
  correctValues?: {
    numerator: string;
    denominator: string;
  };
}

export const FractionInput = ({
  multiplier,
  numerator,
  denominator,
  onNumeratorChange,
  onDenominatorChange,
  onIncorrect,
  correctValues
}: FractionInputProps) => {
  const isCorrect = correctValues &&
    numerator === correctValues.numerator &&
    denominator === correctValues.denominator;
  
  const numeratorColor = getInputColor(numerator, correctValues?.numerator || '');
  const denominatorColor = getInputColor(denominator, correctValues?.denominator || '');
  const numeratorState = getState(numerator, correctValues?.numerator || '');
  const denominatorState = getState(denominator, correctValues?.denominator || '');

  useEffect(() => {
    if (numeratorState === INCORRECT || denominatorState === INCORRECT) {
      onIncorrect();
    }
  }, [numeratorState, denominatorState]);

  return (
    <div className="relative flex flex-col items-center gap-2">
      <Input
        id={`${multiplier}-numerator-input`}
        type="text"
        value={numerator}
        onChange={(e) => onNumeratorChange(e.target.value)}
        className={`w-12 h-12 text-center text-2xl font-bold border rounded-lg`}
        style={{ backgroundColor: numeratorColor }}
        maxLength={1}
      />
      <div className="border-t-2 border-black w-8"></div>
      <Input
        id={`${multiplier}-denominator-input`}
        type="text"
        value={denominator}
        onChange={(e) => onDenominatorChange(e.target.value)}
        className={`w-12 h-12 text-center text-2xl font-bold border rounded-lg`}
        style={{ backgroundColor: denominatorColor }}
        maxLength={2}
      />
    </div>
  );
}; 