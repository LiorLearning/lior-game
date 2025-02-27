import { useState, useEffect, useRef } from 'react';
import { images } from '../utils/image';
import { NewInput } from '@/components/custom_ui/newinput';
import { BaseProps } from '../utils/types';
import { useGameState } from '../state-utils';
import { sounds } from '../utils/sound';

interface MultiplyBoxProps extends BaseProps {
  number1: number;  // 23
  number2: number;  // 4
  transition?: boolean;
  short?: boolean;
  onCorrect?: () => void;
  onIncorrect?: () => void;
  onCorrectInput?: () => void;
  onIncorrectInput?: () => void;
  fixColorNotRed?: boolean;
  isDragging?: boolean;
  setIsDragging?: (isDragging: boolean) => void;
  sliderValue: number;
  setSliderValue: (sliderValue: number) => void;
  stepPartialProduct?: boolean;
  stepSum?: boolean;
  stepSilder?: boolean;

}

export default function MultiplyBox({
  number1,
  number2,
  transition = true,
  short = false,
  onCorrect,
  onIncorrect,
  fixColorNotRed = false,
  isDragging = false,
  setIsDragging,
  sliderValue = 0,
  setSliderValue,
  stepPartialProduct = false,
  stepSum = false,
  stepSilder = false,
  sendAdminMessage }: MultiplyBoxProps) {


  const { gameStateRef, setGameStateRef } = useGameState();
  const nextInputRef = useRef<HTMLInputElement>(null);
  const [inputValue1, setInputValue1] = useState('');
  const [glow1, setGlow1] = useState(true);
  const [inputValue2, setInputValue2] = useState('');
  const [glow2, setGlow2] = useState(false);
  const [sum, setSum] = useState('');
  const [sumGlow, setSumGlow] = useState(true);


  const handleFIX = () => {
    if (sliderValue === number1 % 10 || sliderValue === number1 - (number1 % 10)) {
      sounds.right();
      setSliderValue?.(sliderValue);
      onCorrect?.();
    } else {
      sounds.wrong();
      onIncorrect?.();
    }
  }

  function handleInputCorrect(type: 'first' | 'second') {
    sounds.right();
    if (type === 'first') {
      setGlow2(true);
      nextInputRef.current?.focus();
    } else if (type === 'second') {
      setTimeout(() => {
        onCorrect?.();
      }, 2000)
    }
  }

  function handleInputIncorrect(type: 'first' | 'second', attempt: string, correct: string) {
    sounds.wronginput();
    if (type === 'first') {
      sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${sliderValue} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
    } else if (type === 'second') {
      sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${number1 - sliderValue} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
    }
  }

  function handleSumCorrect() {
    sounds.right();
    setTimeout(() => {
      onCorrect?.();
    }, 2000)
  }

  function handleSumIncorrect(attempt: string, correct: string) {
    sounds.wronginput();
    sendAdminMessage('admin', `User has entered wrong sum ${attempt}, the answer is ${correct}, the question is sum after partial product  ${number1} x ${number2}, diagnose socratically with respect to user's current game state`);
  }

  return (
    <div className="flex w-[50vh]">
      <div className={`flex flex-col items-center justify-start ${transition ? 'transition-all duration-1000 opacity-100' : 'opacity-0 translate-x-[5vh]'}`}>
        <button onClick={handleFIX} className={`${fixColorNotRed ? 'bg-[#c8c8c8] border-[#707070]' : 'bg-[#f00004] border-[#a70003]'}  text-[2.7vh] border-t-[0.7vh] border-x-[1.2vh]  px-[1.5vh] mx-[3vh] mt-[4vh] text-white -translate-x-[4vh]`}>
          LOCK
        </button>

        <div className={`bg-white border-[1.5vh] border-[#006379] rounded-[3vh] w-[25vh] flex items-center justify-center p-[2vh] pl-[5vh]`}
          style={{ height: `${(number1 * 2.5) + 8}vh` }}
        >
          <div className='relative h-full flex flex-col items-center justify-start'>

            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${images.orange})`, backgroundSize: '100% 100%' }} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {sliderValue}
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== number1 && <div style={{ backgroundImage: `url(${images.blue})`, backgroundSize: '100% 100%' }} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {number1 - sliderValue}
              </div>}
            </div>
          </div>

          {stepPartialProduct && <div className={`relative h-full flex flex-col items-center justify-start z-20`}
            style={{
              transform: `translateX(46.5vh)`
            }}>
            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${images.orangeBox})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[20vh] h-[7vh] text-[3vh] pb-[0.5vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>=</h1>
                <h1 className=''>{sliderValue}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
                <h1 className=''>=</h1>
                <NewInput
                  value={inputValue1}
                  onValueChange={(value) => { setInputValue1(value); setGlow1(false); }}
                  className={`w-[4vh] h-[4vh] bg-white rounded-[0.3vw] placeholder:text-[#ed7708] text-[#ed7708] text-[3vh] outline-none border-none text-center ${glow1 ? '[animation:bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  placeholder='?'
                  correctValue={((sliderValue) * number2).toString()}
                  onCorrect={() => handleInputCorrect('first')}
                  onIncorrect={(attempt, correct) => handleInputIncorrect('first', attempt, correct)}
                />
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {number1 - sliderValue !== 0 && <div style={{ backgroundImage: `url(${images.blueBox})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[20vh] h-[7vh] text-[3vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>=</h1>
                <h1 className=''>{number1 - sliderValue}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
                <h1 className=''>=</h1>
                <NewInput
                  ref={nextInputRef}
                  value={inputValue2}
                  onValueChange={(value) => { setInputValue2(value); setGlow2(false) }}
                  className={`w-[4vh] h-[4vh] bg-white rounded-[0.3vw] placeholder:text-[#00a9c0] text-[#00a9c0] text-[3vh] outline-none border-none text-center ${glow2 ? '[animation:bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  placeholder='?'
                  correctValue={((number1 - sliderValue) * number2).toString()}
                  onCorrect={() => handleInputCorrect('second')}
                  onIncorrect={(attempt, correct) => handleInputIncorrect('second', attempt, correct)}
                />
              </div>}
            </div>
          </div>}

          {stepSilder && <div className={`relative h-full flex flex-col items-center justify-start z-20`}
            style={{
              transform: `translateX(44.1vh)`
            }}>
            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${images.orangeBox})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[15vh] h-[7vh] text-[3vh] pb-[0.5vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>{sliderValue}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {number1 - sliderValue !== 0 && <div style={{ backgroundImage: `url(${images.blueBox})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[15vh] h-[7vh] text-[3vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>{number1 - sliderValue}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
              </div>}
            </div>
          </div>}

          {stepSum && <div className={`relative h-full flex flex-col items-center justify-start z-20`}>
            <div style={{
              backgroundImage: `url(${images.sumBox})`, backgroundSize: '100% 100%',
              transform: `translateX(44.1vh)`,
              
            }} className={`absolute text-[4vh] w-[20vh] h-[30vh] text-black flex flex-col items-center justify-start pl-[2vh] pt-[2.6vh] gap-[2.5vh] z-10`}>
              <h1 className='text-[#ed7708]'>{sliderValue * number2}</h1>
              <h1 className='text-[#00a9c0]'>{(number1 - sliderValue) * number2}</h1>
              <NewInput 
                value={sum}
                onValueChange={(value) => { setSum(value); setSumGlow(false) }}
                className={`w-[7vh] mt-[4vh] h-[4vh] bg-white placeholder:text-[#737373] text-[#737373] text-[4vh] outline-none border-none text-center ${sumGlow ? '[animation:ping_1s_ease-in-out_infinite]' : ''}`}
                placeholder='?'
                useColor={true}
                correctValue={(number1 * number2).toString()}
                onCorrect={() => handleSumCorrect()}
                onIncorrect={(attempt, correct) => handleSumIncorrect(attempt, correct)}
              />
            </div>
          </div>}


          <input
            type="range"
            min={0}
            max={number1}
            value={sliderValue}
            onChange={(e) => {
              if (!stepPartialProduct && setSliderValue) {
                setSliderValue(Number(e.target.value));
                setIsDragging?.(false);
              }
            }}
            className='absolute cursor-pointer rotate-90  -translate-x-[2vh] z-20 opacity-0'
            style={{ width: `${(number1 * 2.4) + 3}vh` }}
          />



          <div className="absolute h-fit grid grid-cols-1">
            {Array.from({ length: number1 }, (_, rowIndex) => (
              Array.from({ length: 1 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square  -translate-x-[2vh] transition-colors w-[1.5vh] h-[2.45vh] duration-200
                    ${colIndex < number2
                      ? rowIndex < sliderValue
                        ? ' bg-[#ffa500]'
                        : 'bg-[#40E0D0]'
                      : 'bg-[#4c757b]'
                    }`}
                />
              ))
            ))}
          </div>
          <div className='realtive h-[95%] -translate-x-[3.2vh] -translate-y-[1.8vh]'>
            <div className='absolute w-[4.5vh] h-[4.5vh] -translate-x-[1.4vh] '
              style={{ top: `${(sliderValue / number1) * 100}%`, backgroundImage: `url(${images.slider})`, backgroundSize: '100% 100%' }}

            />
          </div>

          {isDragging && <div className={`absolute z-20 translate-y-[15vh] transition-all duration-1000 ${transition ? 'opacity-100 translate-x-[1.5vh]' : 'opacity-0 translate-x-[10vh]'}`}
            style={{ top: `${(sliderValue / number1) * 100}%` }}>
            <img src={images.move} alt="move" className="w-[20vh] h-[20vh] select-none" />
          </div>}
        </div>
      </div>

      <div className='ml-[15vh] absolute bg-[#003a43] border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center p-[2vh] py-[4vh] justify-start'>
        <div className={`text-[3vh] px-[2vh] bg-white rounded-[2vh] leading-none py-[1vh] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)] shadow-[#7f7f7f] mb-[2.5vh]`}>
          {number1} x {number2}
        </div>
        <div className={`h-fit grid gap-[0.5vh] rounded-lg`}
          style={{ gridTemplateColumns: `repeat(9, minmax(0, 1fr))` }}
        >
          {Array.from({ length: number1 }, (_, rowIndex) => (
            Array.from({ length: 9 }, (_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square rounded-sm transition-colors w-[2vh] h-[2vh] duration-200
                    ${colIndex < number2
                    ? rowIndex < sliderValue
                      ? ' bg-[#ffa500]'
                      : 'bg-[#40E0D0]'
                    : 'bg-[#4c757b]'
                  }`}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

