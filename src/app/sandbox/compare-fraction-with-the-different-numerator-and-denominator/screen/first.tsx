import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Bar from '../components/bar';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Proceed from '../components/proceed';
import Fraction from '../components/Fraction';
import { sounds } from '../../equivalent-fractions/utils/sounds';

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state1.question;
  const { step } = gameStateRef.current.state1;

  const [bar1, setBar1] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [bar2, setBar2] = useState<Fraction>({ numerator: 0, denominator: 1 });

  const [active, setActive] = useState(0);
  const [firstAnswer, setFirstAnswer] = useState(1);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's compare these fractions visually. First, we'll create ${fraction1.numerator}/${fraction1.denominator} by splitting this chocolate bar. Grab the Split tool and let's get started!`);
      start.current = true;
    }
  }, []);

  useEffect(() => {
    if (bar1.numerator === fraction1.numerator && bar1.denominator === fraction1.denominator) {
      sounds.correct()
      setActive(1)
      setGameStateRef(prev => ({
        ...prev,
        state1: {
          ...prev.state1,
          step: 1
        }
      }))
      sendAdminMessage('agent', `Great! Now that we've made ${fraction1.numerator}/${fraction1.denominator}, let's move on to creating ${fraction2.numerator}/${fraction2.denominator}. 🍫`);
    }
  }, [bar1]);

  useEffect(() => {
    if (bar2.numerator === fraction2.numerator && bar2.denominator === fraction2.denominator) {
      sounds.correct()
      setActive(2)
      setGameStateRef(prev => ({
        ...prev,
        state1: {
          ...prev.state1,
          step: 2
        }
      }))
      sendAdminMessage('agent', `Alright, let's pick the bigger one for ourselves now. Which one would you pick?`);
    }
  }, [bar2]);

  useEffect(() => {
    if (firstAnswer === 0) {
      sounds.wrong()
      sendAdminMessage('admin', `When asked to compare ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}, User chose ${fraction1.numerator}/${fraction1.denominator}. Diagnose socratically`);
    } else if (firstAnswer === 2) {
      sounds.correct()
      setGameStateRef(prev => ({
        ...prev,
        state1: {
          ...prev.state1,
          step: 3
        }
      }))
      sendAdminMessage('agent', `You got it, enjoy the bigger snack - you deserve it!`);
    }
  }, [firstAnswer]);

  return (
    <div className="mx-auto">
      <Header 
        numerator1={fraction1.numerator} 
        denominator1={fraction1.denominator} 
        fraction2={fraction2.numerator} 
        denominator2={fraction2.denominator} 
        level={1} 
        step={{ 
          id: step === 0 ? 1 : 2,
          text: step === 0 
          ? <> Create <span className="font-bold bg-white flex flex-col -my-2 ml-2 px-2 justify-center items-center text-black"><Fraction className='text-sm' numerator={fraction1.numerator} denominator={fraction1.denominator} /></span></> 
          : <> Create <span className="font-bold bg-white flex flex-col -my-2 ml-2 px-2 justify-center items-center text-black"><Fraction className='text-sm' numerator={fraction2.numerator} denominator={fraction2.denominator} /></span></>
        }} 
      />

      <div className='flex flex-col gap-4 mx-auto my-16'>
        <span 
          className={`w-full`}
        >
          <Bar 
            numerator={bar1.numerator} 
            denominator={bar1.denominator} 
            handlePieceClick={active === 0 ? (index)=>{setBar1(prev => ({...prev, numerator: index}))} : ()=>{}} 
            handleKnifeClick={() => {setBar1(prev => ({...prev, denominator: prev.denominator + 1}))}}
            handleJoinClick={() => {setBar1(prev => ({...prev, denominator: prev.denominator - 1 }))}}
            active={active === 0}
          />
        </span>

        {step >= 1 && (
        <span
          className={`w-full`}
        >
          <Bar 
            numerator={bar2.numerator} 
            denominator={bar2.denominator} 
            handlePieceClick={active === 1 ? (index)=>{setBar2(prev => ({...prev, numerator: index}))} : ()=>{}} 
            handleKnifeClick={() => {setBar2(prev => ({...prev, denominator: prev.denominator + 1}))}}
            handleJoinClick={() => {setBar2(prev => ({...prev, denominator: prev.denominator - 1}))}}
            active={active === 1}
          />
        </span>
        )}


        {step >= 2 && (
          <div className="w-full flex flex-col py-16 bg-red-50 items-center gap-4">
            <p className="text-2xl font-bold text-center">
              Which one is bigger?
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => setFirstAnswer((fraction1.numerator*fraction2.denominator) > (fraction2.numerator*fraction1.denominator) ? 2 : 0)}
                className={`px-16 py-2 text-lg font-bold text-white rounded-none shadow-[-5px_5px_0_rgba(0,0,0,1)]
                  ${firstAnswer === 2 && fraction1.numerator*fraction2.denominator > fraction2.numerator*fraction1.denominator 
                    ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                    : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`
                  }
              >
                {fraction1.numerator}/{fraction1.denominator}
              </Button>
              <Button
                onClick={() => setFirstAnswer((fraction1.numerator*fraction2.denominator) < (fraction2.numerator*fraction1.denominator) ? 2 : 0)}
                className={`px-16 py-2 text-lg font-bold text-white rounded-none shadow-[-5px_5px_0_rgba(0,0,0,1)]
                  ${firstAnswer === 2 && fraction1.numerator*fraction2.denominator < fraction2.numerator*fraction1.denominator 
                    ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                    : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`
                  }
              >
                {fraction2.numerator}/{fraction2.denominator}
              </Button>
            </div>
                      
            {firstAnswer === 0 && (
              <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                <p className="text-red-700 font-bold">Not quite, try again!</p>
              </div>
            )}
          </div>
        )}

        {firstAnswer === 2 && (
          <Proceed
            onComplete={() => setGameStateRef(prev => ({
              ...prev,
              screen: "second"
            }))}
          />
        )}
      </div>
    </div>
  );
}