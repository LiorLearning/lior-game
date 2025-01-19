'use client'

import { useEffect } from 'react'
import { useGameState } from './state-utils'

interface DenominatorScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export function DenominatorScreen({ sendAdminMessage }: DenominatorScreenProps) {
  const { gameStateRef, setGameStateRef } = useGameState()
  const gameState = gameStateRef.current
  const { question2, denominatorScreen } = gameState
  const { fraction1, fraction2 } = question2
  const {
    denominatorOption,
    numeratorOption,
    answerNumerator,
    answerDenominator,
    showStep2,
    isAnswerCorrect,
  } = denominatorScreen

  const correctAnswer = {
    numerator : fraction1.numerator + fraction2.numerator,
    denominator: fraction1.denominator 
  }

  useEffect(() => {
    setGameStateRef({
      denominatorScreen: {
        ...denominatorScreen,
        showStep3: showStep2 && numeratorOption === 0,
      },
    })
  }, [showStep2, numeratorOption])

  const handleDenominatorOptionClick = (option: number) => {
    if (option === 0){
      
      setGameStateRef({
        denominatorScreen: {
          ...denominatorScreen,
          showStep2: true,
        },
      })
    }
    setGameStateRef({
      denominatorScreen: {
        ...denominatorScreen,
        denominatorOption: option,
      },
    })
  }

  const handleNumeratorOptionClick = (option: number) => {
    if (option === 0){
      setGameStateRef({
        denominatorScreen: {
          ...denominatorScreen,
          showStep3: true,
        },
      })
    } 
    setGameStateRef({
      denominatorScreen: {
        ...denominatorScreen,
        numeratorOption: option,
      },
    })
  }

  const handleAnswerNumeratorChange = (value: string) => {
    if (value === correctAnswer.numerator.toString() && answerDenominator === correctAnswer.denominator.toString()){
      setGameStateRef({
        denominatorScreen: {
          ...denominatorScreen,
          isAnswerCorrect: true,
        },
      })
    }
    setGameStateRef({
      denominatorScreen: {
        ...denominatorScreen,
        answerNumerator: value,
      },
    })
  }

  const handleAnswerDenominatorChange = (value: string) => {

    if (answerNumerator === correctAnswer.numerator.toString() && value === correctAnswer.denominator.toString()){
      setGameStateRef({
        denominatorScreen: {
          ...denominatorScreen,
          isAnswerCorrect: true,
        },
      })
    }
    setGameStateRef({
      denominatorScreen: {
        ...denominatorScreen,
        answerDenominator: value,
      },
    })

  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <h2 className="text-xl font-medium text-center">Add fractions</h2>

        {/* Fraction Problem */}
        <div className="flex items-center justify-center gap-2 text-2xl">
          <div className="flex flex-col items-center">
            <span>{fraction1.numerator}</span>
            <div className="border-t border-black w-4"></div>
            <span>{fraction1.denominator}</span>
          </div>
          <span className="mx-2">+</span>
          <div className="flex flex-col items-center">
            <span>{fraction2.numerator}</span>
            <div className="border-t border-black w-4"></div>
            <span>{fraction2.denominator}</span>
          </div>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">Step 1:</span> Select the right options for the denominator.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleDenominatorOptionClick(0)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${denominatorOption === 0 ? 'bg-[#66CDAA] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
              `}
            >
              <p>The denominator (bottom number) will remain the same.</p>
            </button>
            <button
              onClick={() => handleDenominatorOptionClick(1)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${denominatorOption === 1 ? 'bg-[#F08080] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
            `}
            >
              <p>The denominators (bottom numbers) will be added together.</p>
            </button>
          </div>
        </div>

        {/* Step 2 */}
        {denominatorOption === 0 &&
          <div className={`space-y-4 transition-all duration-500 ease-in-out transform origin-top opacity-100 translate-y-0 block`} >
            <p>
              <span className="font-bold">Step 2:</span> Select the right options for the numerator.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleNumeratorOptionClick(0)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                  ${numeratorOption === 0 ? 'bg-[#66CDAA] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                `}
              >
                <p>The numerators (top numbers) will be added together.</p>
              </button>
              <button
                onClick={() => handleNumeratorOptionClick(1)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                  ${numeratorOption === 1 ? 'bg-[#F08080] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                `}
              >
                <p>The numerator (top number) will remain the same.</p>
              </button>
            </div>
          </div>

        }

        {/* Step 3 */}
        {numeratorOption === 0 &&
          <div className={`space-y-4 transition-all duration-500 ease-in-out transform origin-top opacity-100 translate-y-0`}>
            <p className="font-bold">Step 3</p>
            <div className="flex items-center justify-center gap-2 text-2xl">
              <div className="flex flex-col items-center">
                <span>{fraction1.numerator}</span>
                <div className="border-t border-black w-4"></div>
                <span>{fraction1.denominator}</span>
              </div>
              <span className="mx-2">+</span>
              <div className="flex flex-col items-center">
                <span>{fraction2.numerator}</span>
                <div className="border-t border-black w-4"></div>
                <span>{fraction2.denominator}</span>
              </div>
              <span className="mx-2">=</span>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={answerNumerator}
                  onChange={(e) => handleAnswerNumeratorChange(e.target.value)}
                  className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                    ${answerNumerator === correctAnswer.numerator.toString() ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                  `}
                  maxLength={2}
                />
                <div className="border-t border-black w-4 my-1"></div>
                <input
                  type="text"
                  value={answerDenominator}
                  onChange={(e) => handleAnswerDenominatorChange(e.target.value)}
                  className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                    ${answerDenominator === correctAnswer.denominator.toString() ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                  `}
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        }
      </div>

      {/* Footer */}
      {answerNumerator === correctAnswer.numerator.toString() && answerDenominator === correctAnswer.denominator.toString() && (
        <div className={`bg-[#66CDAA] w-full mt-8`}>
          <div className="max-w-2xl mx-auto flex items-center p-4">
            <p className="text-xl font-medium">Correct! 🎉</p>
          </div>
        </div>
      )} 

    </div>
  )
}
