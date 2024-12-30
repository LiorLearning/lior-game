// FirstScreen.tsx

'use client';

import { useEffect, useRef } from 'react';
import { Bar } from "./Bar";
import { useSound } from 'use-sound';
import { ArrowBigDown } from 'lucide-react';
import { useGameState } from './state-utils';

interface FirstScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export const FirstScreen = ({ sendAdminMessage }: FirstScreenProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const firstScreenState = gameStateRef.current.firstScreenState;

  const {
    equation,
    firstBar,
    secondBar,
    selectedKnife,
    isCorrect,
    currentStep,
    barNumerator,
    showCorrect,
    canProceed,
  } = firstScreenState;

  const [playBreakSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/chocolate-break.mp3', { volume: 0.5, interrupt: true });
  const [playSelectSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/join.mp3', { volume: 0.5, interrupt: true });

  const fractionNumerator = useRef<HTMLInputElement>(null);
  const denominatorInput = useRef<HTMLInputElement | null>(null);
  const numeratorInput = useRef<HTMLInputElement | null>(null);
  const outputInput = useRef<HTMLInputElement | null>(null);

  // Handler to toggle selection in the first bar
  const handleFirstBarClick = (partIndex: number) => {
    if (currentStep !== 1) return;

    setGameStateRef((prevState) => ({
      ...prevState,
      firstScreenState: {
        ...prevState.firstScreenState,
        firstBar: prevState.firstScreenState.firstBar.map((part, index) =>
          index === partIndex ? [(part[0] === 1 ? 0 : 1)] : part
        ),
      },
    }));
  };

  // Handler to select a knife
  const handleKnifeSelect = (parts: number) => {
    setGameStateRef((prevState) => ({
      ...prevState,
      firstScreenState: {
        ...prevState.firstScreenState,
        selectedKnife: parts,
        secondBar: prevState.firstScreenState.equation.input.denominator
          ? Array(prevState.firstScreenState.equation.input.denominator).fill([0])
          : [],
      },
    }));
  };

  // Handler for clicks on the second bar
  const handleSecondBarClick = (partIndex: number, subPartIndex: number) => {
    if (currentStep > 1 || canProceed) return;

    if (selectedKnife) {
      // Break the clicked part into subparts
      const newSecondBar = secondBar.map((row, idx) =>
        idx === partIndex ? Array(selectedKnife).fill(0) : [...row]
      );

      const total = newSecondBar.reduce((sum, part) => sum + part.length, 0);

      const breakedPart = newSecondBar.filter(part => part.length > 1).length;

      const shouldProceed =
        total === equation.output.denominator && breakedPart === equation.input.denominator;
      
      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          secondBar: newSecondBar,
          canProceed: shouldProceed,
          selectedKnife: shouldProceed ? null : prevState.firstScreenState.selectedKnife,
        },
      }));

      if (selectedKnife) playBreakSound();
    } else {
      // Toggle selection of subparts
      const newSecondBar = secondBar.map((row, idx) =>
        idx === partIndex
          ? row.map((subpart, sIdx) =>
              sIdx === subPartIndex ? (subpart === 1 ? 0 : 1) : subpart
            )
          : [...row]
      );

      const totalSelected = newSecondBar.reduce(
        (sum, part) => sum + part.filter(subpart => subpart === 1).length,
        0
      );

      const expectedSelection =
        equation.input.numerator * (equation.output.denominator / equation.input.denominator);

      const shouldProceed = totalSelected === expectedSelection;

      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          secondBar: newSecondBar,
          canProceed: shouldProceed,
        },
      }));

      playSelectSound();
    }
  };

  // Handler for fraction numerator change
  const handleSecondBarFractionChange = (value: string) => {
    const numValue = parseInt(value) || 0;

    setGameStateRef((prevState) => ({
      ...prevState,
      firstScreenState: {
        ...prevState.firstScreenState,
        barNumerator: value,
        showCorrect: numValue === equation.input.numerator * (equation.output.denominator / equation.input.denominator),
      },
    }));

    if (numValue === equation.input.numerator * (equation.output.denominator / equation.input.denominator)) {
      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          showCorrect: true,
        },
      }));
    }
  };

  // Handler for multiplier changes
  const handleMultiplierChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;

    setGameStateRef((prevState) => {
      const updatedEquation = { ...prevState.firstScreenState.equation };
      if (type === 'denominator') {
        updatedEquation.multiplier.denominator = numValue;

        if (numValue === updatedEquation.output.denominator / updatedEquation.input.denominator) {
          return {
            ...prevState,
            firstScreenState: {
              ...prevState.firstScreenState,
              equation: updatedEquation,
              currentStep: 4,
              firstBar: Array(updatedEquation.input.denominator)
                .fill(0)
                .map((_, i) => (i === 0 ? [1] : [0])),
              secondBar: Array(updatedEquation.input.denominator)
                .fill(null)
                .map(() => Array(updatedEquation.output.denominator / updatedEquation.input.denominator).fill(1)),
            },
          };
        }
      } else if (type === 'numerator') {
        updatedEquation.multiplier.numerator = numValue;

        if (numValue === updatedEquation.output.denominator / updatedEquation.input.denominator) {
          return {
            ...prevState,
            firstScreenState: {
              ...prevState.firstScreenState,
              equation: updatedEquation,
              currentStep: 5,
              firstBar: Array(updatedEquation.input.denominator)
                .fill(0)
                .map((_, i) => (i < updatedEquation.input.numerator ? [1] : [0])),
              secondBar: Array(updatedEquation.input.denominator)
                .fill(null)
                .map(() => Array(updatedEquation.output.denominator / updatedEquation.input.denominator).fill(1)),
            },
          };
        }
      } else if (type === 'output_numerator') {
        updatedEquation.output.numerator = numValue;

        const expectedNumerator =
          updatedEquation.input.numerator * (updatedEquation.output.denominator / updatedEquation.input.denominator);

        if (numValue === expectedNumerator) {
          sendAdminMessage('user', 'Completed first equation successfully!');
          return {
            ...prevState,
              firstScreenState: {
              ...prevState.firstScreenState,
              equation: updatedEquation,
              isCorrect: true,
            },
          };
        }
      }

      return {
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          equation: updatedEquation,
        },
      };
    });
  };

  // Focus management based on current step
  useEffect(() => {
    if (currentStep === 2 && fractionNumerator.current) {
      fractionNumerator.current.focus();
    } else if (currentStep === 3 && denominatorInput.current) {
      denominatorInput.current.focus();
    } else if (currentStep === 4 && numeratorInput.current) {
      numeratorInput.current.focus();
    } else if (currentStep === 5 && outputInput.current) {
      outputInput.current.focus();
    }
  }, [currentStep]);

  // Handler to proceed to the next step
  const handleProceed = () => {
    if (currentStep === 0) {
      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          currentStep: 1,
          canProceed: false,
        },
      }));
    } else if (currentStep === 1) {
      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          currentStep: 2,
          canProceed: false,
        },
      }));
    } else if (currentStep === 2) {
      setGameStateRef((prevState) => ({
        ...prevState,
        firstScreenState: {
          ...prevState.firstScreenState,
          currentStep: 3,
          canProceed: false,
        },
      }));
    }
  };

  // Render content based on the current step
  const renderTopContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <p className="text-left mb-6">
              How many pieces would you get if this chocolate were broken into {equation.output.denominator} pieces?
            </p>
            <div className="text-left">
              <p className="mb-6">
                <span className="font-bold">Step 1:</span> Let's try breaking the chocolate into {equation.output.denominator} pieces first.
              </p>
              <p className="italic mb-4">Pick a suitable knife to split each piece!</p>
            </div>
          </>
        );
      case 1:
        return (
          <div className="text-left">
            <p className="font-bold">Awesome!</p>
            <p className="mb-6">
              <span className="font-bold">Step 2:</span> Select pieces to get the same amount of chocolate as above!
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 3:</span> So how many pieces do you get in total?
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 4:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces did your knife split each piece into?
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 5:</span> So for every 1 piece you got earlier, how many pieces do you get now?
            </p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 6:</span> Great, so how many pieces do you get in total?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Render the downward arrow icon
  const rendermiddleContent = () => {
    return (
      <div className="flex justify-center">
        <ArrowBigDown className="w-20 h-20 text-black fill-black object-contain" />
      </div>
    );
  };

  // Render the equation with interactive inputs
  const renderEquation = () => {
    if (currentStep < 3) return null;

    const baseInputClass = "w-12 h-12 text-xl text-center rounded outline-none transition-all duration-200";
    const enabledInputClass = "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white";
    const disabledInputClass = "bg-gray-100 text-gray-500";

    return (
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{equation.input.numerator}</span>
          <div className="w-12 h-[2px] bg-black my-1" />
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-xl">×</span>
        <div className="flex flex-col items-center">
          {currentStep >= 4 ? (
            <input
              type="text"
              value={equation.multiplier.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 4 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 4}
              ref={numeratorInput}
              maxLength={2}
              placeholder={currentStep === 4 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1" />
          <input
            type="text"
            value={equation.multiplier.denominator || ''}
            onChange={(e) => handleMultiplierChange(e.target.value, 'denominator')}
            className={`${baseInputClass} mt-1 ${currentStep === 3 ? enabledInputClass : disabledInputClass}`}
            disabled={currentStep !== 3}
            ref={denominatorInput}
            maxLength={2}
            placeholder={currentStep === 3 ? "?" : ""}
          />
        </div>
        <span className="text-xl">=</span>
        <div className="flex flex-col items-center">
          {currentStep >= 5 ? (
            <input
              type="text"
              value={equation.output.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'output_numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 5 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 5 || isCorrect}
              ref={outputInput}
              maxLength={2}
              placeholder={currentStep === 5 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1" />
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
          <div className="w-8 h-[2px] bg-black my-1" />
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-5xl font-extralight">=</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">?</span>
          <div className="w-8 h-[2px] bg-black my-1" />
          <span className="text-3xl font-bold">{equation.output.denominator}</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Step content */}
        <div className="">
          {renderTopContent()}
          {renderEquation()}
        </div>

        {/* First bar */}
        <div className="w-full flex items-center">
          <Bar
            parts={firstBar}
            handleClick={handleFirstBarClick}
          />
          <div className="ml-4 w-[50px]">
            <div className="flex flex-col items-center">
              <span className="text-2xl">{firstBar.flat().filter(x => x === 1).length}</span>
              <div className="w-6 h-[2px] bg-black my-1" />
              <span className="text-2xl">{equation.input.denominator}</span>
            </div>
          </div>
        </div>

        {/* Middle content */}
        <div className="space-y-4">
          {rendermiddleContent()}
        </div>

        {/* Second bar */}
        <div className="w-full flex items-start">
          <Bar
            parts={secondBar}
            handleClick={handleSecondBarClick}
          />
          <div className={`ml-4 w-[50px] h-full flex flex-col space-y-2 ${canProceed ? 'opacity-50 pointer-events-none' : ''}`}>
            {currentStep === 0 ? (
              <>
                <button
                  onClick={() => {
                    setGameStateRef({
                      firstScreenState: {
                        ...firstScreenState,
                        selectedKnife: null,
                        secondBar: Array(equation.input.denominator).fill([0]),
                        isCorrect: false,
                        currentStep: 0,
                      },
                    });
                  }}
                  className="w-16 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
                >
                  Reset
                </button>
                {[2, 3, 5].map((parts) => (
                  <button
                    key={parts}
                    onClick={() => handleKnifeSelect(parts)}
                    disabled={currentStep !== 0}
                    className={`
                      w-16 py-2 bg-gray-200 rounded flex items-center justify-between px-3
                      ${selectedKnife === parts ? 'bg-gray-300' : 'hover:bg-gray-300'}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-200
                    `}
                  >
                    <span className="text-2xl">🔪</span>
                    <span className="text-lg">{parts}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl">
                  {currentStep >= 2 ? (
                    <input
                      type="text"
                      value={barNumerator}
                      onChange={(e) => handleSecondBarFractionChange(e.target.value)}
                      className="w-8 h-8 text-xl text-center rounded outline-none transition-all duration-200
                        bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white
                        disabled:bg-gray-100 disabled:text-gray-500"
                      disabled={currentStep !== 2 || showCorrect}
                      ref={fractionNumerator}
                      maxLength={2}
                      placeholder="?"
                    />
                  ) : '?'}
                </span>
                <div className="w-6 h-[2px] bg-black my-1" />
                <span className="text-2xl">{equation.output.denominator}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentStep <= 2 && canProceed && (
        <div className="mt-4">
          <button
            onClick={handleProceed}
            className="bg-[#2E7D32] text-white px-6 py-2 rounded hover:bg-[#1B5E20] transition-colors"
          >
            Proceed →
          </button>
        </div>
      )}

      {showCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Correct!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button
              onClick={() => {
                setGameStateRef((prevState) => ({
                  ...prevState,
                  firstScreenState: {
                    ...prevState.firstScreenState,
                    showCorrect: false,
                    currentStep: 3,
                    firstBar: Array(equation.input.denominator).fill(null).map(() => [0]),
                    secondBar: Array(equation.input.denominator).fill(null).map(() =>
                      Array(equation.output.denominator / equation.input.denominator).fill(0)
                    ),
                  },
                }));
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {isCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Correct!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button
              onClick={() => {
                setGameStateRef((prevState) => ({
                  ...prevState,
                  currentScreen: 'second1',
                }));
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
