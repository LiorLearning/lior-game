'use client'

import { useEffect, useState, useRef } from "react";
import { useGameState } from "./state-utils";
import { Input } from "@/components/custom_ui/input";
import { GameProps } from "./components/types";

export default function Second({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { greenMarblesCount, blueMarblesCount, blackMarblesCount, showFinalAnswer } = gameStateRef.current.state2;
  const { maxGreenMarbles, maxBlueMarbles, maxBlackMarbles } = gameStateRef.current;
  const totalMarbles = maxGreenMarbles + maxBlueMarbles;
  const [answer, setAnswer] = useState('');
  const hasGameStarted = useRef(false);

  const handleMarbleClick = (color: 'green' | 'blue') => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        greenMarblesCount: color === 'green' && greenMarblesCount < maxGreenMarbles ? 
          greenMarblesCount + 1 : greenMarblesCount,
        blueMarblesCount: color === 'blue' && blueMarblesCount < maxBlueMarbles ? 
          blueMarblesCount + 1 : blueMarblesCount,
      }
    }));
  };

  const handleBlackMarbleClick = (index: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        blackMarblesCount: index >= blackMarblesCount && blackMarblesCount < maxBlackMarbles ? 
          blackMarblesCount + 1 : 
          index === blackMarblesCount - 1 ? 
            blackMarblesCount - 1 : 
          blackMarblesCount
      }
    }));
  };

  useEffect(() => {
    if (!hasGameStarted.current) {
      sendAdminMessage('agent', "Great job on the last question! Let us do another one");
      hasGameStarted.current = true;

      setTimeout(() => {
        sendAdminMessage('agent', "See the question, and select the number of marbles");
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (greenMarblesCount === maxGreenMarbles && blueMarblesCount === maxBlueMarbles) {
      sendAdminMessage('agent', "Great! Now to add these. Let us put these in the 10 container");
    }
  }, [greenMarblesCount, blueMarblesCount])

  useEffect(() => {
    if (blackMarblesCount === 10) {
      sendAdminMessage('agent', "Great, you made a group of 10. Now add the remaining marbles to get to the answer");
    }
  }, [blackMarblesCount])

  useEffect(() => {
    if (answer === totalMarbles.toString()) {
      setGameStateRef(prev => ({
        ...prev,
        showFinalAnswer: true
      }));
      sendAdminMessage('agent', "You did great! That is the correct answer");
    } else {
      sendAdminMessage('agent', "Try counting all the marbles");
    }
  }, [answer])

  return (
      <>
      <div className="text-3xl font-bold text-center py-8 pb-80">
        {maxGreenMarbles} + {maxBlueMarbles} = ?
      </div>

      <div className={`mx-auto text-xl bg-purple-100 border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-10`} style={{
        fontSize: 26
      }}>
        <p className={`font-bold text-center text-purple-600`}>
          Select {maxGreenMarbles} green and {maxBlueMarbles} blue marbles
        </p>
      </div>

      <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-purple-600 text-lg font-bold leading-none">Pick Green Marbles</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`green-${i}`}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                    i < greenMarblesCount ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  onClick={() => handleMarbleClick('green')}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-purple-600 font-bold leading-none text-lg">Pick Blue Marbles</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`blue-${i}`}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                    i < blueMarblesCount ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  onClick={() => handleMarbleClick('blue')}
                />
              ))}
            </div>
          </div>
        </div>

        {(greenMarblesCount > 0 || blueMarblesCount > 0) && (
          <>
          <div className={`mx-auto text-lg bg-purple-100 border-2 shadow-[-5px_5px_0_0] border-black p-4 mt-16 mb-10`} style={{
          fontSize: 26
        }}>
            <p className={`font-bold text-center text-purple-600`}>              
              Select 10 marbles here to fill the container
            </p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="flex gap-1 flex-wrap max-w-[300px] mx-auto">
                {blackMarblesCount === 10 ? (
                    <div className='flex flex-col gap-1'>
                      <div className="flex gap-1">
                        <div className="border-2 border-black rounded-full p-2 flex gap-1 -mt-2">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={`black-${i}`} className="w-6 h-6 rounded-full bg-black" />
                          ))}
                         </div>
                        <span className="text-2xl mx-2">+</span>
                        {Array.from({ length: totalMarbles - 10 }).map((_, i) => (
                          <div key={`remaining-${i}`} className="w-6 h-6 rounded-full bg-blue-500" />
                        ))}
                      </div>
                      <div className='w-full text-center text-2xl font-bold'>
                        10 + {totalMarbles - 10}
                      </div>
                    </div>
                ) : (
                    <div className="flex gap-1">
                      {Array.from({ length: greenMarblesCount }).map((_, i) => (
                        <div
                          key={`container-green-${i}`}
                          className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                            i < blackMarblesCount ? 'bg-black' : 'bg-green-500'
                          }`}
                          onClick={() => handleBlackMarbleClick(i)}
                        />
                      ))}
                      <div className="w-4" /> {/* Gap between green and blue */}
                      {Array.from({ length: blueMarblesCount }).map((_, i) => (
                        <div
                          key={`container-blue-${i}`}
                          className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                            i + greenMarblesCount < blackMarblesCount ? 'bg-black' : 'bg-blue-500'
                          }`}
                          onClick={() => handleBlackMarbleClick(i + greenMarblesCount)}
                        />
                      ))}
                    </div>
                )}
              </div>
            </div>
          </>
        )}

        {greenMarblesCount === maxGreenMarbles && blueMarblesCount === maxBlueMarbles && blackMarblesCount === 10 && (
          <div className="flex justify-center mt-8">
            <span className="text-3xl font-bold text-black0">Answer</span>

            <Input
              type='text'
              className="border-2 text-xl font-bold border-black w-16 text-center mx-4 placeholder:color-black" 
              placeholder="?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={showFinalAnswer}
            />
          </div>
        )}

        {showFinalAnswer && (
          <div className="flex justify-center mt-8">
            <span className="text-3xl font-bold text-black">Correct Answer !!!!</span>
            </div>
        )}
      </> 
 )
}

