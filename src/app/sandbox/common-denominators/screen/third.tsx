import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBar } from '../components/chocolate-bar';
import { Fraction } from '../game-state';
import { useEffect, useRef, useState } from 'react';
import { goToStep, goToScreen, nextStep } from '../utils/helper';
import ProceedButton from '../components/proceed-button';
import MultiplesGrid from '../components/multiple-grids';
import KnifeRow from '../components/knife-row';
import { Question } from '../components/question';

interface TotalPieceGameProps {
  fraction: Fraction;
  rows: number;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  onCorrect: () => void;
  hard?: boolean;
}

const TotalPieceGame = ({ fraction, rows, multiplier, setMultiplier, onCorrect, hard=false }: TotalPieceGameProps) => {
  const handleSelectMultiplier = (multiplier: number) => {
    setMultiplier(multiplier)
    if (multiplier === rows) {
      onCorrect()
    }
  }

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-16 mt-8">
        <div className="flex items-center justify-center gap-8 w-full">
          <div className="w-16"></div>
          <div className="w-[480px]">
            <ChocolateBar 
              pieces={parseInt(fraction.denominator) * multiplier} 
              filledPieces={parseInt(fraction.numerator) * multiplier} 
            />
          </div>
          <div className="flex flex-col items-center w-12">
            <div className="text-2xl font-bold">{parseInt(fraction.numerator) * multiplier}</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-2xl font-bold">{parseInt(fraction.denominator) * multiplier}</div>
          </div>
        </div>

      </div>
      <div className="flex flex-col items-center gap-4 mt-8">
        {Array.from({ length: rows }, (_, index) => (
          <KnifeRow 
            key={index} 
            fraction={fraction} 
            index={index + 1} 
            input={index === 0 ? 'none' : index < rows / 2 ? 'one' : 'two'} 
            onSelectMultiplier={handleSelectMultiplier}
            hard={hard}
          />
        ))}
      </div>
    </div>
  )
}


export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const [multiplier, setMultiplier] = useState(1)
  const { step, fraction1, fraction2, gcd } = gameStateRef.current.state3;
  const hasGameStarted = useRef(false);

  useEffect(() => {
    if (!hasGameStarted.current) {
      hasGameStarted.current = true;
      const fraction1Str = `${fraction1.numerator}/${fraction1.denominator}`;
      const fraction2Str = `${fraction2.numerator}/${fraction2.denominator}`;
      sendAdminMessage('agent', 
        `Awesome, let's move to a new question! ` +
        `Our goal is to get the same denominator for ${fraction1Str} and ${fraction2Str}. ` +
        `Let's start by finding different denominators for ${fraction1Str}. ` +
        'Click the knife and fill in the boxes.'
      )
    }
  }, []);

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={step < 2 ? 1 : 2} stepText="FIND THE TOTAL PIECES" />
      </div>

      {step <= 1 && (
        <TotalPieceGame 
          fraction={fraction1} 
          rows={parseInt(fraction2.denominator)} 
          multiplier={multiplier} 
          setMultiplier={setMultiplier} 
          onCorrect={() => {
            goToStep('third', setGameStateRef, 1)
            sendAdminMessage('agent', "Great job, let's move to step 2")
          }}
        />
      )}
      {step === 1 && <ProceedButton onClick={() => {
        goToStep('third', setGameStateRef, 2)
        setMultiplier(1)
      }} />}
      {step > 1 && (
        <TotalPieceGame 
          fraction={fraction2} 
          rows={parseInt(fraction1.denominator)} 
          multiplier={multiplier} 
          setMultiplier={setMultiplier} 
          onCorrect={() => {
            goToStep('third', setGameStateRef, 3)
            sendAdminMessage('agent', "Great job, let's move to step 3")
          }}
          hard={true}
        />
      )}
      {step > 2 && <ProceedButton onClick={() => {
        goToStep('third', setGameStateRef, 4)
        setMultiplier(1)
        sendAdminMessage('agent', 
          `Here is a summary of all different denominators we got. ` +
          `Multiples of ${fraction1.denominator} give us the different denominators we got for ${fraction1.numerator}/${fraction1.denominator}, ` +
          `and multiples of ${fraction2.denominator} give us the different denominators we got for ${fraction2.numerator}/${fraction2.denominator}. ` +
          `Which one is the common denominator?`
        )
      }} />}
      {step > 3 && 
        <div className="flex flex-col items-center justify-center mb-8" style={{
          backgroundColor: COLORS.pinkLight
        }}>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={3} stepText="REFLECT" />
          </div>

          <MultiplesGrid 
            fraction1={fraction1} 
            fraction2={fraction2} 
            gcd={gcd} 
            onSuccess={() => {
              goToStep('third', setGameStateRef, 5)
              sendAdminMessage('agent', "Great, let's try another one!")
            }} 
            onSelectKnife={(multiplier) => setMultiplier(multiplier)}
            sendAdminMessage={sendAdminMessage}
          />
        </div>
      }
      {step >= 5 && 
        <>
          <Question 
            question="How did we find the common denominator?" 
            options={[
              "Split each chocolate until the denominators matched.", 
              "Picked the greater of the two denominators.",
            ] as const} correctAnswer={0} 
            onSuccess={() => goToStep('third', setGameStateRef, 6)}
          />
          {step >= 6 && <ProceedButton onClick={() => goToScreen('fourth', setGameStateRef)} />} 
        </>
      }
    </div>
  );
}
