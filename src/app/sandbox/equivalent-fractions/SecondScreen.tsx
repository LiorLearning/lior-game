/**
 * SecondScreen Component
 * 
 * Handles the second interactive screen of the equivalent fractions game.
 * Users continue working with equivalent fractions through bar manipulation.
 */
'use client';

import { Bar } from "./Bar";
import { useSound } from 'use-sound';
import { ArrowBigDown } from 'lucide-react';
import { useGameState } from './state-utils';

export const SecondScreen = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const secondScreenState = gameStateRef.current.secondScreenState;
  const { 
    equation, 
    firstBar, 
    secondBar, 
    currentStep, 
    isCorrect,
  } = secondScreenState;

  const [playBreakSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/chocolate-break.mp3', { volume: 0.5, interrupt: true });
  const [playSelectSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/join.mp3', { volume: 0.5, interrupt: true });

  const handleNextScreen = () => {
    if (gameStateRef.current.currentScreen === 'second1') {
      setGameStateRef((prevState) => ({
        ...prevState,
        currentScreen: 'second2',
        secondScreenState: {
          equation: {
            input: { numerator: 2, denominator: 3 },
            multiplier: { numerator: 0, denominator: 0 },
            output: { numerator: 0, denominator: 9 },
          },
          firstBar: Array(3).fill(null).map((_, i) => (i < 2 ? [1] : [0])),
          secondBar: Array(3).fill([0]),
          currentStep: 1,
          showCorrect: false,
          isCorrect: false,
          selectedPieces: [],
        },
      }));
    } else {
      setGameStateRef((prevState) => ({
        ...prevState,
        currentScreen: 'third',
      }));
    }
  }

  const handleMultiplierChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;
    
    setGameStateRef((prevState) => {
      const updatedState = { ...prevState };
      const secondScreenState = updatedState.secondScreenState;

      if (type === 'denominator') {
        if (numValue === equation.output.denominator / equation.input.denominator) {
          playBreakSound();
          secondScreenState.currentStep = 2;
          secondScreenState.secondBar = Array(equation.input.denominator).fill(null).map(() => 
            Array(equation.output.denominator / equation.input.denominator).fill(0)
          );
        }
        secondScreenState.equation.multiplier.denominator = numValue;
      } else if (type === 'numerator') {
        if (numValue === equation.output.denominator / equation.input.denominator) {
          playSelectSound();
          secondScreenState.currentStep = 3;
          secondScreenState.secondBar = Array(equation.input.denominator).fill(null).map((_, i) => 
            Array(equation.output.denominator / equation.input.denominator).fill(i === 0 ? 1 : 0)
          );
        }
        secondScreenState.equation.multiplier.numerator = numValue;
      } else if (type === 'output_numerator') {
        const expectedNumerator = equation.input.numerator * (equation.output.denominator / equation.input.denominator);
        if (numValue === expectedNumerator) {
          playSelectSound();
          secondScreenState.isCorrect = true;
          secondScreenState.secondBar = Array(equation.input.denominator).fill(null).map((_, i) => 
            Array(equation.output.denominator / equation.input.denominator).fill(i < equation.input.numerator ? 1 : 0)
          );
        }
        secondScreenState.equation.output.numerator = numValue;
      }

      return updatedState;
    });
  };

  const handleBarClick = (partIndex: number, subPartIndex: number) => {
    if (secondScreenState.currentStep < 3) return;
    
    setGameStateRef((prevState) => {
      const updatedState = { ...prevState };
      const secondBar = updatedState.secondScreenState.secondBar;
      
      secondBar[partIndex][subPartIndex] = secondBar[partIndex][subPartIndex] === 1 ? 0 : 1;
      
      return updatedState;
    });

    playSelectSound();
  };

  const renderTopContent = () => {
    switch (secondScreenState.currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 1:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces should you split each piece into?
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 2:</span> So for every 1 piece you got earlier, how many pieces do you get now?
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 3:</span> So how many pieces do you now get in total?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderEquation = () => {
    const baseInputClass = "w-12 h-12 text-xl text-center rounded outline-none transition-all duration-200";
    const enabledInputClass = "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white";
    const disabledInputClass = "bg-gray-100 text-gray-500";
    
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{equation.input.numerator}</span>
          <div className="w-12 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-xl">×</span>
        <div className="flex flex-col items-center">
          {currentStep >= 2 ? (
            <input
              type="text"
              value={equation.multiplier.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 2 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 2}
              maxLength={2}
              placeholder={currentStep === 2 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1"/>
          <input
            type="text"
            value={equation.multiplier.denominator || ''}
            onChange={(e) => handleMultiplierChange(e.target.value, 'denominator')}
            className={`${baseInputClass} mt-1 ${currentStep === 1 ? enabledInputClass : disabledInputClass}`}
            disabled={currentStep !== 1}
            maxLength={2}
            placeholder={currentStep === 1 ? "?" : ""}
          />
        </div>
        <span className="text-xl">=</span>
        <div className="flex flex-col items-center">
          {currentStep >= 3 ? (
            <input
              type="text"
              value={equation.output.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'output_numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 3 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 3 || isCorrect}
              maxLength={2}
              placeholder={currentStep === 3 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.output.denominator}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl h-full mx-auto text-center p-8 bg-[#FFF5EE]">
      <h1 className="text-3xl font-bold mb-8">Equivalent fractions</h1>

      <div className="flex items-center justify-center space-x-6 mb-12">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{equation.input.numerator}</span>
          <div className="w-8 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-5xl font-extralight">=</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">?</span>
          <div className="w-8 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.output.denominator}</span>
        </div>
      </div>

      {renderTopContent()}

      {renderEquation()}
      
      <div className="flex items-center justify-center space-x-6 my-12">
        <Bar 
          parts={firstBar}
          handleClick={() => {}}
        />
        <div className="flex flex-col items-center">
          <span className="text-2xl">{firstBar.flat().filter(x => x === 1).length}</span>
          <div className="w-6 h-[2px] bg-black my-1"/>
          <span className="text-2xl">{equation.input.denominator}</span>
        </div>
      </div>

      
      <div className="mt-8 space-y-8">
        <div className="flex justify-center">
          <ArrowBigDown className="w-20 h-20 text-black fill-black object-contai" />
        </div>

        <div className="w-[calc(100%-80px)] flex items-start">
          <Bar 
            parts={secondBar}
            handleClick={handleBarClick}
          />
        </div>
      </div>

      {isCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Well done!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button 
              onClick={handleNextScreen}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
