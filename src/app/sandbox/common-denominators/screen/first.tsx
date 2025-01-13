import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import KnifeGame from '../components/knife-game';
import ProceedButton from '../components/proceed-button';
import { goToScreen, goToStep } from '../utils/helper';
import { useEffect, useRef } from 'react';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2 } = gameStateRef.current.state1;
  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', 
        "Let's find common denominators—it's like getting two fractions to speak the same " +
        "'chocolate language'! 🍫" +
        `To do this, we'll rewrite ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator} so they have the same number of pieces on ` +
        "the bottom."
      )
    }
  }, []);

  return (
    <div className="mx-auto">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={1} stepText="Create Equivalent Fractions" />
      </div>

      <KnifeGame fraction={fraction1} onCorrect={() => {
        sendAdminMessage('agent', "You're doing great! Each time we split the chocolate, we're creating fractions with different denominators, but the amount of chocolate stays the same.")
        goToStep('first', setGameStateRef, 1)
      }} showKnife={true} sendAdminMessage={sendAdminMessage} />

      {step >= 1 && 
        <ProceedButton onClick={() => {
          goToStep('first', setGameStateRef, 2)
          sendAdminMessage('agent', `Now it’s time to slice ${fraction2.numerator}/${fraction2.denominator}! Before you use the knife, take a shot at entering the fractions.`);
        }} />
      }

      {step >= 2 && 
        <>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={2} stepText="Create Equivalent Fractions" />
          </div>
          <KnifeGame fraction={fraction2} onCorrect={() => {
            goToStep('first', setGameStateRef, 3)
          }} showKnife={false} sendAdminMessage={sendAdminMessage} />
        </>
      }

      {step >= 3 &&
        <ProceedButton onClick={() => {
          goToScreen('second', setGameStateRef)
        }} />
      }
    </div>
  );
}
