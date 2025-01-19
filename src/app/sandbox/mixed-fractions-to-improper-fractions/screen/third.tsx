import LegoGame from '../lego-game/third';
import Header from '../components/header2';
import { useGameState } from '../state-utils';
import { CorrectAnswer, FinalAnswer, StepModule } from './components/first';
import { Input } from '@/components/custom_ui/input';
import { useEffect, useState } from 'react';
import { COLORS } from './constants';
import { GameProps } from '../utils/types';

const DivisionSteps = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction } = gameStateRef.current.state3;
  const [answer, setAnswer] = useState({numerator: '', denominator: ''});

  const nextStep = () => {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: prev.state3.step + 1 } }));
  }

  const [numCorrect, setNumCorrect] = useState<boolean | null>(null);
  const [denomCorrect, setDenomCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (answer.numerator === '') {
      setNumCorrect(null);
    } else if (parseInt(answer.numerator) === fraction.numerator) {
      setNumCorrect(true);
    } else {
      setNumCorrect(false);
    }

    if (answer.denominator === '') {
      setDenomCorrect(null);
    } else if (parseInt(answer.denominator) === fraction.denominator) {
      setDenomCorrect(true);
    } else {
      setDenomCorrect(false);
    }
  }, [answer, fraction]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mt-4">
        {/* Steps Section */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex items-center gap-4">
            <div className={`bg-white text-red-500 border-8 border-red-500 px-6 py-2 flex items-center justify-center`}>
              <span className="text-2xl font-bold">STEP 1</span>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-3xl mb-2">Number of Lego Pieces</label>
                <Input 
                  type="text" 
                  placeholder="?"
                  className={`
                    w-12 h-12 
                    text-center 
                    border-2 
                    ${numCorrect === true 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : numCorrect === false 
                        ? 'bg-red-100 border-red-500 text-red-700' 
                        : 'border-black text-black'
                    } 
                    text-3xl
                  `}
                  value={answer.numerator}
                  onChange={(e) => setAnswer(prev => ({ ...prev, numerator: e.target.value }))}
                />
                <label className="text-3xl mb-2">(Numerator)</label>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4">
            <div className={`bg-white text-blue-500 border-8 border-blue-500 px-6 py-2 flex items-center justify-center`}>
              <span className="text-2xl font-bold">STEP 2</span>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-3xl mb-2">Number of Divisions</label>
                <Input 
                  type="text" 
                  placeholder="?"
                  className={`
                    w-12 h-12 
                    text-center 
                    border-2 
                    ${denomCorrect === true 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : denomCorrect === false 
                        ? 'bg-red-100 border-red-500 text-red-700' 
                        : 'border-black text-black'
                    } 
                    text-3xl
                  `}
                  value={answer.denominator}
                  onChange={(e) => setAnswer(prev => ({ ...prev, denominator: e.target.value }))}
                />
                <label className="text-3xl mb-2">(Denominator)</label>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4">
            <div className={`bg-white text-purple-500 border-8 border-purple-500 px-6 py-2 flex items-center justify-center`}>
              <span className="text-2xl font-bold">STEP 3</span>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-3xl mb-2">Numerator ÷ Denominator</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Division Problem Section */}
      {numCorrect === true && denomCorrect === true && (
        <>
          <div className="flex justify-center mt-8 items-center space-x-4">
            <div className="text-5xl font-bold text-center">
              <span>{fraction.numerator}</span>
            </div>
            <span className="text-5xl text-purple-500">÷</span>
            <div className="text-5xl font-bold text-center">
              <span>{fraction.denominator}</span>
            </div>
          </div>
          <div className="flex justify-center my-16">
            <FinalAnswer numerator={fraction.numerator} denominator={fraction.denominator} nextStep={nextStep} sendAdminMessage={sendAdminMessage} />
          </div>
        </>
      )}
    </div>
  )
}


const MainContent = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef } = useGameState();
  const { fraction, step } = gameStateRef.current.state3;

  return (
    <div className="flex flex-col m-4">
      {step === 0 && (
        <DivisionSteps sendAdminMessage={sendAdminMessage} />
      )}
      {step === 1 && (
        <>
          <StepModule screen='second' color={COLORS.purple} stepNumber={3} stepText='THE ANSWER' />
          <CorrectAnswer numerator={fraction.numerator} denominator={fraction.denominator} large={false} />
        </>
      )}
    </div>
  );
};


export default function ThirdScreen({sendAdminMessage}: GameProps) {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state3;

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
        <MainContent sendAdminMessage={sendAdminMessage} />
        {step === 1 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
      </div>
    )
  }
  
  