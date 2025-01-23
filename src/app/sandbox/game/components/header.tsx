import React from 'react';
import { cn } from '@/lib/utils';
import Fraction from './Fraction';
import RedBox from './RedBox';

interface HeaderProps {
    numerator1: number;
    denominator1: number;
    fraction2: number;
    denominator2: number; 
    level: number;
    step: {
      id: number,
      text: any
    }
}
const Header: React.FC<HeaderProps> = ({ numerator1, denominator1, fraction2, denominator2, level, step }) => {
  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>
        <span className='w-full'/>
        <div className='flex text-3xl w-full items-center gap-2 font-bold'>
          Compare Visually:
          <div className='flex text-2xl items-center gap-2 font-bold'>
            <Fraction numerator={numerator1} denominator={denominator1} className='text-3xl bg-white text-black p-2 px-4 h-full flex items-center' />
            &amp;  <Fraction numerator={fraction2} denominator={denominator2} className='text-3xl bg-white text-black p-2 px-4 h-full flex items-center' />
          </div>
        </div>
        <div className='w-full flex justify-end'>
          {level && <RedBox>Level {level}</RedBox>}
        </div>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <div className="flex items-center gap-4">
          <RedBox>STEP {step.id}</RedBox>
          <div className='text-xl bg-[#FF497C] font-bold text-white px-4 py-5 h-full flex items-center'>
            {step.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;