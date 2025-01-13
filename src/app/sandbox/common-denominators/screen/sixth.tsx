import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { goToStep } from '../utils/helper';
import SuccessAnimation from '@/components/utils/success-animate';
import { ECDSection } from '../components/ecd-section';
import { LCDSection } from '../components/lcd-section';
import { useEffect } from 'react';
import { useRef } from 'react';


export default function SixthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd } = gameStateRef.current.state6;
  const hasGameStarted = useRef(false);

  useEffect(() => {
    if (!hasGameStarted.current) {
      hasGameStarted.current = true;
      sendAdminMessage('agent', "Let's try another one, without any hints this time!")
    }
  }, []);

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      
      {/* Step 1 - ECD Section */}
      {/* Incorrect */}
      {/* How will you find the ECD? Remember, you can multiply denominators to find the ECD. */}
      <ECDSection fraction1={fraction1} fraction2={fraction2} onSuccess={() => goToStep('sixth', setGameStateRef, 1)} />
      
      {/* Step 2 - LCD Section */}
      {/* Incorrect response: "You're entering the Xth multiple of 4. What is 4 times X" */}
      {step >= 1 &&
        <LCDSection fraction1={fraction1} fraction2={fraction2} lcd={lcd} onSuccess={() => {
          goToStep('sixth', setGameStateRef, 2)
          sendAdminMessage('agent', "Awesome, you're a master at finding common denominators now!")
        }} />
      }
      {/* Proceed Button */}
      {step >= 2 && <SuccessAnimation />}
    </div>
  );
}