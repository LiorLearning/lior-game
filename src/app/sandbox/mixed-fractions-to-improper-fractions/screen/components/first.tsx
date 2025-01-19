import { Input } from "@/components/custom_ui/input";
import { Button } from "@/components/custom_ui/button";
import { useState } from "react";
import { StepForwardIcon } from "lucide-react";
import { COLORS } from "../constants";

interface FinalAnswerProps {
  numerator: number;
  denominator: number;
  nextStep: () => void;
  sendAdminMessage: (agent: string, message: string) => void;
}


export const FinalAnswer = ({ numerator, denominator, nextStep, sendAdminMessage }: FinalAnswerProps) => {
  const [mixedFraction, setMixedFraction] = useState({integer: '', numerator: '', denominator: ''});

  const handleIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, integer: inputValue }));
  }; 

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, numerator: inputValue }));
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, denominator: inputValue }));
  };

  const verifyMixedFraction = () => {
    const expectedNumerator = parseInt(mixedFraction.integer) * parseInt(mixedFraction.denominator) + parseInt(mixedFraction.numerator);
    const expectedDenominator = parseInt(mixedFraction.denominator);
    const expectedWhole = Math.floor(numerator / denominator);
    const expectedRemainder = numerator % denominator;
    if (
      expectedNumerator === numerator && 
      expectedDenominator === denominator && 
      parseInt(mixedFraction.numerator) < parseInt(mixedFraction.denominator)
    ) {
      sendAdminMessage('agent', `Wow, you nailed it! Your guess was spot on ${expectedWhole} whole and ${expectedRemainder}/${denominator}ths leftover. Great job!`);
    } else {
      sendAdminMessage('agent', `Oops, close call! The right answer is ${expectedWhole} whole and ${expectedRemainder}/${denominator}ths. Better luck next time!`);
    }
    nextStep();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-4 mt-4">
        <div className="border-4 border-purple-500 p-4 rounded-lg flex flex-col items-center justify-center shadow-[-3px_3px_0px_black]">
          <Input 
            type="text" 
            value={mixedFraction.integer} 
            placeholder="?"
            onChange={handleIntegerChange} 
            className="w-12 h-12 text-center text-purple-500 text-3xl mb-2 border-4 shadow-[-3px_3px_0px_black] border-purple-500 rounded-md"
          />
          <div className="text-xl font-bold">Wholes</div>
        </div>

        <div className="border-4 border-green-500 p-4 rounded-lg shadow-[-3px_3px_0px_black]">
          <div className="flex flex-col items-center">
            <Input 
              type="text" 
              value={mixedFraction.numerator} 
              placeholder="?"
              onChange={handleNumeratorChange} 
              className="w-12 h-12 text-center text-green-500 text-3xl border-4 shadow-[-3px_3px_0px_black] border-green-500 rounded-md"
            />
            <div className="w-full h-1 bg-black my-2" />
            <Input 
              type="text" 
              value={mixedFraction.denominator} 
              placeholder="?"
              onChange={handleDenominatorChange} 
              className="w-12 h-12 text-center text-green-500 text-3xl border-4 shadow-[-3px_3px_0px_black] border-green-500 rounded-md"
            />
            <div className="text-xl font-bold">Fraction</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-4">
        <Button 
          className="text-white px-6 py-3 mx-2 text-xl rounded-none shadow-[-5px_5px_0px_black]" 
          style={{ backgroundColor: COLORS.pink }}
          onClick={verifyMixedFraction}
        >
          Verify
        </Button>
      </div>
    </div>
  )
}


interface CorrectAnswerProps {
  numerator: number;
  denominator: number;
  large: boolean;
  nextScreen?: () => void;
}

export const CorrectAnswer = ({ numerator, denominator, large, nextScreen }: CorrectAnswerProps) => {
  const textSize = large ? 'text-8xl' : 'text-6xl';
  const marginTop = large ? 'mt-48' : 'mt-4';
  const marginBottom = large ? 'my-16' : 'my-8';

  return (
    <>
      <div className={`flex justify-center ${marginTop}`}>
        <div className="flex items-center justify-center h-full">
          <div className={`${textSize} font-bold text-center ${marginBottom} mx-4`}>
            <span>{Math.floor(numerator / denominator)}</span>
          </div>
        </div>
        <div className={`${textSize} font-bold text-center mx-2`}>
          <span>{numerator % denominator}</span>
          <div className="w-full h-px bg-black my-2" />
          <span>{denominator}</span>
        </div>
      </div>
      <div className={`flex justify-center text-6xl ${large ? 'mt-8' : 'mt-4'} text-green-500`}>
        <span>Correct Answer</span>
      </div>
      <div className={`flex justify-center ${large ? 'mt-16' : 'mt-4'}`}>
        {nextScreen && (
          <Button className="text-black px-6 py-3 mx-2 text-3xl shadow-lg rounded-none bg-white" onClick={nextScreen}>
            PROCEED
            <StepForwardIcon className="inline-block ml-2 text-green-500" />
          </Button>
        )}
      </div>
    </>
  )
}


interface StepModuleProps {
  screen: string;
  color: string;
  stepNumber: number;
  numerator?: number;
  denominator?: number;
  stepText: string;
}

export const StepModule = ({ screen, color, stepNumber, numerator, denominator, stepText }: StepModuleProps) => {
  return (
    <div className="flex items-stretch justify-center gap-4">
      <div className={`bg-white border-8 px-6 py-2 flex items-center justify-center`} style={{ color: color, borderColor: color }}>
        <span className="text-2xl font-bold">STEP {stepNumber}</span>
      </div>
      <div className={`flex-1 border-8 flex items-center max-w-xl`} style={{ color: color, borderColor: color, backgroundColor: color }}>
        <h2 className="text-white text-2xl font-bold flex items-center gap-4 mx-auto">
          {screen === 'first' && numerator && denominator && (
            <>
              <span>CREATE</span>
              <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                <span>{numerator}</span>
                <div className="w-3 h-px bg-black" />
                <span>{denominator}</span>
              </div>
              <span>LEGO BLOCKS</span>
            </>
          )}
          {screen === 'second' && (
            <div className="flex items-center justify-center my-4">
              <span>{stepText}</span>
            </div>
          )}
        </h2>
      </div>
    </div>
  )
}