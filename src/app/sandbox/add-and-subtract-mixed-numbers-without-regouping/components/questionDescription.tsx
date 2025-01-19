import { useState } from 'react';
import  MixedFraction from './mixedFraction';
import PizzaSlices from './pizzaSlices';

interface QuestionDescriptionProps {
  showFirstRow: boolean;
  setShowFirstRow: (show: boolean) => void;
  showSecondRow: boolean;
  setShowSecondRow: (show: boolean) => void;
  showThirdRow: boolean;
  setShowThirdRow: (show: boolean) => void;

  inputWhole: string;
  setInputWhole: (input: string) => void;
  inputNumerator: string;
  setInputNumerator: (input: string) => void;
  inputDenominator: string;
  setInputDenominator: (input: string) => void;

  whole: number;
  numerator: number;
  denominator: number;
  pizzaName: string;
  color: string;
  onComplete: () => void;
}



const QuestionDescription = ({ 
  showFirstRow,
  setShowFirstRow,
  showSecondRow,
  setShowSecondRow,
  showThirdRow,
  setShowThirdRow,

  inputWhole,
  setInputWhole,
  inputNumerator,
  setInputNumerator,
  inputDenominator,
  setInputDenominator,

  whole, 
  numerator, 
  denominator, 
  pizzaName, 
  color, 
  onComplete 
}: QuestionDescriptionProps) => {


  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole(value);
    if (parseInt(value) === whole) {
      setShowSecondRow(true);
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator(value);
    handleComplete(parseInt(value), parseInt(inputDenominator || '0'));
  }

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator(value);
    handleComplete(parseInt(inputNumerator || '0'), parseInt(value));
  }

  const handleComplete = (inputNumerator: number, inputDenominator: number) => {
    if (
      inputNumerator === numerator && 
      inputDenominator === denominator && 
      !isNaN(inputNumerator) && 
      !isNaN(inputDenominator)
    ) {
      setShowFirstRow(false);
      setShowSecondRow(false);
      setShowThirdRow(true);
      onComplete();
    }
  }

  return (
    <div className={`flex flex-col gap-4 max-w-3xl w-full mx-auto`}>
      {showFirstRow &&
        <div className="flex gap-4 items-center">
          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg h-[136px]`}>
            <p className='text-xl w-2/3'>
              How many <span className='font-bold'>whole</span> {pizzaName} pizzas
              are ordered?
            </p>
            <input
              type="text"
              min={0}
              max={10}
              value={inputWhole}
              onChange={handleWholeChange}
              className={`border-2 text-center font-extrabold border-gray-600 rounded p-2 w-12 h-16 text-xl text-${color}-800`}
            />
          </span>

          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg h-[136px]`}>
            <div className='flex gap-2'>
              {Array.from({ length: whole }).map((_, index) => (
                <div key={index} className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${color}-800 bg-${color}-500`}>
                  <div className={`w-14 h-14 bg-${color}-600 border-2 border-${color}-800 rounded-full`} />
                </div>
              ))}
            </div>
          </span>
        </div>
      }
      {showSecondRow && (
        <div className="flex gap-4 items-center mt-4">
          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg h-[136px]`}>
            <div className="flex justify-between items-center w-full">
              <div className="text-xl w-2/3">What fraction of {pizzaName} pizza is left?</div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputNumerator}
                  onChange={handleNumeratorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
                <span className='border-b-2 border-gray-600 w-12'></span>
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputDenominator}
                  onChange={handleDenominatorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
              </div>
            </div>
          </span>

          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg h-[136px]`}>
            <PizzaSlices
              numerator={numerator}
              denominator={denominator}
              color={color}
              size="md"
            />
          </span>
        </div>
      )}
      {showThirdRow && (
        <div className={`bg-${color}-100 p-8 w-full rounded-lg border-2 border-${color}-800 transition-all duration-100`}>
          <div className="flex items-center w-full justify-center gap-8">
            {/* Left side - Mixed Fraction */}
            <div className="flex items-center">
              <MixedFraction
                whole={whole}
                numerator={numerator}
                denominator={denominator}
                className='text-2xl font-extrabold'
              />
            </div>

            {/* Equals sign */}
            <div className="text-2xl font-bold">=</div>

            {/* Right side - Input fields */}
            <div className="flex items-center gap-4">
              {/* Whole number input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={whole} 
                  readOnly
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Wholes</span>
              </div>

              <div className="text-2xl font-bold">+</div>

              {/* Fraction input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={numerator} 
                  readOnly
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <div className="w-12 border-b-2 border-gray-600 my-1"></div>
                <input 
                  type="text" 
                  value={denominator} 
                  readOnly
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Slices</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default QuestionDescription;