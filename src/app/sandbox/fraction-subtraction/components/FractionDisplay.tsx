interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  showBorder?: boolean;
}

export const FractionDisplay = ({ numerator, denominator, showBorder = true }: FractionDisplayProps) => (
  <div className={`flex flex-col items-center ${showBorder ? 'bg-white p-2 border-2 border-black' : ''}`}>
    <div className="text-2xl font-bold">{numerator}</div>
    <div className="border-t-2 border-black w-8"></div>
    <div className="text-2xl font-bold">{denominator}</div>
  </div>
) 