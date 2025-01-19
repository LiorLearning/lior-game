import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";  
import Fraction from "../components/Fraction";
import RedBox from "../components/RedBox";
import { useEffect, useRef } from "react";
import Proceed from "../components/proceed";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SuccessAnimation from '@/components/utils/success-animate'


export default function Level4({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen4;
  const {question1, question2} = gameStateRef.current.screen4;
  const [answerNumerator, setAnswerNumerator] = useState(0);
  const [answerDenominator, setAnswerDenominator] = useState(0);
  const multiplier1 = question1.denominator2/question1.denominator1;
  const multiplier2 = question2.numerator2/question2.numerator1;
  
  const [multiplier1_numerator, setmultiplier1_numerator] = useState(0);
  const multiplier1_numeratorRef = useRef<HTMLInputElement>(null);
  const [multiplier1_denominator, setmultiplier1_denominator] = useState(0);
  const multiplier1_denominatorRef = useRef<HTMLInputElement>(null);
  const [multiplier2_numerator, setmultiplier2_numerator] = useState(0);
  const multiplier2_numeratorRef = useRef<HTMLInputElement>(null);
  const [multiplier2_denominator, setmultiplier2_denominator] = useState(0);
  const multiplier2_denominatorRef = useRef<HTMLInputElement>(null);
  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);



  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', "Fill in the box, and let me know if you need a hint!");
      start.current = true;
    }
  }, []);
  useEffect(() => {
    if (answerNumerator == question1.numerator1*question1.denominator2/question1.denominator1) {
      setGameStateRef({
        ...gameStateRef.current,
        screen4: {
          ...gameStateRef.current.screen4,
          step: 2
        }
      });
    }
  }, [answerNumerator]);

  useEffect(() => {
    if (answerDenominator == question2.numerator1*question2.denominator2/question2.numerator2) {
      setGameStateRef({
        ...gameStateRef.current,
        screen4: {
          ...gameStateRef.current.screen4,
          step: 4
        }
      });
      sendAdminMessage('agent', "Woohoo! You've done it, you're now a master at equivalent fractions!");
    }
  }, [answerDenominator]);

  useEffect(() => {
    if (!multiplier1_denominator || !multiplier1_numerator) return;

    if (multiplier1_denominator === multiplier1 && multiplier1_denominator === multiplier1) setHint1(false);
  }, [multiplier1_numerator, multiplier1_denominator]);

  useEffect(() => {
    if (!multiplier2_denominator || !multiplier2_numerator) return;

    if (multiplier2_denominator === multiplier2 && multiplier2_denominator === multiplier2) setHint2(false);
  }, [multiplier2_numerator, multiplier2_denominator]);


  return (
    <div className="w-full space-y-8 mb-12">
      <Header 
        level={4}
      />
      <div className="flex flex-col justify-center items-center gap-8 bg-pink-100 p-4 relative">
        {step <= 2 ? ( 
          <STEP2 numerator1={question1.numerator1} denominator1={question1.denominator1} denominator2={question1.denominator2} onComplete={() => {
            setGameStateRef({
              ...gameStateRef.current,
              screen4: {
                ...gameStateRef.current.screen4,
                step: 2
              }
            });
          }} sendAdminMessage={sendAdminMessage} />
        ) : (
          <STEP3 numerator1={question2.numerator1} numerator2={question2.numerator2} denominator2={question2.denominator2} onComplete={() => {
            setGameStateRef({
              ...gameStateRef.current,
              screen4: {
                ...gameStateRef.current.screen4,
                step: 4
              }
            });
          }} sendAdminMessage={sendAdminMessage} />
        )}
      </div>

      {step == 2 && (
        <div className="flex flex-col justify-center items-center gap-8 p-4">
          <p className="text-3xl font-bold">You got it right!</p>
          <Proceed onComplete={() => {
            setGameStateRef({
              ...gameStateRef.current,
              screen4: {
                ...gameStateRef.current.screen4,
                step: 3
              }
            });
          }} />
        </div>
      )}

      {step == 4 && (
        <div className="flex flex-col justify-center items-center gap-8 text-3xl font-bold text-green-500 p-4">
          Correct!
          <SuccessAnimation />
        </div>
      )}
    </div>
  )
}

interface STEP2Props {
  numerator1: number;
  denominator1: number;
  denominator2: number;
  onComplete: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

const STEP2 = ({numerator1, denominator1, denominator2, onComplete, sendAdminMessage}: STEP2Props) => {
  const [hint, setHint] = useState(0);
  const [multiplier_numerator, setMultiplier_numerator] = useState(0);
  const multiplier_numeratorRef = useRef<HTMLInputElement>(null);
  const [multiplier_denominator, setMultiplier_denominator] = useState(0);
  const multiplier_denominatorRef = useRef<HTMLInputElement>(null);

  const [answerNumerator, setAnswerNumerator] = useState(0);
  const answerNumeratorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hint === 1 && multiplier_denominator === denominator2/denominator1) {
      setHint(2);
      sendAdminMessage('agent', `Awesome, so what would you need to multiply ${numerator1} by to keep the same fraction?`);
      multiplier_numeratorRef.current?.focus();
    } else if (hint === 2 && multiplier_numerator === denominator2/denominator1) {
      setHint(3)
      answerNumeratorRef.current?.focus();
    } else if ((hint === 0 || hint === 3) && answerNumerator === numerator1*denominator2/denominator1) {
        onComplete();
    }
  }, [multiplier_numerator, multiplier_denominator, answerNumerator]);

  return (
    <div className="max-w-screen-sm flex gap-4 justify-center items-center">
    <div className="flex flex-col mt-10 py-10 w-full">
    {hint != 0 && (
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier_numerator ? multiplier_numerator.toString() : ''}
            onChange={(e) => setMultiplier_numerator(Number(e.target.value))}
            placeholder={hint == 2 ? "?" :""}
            className={`w-10 text-center mb-2 ml-2 border-2 border-black ${multiplier_numerator > 0 && (multiplier_numerator === denominator2/denominator1 ? 'bg-green-500' : 'bg-red-500')} ${hint < 2 && 'opacity-10'}`}
            disabled={hint != 2}
            ref={multiplier_numeratorRef}
          />
          
        </div>
        <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
        </div>  
      </div>
      )}
      <div className="flex justify-center items-center g0ap-4">
        <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold bg-white rounded px-6 py-6" /> 
        <span className="text-3xl font-bold">=</span>
        <div className="flex flex-col gap-2 px-2 bg-white w-24">
          <span className="text-3xl text-center font-bold flex flex-col justify-end pt-6"> 
            <input 
              type="text"
              disabled={hint != 0 && hint != 3}
              value={answerNumerator ? answerNumerator.toString() : ''}
              placeholder={hint == 0 ? "?" : hint == 3 ? "?" : ""}
              onChange={(e) => setAnswerNumerator(parseInt(e.target.value || '0'))}
              className={`outline-none rounded text-3xl text-center border-2 border-black ${answerNumerator > 0 && (answerNumerator === numerator1*denominator2/denominator1 ? 'bg-green-500' : 'bg-red-500')} ${hint == 0 ? "opacity-100" : hint == 3 ? "opacity-100" : "opacity-10"}`}
              ref={answerNumeratorRef}
            />
          </span>
          <span className="border-b-2 border-black w-full"/>
          <span className="text-3xl text-center font-bold flex flex-col justify-end pb-6"> {denominator2} </span>
          </div>
        </div>
        {hint != 0 && (
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
        </div>  
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier_denominator === 0 ? "" : multiplier_denominator?.toString()}
            onChange={(e) => setMultiplier_denominator(Number(e.target.value))}
            placeholder={hint == 1 ? "?" :""}
            className={`w-10 text-center mt-2 ml-2 border-2 border-black ${multiplier_denominator > 0 && (multiplier_denominator === denominator2 / denominator1 ? 'bg-green-500' : 'bg-red-500')} ${hint < 2 && 'opacity-10'}`}
            disabled={hint != 1}
            ref={multiplier_denominatorRef}
          />
          
        </div>
      </div>
      )}
    </div>
    {hint == 0 && <Hint setShowHint={() => {setHint(1); multiplier_denominatorRef.current?.focus(); setAnswerNumerator(0); }} className="absolute cursor-pointer bottom-10 right-10"/>}
  </div>
  )
}

const STEP3 = ({numerator1, numerator2, denominator2, onComplete, sendAdminMessage}: {numerator1: number, numerator2: number, denominator2: number, onComplete: () => void, sendAdminMessage: (role: string, content: string) => void }) => {
  const [hint, setHint] = useState(0);
  const [multiplier_numerator, setMultiplier_numerator] = useState(0);
  const multiplier_numeratorRef = useRef<HTMLInputElement>(null);
  const [multiplier_denominator, setMultiplier_denominator] = useState(0);
  const multiplier_denominatorRef = useRef<HTMLInputElement>(null);

  const [answerDenominator, setAnswerDenominator] = useState(0);
  const answerDenominatorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hint === 1 && multiplier_numerator === numerator2/numerator1) {
      setHint(2);
      sendAdminMessage('agent', `Awesome, so what would you need to multiply ${numerator2} by to keep the same fraction?`);
      multiplier_denominatorRef.current?.focus();
    } else if (hint === 2 && multiplier_denominator === numerator2/numerator1) {
      setHint(3)
      answerDenominatorRef.current?.focus();
    } else if ((hint === 0 || hint === 3) && answerDenominator === denominator2*numerator1/numerator2) {
      setHint(4);
      onComplete();
    }
  }, [multiplier_numerator, multiplier_denominator, answerDenominator]);

  return (
    <div className="max-w-screen-sm flex gap-4 justify-center items-center">
    <div className="flex flex-col mt-10 py-10 w-full">
    {hint != 0 && (
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier_numerator ? multiplier_numerator.toString() : ''}
            onChange={(e) => setMultiplier_numerator(Number(e.target.value))}
            placeholder={hint == 1 ? "?" :""}
            className={`w-10 text-center mb-2 mx-2 border-2 border-black ${multiplier_numerator === numerator2/numerator1 ? 'bg-green-500' : ''}`}
            disabled={hint != 1}
            ref={multiplier_numeratorRef}
          />
        </div>
        <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
        </div>  
      </div>
      )}
      <div className="flex justify-center items-center g0ap-4">
        <div className="flex flex-col gap-2 px-2 bg-white w-24">
        <span className="text-3xl text-center font-bold flex flex-col justify-end pt-6"> {numerator1} </span>
        <span className="border-b-2 border-black w-full"/>
          <span className="text-3xl text-center font-bold flex flex-col justify-end pb-6"> 
            <input 
              type="text"
              disabled={hint != 0 && hint != 3}
              value={answerDenominator ? answerDenominator.toString() : ''}
              placeholder={hint == 0 ? "?" : hint == 3 ? "?" : ""}
              onChange={(e) => setAnswerDenominator(parseInt(e.target.value || '0'))}
              className={`outline-none rounded text-3xl text-center border-2 border-black ${answerDenominator === denominator2*numerator1/numerator2 ? 'bg-green-500' : ''} ${hint == 0 ? "opacity-100" : hint >= 3 ? "opacity-100" : "opacity-10"}`}
              ref={answerDenominatorRef}
            />
          </span>
        </div>
        <span className="text-3xl font-bold">=</span>
        <Fraction numerator={numerator2} denominator={denominator2} className="text-3xl font-bold bg-white rounded px-6 py-6" /> 
      </div>
      {hint != 0 && (
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-100 rotate-180" />
        </div>  
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier_denominator === 0 ? "" : multiplier_denominator?.toString()}
            onChange={(e) => setMultiplier_denominator(Number(e.target.value))}
            placeholder={hint == 2 ? "?" :""}
            className={`w-10 text-center mt-2 mx-2 border-2 border-black ${multiplier_denominator === numerator2/numerator1 ? 'bg-green-500' : ''} ${hint < 2 && 'opacity-10'}`}
            disabled={hint != 2}
            ref={multiplier_denominatorRef}
          />         
        </div>
      </div>
      )}
    </div>
    {hint == 0 && <Hint setShowHint={() => {setHint(1); multiplier_numeratorRef.current?.focus(); setAnswerDenominator(0); }} className="absolute cursor-pointer bottom-10 right-10"/>}
  </div>
  )
}

const Header = ({ level }: { level: number }) => {
  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>

        <span className='w-full'/>
        <p className='flex w-full items-center gap-2 text-4xl font-semibold'>
          Equivalent Fractions
        </p>
        <div className='w-full flex justify-end'>
          {level && <RedBox>Level {level}</RedBox>}
        </div>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <div className="flex items-center gap-4">
          <RedBox>Question</RedBox>
          <p className='text-xl bg-[#FF497C] font-bold text-white px-4 py-6'>
            Fill the box
          </p>
        </div>
      </div>
    </div>
  );
}


const Hint = ({ setShowHint, className }: { setShowHint: () => void, className: string }) => {
  return (
    <div 
      className={cn("bg-[#FF497C] shadow-[-4px_4px_0_rgba(0,0,0,1)] font-bold px-4 py-2 text-white", className)}
      onClick={() => {
        setShowHint();
      }}
    >
      Need a hint?
    </div>
  );
}