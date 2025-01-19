import { goToStep } from '../utils/helper';
import { useGameState } from '../state-utils';

export default function FirstQuestion() {
  const { gameStateRef, setGameStateRef } = useGameState();

  return (
    <div className="flex items-center justify-center bg-[#fffdf7] pt-36">
      <div className="w-full max-w-2xl px-4 flex flex-col justify-center">
        <div className="rounded-2xl border-2 border-gray-500 overflow-hidden bg-white">
          {/* Question Header */}
          <div className="px-8 py-4 border-b">
            <h1 className="text-5xl text-center">Question</h1>
          </div>
          
          {/* Question Content */}
          <div className="px-8 py-4 bg-[#e9ed7b] relative">
            <div className="flex items-center justify-center gap-4 text-3xl">
              <span>Write</span>
              <div className="bg-white px-4 py-2">
                <div className="flex flex-col items-center leading-tight">
                  <span>7</span>
                  <div className="w-4 h-px bg-black"></div>
                  <span>4</span>
                </div>
              </div>
              <span>as a mixed number</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-36 flex justify-center">
          <button className="group relative text-3xl bg-[#e9ed7b] px-12 py-4 rounded-xl shadow-[-5px_5px_0px_black] hover:bg-[#e0e472] transition-colors"
            onClick={() => goToStep('first', setGameStateRef, 1)}
          >
            START {'>>'}
          </button>
        </div>
      </div>
    </div>
  )
}
