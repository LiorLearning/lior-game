import { Fraction } from "../game-state";
import { FractionComponent } from "./fraction";

interface ChocolateBarProps {
  pieces: number;
  filledPieces?: number;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export const ChocolateBar = ({
  pieces,
  filledPieces = 0,
  selectable = false,
  selected = false,
  onSelect = () => { }
}: ChocolateBarProps) => (
  <div
    className={`flex -space-x-[3px] w-[480px] ${selectable ? 'cursor-pointer' : ''} ${selected ? 'ring-4 ring-blue-500' : ''}`}
    onClick={selectable ? onSelect : undefined}
  >
    {[...Array(pieces)].map((_, index) => (
      <div
        key={index}
        className={`w-full h-16 relative cursor-pointer border-[3px] border-[#906547] ${index < filledPieces 
          ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
          : 'bg-gradient-to-br from-[#906547] to-[#785339]'
        }`}
      >
        {/* 3D effect borders */}
        <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
        <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
      </div>
    ))}
  </div>
); 

interface ChocolateBarWithFractionProps {
  fraction: Fraction;
  size?: 'large' | 'small';
  multiplier?: number;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export const ChocolateBarWithFraction = ({ fraction, size = 'large', multiplier = 1, selectable = false, selected = false, onSelect = () => {} }: ChocolateBarWithFractionProps) => {
  return (
    <>
      <div className={`w-[${size === 'large' ? '480px' : '240px'}]`}>
        <ChocolateBar 
          pieces={parseInt(fraction.denominator) * multiplier} 
          filledPieces={parseInt(fraction.numerator) * multiplier} 
          selectable={selectable}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
      <FractionComponent fraction={fraction} />
    </>
  );
};
