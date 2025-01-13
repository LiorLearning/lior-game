import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBarWithFraction } from '../components/chocolate-bar';
import { Fraction } from '../game-state';
import { getInputColor, goToScreen, goToStep } from '../utils/helper';
import ProceedButton from '../components/proceed-button'
import { FractionComponent } from '../components/fraction';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/custom_ui/input';

function SelectableChocolateBars({ fraction, selected, onSelect, id }: { fraction: Fraction, selected: boolean, onSelect: () => void, id: number }) {
  return (
    <div key={`chocolate-bar-${id}`} id={id.toString()} className="flex items-center justify-center gap-8 w-full">
      <div className="w-16"></div>
      <ChocolateBarWithFraction fraction={fraction} selectable={true} selected={selected} onSelect={onSelect} />
    </div>
  )
}

interface ChocolateBarOptionsProps {
  fraction: Fraction;
  chocolateFractions: Fraction[];
  selectedChocolate: boolean[];
  onSelect: (index: number) => void;
  onVerify: () => void;
}

function ChocolateBarOptions({ fraction, chocolateFractions, selectedChocolate, onSelect }: ChocolateBarOptionsProps) {
  return (
    <div className="w-full flex flex-col items-center mt-8 mb-8">
      <div className="flex items-center">
        <FractionComponent fraction={fraction} size="large" />
        <div className="flex flex-col gap-8">
          {chocolateFractions.map((fraction, index) => (
            <SelectableChocolateBars 
              key={`selectable-chocolate-bar-${index}`}
              fraction={fraction} 
              selected={selectedChocolate[index]} 
              onSelect={() => onSelect(index)} 
              id={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function AnswerForm() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2, lcd } = gameStateRef.current.state2;
  const [answer, setAnswer] = useState('');

  const verifyAnswer = () => {
    if (answer === lcd.toString()) {
      goToScreen('third', setGameStateRef);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center mb-16" style={{ 
      backgroundColor: COLORS.pinkLight
    }}>
      <div className="flex flex-col items-center justify-center m-8">
        <h1 className="text-4xl flex items-center justify-center gap-4">
          Common Denominator of
          <div className="bg-white px-4 py-2 inline-flex flex-col items-center">
            <span>{fraction1.numerator}</span>
            <div className="w-4 h-px bg-black" />
            <span>{fraction1.denominator}</span>
          </div>
          &
          <div className="bg-white px-4 py-2 inline-flex flex-col items-center">
            <span>{fraction2.numerator}</span>
            <div className="w-4 h-px bg-black" />
            <span>{fraction2.denominator}</span>
          </div>
          is
          <Input 
            type="text" 
            className={`w-16 h-16 text-center border border-black ${answer === lcd.toString() ? 'bg-green-200' : ''}`}
            style={{ backgroundColor: getInputColor(answer, lcd.toString()) }}
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
          />
        </h1>
      </div>
      <ProceedButton text="VERIFY" onClick={verifyAnswer} />
    </div>
  )
}


export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { 
    step, 
    fraction1, 
    fraction2, 
    chocolateFractions1,
    chocolateFractions2,
  } = gameStateRef.current.state2;

  const hasGameStarted = useRef(false);

  const [selectedChocolate1, setSelectedChocolate1] = useState<boolean[]>([ false, false, false ]);
  const [selectedChocolate2, setSelectedChocolate2] = useState<boolean[]>([ false, false, false ]);
  const [incorrect, setIncorrect] = useState(false);

  const verifySelections = () => {
    const selected1 = selectedChocolate1.filter(Boolean);
    const selected2 = selectedChocolate2.filter(Boolean);

    if (selected1.length === 1 && selected2.length === 1) {
      const idx1 = selectedChocolate1.findIndex(Boolean);
      const idx2 = selectedChocolate2.findIndex(Boolean);

      if (chocolateFractions1[idx1].denominator === chocolateFractions2[idx2].denominator) {
        setIncorrect(false);
        goToStep('second', setGameStateRef, 1);
      } else {
        setIncorrect(true);
        sendAdminMessage('agent', "Hmmm, let's give that another try!");
        sendAdminMessage('admin', "Diagnose socratically and ask user where did they go wrong and tell them to find the frations with the same denominator");
      }
    } else {
      setIncorrect(true);
      sendAdminMessage('agent', "Hmmm, let's give that another try!");
      sendAdminMessage('admin', "Diagnose socratically and ask user where did they go wrong and tell them to find the frations with the same denominator");
    }
  }

  useEffect(() => {
    if (!hasGameStarted.current) {
      hasGameStarted.current = true;
      sendAdminMessage('agent', `We've created versions of ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}. Which of these versions have the same denominator?`)
    }
  }, []);
  

  return (
    <div className="mx-auto">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={3} stepText="Select chocolate with same denominator" />
      </div>

      <div className="flex flex-col items-center justify-center m-8">
        <span className="text-2xl font-bold">Select the chocolate bars that have the same denominator.</span>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 mt-16" style={{ 
        backgroundColor: COLORS.pinkLight
      }}>
        <ChocolateBarOptions 
          fraction={fraction1}
          chocolateFractions={chocolateFractions1} 
          selectedChocolate={selectedChocolate1} 
          onSelect={(index) => setSelectedChocolate1(prev => {
            const newSelectedChocolate = [...prev];
            newSelectedChocolate[index] = !newSelectedChocolate[index];
            return newSelectedChocolate;
          })}
          onVerify={verifySelections}
        />
      </div>
        
      <div className="flex flex-col items-center justify-center mb-8" style={{ 
        backgroundColor: COLORS.lightYellow
      }}>
        <ChocolateBarOptions 
          fraction={fraction2}
          chocolateFractions={chocolateFractions2} 
          selectedChocolate={selectedChocolate2} 
          onSelect={(index) => setSelectedChocolate2(prev => {
            const newSelectedChocolate = [...prev];
            newSelectedChocolate[index] = !newSelectedChocolate[index];
            return newSelectedChocolate;
          })}
          onVerify={verifySelections}
        />
      </div>

      <ProceedButton text="VERIFY" onClick={verifySelections} color={incorrect ? COLORS.red : COLORS.pink} />

      {step >= 1 && (
        <AnswerForm />
      )}
    </div>
  );
}
