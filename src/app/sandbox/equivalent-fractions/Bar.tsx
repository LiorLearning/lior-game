'use client';

interface BarProps {
  parts: number[][];  // Each part is an array of subparts, where number represents selection state (0 = unselected, 1 = selected)
  handleClick?: (partIndex: number, subPartIndex: number) => void;  // Click handler for both part and subpart
}

interface VisualizationBarProps {
  totalPieces: number;
  selectedPieces: number[];
}

export function Bar({ 
  parts, 
  handleClick
}: BarProps) {

  return (
    <div className="w-full relative flex items-center">
      <div className="w-full flex gap-1">
        {parts.map((subParts, partIndex) => (
          <div 
            key={partIndex} 
            className="w-full relative"
          >
            <div className={`
              relative w-full h-24
              border-4 border-[#3A2218]
              rounded-2xl
              overflow-hidden
            `}>
              <div className="w-full h-full flex gap-1">
                {subParts.map((selectionState, subPartIndex) => (
                  <div
                    key={subPartIndex}
                    onClick={() => handleClick?.(partIndex, subPartIndex)}
                    className={`
                      relative flex-1 h-full
                      ${selectionState === 1 ? 'bg-[#5B361B]' : 'bg-[#5B361B] bg-opacity-50'}
                      ${handleClick ? 'cursor-pointer hover:brightness-95' : ''}
                      rounded-md
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const VisualizationBar: React.FC<VisualizationBarProps> = ({ totalPieces, selectedPieces }) => {
  return (
    <div className="w-full h-20 flex">
      {Array.from({ length: totalPieces }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 border border-black ${
            selectedPieces.includes(index) ? 'bg-[#8B4513] bg-opacity-50' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
};
