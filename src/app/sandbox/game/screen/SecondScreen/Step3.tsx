import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useGameState } from "../../state-utils";
import { useRef, useEffect, useState } from "react";
import { goToScreen, goToStep } from "../../utils/helper";


export default function Screen3Step2({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const [showPopUp, setShowPopUp] = useState(false);


  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `You got the answer, ${number1} times ${number2} is ${number1 * number2}!`);
      setTimeout(() => {
        sendAdminMessage('agent', `Ready to do some more problem using the tile board?`);
        setTimeout(() => {
          goToScreen('third', setGameStateRef);
        }, 5000)

      }, 5000)
    }
  }, []);

  const number1 = gameStateRef.current.state2.number1;
  const number2 = gameStateRef.current.state2.number2;

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw]  border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500`}>
        Let’s do some more...
      </div>

      <div className="absolute left-0 translate-x-[8vw] -translate-y-[10vh] w-[14vw] h-[15vw] z-30"
        style={{ backgroundImage: `url(${images.tiloHappy})`, backgroundSize: '100% 100%' }}>
      </div>
      <div className="absolute left-0 translate-x-[8vw] -translate-y-[9vw] w-[13vw] h-[13vw] z-30"
        style={{ backgroundImage: `url(${images.happyGif})`, backgroundSize: '100% 100%' }}>
      </div>


      <div className="absolute left-0 translate-x-[6vw] w-[15vw] h-[12vh] z-20"
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className="absolute z-10 w-full flex justify-center items-center gap-[2vw] -translate-y-[10vh] pl-[21vw]">
        <div className=' bg-[#003a43] border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center p-[2vh] py-[4vh] justify-start'>
          <div className={`text-[3vh] px-[2vh] bg-white rounded-[2vh] leading-none py-[1vh] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)] shadow-[#7f7f7f] mb-[2.5vh]`}>
            {number1} x {number2}
          </div>
          <div className={`h-fit grid gap-[0.5vh] rounded-lg`}
            style={{ gridTemplateColumns: `repeat(${number2}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: number1 }, (_, rowIndex) => (
              Array.from({ length: number2 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square rounded-sm transition-colors w-[2vh] h-[2vh] duration-200 bg-white`} />
              ))
            ))}
          </div>
        </div>

        <div className='text-[10vh] text-black'>=</div>
        <div style={{ backgroundImage: `url(${images.grayBox})`, backgroundSize: '100% 100%' }} className={`z-10 w-[8vw] h-[8vh] flex justify-center items-center pr-[0.9vw]`}>
          <span className='text-[4vh] text-black'>{number1 * number2}</span>
        </div>
      </div>
      <div style={{ backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%' }} className={`absolute z-10 translate-x-[1vw]  w-[14vw] h-[10vh]`}></div>
    </div>
  )
}
