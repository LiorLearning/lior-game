import { useGameState } from '../state-utils';
import Addition from '../components/header';
import { BaseProps, MixedFractionProps } from '../utils/types';
import MixedFraction from '../components/mixedFraction';
import Proceed from '../components/proceed';
import QuestionDescription from '../components/questionDescription';
import React, { useEffect, useState } from 'react';
import Intro from '../components/intro';
import { Button } from '@/components/ui/button';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question2;
  const { step } = gameStateRef.current.state2;

  return (
    <div className="">
      <Addition fraction1={fraction1} fraction2={fraction2} version={step===0 ? 1 : 2} type='addition' />
      {
        step === 0 ?
          <Step1 sendAdminMessage={sendAdminMessage} />
        : step === 1 ?
          <Step2 sendAdminMessage={sendAdminMessage} />
        : step === 2 ?
          <Step3 sendAdminMessage={sendAdminMessage} />
        : null
      }
    </div>  
  );
}

const Step1 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question2;
  return (
    <div className="flex gap-8 flex-col w-full">
      <Intro text="Lets us do another question now! You can do this." />
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-lime-200 py-4 mb-[2px] border-2 font-extrabold border-gray-800 px-4 rounded-t-lg text-center">
          Total Order
        </div>
        <div className="flex items-center justify-center gap-4 p-8 border-2 border-gray-800 rounded-b-lg">
          <div className="flex items-center gap-2 border-2 border-gray-800 rounded-lg">
            <span className='bg-pink-100 rounded-lg'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Pepperoni Pizza</p>
          </div>  
          <span className="text-5xl font-bold text-red-500">+</span>
          <div className="flex items-center gap-2 rounded-lg border-2 border-gray-800">
            <span className='bg-yellow-100 rounded-lg'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Cheese Pizza</p>
          </div>
        </div>
      </div>
      <Button onClick={() => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: 1 } }))} className='m-2 mx-auto bg-lime-500 hover:bg-lime-600 max-w-3xl'>Next Step</Button>
    </div>
  );
};

const Step2 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { substep } = gameStateRef.current.state2
  const setSubStep = (value: number) => {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, substep: value } }));
  }
  const {fraction1, fraction2} = gameStateRef.current.questions.question2;
  const { question1description, question2description } = gameStateRef.current.state2;

  return(
    <div className='flex flex-col gap-4 w-full my-16 items-center'>
      { substep >= 0 &&
        <QuestionDescription 
          showFirstRow={question1description.showFirstRow}
          setShowFirstRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, showFirstRow: value } } }))}
          showSecondRow={question1description.showSecondRow}
          setShowSecondRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, showSecondRow: value } } }))}
          showThirdRow={question1description.showThirdRow}
          setShowThirdRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, showThirdRow: value } } }))}

          inputWhole={question1description.inputWhole}
          setInputWhole={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, inputWhole: value } } }))}
          inputNumerator={question1description.inputNumerator}
          setInputNumerator={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, inputNumerator: value } } }))}
          inputDenominator={question1description.inputDenominator}
          setInputDenominator={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question1description: { ...prev.state2.question1description, inputDenominator: value } } }))}


          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          pizzaName='pepperoni' color='pink' 

          onComplete={() => { 
            sendAdminMessage('agent', "Awesome! The pepperoni pizza order is complete, let's revise the mushroom pizza order too");
            setTimeout(() => {
              setSubStep(1)
            }, 1000)
          }} 
        />
      }
      { substep >= 1 &&
        <QuestionDescription 
          showFirstRow={question2description.showFirstRow}
          setShowFirstRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, showFirstRow: value } } }))}
          showSecondRow={question2description.showSecondRow}
          setShowSecondRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, showSecondRow: value } } }))}
          showThirdRow={question2description.showThirdRow}
          setShowThirdRow={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, showThirdRow: value } } }))}

          inputWhole={question2description.inputWhole}
          setInputWhole={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, inputWhole: value } } }))}
          inputNumerator={question2description.inputNumerator}
          setInputNumerator={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, inputNumerator: value } } }))}
          inputDenominator={question2description.inputDenominator}
          setInputDenominator={(value) => setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, question2description: { ...prev.state2.question2description, inputDenominator: value } } }))}


          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          pizzaName='mushroom' color='yellow' 

          onComplete={() => {
            sendAdminMessage('agent', "That is done! You have revised the order, now click on next to move to the most important step");
            setTimeout(() => {
              setSubStep(2)
            }, 1000)
          }} 
          />
      }
      { substep >= 2 &&
        <CombineFractionInput onComplete={() => setSubStep(4)} fraction1={fraction1} fraction2={fraction2} message={() => sendAdminMessage('agents', "There you are, add the wholes and fractions now, and you will have your answer")} />
      }
      { substep >= 4 &&
        <Proceed onComplete={() => setGameStateRef(prev => ({ ...prev, screen: 3 }))} />
      }
    </div>
  )

}

const Step3 = ({ sendAdminMessage }: BaseProps) => {
  return (
    <div />
  )
}

export const CombineFractionInput = ({ onComplete, fraction1, fraction2, message }: { onComplete: () => void, fraction1: MixedFractionProps, fraction2: MixedFractionProps, message: () => void }) => {
  const [whole1, setWhole1] = useState<string>('');
  const [whole2, setWhole2] = useState<string>('');
  const [whole3, setWhole3] = useState<string>('');

  const [numerator1, setNumerator1] = useState<string>('');
  const [numerator2, setNumerator2] = useState<string>('');
  const [numerator3, setNumerator3] = useState<string>('');

  const [denominator1, setDenominator1] = useState<string>('');
  const [denominator2, setDenominator2] = useState<string>('');
  const [denominator3, setDenominator3] = useState<string>('');

  const [second, setSecond] = useState<number>(0);

  const handleWholeChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole1(e.target.value);
    checkfirst(e.target.value,whole2,numerator1,numerator2,denominator1,denominator2)
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole2(e.target.value);
    checkfirst(whole1,e.target.value,numerator1,numerator2,denominator1,denominator2)
  }

  const handleNumeratorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator1(e.target.value);
    checkfirst(whole1,whole2,e.target.value,numerator2,denominator1,denominator2)
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,e.target.value,denominator1,denominator2)
  }

  const handleDenominatorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator1(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,e.target.value,denominator2)
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,denominator1,e.target.value)
  }

  const checkfirst = (whole1: string, whole2: string, numerator1: string, numerator2: string, denominator1: string, denominator2: string) => {
    if (
      parseInt(whole1)===fraction1.whole && 
      parseInt(whole2)===fraction2.whole && 
      parseInt(numerator1)===fraction1.numerator && 
      parseInt(numerator2)===fraction2.numerator && 
      parseInt(denominator1)===fraction1.denominator && 
      parseInt(denominator2)===fraction2.denominator
    ) {
      setSecond(1);
    }
  }

  const handleWholeChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole3(e.target.value);
    checksecond(e.target.value,numerator3,denominator3)
  }

  const handleNumeratorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator3(e.target.value);
    checksecond(whole3,e.target.value,denominator3)
  }

  const handleDenominatorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator3(e.target.value);
    checksecond(whole3,numerator3,e.target.value)
  }


  const checksecond = (whole3: string, numerator3: string, denominator3: string) => {
    console.log(whole3, numerator3, denominator3)
    console.log(fraction1.whole + fraction2.whole, fraction1.numerator + fraction2.numerator, fraction1.denominator)
    if (
      parseInt(whole3) === (fraction1.whole + fraction2.whole) && 
      parseInt(numerator3) === (fraction1.numerator + fraction2.numerator) && 
      parseInt(denominator3) === fraction1.denominator
    ) {
      onComplete();
    }
  }

  useEffect(() => {
    if (numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== ''){
      message()
    }
  }, [whole1, whole2, numerator1, numerator2, denominator1, denominator2])

  return (
    <div className='w-full bg-green-50 flex py-20 flex-col justify-center items-center'>
      <div className="flex flex-col gap-8 items-center">
        <p className='text-2xl font-bold'>
          Rearrange to add the portions
        </p>

        <div className="flex gap-8 items-center">
          <div className="flex flex-col gap-2">
            <div className="border-4 shadow-[-2px_2px_0px_rgba(0,150,0,1)] border-green-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={whole1}
                  onChange={handleWholeChange1}
                  min={0}
                  max={10}
                  placeholder="?"
                  className="w-12 h-24 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded"
                />
                <span className="text-2xl font-bold">+</span>
                <input
                  type="text"
                  value={whole2}
                  onChange={handleWholeChange2}
                  min={0}
                  max={10}
                  placeholder="?"
                  className="w-12 h-24 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded"
                />
              </div>
            </div>
            <p 
              className='text-2xl font-bold text-center'
            >
              Wholes
            </p>
          </div>

          <span className="text-2xl font-bold">+</span>

          <div className='flex flex-col gap-2'>         
            <div className="border-4 shadow-[-2px_2px_0px_rgba(150,0,0,1)] border-purple-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator1}
                    onChange={handleNumeratorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator1}
                    onChange={handleDenominatorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                </div>
                <span className="text-2xl font-bold">+</span>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator2}
                    onChange={handleNumeratorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator2}
                    onChange={handleDenominatorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                </div>
              </div>
            </div>
            <p 
              className='text-2xl font-bold text-center'
            >
              Fractions
            </p>
          </div>
        </div>

        {(numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== '') && (
          <>
            <hr className='w-full border-1 border-black' />

            <p className="text-2xl font-bold text-green-600">Write in mixed form</p>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-8">
                <input
                  type="text"
                  value={whole3}
                  onChange={handleWholeChange3}
                  min={0}
                  max={10}
                  placeholder="?"
                  className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded"
                />
                
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator3}
                    onChange={handleNumeratorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator3}
                    onChange={handleDenominatorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                </div>
              </div>
              <span className='flex text-sm font-bold justify-between'>
                <p>Whole</p>
                <p>Fraction</p>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}