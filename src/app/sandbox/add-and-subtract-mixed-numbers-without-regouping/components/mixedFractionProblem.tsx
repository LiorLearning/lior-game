import React from 'react';
import MixedFraction from './mixedFraction';

interface MixedFractionProblemProps {
  leftWhole: number;
  leftNumerator: number;
  leftDenominator: number;
  rightWhole: number;
  rightNumerator: number;
  rightDenominator: number;
  leftLabel: string;
  rightLabel: string;
}

export const MixedFractionProblem: React.FC<MixedFractionProblemProps> = ({
  leftWhole,
  leftNumerator,
  leftDenominator,
  rightWhole,
  rightNumerator,
  rightDenominator,
  leftLabel,
  rightLabel,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-lime-300 py-2 px-4 rounded-t-lg text-center font-bold">
        Total Order
      </div>
      <div className="flex items-center justify-center gap-4 p-4 border-2 border-gray-200 rounded-b-lg">
        <div className="flex items-center gap-2 bg-pink-100 rounded-lg p-3">
          <MixedFraction
            whole={leftWhole}
            numerator={leftNumerator}
            denominator={leftDenominator}
          />
          <span className="ml-2">{leftLabel}</span>
        </div>
        <span className="text-2xl font-bold">+</span>
        <div className="flex items-center gap-2 bg-yellow-100 rounded-lg p-3">
          <MixedFraction
            whole={rightWhole}
            numerator={rightNumerator}
            denominator={rightDenominator}
          />
          <span className="ml-2">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}; 