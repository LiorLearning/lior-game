import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import ProceedButton from '../components/proceed-button';
import { goToStep, goToScreen } from '../utils/helper';
import { ECDSection } from '../components/ecd-section';
import { LCDSection } from '../components/lcd-section';
import { useEffect, useRef } from 'react';


export default function FifthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd } = gameStateRef.current.state5;
  const hasGameStarted = useRef(false);

  useEffect(() => {
    if (!hasGameStarted.current) {
      hasGameStarted.current = true;
      sendAdminMessage('agent', "Try filling in the ECD or Easiest Common Denominator.")
    }
  }, []);

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      
      {/* Step 1 - ECD Section */}
      <ECDSection fraction1={fraction1} fraction2={fraction2} showHelp={true} onSuccess={() => {
        goToStep('fifth', setGameStateRef, 1)
        sendAdminMessage('agent', "Awesome, now let's find the lowest common denominator!")
      }} />
      
      {/* Step 2 - LCD Section */}
      {step >= 1 &&
        // Incorrect response, response of the form: "Try again, what is "X times Y?"
        <LCDSection fraction1={fraction1} fraction2={fraction2} showHelp={true} lcd={lcd} onSuccess={() => goToStep('fifth', setGameStateRef, 2)} />
      }

      {/* Proceed Button */}
      {step >= 2 &&<ProceedButton onClick={() => goToScreen('sixth', setGameStateRef)} />}
    </div>
  );
}