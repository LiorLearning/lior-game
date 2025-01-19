import React, { useEffect, useRef } from 'react'
import { BaseProps } from '../utils/types'
import RedBox from '../components/RedBox'
import { cn } from '@/lib/utils'
import Fraction from '../components/Fraction'
import { useGameState } from '../state-utils'
import { Triangle } from 'lucide-react'

function Level0({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen1 } = gameStateRef.current;
  const { question } = screen1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `${question.numerator1} out of ${question.denominator1} pieces is the same as how many out of ${question.denominator2}?`);
      start.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className={cn('flex w-full text-center text-3xl font-bold justify-center items-center gap-4 bg-[#F9F871] p-8 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>
          Equivalent Fractions
      </div>

      <div className='flex justify-center items-center gap-4 mt-16 p-8'>
        <div className="flex justify-center text-3xl gap-4">
          <div className="flex items-center gap-4 h-full">
            <RedBox className="h-full scale-[1.7] origin-right flex items-center">Question</RedBox>
            <div className='flex h-full items-center text-xl bg-[#FF497C] font-bold text-white px-16 py-2'>
              <Fraction numerator={question.numerator1} denominator={question.denominator1} className='text-3xl bg-white p-2 h-full flex items-center' />
              <span className='text-2xl bg-white text-black px-2 h-full flex items-center'>=</span>
              <Fraction numerator={"?"} denominator={question.denominator2} className='text-3xl bg-white p-2 h-full flex items-center' />
            </div>
          </div>
        </div>
      </div>

      <p className='text-center font-semibold text-2xl'>
        "2 out of 3 pieces is the same as how many out of 9?"
      </p>

      <div 
        className='flex justify-center items-center gap-4 p-8 cursor-pointer'
        onClick={() => {
          setGameStateRef(prev => ({
            ...gameStateRef.current,
            level: 1
          }));
        }}
      >
        <p className='text-center flex items-center gap-2 text-3xl font-bold'>
          Let's find out
          <Triangle className='text-3xl fill-green-500 text-green-500 rotate-90' />
        </p>
      </div>
    </div>    
  )
}

export default Level0