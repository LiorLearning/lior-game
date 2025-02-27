import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import { narrations } from "../../narrations";  


export default function Screen1Step0({sendAdminMessage}: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const number1 = gameStateRef.current.state1.number1;
  const number2 = gameStateRef.current.state1.number2;

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `Can you help Tilo find ${number1} times ${number2}? Ready to begin?`);
    }
  }, []);

  const handleClick = () => {
    setIsMovingUp(true);
    setTimeout(() => {
      goToStep('first', setGameStateRef, 1);
    }, 500);
  };

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`flex flex-col items-center justify-center gap-[4vh] z-20 my-auto pb-[10vh] transition-all duration-500 ${isMovingUp ? 'transform -translate-y-[20vh] opacity-0' : ''}`}>
        <div className="flex items-center justify-center text-center gap-[2vh]">
          <h1 className="leading-none w-[12vh] py-[2vh] bg-white text-[#003a43] text-[6vh] rounded-[4vh] shadow-xl drop-shadow-lg">{number1}</h1>
          <h1 className="leading-none text-[#003a43] text-[7vh] drop-shadow-lg">x</h1>
          <h1 className="leading-none w-[12vh] text-center py-[2vh] bg-white text-[#003a43] text-[6vh] rounded-[4vh] shadow-xl drop-shadow-lg">{number2}</h1>
        </div>

        <button 
          className={`w-[22vw] text-[6vh] leading-none py-[1vh] rounded-[6vh] bg-[#007179] border-[1vh] border-white text-white shadow-xl drop-shadow-lg hover:drop-shadow-2xl`}
          onClick={handleClick}
        >
          {'START >>'}
        </button>
      </div>
    </div>
  )
}