import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Proceed from '../components/proceed';
import RedBox from '../components/RedBox';
import MultiplierFraction from '../components/multiplierFraction';
import ComparisonFractions from '../components/ComparisonFractions';

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state2.question;
  const { step } = gameStateRef.current.state2;

  const [firstAnswer, setFirstAnswer] = useState(1);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `This time, let's compare ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator} without the visuals. Before we begin, why don't you take a guess?`);
      start.current = true;
    }
  }, []);

  const handleguess = () => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: 1
      }
    }))
    sendAdminMessage('agent', `Alright, I hear you. Let's rewrite these fractions with the same denominator to find out! \n Start by choosing a common denominator - a number both ${fraction1.denominator} and ${fraction2.denominator} go into`);
  }

  useEffect(() => {
    if (firstAnswer === fraction1.denominator*fraction2.denominator) {
      sendAdminMessage('agent', `Great! Let's rewrite the fractions with the common denominator. How many times does ${fraction1.denominator} go into ${fraction1.denominator*fraction2.denominator}?`);
      setGameStateRef(prev => ({
        ...prev,
        state2: {
          ...prev.state2,
          step: 2
        }
      }))
    } else if (firstAnswer === fraction1.denominator*(fraction2.denominator -1)) {
      sendAdminMessage('agent', `Does ${fraction1.denominator} go into ${fraction2.denominator}? If not, ${fraction2.denominator} cannot be a common denominator!`);
    }
  }, [firstAnswer]);

  return (
    <div className="mx-auto flex flex-col gap-4 mb-20">
      <Header 
        numerator1={fraction1.numerator} 
        denominator1={fraction1.denominator} 
        fraction2={fraction2.numerator} 
        denominator2={fraction2.denominator} 
        level={2} 
        step={{ 
          id: 1,
          text: "TAKE A GUESS"
        }}
      />

      <div className='flex w-full flex-col gap-4 mx-auto bg-[#ff497c]/10 pt-10 pb-20 my-16'>
        <h2 className="text-2xl font-bold text-center mb-4">Before we begin, take a guess:</h2>
        
        <div className="flex justify-center gap-4">
          <Proceed
            text={`I bet ${fraction1.numerator}/${fraction1.denominator} is bigger`}
            onComplete={() => handleguess()}
          />
          <Proceed
            text={`I bet ${fraction2.numerator}/${fraction2.denominator} is bigger`}
            onComplete={() => handleguess()}
          />
          <Proceed
            text="Both are equal"
            onComplete={() => handleguess()}
          />
        </div>
      </div>

      {step >= 1 && (
        <>
          <div className="flex justify-center items-center gap-4 my-8">
            <RedBox>
              STEP 2
            </RedBox>
            <div className="bg-pink-500 text-white text-center text-xl px-6 py-2 font-bold">
              CHOOSE COMMON <br/> DENOMINATOR
            </div>
          </div>

          <div className="w-full flex flex-col py-16 bg-red-50 items-center gap-4">
            <p className="text-2xl font-bold text-center">
              Choose a valid common denominator
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => setFirstAnswer(fraction1.denominator*fraction2.denominator)}
                className={`px-16 py-2 text-lg font-bold text-white rounded-none shadow-[-5px_5px_0_rgba(0,0,0,1)]
                  ${firstAnswer === fraction1.denominator*fraction2.denominator
                    ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                    : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`
                  }
              >
                {fraction1.denominator*fraction2.denominator}
              </Button>
              <Button
                onClick={() => setFirstAnswer(fraction1.denominator*(fraction2.denominator -1))}
                className={`px-16 py-2 text-lg font-bold text-white rounded-none shadow-[-5px_5px_0_rgba(0,0,0,1)] bg-[#FF497C] hover:bg-[#FF497C]/90`} 
              >
                {fraction1.denominator*(fraction2.denominator -1)}
              </Button>
            </div>
                      
            {firstAnswer === fraction1.denominator*(fraction2.denominator -1) && (
              <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                <p className="text-red-700 font-bold">Not quite, try again!</p>
              </div>
            )}
          </div>
        </>
      )}
      {(step >= 2) && (
          <div className="flex justify-center items-center gap-4 my-8">
            <RedBox>
              STEP 3
            </RedBox>
            <div className="bg-pink-500 text-white text-center text-xl px-6 py-6 font-bold">
              Rewrite Fractions
            </div>
          </div>
      )}
      {step >= 2 && (
          <div className='w-full'>
            <MultiplierFraction
              numerator1={fraction1.numerator}
              denominator1={fraction1.denominator}
              denominator2={fraction2.denominator*fraction1.denominator}
              complete={() => setGameStateRef(prev => ({
                ...prev,
                state2: {
                  ...prev.state2,
                  step: 3
                }
              }))}
              sendAdminMessage={sendAdminMessage}
            />
          </div>
      )} 
      {step >= 3 && (
        <div className='w-full'>
          <MultiplierFraction
            numerator1={fraction2.numerator}
            denominator1={fraction2.denominator}
            denominator2={fraction2.denominator*fraction1.denominator}
            complete={() => setGameStateRef(prev => ({
              ...prev,
              state2: {
                ...prev.state2,
                step: 4
              }
            }))}
            sendAdminMessage={sendAdminMessage}
          />
        </div>
      )}

      {(step >= 4) && (
        <div className="flex justify-center items-center gap-4 my-8">
          <RedBox>
            STEP 4
          </RedBox>
          <div className="bg-pink-500 text-white text-center text-xl px-6 py-6 font-bold">
            COMPARE
          </div>
        </div>
      )}

      {(step >= 4) && (
        <ComparisonFractions
          fraction1={fraction1}
          fraction2={fraction2}
          onComplete={() => {
            setGameStateRef(prev => ({
              ...prev,
              state2: {
                ...prev.state2,
                step: 5
              }
            }))
            sendAdminMessage('agent', `Superb, you're almost a master! Time for Level 3`);
          }}
          sendAdminMessage={sendAdminMessage}
        />
      )}

      {step === 5 && (
        <Proceed
          onComplete={() => setGameStateRef(prev => ({
            ...prev,
            screen: "third"
          }))}
        />
      )}
    </div>
  );
}