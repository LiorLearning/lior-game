import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import Header from "../components/header";
import Bar from "../components/bar";
import Fraction from "../components/Fraction";
import RedBox from "../components/RedBox";
import { useEffect, useRef } from "react";
import Proceed from "../components/proceed";
import { useState } from "react";
import { OnlyDivisor, OnlyMultiplier } from "../components/multiplierFraction";


export default function Level3 ({sendAdminMessage}: BaseProps) {
  const { gameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen3;
  return (    
    step < 5 ? (
      <Level3_1 sendAdminMessage={sendAdminMessage} />
    ) : (
      <Level3_2 sendAdminMessage={sendAdminMessage} />
    )
  ) 
}


function Level3_1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen3;
  const {numerator1, denominator1, denominator2, denominator3} = gameStateRef.current.screen3.question;
  const {numerator, multiplier1, multiplier2} = gameStateRef.current.screen3.answers;
  const dropref = useRef<HTMLDivElement>(null);

  const [multiplier1_denominator, setmultiplier1_denominator] = useState<number | undefined>();
  const [multiplier1_numerator, setmultiplier1_numerator] = useState<number | undefined>();

  useEffect(() => {
    if (!dropref.current) return;
      console.log(step)
      dropref.current.scroll({top: dropref.current.scrollHeight, behavior: 'smooth'});
    }, [step]);

  useEffect(() => {
    if (numerator === numerator1/denominator1*denominator2) {
      setGameStateRef(prev => ({
        ...prev,
        screen3: {
          ...prev.screen3,
          step: 2
        }
      }));
      sendAdminMessage('agent', `When you use a knife with a size of ${denominator2/denominator1} to split the chocolate, both the total number of pieces (denominator) and the pieces you have (numerator) are multiplied by ${denominator2/denominator1}.`);
    }
  }, [numerator]);

  return (
    <div className="w-full space-y-8 mb-12" ref={dropref}>
    <Header 
      numerator1={numerator1}
      denominator1={denominator1}
        denominator2={denominator2}
        step={{
          id: 4,
          text: "More Equivalent Fractions"
        }}
        level={3}
      />
      <div className="flex flex-col max-w-screen-sm gap-4 mx-auto items-center justify-center">

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}}disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1} denominator={denominator1} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1/denominator1*denominator2} denominator={denominator2} handlePieceClick={() => {}} disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1/denominator1*denominator2} denominator={denominator2} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1*denominator3/denominator1} denominator={denominator3} handlePieceClick={() => {}} disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1*denominator3/denominator1} denominator={denominator3} />
          </div>
        </div>


        <div className='flex mt-8 justify-center items-center gap-4'>
          <div className="flex items-center gap-4">
            <RedBox>Step 5</RedBox>
            <p className='text-xl min-w-56 text-center bg-[#FF497C] font-bold text-white px-4 py-5'>
              Reflect
            </p>
          </div>
        </div>

        <div className='flex flex-col mt-8 justify-center items-center gap-4'>
        {step>=2&& (
            <div className="w-full flex flex-col justify-center items-center">
            x{denominator2/denominator1}
            <div>
              <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
            </div>
          </div>
          )}
          <div className="flex justify-center items-center gap-4">
            <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl text-black font-bold" /> 
            <span className="text-3xl font-bold">=</span>
            <div className="text-3xl flex flex-col justify-center font-bold">
              <input
                type="text"
                value={numerator ? numerator.toString() : ''}
                onChange={(e) => {
                  setGameStateRef(prev => ({
                    ...prev,
                    screen3: {
                      ...prev.screen3,
                      answers: {
                        ...prev.screen3.answers,
                        numerator: Number(e.target.value)
                      }
                    }
                  }))
                }}
                className={`w-10 text-center mb-2 border-2 border-black ${numerator === numerator1*denominator2/denominator1 ? 'text-[#FF497C] border-[#FF497C]' : ''}`}
                disabled={step != 1}
              />
              <span className="border-b-2 border-black w-12" />
              <span className="text-3xl font-bold">
                {denominator2}
              </span>

            </div>
          </div>
          {step >=2 && (
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center">
                <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
              </div>  
              <div className="flex justify-center items-center">
              {/* <Input 
                type="number"
                value={multiplier1_denominator ? multiplier1_denominator.toString() : ''}
                onChange={(e) => {
                  setGameStateRef(prev => ({
                    ...prev,
                    screen3: {
                      ...prev.screen3,
                      answers: {
                        ...prev.screen3.answers,
                        multiplier1_denominator: Number(e.target.value)
                      }
                    }
                  }))
                }}
                placeholder=""
                className=""
              /> */}
              x{denominator2/denominator1}
              </div>
            </div>
          )
          }

        {step == 2 && (
          <div className="flex flex-col">
            <Proceed onComplete={() => {
              sendAdminMessage('agent', `What would you need to multiply ${denominator1} by to get ${denominator1*multiplier1}?`);
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 3
                }
              }))
            }} />
          </div>
        )}

        {step >= 3 && (
          <p className="text-3xl font-bold text-center text-[#FF497C] mt-8">
            Great! Try this:
          </p>
        )}


        </div>
      </div>
      {step >= 3 && step <= 4 && (
          <div className="flex flex-col mt-10 py-10 bg-red-100 w-full">
            <OnlyMultiplier numerator1={numerator1} denominator1={denominator1} multiplier={multiplier1} onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 4
                }
              }))
              sendAdminMessage('agent', `You've got it! We splitted each piece by multiplying both the total number of pieces (denominator) and the pieces you have (numerator) by ${multiplier1}`);
            }} />
          </div>
        )}
          {step == 4 && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold text-center text-green-600 mt-8 mb-16">
              You've got it!
            </p>
            <Proceed onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 5
                }
              }))
              sendAdminMessage('agent', `Do you remember how many pieces we got when we merged the chocolate to  ${denominator1/multiplier2} pieces?`);
            }} />
          </div>
          )}
    </div>
  )
}


function Level3_2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen3;
  const {numerator1, denominator1, denominator2, denominator3} = gameStateRef.current.screen3.question;
  const {multiplier1, multiplier2, multiplier3} = gameStateRef.current.screen3.answers;
  const dropref = useRef<HTMLDivElement>(null);

  const [numerator, setnumerator] = useState<number | undefined>();
  const [multiplier1_denominator, setmultiplier1_denominator] = useState<number | undefined>();
  const [multiplier1_numerator, setmultiplier1_numerator] = useState<number | undefined>();

  useEffect(() => {
    if (!dropref.current) return;
      console.log(step)
      dropref.current.scroll({top: dropref.current.scrollHeight, behavior: 'smooth'});
    }, [step]);

  useEffect(() => {
    if (numerator === numerator1/multiplier2) {
      setGameStateRef(prev => ({
        ...prev,
        screen3: {
          ...prev.screen3,
          step: 6
        }
      }));
      sendAdminMessage('agent', `When you use honey with a value of ${multiplier2}, you merge every ${multiplier2} pieces into 1. This reduces both the denominator and the numerator by dividing each by ${multiplier2}!`);
    }
  }, [numerator]);

  useEffect(() => {
    if (!multiplier1_numerator || !multiplier1_denominator) return;
    console.log(multiplier1_numerator, multiplier1_denominator, multiplier3/multiplier2)
    if (multiplier1_numerator === multiplier3 && multiplier1_denominator === multiplier3) {
                    setGameStateRef(prev => ({
                      ...prev,
                      screen3: {
                        ...prev.screen3,
          step: 8
        } 
      }));
      sendAdminMessage('agent', `We merged ${multiplier3} pieces into 1 by dividing both parts by ${multiplier3}. You're crushing this. Time for the final level!`);
    }
  }, [multiplier1_numerator, multiplier1_denominator]);

  return (
    <div className="w-full space-y-8 mb-12" ref={dropref}>
    <Header 
      numerator1={numerator1}
      denominator1={denominator1}
        denominator2={denominator2}
        step={{
          id: 4,
          text: "More Equivalent Fractions"
        }}
        level={3}
      />
      <div className="flex flex-col max-w-screen-sm gap-4 mx-auto items-center justify-center">

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}} disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1} denominator={denominator1} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1/denominator1*denominator2} denominator={denominator2} handlePieceClick={() => {}} disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1/denominator1*denominator2} denominator={denominator2} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1*denominator3/denominator1} denominator={denominator3} handlePieceClick={() => {}} disabled={true} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1*denominator3/denominator1} denominator={denominator3} />
          </div>
        </div>


        <div className='flex mt-8 justify-center items-center gap-4'>
          <div className="flex items-center gap-4">
            <RedBox>Step 5</RedBox>
            <p className='text-xl min-w-56 text-center bg-[#FF497C] font-bold text-white px-4 py-8'>
              Reflect
            </p>
          </div>
        </div>

        <div className='flex flex-col mt-8 justify-center items-center gap-4'>
            <div className="flex justify-center items-center gap-4">
              <div className="text-3xl flex flex-col justify-center font-bold">
                <input
                  type="text"
                  value={numerator ? numerator.toString() : ''}
                  onChange={(e) => setnumerator(Number(e.target.value))}
                  className="w-10 text-center border-2 mb-2 border-black"
                  disabled={step != 5}
                />
                <span className="border-b-2 border-black w-12" />
                <span className="text-3xl text-center font-bold">
                  {denominator1/multiplier2}
                </span>

              </div>
              <span className="text-3xl font-bold">=</span>
              <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold" /> 
              <span className="text-3xl font-bold">=</span>
              <Fraction numerator={numerator1*multiplier1} denominator={denominator1*multiplier1} className="text-3xl font-bold" />
            </div>

        {step == 6 && (
          <div className="flex flex-col">
            <Proceed onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 7
                }
              }))
            }} />
          </div>
        )}
        {step >= 7 && (
          <p className="text-3xl font-bold text-center text-[#FF497C] mt-8">
            Great! Try this:
          </p>
        )}


        </div>
      </div>
      {step >= 7 && step <= 8 && (
          <div className="flex flex-col mt-10 py-10 bg-red-100 w-full">
            <OnlyDivisor numerator1={numerator1} denominator1={denominator1} divisor={multiplier3} onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 8
                }
              }))
              sendAdminMessage('agent', `We merged ${multiplier3} pieces into 1 by dividing both parts by ${multiplier3}. You're crushing this. Time for the final level!`);
            }} />
          </div>
        )}
        {step == 8 && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold text-center text-green-600 mt-8 mb-16">
              You've got it!
            </p>
            <Proceed onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                level: 4
              }))
            }} />
          </div>
        )}
      </div>
  );
}