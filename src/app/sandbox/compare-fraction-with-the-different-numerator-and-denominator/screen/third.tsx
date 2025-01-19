import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { useEffect, useRef, useState } from 'react';
import RedBox from '../components/RedBox';
import Fraction from '../components/Fraction';
import { sounds } from '../../equivalent-fractions/utils/sounds'
import SuccessAnimation from '@/components/utils/success-animate';

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state3.question;
  const { step } = gameStateRef.current.state3;

  const [firstFraction, setFirstFraction] = useState<Fraction>({ numerator: 0, denominator: 0 });
  const [secondFraction, setSecondFraction] = useState<Fraction>({ numerator: 0, denominator: 0 });
  const [answer, setAnswer] = useState('');
  const correctAnswer = fraction1.numerator/fraction1.denominator < fraction2.numerator/fraction2.denominator ? '<' : fraction1.numerator/fraction1.denominator > fraction2.numerator/fraction2.denominator ? '>' : '=';
  const typing = useRef(false);

  const start = useRef(false);
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  function checkmultiple({first,second,third}: {first: number, second: number, third: number}) {
    if (first*second === 0)return false;
    else if (third % (first * second) !== 0 ) return false;
    else return true;
  }

  useEffect(() => {
    if (start.current) return;
    sendAdminMessage('agent', `Time for a challenge: let's compare ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}. Since the fractions have different denominators, let's start by finding a common denominator`);
    start.current = true;
  }, []);

  useEffect(() => {
    typing.current = true;
    if (secondFraction.denominator === 0 || firstFraction.denominator === 0) return; 
    else if (firstFraction.denominator === secondFraction.denominator && checkmultiple({first: fraction1.denominator, second: fraction2.denominator, third: firstFraction.denominator})) {
      setGameStateRef(prev => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 1
        }
      }));
      sendAdminMessage('agent', `Great, now that we have the same bottom number, its time to re-write these fractions`);
    } else {
      const timer = setTimeout(() => {
        if (typing.current) {
          sendAdminMessage('admin', `Which number do both ${fraction1.denominator} and ${fraction2.denominator} go into?`);
          typing.current = false;
        }
      }, 1000); // Wait 1 second after last typing event

      return () => {
        clearTimeout(timer);
        typing.current = true;
      };
    }
  }, [firstFraction, secondFraction]);

  useEffect(() => {
    if (firstFraction.numerator === 0 || secondFraction.numerator === 0) return;
    else if (step!==  1) {
      return;
    } else if (firstFraction.numerator === firstFraction.denominator/fraction1.denominator*fraction1.numerator && secondFraction.numerator === secondFraction.denominator/fraction2.denominator*fraction2.numerator) {
      setGameStateRef(prev => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 2
        }
      }));
      sendAdminMessage('agent', `Awesome, now enter the right symbol between these fractions!"`);
    }
  }, [firstFraction, secondFraction]);

  useEffect(() => {
    if(answer === correctAnswer) {
      setGameStateRef(prev => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 4
        }
      }));
    }
    sendAdminMessage('agent', `You're on a roll - a fraction comparison maestro!`);
  }, [answer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    if (value === correctAnswer) {
      sounds.correct()
      setAnswer(value)
      setGameStateRef(prev => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 3
        }
      }))
    } else {
      sounds.wrong()
      setAnswer(value)
      sendAdminMessage('admin', `User entered ${value} as answer when asked which is greater ${fraction1.numerator}/${fraction1.denominator} or ${fraction2.numerator}/${fraction2.denominator}, diagnose socratically`)
    }
    setIsOpen(false)
  }

  return (
    <div className={`mx-auto flex flex-col gap-4 ${step < 3 ? 'mb-20' : ''}`}>
      <Header 
        numerator1={fraction1.numerator} 
        denominator1={fraction1.denominator} 
        fraction2={fraction2.numerator} 
        denominator2={fraction2.denominator} 
        level={3} 
        step={{ 
          id: step === 0 ? 1 : 2,
          text: step === 0 ? "FIND COMMON DENOMINATOR" : "REWRITE FRACTIONS"
        }}
      />

      {step >= 0 && (
        <div className='flex flex-col items-center gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-8'>
              <div className='flex flex-col items-center text-4xl'>
                <Fraction numerator={fraction1.numerator} denominator={fraction1.denominator} />
              </div>
              <div className='text-4xl'>=</div>
              <div className='flex gap-1 flex-col items-center text-4xl'>
                <input 
                  type="text" 
                  className={`
                    w-12 h-12 border-2 border-black text-center text-3xl
                    ${firstFraction.numerator && ((firstFraction.numerator === firstFraction.denominator/fraction1.denominator*fraction1.numerator) ? 'bg-green-200' : 'bg-red-200')}
                  `}
                  value={firstFraction.numerator ? firstFraction.numerator.toString() : ''}
                  placeholder={step === 1 ? '?' : ''}
                  disabled={step !== 1}
                  onChange={(e) => setFirstFraction(prev => ({ ...prev, numerator: parseInt(e.target.value) || 0 }))}
                />
                <div className='w-full h-1 bg-black'></div>
                <input 
                  type="text" 
                  className={`
                    w-12 h-12 border-2 border-black text-center text-3xl
                    ${firstFraction.denominator && (checkmultiple({first: fraction1.denominator, second: fraction2.denominator, third: firstFraction.denominator}) ? 'bg-green-200' : 'bg-red-200')}
                  `}
                  value={firstFraction.denominator ? firstFraction.denominator.toString() : ''}
                  placeholder={step === 0 ? '?' : ''}
                  onChange={(e) => setFirstFraction(prev => ({ ...prev, denominator: parseInt(e.target.value) || 0 }))}
                  disabled = {step !== 0}
                />
              </div>
            </div>

            <div className='flex items-center justify-center gap-8'>
              <div className='flex flex-col items-center text-4xl'>
                <div>{fraction2.numerator}</div>
                <div className='w-8 h-1 bg-black'></div>
                <div>{fraction2.denominator}</div>
              </div>
              <div className='text-4xl'>=</div>
              <div className='flex gap-1 flex-col items-center text-4xl'>
                <input 
                  type="text" 
                  className={`
                    w-12 h-12 border-2 border-black text-center text-3xl
                    ${secondFraction.numerator && ((secondFraction.numerator === secondFraction.denominator/fraction2.denominator*fraction2.numerator) ? 'bg-green-200' : 'bg-red-200')}
                  `} 
                  value={secondFraction.numerator ? secondFraction.numerator.toString() : ''}
                  placeholder={step === 1 ? '?' : ''}
                  onChange={(e) => setSecondFraction(prev => ({ ...prev, numerator: parseInt(e.target.value) || 0 }))}
                  disabled={step !== 1}
                />
                <div className='w-full h-1 bg-black'></div>
                <input 
                  type="text" 
                  className={`
                    w-12 h-12 border-2 border-black text-center text-3xl
                    ${secondFraction.denominator && (checkmultiple({first: fraction1.denominator, second: fraction2.denominator, third: secondFraction.denominator}) ? 'bg-green-200' : 'bg-red-200')}
                  `}
                  value={secondFraction.denominator ? secondFraction.denominator.toString() : ''}
                  placeholder='?'
                  onChange={(e) => setSecondFraction(prev => ({ ...prev, denominator: parseInt(e.target.value) || 0 }))}
                  disabled = {step !== 0}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className='flex flex-col items-center gap-8'>
          <div className="flex justify-center items-center gap-4 my-8">
            <RedBox>
              STEP 3
            </RedBox>
            <div className="bg-pink-500 text-white text-center text-xl px-6 py-6 font-bold">
              COMPARE
            </div>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <Fraction 
              numerator={fraction1.numerator} 
              denominator={fraction1.denominator} 
              className="text-3xl font-bold"
            />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 text-center text-3xl font-bold border-2 border-black flex items-center justify-center
                  ${answer ? (
                    answer === correctAnswer 
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  ) : "bg-white"}`}
              >
                {answer || "?"}
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 z-10">
                  {["<", "=", ">"].map((option) => (
                    <div
                      key={option}
                      className="text-2xl hover:bg-gray-100 cursor-pointer px-4 py-2 flex items-center justify-center"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Fraction 
              numerator={fraction2.numerator} 
              denominator={fraction2.denominator} 
              className="text-3xl font-bold"
            />
          </div>
        </div>
      )}

      {step >= 3 && (
          <div className="flex text-3xl justify-center items-center gap-4 my-8 text-white bg-green-500 min-h-32">
            Correct Answer!!!
            <SuccessAnimation />
          </div>
      )}
    </div>
  );
}