import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBarWithFraction } from '../components/chocolate-bar';
import { goToStep, goToScreen } from '../utils/helper';
import ProceedButton from '../components/proceed-button';
import MultiplesGrid from '../components/multiple-grids';
import { Question } from '../components/question';
import { useEffect, useRef, useState } from 'react';


export default function FourthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd, ecd } = gameStateRef.current.state4;
  const [multiplier, setMultiplier] = useState(1);
  const hasGameStarted = useRef(false);

  useEffect(() => {
    if (!hasGameStarted.current) {
      hasGameStarted.current = true;
      sendAdminMessage('agent', `Awesome, let's move to a new question! Our goal is to get the same denominator for ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}. Click the knife and fill in the boxes.`)
    }
  }, []);
  
  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={1} stepText="FIND THE TOTAL PIECES" />
      </div>

      <div className="flex items-center justify-center gap-8 w-full mb-8">
        <ChocolateBarWithFraction fraction={fraction1} multiplier={multiplier} />
      </div>

      <div className="flex items-center justify-center gap-8 w-full mb-8">
        <ChocolateBarWithFraction fraction={fraction2} multiplier={multiplier} />
      </div>

      <div className="flex flex-col items-center justify-center mb-8" style={{
        backgroundColor: COLORS.pinkLight
      }}>
        {/* Notice that we found 2 common denominators. Which is the least one? */}
        <MultiplesGrid 
          fraction1={fraction1}
          fraction2={fraction2}
          lcd={lcd} 
          ecd={ecd} 
          onSuccess={() => {
            goToStep('fourth', setGameStateRef, 1)
            sendAdminMessage('agent', 
              `Great, ${ecd} here is the easiest common denominator. Why? Because you get ${ecd} ` + 
              `by simply multiplying your denominators ${fraction1.denominator} and ${fraction2.denominator}.`
            )
          }} 
          sendAdminMessage={sendAdminMessage}
          onSelectKnife={(multiplier) => setMultiplier(multiplier)}
        />
      </div>

      {step >= 1 &&
        <>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={2} stepText="REFLECT" />
          </div>
          <Question 
            question="How did we find the common denominator?" 
            options={["Multiply denominators directly to get ECD", "Find the LCD and then multiply by the ECD", "Both of the above"]} 
            correctAnswer={2}
            onSuccess={() => goToStep('fourth', setGameStateRef, 2)}
          />
          {step >= 2 && <ProceedButton onClick={() => goToScreen('fifth', setGameStateRef)} />} 
        </>
      
      }
    </div>
  );
}
