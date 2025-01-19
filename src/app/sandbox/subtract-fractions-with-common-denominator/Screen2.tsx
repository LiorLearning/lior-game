'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGameState } from './state-utils'
import { StepHeader } from './components/StepHeader'
import { FractionDisplay } from './components/FractionDisplay'
import { useEffect, useRef } from 'react'
import { useSoundEffects } from './sounds'

interface FractionSubtractionProps {
  sendAdminMessage: (role: string, content: string) => void
  onProceed: () => void
}

const STEPS = [
  { id: 1, title: 'DENOMINATOR' },
  { id: 2, title: 'NUMERATOR' },
  { id: 3, title: 'ANSWER' }
];

export default function Screen2({ sendAdminMessage, onProceed }: FractionSubtractionProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {
    currentStep,
    denominatorAnswer,
    numeratorAnswer,
    finalAnswer,
    completedSteps,
    isStep3Correct
  } = gameStateRef.current.screen2State;
  const { fraction1, fraction2 } = gameStateRef.current.questions.question2;
  const soundEffects = useSoundEffects();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sendAdminMessage('agent', `Great, here's another question for you?`);
  },[]);
  
  const handleDenominatorAnswer = (answer: string) => {
    if (answer === 'same') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct! what about the numerator?');
      setGameStateRef(prev => ({
        ...prev,
        screen2State: {
          ...prev.screen2State,
          denominatorAnswer: answer,
          completedSteps: [...prev.screen2State.completedSteps, 1],
          currentStep: 2
        } 
      }));
    } else {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Ah, not quite. What do you think the denominator was before and after subtraction?')
      setGameStateRef(prev => ({
        ...prev,
        screen2State: {
          ...prev.screen2State,
          denominatorAnswer: 'incorrect'
        }
      }));
    }
  }

  const handleNumeratorAnswer = (answer: string) => {
    if (answer === 'subtracted') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct! Now lets solve the problem.');
      setGameStateRef(prev => ({
        ...prev,
        screen2State: {
          ...prev.screen2State,
          numeratorAnswer: answer,
          completedSteps: [...prev.screen2State.completedSteps, 2],
          currentStep: 3
        }
      }));
    } else {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Ah, not quite. What do you think the numerator was before and after subtraction?')
      setGameStateRef(prev => ({
        ...prev,
        screen2State: {
          ...prev.screen2State,
          numeratorAnswer: 'incorrect'
        }
      }));
    }
  }

  const handleFinalAnswerChange = (value: string) => {
    const expectedAnswer = fraction1.numerator - fraction2.numerator;
    const isCorrect = value === String(expectedAnswer);
    
    if (isCorrect && !isStep3Correct) {
      soundEffects.correct.play();
      sendAdminMessage('agent', `Great job, you're really getting a hang of fraction subtraction!`);
    } else if (value !== '' && !isCorrect && isStep3Correct) {
      soundEffects.wrong.play();
    }

    setGameStateRef(prev => ({
      ...prev,
      screen2State: {
        ...prev.screen2State,
        finalAnswer: value,     
        isStep3Correct: isCorrect
      }
    }));
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [currentStep]);

  return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="p-6 bg-[#F9F871] w-full flex items-center justify-center border-b-4 border-black">
        {/* Center - Original fraction display */}
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">Subtract:</span>
          <FractionDisplay
            numerator={fraction1.numerator}
            denominator={fraction1.denominator}
          />
          <span className="text-4xl font-bold">-</span>
          <FractionDisplay
            numerator={fraction2.numerator}
            denominator={fraction2.denominator}
          />
        </div>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-white pt-16 flex flex-col items-center gap-8 overflow-y-auto">
        <div className="flex  items-center gap-4">
            <FractionDisplay
              numerator={fraction1.numerator}
              denominator={fraction1.denominator}
            />
            <span className="text-4xl font-bold">-</span>
            <FractionDisplay
              numerator={fraction2.numerator}
              denominator={fraction2.denominator}
            />
          </div>
        {STEPS.map(step => (
          (completedSteps.includes(step.id) || currentStep === step.id) && (
            <div 
              key={step.id} 
              className="w-full max-w-2xl mb-8 flex flex-col gap-8 items-center"
              ref={currentStep === step.id ? contentRef : undefined}
            >
              <StepHeader step={step.id} title={step.title} />
              {step.id === 1 && (
                <>
                  <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>
                  <p className="text-lg font-bold text-center">
                    How will the denominator (bottom number) change on subtraction?
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleDenominatorAnswer('same')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                        ${denominatorAnswer === 'same'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={completedSteps.includes(1)}
                    >
                      Will remain same
                    </Button>
                    <Button
                      onClick={() => handleDenominatorAnswer('subtracted')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white 
                        ${denominatorAnswer === 'subtracted'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={completedSteps.includes(1)}
                    >
                      Will get subtracted
                    </Button>
                  </div>
                  
                  {denominatorAnswer === 'incorrect' && (
                    <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                      <p className="text-red-700 font-bold">Not quite, try again!</p>
                    </div>
                  )}
                </>
              )}
              {step.id === 2 && (
                <>
                  <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>
                  <p className="text-lg font-bold text-center">
                    How will the numerator (top number) change on subtraction?
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleNumeratorAnswer('same')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white 
                        ${numeratorAnswer === 'same'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={completedSteps.includes(2)}
                    >
                      Will remain the same
                    </Button>
                    <Button
                      onClick={() => handleNumeratorAnswer('subtracted')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                        ${numeratorAnswer === 'subtracted'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={completedSteps.includes(2)}
                    >
                      Will get subtracted
                    </Button>
                  </div>
                  
                  {numeratorAnswer === 'incorrect' && (
                    <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                      <p className="text-red-700 font-bold">Not quite, try again!</p>
                    </div>
                  )}
                </>
              )}
              {step.id === 3 && (
                <div className="flex items-center gap-4">
                  <FractionDisplay
                    numerator={fraction1.numerator}
                    denominator={fraction1.denominator}
                  />
                  <span className="text-4xl font-bold">-</span>
                  <FractionDisplay
                    numerator={fraction2.numerator}
                    denominator={fraction2.denominator}
                  />
                  <span className="text-4xl font-bold">=</span>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="text"
                      value={finalAnswer}
                      onChange={(e) => handleFinalAnswerChange(e.target.value)}
                      className="w-16 h-16 text-2xl font-bold text-center border-2 border-black"
                    />
                    <div className="w-16 border-t-2 border-black"></div>
                    <div className="text-2xl font-bold">{fraction1.denominator}</div>
                  </div>
                </div>
              )}
            </div>
          )
        ))}
        {isStep3Correct && (
        <div className="mt-4 w-full flex flex-col items-center">
          <div 
            className="px-4 py-10 text-3xl w-full text-center bg-[#2EA500] text-white font-bold"
            ref={contentRef}
          >
            Correct 🎉
          </div>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="relative overflow-hidden w-full h-full">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20 + 10}%`,
                    animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                    backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4'][Math.floor(Math.random() * 4)],
                    width: '10px',
                    height: '10px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(200vh) rotate(360deg); }
        }
        .animate-fall {
          animation: fall 6s linear infinite;
        }
      `}</style>
    </div>
  )
}