import LegoGame from '../lego-game/second';
import Header from '../components/header2';
import { useGameState } from '../state-utils';
import { VerifyPiecesAndDivisions, CreateBlocks } from './components/second';
import { ChooseHolder } from '../components/choose-holder';
import { FinalAnswer, CorrectAnswer, StepModule } from './components/first';
import { COLORS } from './constants';
import { nextStep } from '../utils/helper';
import { GameProps } from '../utils/types';
import { userAgent } from 'next/server';
import { useEffect } from 'react';
import { use } from 'react';

const MainContent = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state2;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 1 ? COLORS.pink : step <= 2 ? COLORS.blue : COLORS.purple;
  const stepNumber = step <= 1 ? 1 : step <= 2 ? 2 : 3;
  const stepText = step <= 2 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  const nextScreen = () => {
    setGameStateRef(prev => ({ ...prev, screen: 'third' }));
  };

  return (
    <div className="flex flex-col m-4">
      {step >= 0 && (
        <StepModule screen={step <= 1 ? 'first' : 'second'} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
      )}
      {step === 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center justify-center h-full">
            <div className="text-3xl font-bold text-center my-2">
              Here you go!
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <CorrectAnswer numerator={numerator} denominator={denominator} large={false} nextScreen={nextScreen} />
      )}
    </div>
  );
};


const Footer = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, denomOptions } = gameStateRef.current.state2;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  return (
    <div className="relative">
      {step === 0 && (
        <CreateBlocks />
      )}
      {step === 1 && (
        <>
          <ChooseHolder 
            answer={fraction.denominator} 
            denomOptions={denomOptions} 
            onSuccess={() => {nextStep('second', setGameStateRef)}} 
            sendAdminMessage={sendAdminMessage}
          />
          <div className="text-center mt-4">
            <span className="text-3xl font-bold block mb-2">Now choose the holder</span>
            <span className="text-2xl text-gray-600">Hint: Number of Divisions should be same as denominator</span>
          </div>
        </>
      )}
      {step === 2 && (
        <VerifyPiecesAndDivisions />
      )}
      {step === 3 && (
        <>
          <div className="text-center text-3xl font-bold mt-8 space-y-2">
            <span>Number of Legos <span className="text-purple-500">÷</span> Number of Divisions</span>
          </div>
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
            <FinalAnswer numerator={numerator} denominator={denominator} nextStep={() => nextStep('second', setGameStateRef)} sendAdminMessage={sendAdminMessage} />
          </div>
        </>
      )}
    </div>
  );
};


export default function SecondScreen({sendAdminMessage}: GameProps) {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state2;

    useEffect(() => {
      if (step === 0) {
        sendAdminMessage('agent', "Numerator is the number of legos needed, and denominator is the size of the legos");
      }
    }, [step]);

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
        <MainContent />
        {step <= 5 && step !== 3 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
        <Footer sendAdminMessage={sendAdminMessage} />
      </div>
    )
  }