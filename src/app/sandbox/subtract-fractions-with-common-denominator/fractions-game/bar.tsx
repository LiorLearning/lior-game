import { useState } from "react";
import { useSound } from "use-sound";
import { Button } from "@/components/ui/button";
import './chocolate.css';

export interface Fraction {
  num: number;
  denom: number;
}

export interface BarState {
  parts: number;
  selectedParts: number[];
}
  
export function Bar({ 
  parts, 
  selectedParts,
  onCut, 
  onJoin,
  onSelect,
  maxParts,
  compare = false,
  disabled = false,
  label,
  expectedFraction,
}: { 
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onJoin?: () => void;
  onSelect?: (part: number) => void;
  maxParts: number;
  compare?: boolean;
  disabled?: boolean;
  label: string;
  expectedFraction: Fraction;
}) {
  const [playBreakSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/chocolate-break.mp3', {
    volume: 0.5,
    interrupt: true
  });
  const [playJoinSound] = useSound('https://mathtutor-images.s3.us-east-1.amazonaws.com/sound-effects/join.mp3', {
    volume: 0.5,
    interrupt: true
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBreak = () => {
    if (parts >= maxParts || disabled) return;
    setIsAnimating(true);
    playBreakSound();
    if (onCut) onCut();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleJoin = () => {
    if (parts <= 1 || disabled) return;
    playJoinSound();
    if (onJoin) onJoin();
  };

  const handleSelect = (part: number) => {
    if (!disabled) {
      onSelect?.(part);
    }
  };

  if (compare && selectedParts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        <div className="w-12">
          <div className="text-center text-[#5d4037] rounded-xl transform transition-all duration-300">
            <div className="text-3xl font-bold">
              {selectedParts.length}
              <hr className="border-t-2 border-[#5d4037] my-1" />
              {parts}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="w-full perspective-1000">
            <div className={`relative h-32 rounded-lg shadow-xl transform-style-3d rotate-x-10 
              ${compare && selectedParts.length === 0 ? 'bg-gray-400 opacity-50' : 'bg-[#5c3624]'}`}>
              <div className="absolute inset-0 flex gap-1 p-1">
                {/* Select chocolate pieces */}
                {Array.from({ length: parts }).map((_, index) => (
                  <Button
                    key={index}
                    onClick={!compare ? () => handleSelect(index) : undefined}
                    id={`select-chocolate-piece-${label}-${index}`}
                    className={`flex-1 relative bg-gradient-to-b from-[#8a5a42] via-[#734939] to-[#5c3624] 
                      transition-all duration-300 ease-out transform-gpu rounded-sm
                      hover:from-[#9a6a52] hover:via-[#835949] hover:to-[#6c4634]
                      h-full
                      ${parts === expectedFraction.denom && index < expectedFraction.num && !selectedParts.includes(index) 
                        ? 'animate-bounce' 
                        : ''}
                      ${compare && !selectedParts.includes(index) 
                        ? 'opacity-30 cursor-not-allowed relative' 
                        : selectedParts.includes(index) 
                          ? 'ring-2 ring-yellow-400 from-[#7a4a32] via-[#633929] to-[#4c2614] transform translate-y-[-10px] z-10 mx-1' 
                          : ''}`}
                  >
                    {compare && !selectedParts.includes(index) && (
                      <div className="absolute inset-0 bg-gray-500 opacity-70 z-20 pointer-events-none"></div>
                    )}
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-4 
                      border border-[#4a2c1c] rounded-sm opacity-30" />
                    <div className="absolute inset-0 flex flex-col justify-around py-2">
                      {[0, 1].map((groove) => (
                        <div key={groove} className="relative w-full h-2">
                          <div className="absolute inset-0 bg-gradient-to-b from-[#3a2218] via-[#4a2c1c] to-[#3a2218]" />
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent opacity-50" />
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent opacity-50" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent" />
                  </Button>
                ))}
              </div>
              <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          </div>
        </div>

        <div className="w-40 flex flex-col gap-4">
            <Button
              onClick={handleBreak}
              id={`split-button-${label}`}
              className={`flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white 
                hover:shadow-xl hover:scale-105 active:scale-95
                font-semibold tracking-wide text-lg
                border-2 border-[#7a5729] border-opacity-20
                ${(!disabled && parts < expectedFraction.denom ? 'animate-bounce' : '')}
                ${compare 
                  ? 'cursor-not-allowed opacity-50' 
                  : parts >= maxParts 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:shadow-xl hover:scale-105 active:scale-95'}`}
              disabled={compare || parts >= maxParts}
            >
              <span className={`transform transition-transform duration-300 ${isAnimating ? 'animate-split' : ''}`}>
                Split 
              </span> 🍫
            </Button>
            {parts > 1 && (
              <Button
                onClick={!compare && parts > 1 ? handleJoin : undefined}
                id={`join-button-${label}`}
              className={`flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#FFB347] to-[#FFD700] text-[#5d4037]
                font-semibold tracking-wide text-lg
                border-2 border-[#fcbe4d] border-opacity-40
                ${compare 
                  ? 'cursor-not-allowed opacity-50' 
                  : parts <= 1 
                    ? 'cursor-not-allowed opacity-50' 
                    : (!disabled && parts > expectedFraction.denom ? 'animate-bounce' : 'hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer')}`}
              disabled={compare || parts <= 1}
            >
                <p>Join</p>🍯
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}