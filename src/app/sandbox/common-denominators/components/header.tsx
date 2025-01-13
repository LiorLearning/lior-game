import React from 'react';
import { Fraction } from '../game-state';

interface HeaderProps {
  fraction1: Fraction;
  fraction2: Fraction;
}

const Header = ({ fraction1, fraction2 }: HeaderProps) => {
  return (
    <div className="bg-[#e3f261] p-6 border-t-4 border-b-4 border-blue-600">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-4">
        Common Denominator: 
        <div className="bg-white px-4 py-2 inline-flex flex-col items-center border border-black">
          <span>{fraction1.numerator}</span>
          <div className="w-4 h-px bg-black" />
          <span>{fraction1.denominator}</span>
        </div>
        &
        <div className="bg-white px-4 py-2 inline-flex flex-col items-center border border-black">
          <span>{fraction2.numerator}</span>
          <div className="w-4 h-px bg-black" />
          <span>{fraction2.denominator}</span>
        </div>
      </h1>
    </div>
  );
};

export default Header;