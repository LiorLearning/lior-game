import { useState, useEffect } from 'react';
import { Button } from "@/components/custom_ui/button";
import { FractionInput } from './fraction-input';
import { ChocolateBar } from './chocolate-bar';
import { Fraction } from '../game-state';
import { BaseProps } from '../utils/types';

interface ChocolateRowProps extends BaseProps {
  multiplier: number;
  originalFraction: Fraction;
  onCorrect: () => void;
  showKnife: boolean;
}

export const ChocolateRow = ({ multiplier, originalFraction, onCorrect, showKnife, sendAdminMessage }: ChocolateRowProps) => {
  const [multiplierSelected, setMultiplierSelected] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const multipliedPieces = parseInt(originalFraction.denominator) * multiplier;
  const multipliedFilled = parseInt(originalFraction.numerator) * multiplier;
  
  const correctFraction = {
    numerator: (parseInt(originalFraction.numerator) * multiplier).toString(),
    denominator: (parseInt(originalFraction.denominator) * multiplier).toString()
  };
  
  const [inputFraction, setInputFraction] = useState<Fraction>({
    numerator: '',
    denominator: ''
  });

  const handleDenominatorChange = (value: string) => {
    setInputFraction(prev => ({ ...prev, denominator: value }));
  };

  const handleNumeratorChange = (value: string) => {
    setInputFraction(prev => ({ ...prev, numerator: value }));
  };

  const handleIncorrect = () => {
    setIncorrect(true);
    sendAdminMessage('agent', "Hmmm, let's give that another try!");
    sendAdminMessage('admin', "The user has answered incorrectly. Using the image, user actions and game description, identify the correct current state and diagnose socratically with a response highly contextual to the game. Avoid giving general responses. Instead, ask the user to perform an action in the game.");
  }

  const updatedFraction = {
    ...inputFraction,
    multiplier: multiplier,
    onDenominatorChange: handleDenominatorChange,
    onNumeratorChange: handleNumeratorChange,
    correctValues: correctFraction,
    onIncorrect: handleIncorrect
  };

  useEffect(() => {
    if (
      inputFraction.numerator === correctFraction.numerator && 
      inputFraction.denominator === correctFraction.denominator
    ) {
      onCorrect();
    }
  }, [inputFraction]);

  const handleMultiplierClick = () => setMultiplierSelected(true);

  return (
    <div className="flex items-center justify-center gap-8">
      <Button
        id={`${multiplier}-knife-button`}
        onClick={handleMultiplierClick}
        disabled={!showKnife && !incorrect}
        className={`rounded-lg w-16 h-16 flex items-center justify-center ${
          multiplierSelected ? 'bg-[#2EA500]' : 'bg-[#DDDDDD]'
        } hover:${multiplierSelected ? 'bg-[#2EA500]/90' : 'bg-[#DDDDDD]/90'} ${
          !showKnife && !incorrect ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="text-2xl">🔪</span>
          <span className="text-xl text-black mb-4">{multiplier}</span>
        </div>
      </Button>
      
      <div className="w-[480px]">
        {!multiplierSelected ? (
          <ChocolateBar 
            pieces={parseInt(originalFraction.denominator)} 
            filledPieces={parseInt(originalFraction.numerator)} 
          />
        ) : (
          <ChocolateBar 
            pieces={multipliedPieces} 
            filledPieces={multipliedFilled} 
          />
        )}
      </div>
      
      <FractionInput {...updatedFraction} />
    </div>
  );
}; 