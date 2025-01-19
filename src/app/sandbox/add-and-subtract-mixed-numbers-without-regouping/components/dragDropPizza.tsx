"use client"

import React, { useState } from 'react';
import PizzaSlices from './pizzaSlices';
import { sounds } from '../utils/sounds';

interface DragDropPizzaProps {
  fraction1: {
    whole: number;
    numerator: number;
    denominator: number;
    color: string;
    name: string;
  };
  fraction2: {
    whole: number;
    numerator: number;
    denominator: number;
    color: string;
    name: string;
  };
  onComplete: () => void;
}

const DragDropPizza: React.FC<DragDropPizzaProps> = ({
  fraction1,
  fraction2,
  onComplete
}) => {
  // Track source pizzas
  const [sourcePizzas, setSourcePizzas] = useState({
    [fraction1.name]: {
      wholes: Array(fraction1.whole).fill(true),
      slices: true
    },
    [fraction2.name]: {
      wholes: Array(fraction2.whole).fill(true),
      slices: true
    }
  });

  // Track dropped pizzas
  const [droppedWholes, setDroppedWholes] = useState<{[key: string]: number}>({
    [fraction1.name]: 0,
    [fraction2.name]: 0
  });
  
  const [droppedSlices, setDroppedSlices] = useState<{[key: string]: number}>({
    [fraction1.name]: 0,
    [fraction2.name]: 0
  });

  // Add new state for input values
  const [answers, setAnswers] = useState({
    wholes: '',
    numerator: '',
    denominator: ''
  });

  // Check if all pieces are dropped
  const allPiecesDropped = 
    droppedWholes[fraction1.name] === fraction1.whole &&
    droppedWholes[fraction2.name] === fraction2.whole &&
    droppedSlices[fraction1.name] === fraction1.numerator &&
    droppedSlices[fraction2.name] === fraction2.numerator;

  // Calculate correct answers
  const correctWholes = fraction1.whole + fraction2.whole;
  const correctNumerator = fraction1.numerator + fraction2.numerator;
  const correctDenominator = fraction1.denominator; // assuming same denominator

  const handleDragStart = (e: React.DragEvent, type: 'whole' | 'slice', pizza: string, index?: number) => {
    sounds.drag(); // Play drag sound
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('pizza', pizza);
    if (typeof index === 'number') {
      e.dataTransfer.setData('index', index.toString());
    }
  };

  const handleDropWhole = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const pizza = e.dataTransfer.getData('pizza');
    const index = parseInt(e.dataTransfer.getData('index'));
    
    if (type === 'whole' && sourcePizzas[pizza].wholes[index]) {
      sounds.drop(); // Play drop sound
      setSourcePizzas(prev => ({
        ...prev,
        [pizza]: {
          ...prev[pizza],
          wholes: prev[pizza].wholes.map((val, i) => i === index ? false : val)
        }
      }));

      setDroppedWholes(prev => ({
        ...prev,
        [pizza]: prev[pizza] + 1
      }));
    }
  };

  const handleDropSlice = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const pizza = e.dataTransfer.getData('pizza');
    
    if (type === 'slice' && sourcePizzas[pizza].slices) {
      sounds.drop(); // Play drop sound
      setSourcePizzas(prev => ({
        ...prev,
        [pizza]: {
          ...prev[pizza],
          slices: false
        }
      }));

      setDroppedSlices(prev => ({
        ...prev,
        [pizza]: pizza === fraction1.name ? fraction1.numerator : fraction2.numerator
      }));
    }
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));

    // Check if all answers are correct
    const newAnswers = {
      ...answers,
      [name]: value
    };

    if (
      parseInt(newAnswers.wholes) === correctWholes &&
      parseInt(newAnswers.numerator) === correctNumerator &&
      parseInt(newAnswers.denominator) === correctDenominator
    ) {
      sounds.correct(); // Play correct sound
      onComplete();
    } else if (value !== '') {
      sounds.wrong(); // Play wrong sound when incorrect answer is entered
    }
  };

  // Input style based on whether pieces are dropped and answer correctness
  const getInputStyle = (value: string, correctValue: number) => {
    if (!allPiecesDropped) return 'bg-gray-100 text-gray-400 cursor-not-allowed';
    if (value === '') return 'bg-white';
    return parseInt(value) === correctValue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className='flex flex-col gap-4'>

      {/* Source Pizzas Display */}
      <div className='flex flex-col justify-evenly px-16 gap-2 h-[200px]'>
        {[
          { pizza: fraction1, name: 'Pepperoni' },
          { pizza: fraction2, name: 'Mushroom' }
        ].map(({ pizza, name }) => (
          <div key={name} className='flex items-center gap-4'>
            <span className='w-24 text-2xl font-bold'>{name}</span>
            <div className='flex items-center ml-4 gap-2'>
            <div className='flex items-center gap-2'>
              {sourcePizzas[name].wholes.map((exists, index) => exists && (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'whole', name, index)}
                  className={`w-16 h-16 rounded-full border-2 border-${pizza.color}-800 bg-${pizza.color}-200`}
                >
                  <div className={`w-full h-full rounded-full bg-${pizza.color}-500 cursor-move`} />
                </div>
              ))}
              {sourcePizzas[name].slices && (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'slice', name)}
                  className="cursor-move"
                >
                  <PizzaSlices
                    numerator={pizza.numerator}
                    denominator={pizza.denominator}
                    color={pizza.color}
                    size="md"
                  />
                </div>
              )}
            </div>
          </div>
          </div>
        ))}
      </div>

      {/* Drop Zones Container */}
      <div className='bg-orange-500 mt-36 p-8 px-16 flex flex-col gap-8'>

        {/* Instruction Banner */}
        <div className='bg-white border-2 border-black mx-auto p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='font-bold px-4'>Drag wholes to the left and slices to the right</p>
        </div>

        <div className='flex gap-16'>
          {/* Whole Pizzas Drop Zone */}
          <div className='w-full bg-orange-50 rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
            
            <div className='text-center py-2 font-bold border-2 border-black bg-white mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
              Whole Pizzas
            </div>

            <div className='text-sm text-gray-600 italic mb-4 text-center'>
              Drag the whole sections here
            </div>
            <div
              onDrop={handleDropWhole}
              onDragOver={allowDrop}
              className="flex flex-col gap-4 min-h-[120px]"
            >
              {/* Pepperoni Pizzas */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: droppedWholes[fraction1.name] }).map((_, i) => (
                  <div
                    key={`dropped-pepperoni-${i}`}
                    className={`w-16 h-16 rounded-full border-2 border-${fraction1.color}-800 bg-${fraction1.color}-200`}
                  >
                    <div className={`w-full h-full rounded-full bg-${fraction1.color}-500`} />
                  </div>
                ))}
              </div>
              {/* Mushroom Pizzas */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: droppedWholes[fraction2.name] }).map((_, i) => (
                  <div
                    key={`dropped-mushroom-${i}`}
                    className={`w-16 h-16 rounded-full border-2 border-${fraction2.color}-800 bg-${fraction2.color}-200`}
                  >
                    <div className={`w-full h-full rounded-full bg-${fraction2.color}-500`} />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 text-xl font-bold'>
              <span>{droppedWholes[fraction1.name]}</span>
              <span>+</span>
              <span>{droppedWholes[fraction2.name]}</span>
              <span>=</span>
              <input
                type="text"
                name="wholes"
                value={answers.wholes}
                onChange={handleAnswerChange}
                disabled={!allPiecesDropped}
                className={`w-12 h-12 border-2 border-black rounded text-center font-bold ${getInputStyle(answers.wholes, correctWholes)}`}
              />
              <span className='ml-2'>Wholes</span>
            </div>
          </div>

          {/* Slices Drop Zone */}
          <div className='w-full bg-orange-50 rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
            <div className='text-center py-2 font-bold border-2 border-black bg-white mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
              Slice Combiner
            </div>
            <div className='text-sm text-gray-600 italic mb-4 text-center'>
              Drag the sliced sections here
            </div>
            <div
              onDrop={handleDropSlice}
              onDragOver={allowDrop}
              className="flex justify-center gap-2 min-h-[120px]"
            >
              {Object.entries(droppedSlices).map(([pizza, count]) => count > 0 && (
                <PizzaSlices
                  key={`dropped-slice-${pizza}`}
                  numerator={count}
                  denominator={pizza === fraction1.name ? fraction1.denominator : fraction2.denominator}
                  color={pizza === fraction1.name ? fraction1.color : fraction2.color}
                  size="md"
                />
              ))}
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 text-xl font-bold'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col items-center'>
                  <span>{droppedSlices[fraction1.name]}</span>
                  <div className='w-4 h-[2px] bg-black'></div>
                  <span>{fraction1.denominator}</span>
                </div>
                <span>+</span>
                <div className='flex flex-col items-center'>
                  <span>{droppedSlices[fraction2.name]}</span>
                  <div className='w-4 h-[2px] bg-black'></div>
                  <span>{fraction2.denominator}</span>
                </div>
                <span>=</span>
                <div className='flex flex-col items-center'>
                  <input
                    type="text"
                    name="numerator"
                    value={answers.numerator}
                    onChange={handleAnswerChange}
                    disabled={!allPiecesDropped}
                    className={`w-12 h-12 border-2 border-black rounded text-center font-bold ${getInputStyle(answers.numerator, correctNumerator)}`}
                  />
                  <div className='w-12 h-[2px] bg-black'></div>
                  <input
                    type="text"
                    name="denominator"
                    value={answers.denominator}
                    onChange={handleAnswerChange}
                    disabled={!allPiecesDropped}
                    className={`w-12 h-12 border-2 border-black rounded text-center font-bold ${getInputStyle(answers.denominator, correctDenominator)}`}
                  />
                </div>
              </div>
              <span className='ml-2'>Fraction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropPizza; 