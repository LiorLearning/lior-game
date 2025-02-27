import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import MultiplyBox from '../../components/multiplybox';
import { useGameState } from "../../state-utils";
import { useRef, useEffect, useState } from "react";
import { goToStep } from "../../utils/helper";

interface Screen2Step2Props extends BaseProps {
  sliderValue: number;
  setSliderValue: (sliderValue: number) => void;
}

export default function Screen2Step2({ sendAdminMessage, sliderValue, setSliderValue }: Screen2Step2Props) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `You made Tilo super happy. Let's add the two answers now`);
    }
  }, []);

  const number1 = gameStateRef.current.state2.number1;
  const number2 = gameStateRef.current.state2.number2;

  function onCorrect() {
    goToStep('second', setGameStateRef, 3);
  }


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">



      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw]  border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500`}>
        Almost there...
      </div>

      <div className="absolute left-0 translate-x-[8vw] -translate-y-[10vh] w-[14vw] h-[15vw] z-30"
        style={{ backgroundImage: `url(${images.tiloHappy})`, backgroundSize: '100% 100%' }}>
      </div>


      <div className="absolute left-0 translate-x-[6vw] w-[15vw] h-[12vh] z-20"
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className="absolute z-20 translate-x-[6vw] -translate-y-[10vh]">
        <MultiplyBox number1={number1} number2={number2} onCorrect={onCorrect} sliderValue={sliderValue} setSliderValue={setSliderValue} short={true} fixColorNotRed={true} stepSum={true} sendAdminMessage={sendAdminMessage} />
      </div>
      <div style={{backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%'}} className={`absolute z-10 translate-x-[2.5vw]  w-[25vw] h-[10vh]`}></div>
    </div>
  )
}
