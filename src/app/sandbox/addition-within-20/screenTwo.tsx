'use client'

import { useEffect, useState, useRef } from "react";
import { useGameState } from "./state-utils";
import { Input } from "@/components/custom_ui/input";
import { GameProps } from "./components/types";
import { COLORS } from "./utils/constants";
import SuccessAnimation from "@/components/utils/success-animate";
import { Button } from "@/components/custom_ui/button";


export default function Second({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { 
    greenMarblesCount, 
    blueMarblesCount, 
    blackMarblesCount, 
    showFinalAnswer,
    maxGreenMarbles, 
    maxBlueMarbles, 
    maxBlackMarbles 
  } = gameStateRef.current.state2;
  const totalMarbles = maxGreenMarbles + maxBlueMarbles;
  const [answer, setAnswer] = useState('');
  const hasGameStarted = useRef(false);
  const gameFinished = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
      sendAdminMessage('agent', "Great! Now to add these. Select 10 marbles that will go in the container. As you select, they will be coloured black");
    }
  }, [greenMarblesCount, blueMarblesCount])

  useEffect(() => {
    if (blackMarblesCount === 10) {
      sendAdminMessage('agent', "Great, you made a group of 10. Now add the remaining marbles to get to the answer");
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [blackMarblesCount])

  const handleVerifyAnswer = () => {
    if (answer === totalMarbles.toString()) {
      setGameStateRef(prev => ({
        ...prev,
        showFinalAnswer: true
      }));
      gameFinished.current = true;
      sendAdminMessage('agent', "You did great! That is the correct answer");
    } else {
      sendAdminMessage('agent', "Try counting all the marbles");
    }
  }

  return (
    <div className="relative w-[800px] mx-auto ">
      <section className="mt-16 h-52 flex flex-col justify-center">
        <div className="text-5xl font-bold text-center pb-10">
          <h3 className="border-2 border-black shadow-[-5px_5px_0_0] w-[40%] mx-auto" style={{
            backgroundColor: COLORS.white,
          }}>
            {`${maxGreenMarbles} + ${maxBlueMarbles} = ?`}
          </h3>
        </div>

        <div className={`mx-auto text-3xl border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-10`} style={{
          backgroundColor: COLORS.white
        }}>
          <p className={`text-center font-jersey`} style={{
            color: COLORS.blue
          }}>
            Select {maxGreenMarbles} green and {maxBlueMarbles} blue marbles
          </p>
        </div>
      </section>

      <div className="space-y-4 m-16">
        <div className="flex items-center justify-between mb-12">
          <span className="text-3xl leading-none font-jersey" style={{
            color: COLORS.blue
          }}>Pick Green Marbles</span>
          <div className="flex gap-1 ml-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`green-${i}`}
                className={`w-8 h-8 rounded-full cursor-pointer transition-colors border-2 border-black ${
                  i < greenMarblesCount ? 'bg-green-500' : 'bg-white'
                }`}
                onClick={() => handleMarbleClick('green')}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl leading-none font-jersey" style={{
            color: COLORS.blue
          }}>Pick Blue Marbles</span>
          <div className="flex gap-1 ml-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`blue-${i}`}
                className={`w-8 h-8 rounded-full cursor-pointer transition-colors border-2 border-black ${
                  i < blueMarblesCount ? 'bg-blue-500' : 'bg-white'
                }`}
                onClick={() => handleMarbleClick('blue')}
              />
            ))}
          </div>
        </div>
      </div>

        {(greenMarblesCount > 0 || blueMarblesCount > 0) && (
          <>
            <div className={`mx-auto text-3xl border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-10`} style={{
              backgroundColor: COLORS.white
            }}>
              <p className={`text-center font-jersey`} style={{
                color: COLORS.blue
              }}>
                Select 10 marbles here to fill the container
              </p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="flex gap-1 flex-wrap max-w-[600px] mx-auto">
                {blackMarblesCount === 10 ? (
                    <div className='flex flex-col gap-1'>
                      <div className="flex gap-1">
                        <div>
                          <div className="border-2 border-black rounded-full p-2 flex gap-1 -mt-2">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={`black-${i}`} className="w-8 h-8 rounded-full border-2 border-black bg-black" />
                            ))}
                          </div>
                          <div className='w-full text-center text-4xl font-bold mt-2'>
                            10
                          </div>
                        </div>
                        <span className="text-5xl mx-2" style={{
                          marginTop: '2.7rem'
                        }}>+</span>
                        <div>
                          <div className="flex gap-1">
                            {Array.from({ length: totalMarbles - 10 }).map((_, i) => (
                              <div key={`remaining-${i}`} className="w-8 h-8 rounded-full border-2 border-black bg-blue-500" />
                            ))}
                          </div>
                          <div className='w-full text-center text-4xl font-bold mt-4'>
                            {totalMarbles - 10}
                          </div>
                        </div>
                      </div>
                    </div>
                ) : (
                    <div className="flex gap-1">
                      {Array.from({ length: greenMarblesCount }).map((_, i) => (
                        <div
                          key={`container-green-${i}`}
                          className={`w-8 h-8 rounded-full cursor-pointer transition-colors border-2 border-black ${
                            i < blackMarblesCount ? 'bg-black' : 'bg-green-500'
                          }`}
                          onClick={() => handleBlackMarbleClick(i)}
                        />
                      ))}
                      <div className="w-16" /> {/* Gap between green and blue */}
                      {Array.from({ length: blueMarblesCount }).map((_, i) => (
                        <div
                          key={`container-blue-${i}`}
                          className={`w-8 h-8 rounded-full cursor-pointer transition-colors border-2 border-black ${
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
          <div className="flex flex-col justify-center items-center mt-4 gap-4">
            <div className="flex items-center">
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

            <Button 
              onClick={handleVerifyAnswer} 
              className="text-lg bg-purple-100 border-2 shadow-[-5px_5px_0_0] shadow-black border-black p-2 px-6 mt-8 rounded-none"
              style={{
                backgroundColor: COLORS.white,
              }}
              >
              <p className="font-bold font-jersey" style={{
                color: COLORS.blue
              }}>Verify &gt;&gt;</p>
            </Button>
          </div>
        )}

        {showFinalAnswer && (
          <div className="flex justify-center mt-8">
            <span className="text-3xl font-bold text-black">Correct Answer !!!!</span>
            </div>
        )}
        {gameFinished.current && <SuccessAnimation />}
        <div ref={bottomRef} style={{ height: 0 }} />
    </div>
 )
}

