import React from 'react';
import MixedFraction from './mixedFraction';
import { MixedFractionProps } from '../utils/types';

interface HeaderProps {
    fraction1: MixedFractionProps;
    fraction2: MixedFractionProps;
    version: number;
    type: 'addition' | 'subtraction';
}

const Header: React.FC<HeaderProps> = (({ fraction1, fraction2, type, version }) => {
  return (
    <div className='w-full sticky top-0 bg-white flex flex-col'>
      <div className="w-full bg-[#d3ea00] flex justify-center items-center p-2 border-b-4 border-blue-600 gap-6">
        <div className='bg-white px-2 pr-4 '>
          <MixedFraction 
          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          className='text-3xl font-extrabold'
        />
      </div>
      <span className="text-3xl font-bold">
        {type === 'addition' ? '+' : '-'}
      </span>
      <div className='bg-white px-2 pr-4 '>
        <MixedFraction 
          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          className='text-3xl font-extrabold'
          />
        </div>
      </div>
      {version === 2 &&
        <div className="flex items-center justify-center gap-4 p-4 border-b-2 border-gray-400">
          <div className="flex items-center gap-2 border-2 border-black rounded-lg">
              <div className="flex items-center bg-pink-200 p-3 rounded-l-lg">
                <MixedFraction
                  whole={fraction1.whole}
                  numerator={fraction1.numerator}
                  denominator={fraction1.denominator}
                  className='font-bold'
                />
              </div>
              <span className="ml-2 mr-4 font-bold">Pepperoni Pizza</span>
          </div>
          <span className="text-2xl font-bold">+</span>
          <div className="flex items-center gap-2 border-2 border-black rounded-lg">
            <div className="flex items-center bg-yellow-200 p-3 rounded-l-lg">
              <MixedFraction
              whole={fraction2.whole}
              numerator={fraction2.numerator}
              denominator={fraction2.denominator}
              className='font-bold'
              />
            </div>
            <span className="ml-2 mr-4 font-bold">Mushroom Pizza</span>
          </div>
        </div>
      }
    </div>
  );
});



export default Header;