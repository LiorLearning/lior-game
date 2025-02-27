import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToScreen, goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import { sounds } from "../../utils/sound";

export default function Screen1Step2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  let number1 = gameStateRef.current.state1.number1;
  const number2 = gameStateRef.current.state1.number2;
  const hasGameStartedRef = useRef(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [showRow, setShowRow] = useState(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `Let's start by helping Tilo visualize ${number1} times ${number2} on the tile board`);
      setTimeout(() => {
        sounds.woosh();
        setIsMovingLeft(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (isMovingLeft && !showColumn) {
      setTimeout(() => {
        setShowColumn(true);
        sendAdminMessage('agent', `We first take ${number1} blocks vertically`);
      }, 4000);
    } else if (showColumn && !showRow) {
      setTimeout(() => {
        setShowRow(true);
        sendAdminMessage('agent', `And then ${number2} times ${number1} blocks gives us ${number1} times ${number2}`);
      }, 4000);
    } else if (showRow) {
      setTimeout(() => {
        sendAdminMessage('agent', `Now that we know how ${number1} x ${number2} looks, let's start multiplying`);
        setTimeout(() => {
          goToScreen('second', setGameStateRef);
        }, 7000);
      }, 6000);
    }
  }, [isMovingLeft, showColumn, showRow]);


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${!showColumn && !showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${showColumn || showRow ? 'opacity-0' : 'opacity-100'}`}>
          A Tile Board!
        </div>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${showColumn && !showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${!showColumn || showRow ? 'opacity-0' : 'opacity-100'}`}>
          This is {number1}
        </div>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${!showRow ? 'opacity-0' : 'opacity-100'}`}>
          And this is {number1} x {number2}
        </div>
      </div>


      <div className={`absolute translate-x-[14vw] mb-[10vh] bg-[#003a43] border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center p-[3vh] py-[4vh] justify-start z-20 transition-all duration-500 ${isMovingLeft ? 'opacity-100' : 'opacity-0 translate-x-[20vw]'}`}>
        <div className='text-[3.5vh] bg-white rounded-[2vh] px-[4vh] leading-none py-[1vh] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)] shadow-[#7f7f7f] mb-[2.5vh]'>
          {number1} x {number2}
        </div>
        <div className="flex flex-row">
          <div className={`absolute w-[2vh] -translate-x-[1vh] -translate-y-[1vh] border-l-4 border-b-4 border-t-4 border-white transition-all duration-200 ${showColumn ? 'opacity-100' : 'opacity-0'}`}
            style={{ height: `${number1 * 2.5 + 1.5}vh` }}>
          </div>
          <div className={`absolute  -translate-x-[1vh] h-[2vh] -translate-y-[1vh] border-l-4 border-r-4 border-t-4 border-white transition-all duration-200 ${showRow ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: `${number2 * 2.5 + 1.5}vh` }}>
          </div>

          <div style={{ height: `${number1 * 2.6 + 1.5}vh` }} className={`absolute flex items-center justify-center transition-all duration-200 ${showColumn ? 'opacity-100' : 'opacity-0 translate-x-[10vh]'}`}>
            <div className="absolute w-[10vh] h-[7vh] text-[4vh] text-black pr-[3.2vh] text-center  pt-[0.6vh] z-10 -translate-x-[6vh]"
              style={{ backgroundImage: `url(${images.blue})`, backgroundSize: '100% 100%' }}>
              {number1}
            </div>
          </div>

          <div style={{ width: `${number2 * 2.6 + 1.5}vh` }} className={`absolute flex items-center justify-center transition-all duration-200 ${showRow ? 'opacity-100' : 'opacity-0 translate-y-[10vh]'}`}>
            <div className="absolute w-[10vh] rotate-90 h-[7vh] text-[4vh] text-black text-center z-10 -translate-x-[1vh] -translate-y-[9vh]"
              style={{ backgroundImage: `url(${images.blue})`, backgroundSize: '100% 100%' }}>
            </div>
            <span className="text-[4vh] text-black h-[6vh] w-[6vh] text-center z-10 -translate-x-[1vh] -translate-y-[10.5vh]">{number2}</span>
          </div>

          <div style={{ backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%' }} className={`absolute -translate-x-[9vh] translate-y-[11.5vh]  bottom-0 w-[33vh] h-[10vh]`}></div>


          <div className={`h-fit grid grid-cols-9 gap-[0.5vh] rounded-lg transition-all duration-500`}>
            {Array.from({ length: number1 }, (_, rowIndex) => (
              Array.from({ length:9 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square rounded-sm transition-colors w-[2vh] h-[2vh] duration-200 ${colIndex < number2 && rowIndex < number1 ?
                      showColumn ?
                        colIndex === 0 ? 'bg-[#40E0D0]' :
                          showRow ? 'bg-[#40E0D0]' : 'bg-[#4c757b]'
                        : 'bg-[#4c757b]'
                      : 'bg-[#4c757b]'
                    }`}
                />
              ))
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 -translate-y-[10vh] w-[14vw] h-[15vw] translate-x-[8vw] z-30"
        style={{ backgroundImage: `url(${images.tiloHappy})`, backgroundSize: '100% 100%' }}>
      </div>
      <div className="absolute left-0 w-[15vw] h-[12vh] z-20 translate-x-[6vw]"
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>
    </div>
  )
}