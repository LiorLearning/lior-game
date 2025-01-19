import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Bar from "../components/bar";
import Fraction from "../components/Fraction";
import Proceed from "../components/proceed";
import { Input } from "@/components/custom_ui/input";
import KnifeSelector from "../components/knifeselector";
import Image from "next/image";


export default function Level1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen1;
  const {numerator1, denominator1, denominator2} = gameStateRef.current.screen1.question;

  return (
    <div className="w-full space-y-8 mb-12">
    <Header 
      numerator1={numerator1}
      denominator1={denominator1}
        denominator2={denominator2}
        step={step}
        level={1}
      />
      {step.id === 1 ? <Step1 sendAdminMessage={sendAdminMessage} /> : <Step2 sendAdminMessage={sendAdminMessage} />}
    </div>
  )
}

const Step1 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2} = gameStateRef.current.screen1.question;  
  const { step, selectedKnife, selectedPieces } = gameStateRef.current.screen1

  const start = useRef(false);

  const handlePieceClick = (index: number) => {
    setGameStateRef({
      ...gameStateRef.current,
      screen1: {
        ...gameStateRef.current.screen1,
        selectedPieces: index
      }
    });
  };

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's solve this visually! Imagine you have ${numerator1} out of ${denominator1} big chunks, but we need ${denominator2} smaller sized bites. We need to use a suitable knife to divide the chocolate into ${denominator2}pieces!`);
      start.current = true;
    }
  }, []);

  useEffect(() => {
    if (selectedKnife) {
      if (selectedKnife * denominator1 === denominator2) {
        sendAdminMessage('agent', `Boom—now we've got ${denominator2} pieces! Let's figure out how many you get from these ${denominator2}. Let's go!`);
      } else {
        sendAdminMessage('agent', `Hmm, right now, you've used the knife labeled ${selectedKnife}, and that gave us ${selectedKnife * denominator1} pieces, but we need 9 pieces. Can you figure out which knife we should use?`);
      }
    }
  }, [selectedKnife]);

  return (
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 w-full">
          <p className="text-2xl font-medium">Let's split this chocolate into {denominator2} pieces.</p>
            <div className="flex justify-center relative">
              <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}} disabled={true} />
              <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold ml-4 absolute top-0 left-full" />
            </div>
            <div className="flex justify-center">
              <Image src="/img/arrow.svg" className="py-6" alt="Arrow" width={30} height={30} />
            </div>

            <p className="text-2xl font-medium">
              Choose a suitable knife to split the chocolate into {denominator2} pieces
            </p>
            <div className="flex justify-center relative">
              <Bar numerator={0} denominator={selectedKnife ? selectedKnife * denominator1 : denominator1} handlePieceClick={handlePieceClick} disabled={true} />
              <div className="flex flex-col gap-2 ml-2 absolute top-0 left-full">
                <KnifeSelector options={[2,3,4,5]} selectedKnife={selectedKnife} setSelectedKnife={(value: number | null) => setGameStateRef({
                  ...gameStateRef.current,
                  screen1: {
                    ...gameStateRef.current.screen1,
                    selectedKnife: value
                  }
                })} />
              </div>
          </div>
          <span className="text-2xl font-medium flex items-center justify-center">
              <span className={`
                  border-4 bg-white text-2xl px-2 font-extrabold py-1 mr-1
                  ${selectedKnife && selectedKnife * denominator1 === denominator2 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}
                `}
              > {selectedKnife ? selectedKnife * denominator1 : denominator1}
              </span>
              pieces
            </span>
        </div>

        {selectedKnife && selectedKnife * denominator1 === denominator2 && (
            <Proceed onComplete={() => {
              setGameStateRef({
                ...gameStateRef.current,
                screen1: {
                  ...gameStateRef.current.screen1,
                  step: {
                    id: 2,
                    text: 'Create equivalent fractions'
                  }
                }
              })
            }} />
          )}
      </div>
  );
}


const Step2 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2} = gameStateRef.current.screen1.question;  
  const { step, selectedKnife, selectedPieces } = gameStateRef.current.screen1;
  const [correct, setCorrect] = useState(false);
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(0);
  const [step2subpart, setStep2subpart] = useState(0);
  const [answer, setAnswer] = useState('');

  const start = useRef(false);

  const handlePieceClick = (index: number) => {
    console.log(index)
    setGameStateRef({
      ...gameStateRef.current,
      screen1: {
        ...gameStateRef.current.screen1,
        selectedPieces: index
      }
    });
  };

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', "Can you pick the same amount of chocolate as before? No sneaky extra bites! ");
      start.current = true;
    }
  }, []);



  return (
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 w-full">

          {!step2subpart && <p className="text-2xl font-medium">
            {correct ? 
              "What fraction of chocolate do you get?"
              : 
              "Select pieces to get the same amount of chocolate"
            }
          </p>}

            <div className="flex justify-center relative">
              <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}} disabled={true} />
              <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold ml-4 absolute top-0 left-full" />
            </div>

            {!step2subpart && (
              <div className="flex justify-center">
                <img src="/img/arrow.svg" className="py-6" alt="Arrow" width={30} height={30} />
              </div>
            )}

            <div className="flex justify-center relative">
              <Bar numerator={selectedPieces} denominator={denominator2} handlePieceClick={handlePieceClick} disabled={false} />
              {correct && (
                <div className="flex flex-col gap-2 ml-2 absolute top-0 left-full">
                  <Input 
                    type="text"
                    value={numerator.toString() === '0' ? '' : numerator.toString()}
                    placeholder="?"
                    onChange={(e) => setNumerator(parseInt(e.target.value || '0'))}
                    className={`
                      p-2 w-12 border-2 font-extrabold text-center rounded-lg
                      ${numerator == numerator1 * denominator2 / denominator1 ? 'border-green-500 bg-green-500 text-white' : 'border-black'}
                    `}
                  />
                
                
                <span className="border-b-2 border-black w-12" />
                <Input 
                  type="text"
                  value={denominator.toString() === '0' ? '' : denominator.toString()}
                  placeholder="?"
                  onChange={(e) => setDenominator(parseInt(e.target.value || '0'))}
                    className={`
                      p-2 w-12 border-2 font-extrabold text-center rounded-lg
                      ${denominator == denominator2 ? 'border-green-500 bg-green-500 text-white' : 'border-black'}
                    `}
                  />
                </div>
              )}
           </div>
        </div>
        {!step2subpart ? ( 
          numerator === numerator1 * denominator2 / denominator1 && denominator === denominator2 ? (
            <Proceed
              onComplete={() => {
                setStep2subpart(1)
                sendAdminMessage('agent', "Now, let's fill in the missing number to complete the fraction!");
              }}
            />
          ) : (!correct &&
            <button 
              className={`text-xl cursor-pointer bg-red-500 text-white shadow-[-3px_3px_0px_#000000] px-8 py-2 font-bold ${correct && 'bg-gray-500'}`}
              onClick={() => { 
                if (!correct && selectedPieces === numerator1 * denominator2 / denominator1) { setCorrect(true) } else { 
                  sendAdminMessage('admin', `needed to select ${numerator1 * denominator2 / denominator1} pieces of chocolate from ${denominator2} to make the fraction equivalent to ${numerator1}/${denominator1} but you selected ${selectedPieces} pieces. Dont Mention the number ${numerator1 * denominator2 / denominator1} in your response rather ask to compare visually`);
                };
                console.log(correct)   
              }}
            >
              Check
            </button>
          )
        ) : (
          <div className="flex justify-center items-center max-w-lg mx-auto text-3xl font-bold">
            <Fraction numerator={numerator1} denominator={denominator1} className="font-extrabold" />
            <span className="mx-4">=</span>
            <div className="flex space-y-1 items-center justify-center flex-col">
              <Input
                type="text"
                value={answer ? answer : ''}
                placeholder="?"
                onChange={(e) => {
                  setAnswer(e.target.value)
                  if (parseInt(e.target.value) === numerator1 * denominator2 / denominator1) {
                    sendAdminMessage('agent', "Great job, who knew math could be this sweet?");
                  } else if (e.target.value.length > 0 && parseInt(e.target.value) !== numerator1 * denominator2 / denominator1) {
                    sendAdminMessage('admin', `needed ${numerator1 * denominator2 / denominator1} but you filled in ${e.target.value}, ask to compare visually`);
                  }
                }}
                className={`p-2 w-12 border-2 font-extrabold text-center border-black rounded-lg ${
                  parseInt(answer) === numerator1 * denominator2 / denominator1 && answer !== '' ? 'border-green-500 text-green-500' : 'border-black'
                }`}
              />
              <span className="border-b-2 border-black w-12" />
              <span className="text-3xl">{denominator2}</span>
            </div>
          </div>
        )}
        {step2subpart !== 0 && parseInt(answer) === numerator1 * denominator2 / denominator1 && (
          <Proceed
            onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                level: 2
              }));
            }}
          />
        )}
      </div>
  );
}
