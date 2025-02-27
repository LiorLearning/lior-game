import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useGameState } from "../../state-utils";
import { useEffect, useRef, useState } from "react";
import { NewInput } from "@/components/custom_ui/newinput";
import { goToScreen } from "../../utils/helper";
import SuccessAnimation from "@/components/utils/success-animate";
import { sounds } from "../../utils/sound";


export default function SixthScreen({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const number1 = gameStateRef.current.state6.number1;
  const number2 = gameStateRef.current.state6.number2;

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');

  const [blurAns2, setBlurAns2] = useState(true);
  const [blurAns3, setBlurAns3] = useState(true);

  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const ans1Ref = useRef<HTMLInputElement>(null);
  const ans2Ref = useRef<HTMLInputElement>(null);
  const ans3Ref = useRef<HTMLInputElement>(null);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `${number1} can be broken into ${Math.floor(number1 / 10)}0 and ${number1 % 10}. Can you complete the partial products?`);
      ans1Ref.current?.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#B9F7FF] overflow-hidden flex flex-col items-center justify-end">
      <div className="absolute w-full h-[25vh] "
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className="flex flex-col items-center gap-[2vh] justify-center min-h-screen drop-shadow-xl">
        <div className={`flex items-center justify-center leading-none text-center bg-white text-[6vh]`}>
          <h1 className="p-[1.5vh] px-[3vh]">{Math.floor(number1 / 10)}</h1>
          <h1 className="p-[1.5vh] px-[3vh]">{number1 % 10}</h1>
        </div>

        <div className={`flex items-center justify-center leading-none text-center  text-[6vh]`}>
          <h1 className="p-[1.5vh] px-[3vh]">x</h1>
          <h1 className="p-[1.5vh] px-[3vh] bg-white">{number2}</h1>
        </div>

        <div className="px-[15vh] h-0 border-t-[0.4vh] border-black"></div>

        <div className="flex items-center justify-center gap-[2vh] ml-[15.5vh] leading-none text-center bg-white text-[5vh] p-[1.5vh]">
          <NewInput
            value={ans1}
            correctValue={(Math.floor(number1 / 10) * 10 * number2).toString()}
            onValueChange={(value) => setAns1(value)}
            placeholder="?"
            className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#0095b7]"
            ref={ans1Ref}
            onCorrect={() => { setBlurAns2(false); ans2Ref.current?.focus(); sounds.right(); }}
            onIncorrect={(attempt, correct) => {
              sounds.wronginput();
              sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${Math.floor(number1 / 10) * 10} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
            }}
          />
          {hint1 && <><div>{Math.floor(number1 / 10) * 10}</div>
            <div>x</div>
            <div>{number2}</div></>}

          {!hint1 && <button className="px-[2vh] mx-[1vh] text-[4vh] bg-[#ffde73]" onClick={() => setHint1(true)}>HINT</button>}
        </div>

        <div className={`flex items-center justify-center gap-[2vh] ml-[10vh] transition-all duration-500 ${blurAns2 ? 'blur-[0.5vh]' : ''}`}>
          <div className="text-[7vh]">+</div>

          <div className="flex items-center justify-center gap-[2vh] leading-none text-center bg-white text-[5vh] p-[1.5vh]">
            <NewInput
              value={ans2}
              correctValue={((number1 % 10) * number2).toString()}
              onValueChange={(value) => setAns2(value)}
              placeholder="?"
              className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#c45500]"
              ref={ans2Ref}
              onCorrect={() => {
                setBlurAns3(false);
                ans3Ref.current?.focus();
                sounds.right();
                sendAdminMessage('agent', `Perfect, now that we have the partial products, let's add them`);
              }}
              onIncorrect={(attempt, correct) => {
                sounds.wronginput();
                sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${(number1 % 10)} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
              }}
            />
            {hint2 && <><div className="pl-[2.5vh]">{number1 % 10}</div>
              <div>x</div>
              <div>{number2}</div></>}

            {!hint2 && <button className="px-[2vh] mx-[1vh] text-[4vh] bg-[#ffde73]" onClick={() => setHint2(true)}>HINT</button>}
          </div>
        </div>

        <div className="px-[15vh] h-0 border-t-[0.4vh] border-black"></div>

        <div className={`flex items-center justify-center gap-[2vh] leading-none text-center bg-white text-[5vh] p-[1.5vh] transition-all duration-500 ${blurAns3 ? 'blur-[0.5vh]' : ''}`}>
          <NewInput
            value={ans3}
            correctValue={(number1 * number2).toString()}
            onValueChange={(value) => setAns3(value)}
            placeholder="?"
            className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#5c9f00]"
            ref={ans3Ref}
            onCorrect={() => {
              sounds.right();
              setShowSuccess(true);
              sendAdminMessage('agent', `Awesome, let's do one more.`);
              setTimeout(() => {
                goToScreen('seventh', setGameStateRef);
              }, 4000);
            }}
            onIncorrect={(attempt, correct) => {
              sounds.wronginput();
              sendAdminMessage('admin', `User has entered wrong sum ${attempt}, the answer is ${correct}, the question is sum after partial product  ${number1} x ${number2}, diagnose socratically with respect to user's current game state`);
            }}
          />
        </div>
      </div>

      {showSuccess && <SuccessAnimation />}
    </div>
  );
}