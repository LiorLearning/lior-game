import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { CombineFractionInput } from './second';
import Intro from '../components/intro';
import Proceed from '../components/proceed';

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question3;
  const { step, whole1, whole2, whole3, numerator1, numerator2, numerator3, denominator1, denominator2, denominator3 } = gameStateRef.current.state4;

  const handleWholeChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, whole1: parseInt(e.target.value) } }));
    checkFirstStep(parseInt(e.target.value), whole2, numerator1, numerator2, denominator1, denominator2);
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, whole2: parseInt(e.target.value) } }));
    checkFirstStep(whole1, parseInt(e.target.value), numerator1, numerator2, denominator1, denominator2);
  }

  const handleNumeratorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, numerator1: parseInt(e.target.value) } }));
    checkFirstStep(whole1, whole2, parseInt(e.target.value), numerator2, denominator1, denominator2);
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, numerator2: parseInt(e.target.value) } }));
    checkFirstStep(whole1, whole2, numerator1, parseInt(e.target.value), denominator1, denominator2);
  }

  const handleDenominatorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, denominator1: parseInt(e.target.value) } }));
    checkFirstStep(whole1, whole2, numerator1, numerator2, parseInt(e.target.value), denominator2);
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, denominator2: parseInt(e.target.value) } }));
    checkFirstStep(whole1, whole2, numerator1, numerator2, denominator1, parseInt(e.target.value));
  }


  const checkFirstStep = (
    whole1: number, 
    whole2: number, 
    numerator1: number, 
    numerator2: number, 
    denominator1: number, 
    denominator2: number
  ) => {
    if (
      whole1 === fraction1.whole && 
      whole2 === fraction2.whole && 
      numerator1 === fraction1.numerator && 
      numerator2 === fraction2.numerator && 
      denominator1 === fraction1.denominator && 
      denominator2 === fraction2.denominator
    ) {
      setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: 1 } }));
    }
  }

  const handleWholeChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, whole3: parseInt(e.target.value) } }));
    checkSecondStep(parseInt(e.target.value), numerator3, denominator3);
  }

  const handleNumeratorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, numerator3: parseInt(e.target.value) } }));
    checkSecondStep(whole3, parseInt(e.target.value), denominator3);
  }

  const handleDenominatorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, denominator3: parseInt(e.target.value) } }));
    checkSecondStep(whole3, numerator3, parseInt(e.target.value));
  }

  const checkSecondStep = (
    whole3: number,
    numerator3: number,
    denominator3: number
  ) => {
    if (whole3 === fraction1.whole - fraction2.whole && numerator3 === fraction1.numerator - fraction2.numerator && denominator3 === fraction1.denominator) {
      setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: 2 } }));
    }
  }

  return (
    <div className="w-full">
      <Header fraction1={fraction1} fraction2={fraction2} version={1} type='subtraction' />
      <div className="flex flex-col gap-8 items-center">
        <Intro text="Now that you know how to add, you can easily subtract as well..." />
        <div className="flex flex-col gap-8 items-center w-full bg-lime-100 p-8 ">
          <p className="text-2xl font-bold">
            {step === 0 ? 'Let’s rearrange the wholes and fractions first!' : 'Instead of adding, we will use the subtraction sign now'}
          </p>

          { 
            <div className="flex gap-8 items-center">
              <div className="flex flex-col gap-2">
                <div className="border-4 shadow-[-2px_2px_0px_rgba(0,150,0,1)] border-green-600 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={whole1 ? whole1 : ''}
                      onChange={handleWholeChange1}
                      min={0}
                      max={10}
                      placeholder="?"
                      className="w-12 h-24 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded"
                    />
                    <span className="text-2xl font-bold">
                      {step === 0 ? '' : '-'}
                    </span>
                    <input
                      type="text"
                      value={whole2 ? whole2 : ''}
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

              <span className="text-2xl font-bold">
                {step === 0 ? '' : '+'}
              </span>

              <div className='flex flex-col gap-2'>         
                <div className="border-4 shadow-[-2px_2px_0px_rgba(150,0,0,1)] border-purple-600 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={numerator1 ? numerator1 : ''}
                        onChange={handleNumeratorChange1}
                        min={0}
                        max={10}
                        placeholder="?"
                        className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                      />
                      <div className="w-full my-1 h-[2px] bg-black" />
                      <input
                        type="text"
                        value={denominator1 ? denominator1 : ''}
                        onChange={handleDenominatorChange1}
                        min={0}
                        max={10}
                        placeholder="?"
                        className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                      />
                    </div>
                    <span className="text-2xl font-bold">
                      {step === 0 ? '' : '-'}
                    </span>
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={numerator2 ? numerator2 : ''}
                        onChange={handleNumeratorChange2}
                        min={0}
                        max={10}
                        placeholder="?"
                        className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                      />
                      <div className="w-full my-1 h-[2px] bg-black" />
                      <input
                        type="text"
                        value={denominator2 ? denominator2 : ''}
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
          }

          {step >= 1 &&
            <div className="flex flex-col items-center w-full gap-2">
              <hr className="w-full max-w-3xl border-1 border-black" />
              <div className="flex items-center justify-center gap-2 mt-14">
                <input
                  type="text"
                  value={whole3 ? whole3 : ''}
                  onChange={handleWholeChange3}
                  min={0}
                  max={10}
                  placeholder="?"
                  className="w-14 h-14 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded"
                />
                
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator3 ? numerator3 : ''}
                    onChange={handleNumeratorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-14 mx-2 h-14 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                  <div className="w-full my-1 h-[2px] bg-black" />
                  <input
                    type="text"
                    value={denominator3 ? denominator3 : ''}
                    onChange={handleDenominatorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-14 mx-2 h-14 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  />
                </div>
              </div>
            </div>
          }

          {step >= 2 && 
            <Proceed onComplete={() => {}} />
          }
        </div>
      </div>
    </div>
  );
}
