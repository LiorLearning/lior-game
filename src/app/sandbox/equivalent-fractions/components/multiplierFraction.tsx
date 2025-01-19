import React, { useState, useRef, useEffect } from "react";
import Fraction from "../components/Fraction";
import { BaseProps } from "../utils/types";

export default function MultiplierFraction({
  numerator1,
  denominator1,
  denominator2,
  complete,
  sendAdminMessage
}: { 
  numerator1: number, 
  denominator1: number, 
  denominator2: number, 
  complete: () => void, 
  sendAdminMessage: (role: string, content: string) => void
}){
  const [numerator2, setNumerator2] = useState(0);
  const numerator2Ref = useRef(null);
  const [multiplier1_numerator, setmultiplier1_numerator] = useState(0);
  const multiplier1_numeratorRef = useRef(null);
  const [multiplier1_denominator, setmultiplier1_denominator] = useState(0);
  const multiplier1_denominatorRef = useRef(null);
  const [multiplerStep, setMultiplerStep] = useState(0);

  useEffect(() => {
    console.log(multiplerStep);
    if (multiplerStep === 0) {
      if (numerator2Ref.current) {
        (numerator2Ref.current as HTMLInputElement).focus();
      }
    } else if (multiplerStep === 1) {
      if (multiplier1_numeratorRef.current) {
        (multiplier1_numeratorRef.current as HTMLInputElement).focus();
      }
    } else if (multiplerStep === 2) {
      if (multiplier1_denominatorRef.current) {
        (multiplier1_denominatorRef.current as HTMLInputElement).focus();
      }
    }
  }, [multiplerStep]);

  useEffect(() => {
    if (multiplerStep === 0 && !multiplier1_denominator) {
      if (numerator2Ref.current) {
        (numerator2Ref.current as HTMLInputElement).focus();
      }
    }}, []);

  useEffect(() => {
    if (multiplerStep === 0 && multiplier1_denominator === denominator2 / denominator1) {
      setMultiplerStep(1);
    }
  }, [multiplier1_denominator]);

  useEffect(() => {
    if (multiplerStep ===2 && numerator2 === numerator1 * multiplier1_denominator) {
      complete();
    }
  }, [numerator2]);

  useEffect(() => {
    if (multiplerStep === 1 && multiplier1_numerator === denominator2 / denominator1) {
      setMultiplerStep(2);
    }
  }, [multiplier1_numerator]);

  return (

    <div className="flex flex-col mt-10 py-10 bg-pink-100 w-full">
      <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier1_numerator ? multiplier1_numerator.toString() : ''}
            onChange={(e) => setmultiplier1_numerator(Number(e.target.value))}
            placeholder={multiplerStep === 1 ? "?" : ""}
            className={`w-10 text-center mb-2 ml-2 border-2 border-black ${multiplier1_numerator === denominator2 / denominator1 ? 'bg-green-100' : 'bg-white'} ${multiplerStep < 1 && 'hidden'}`}
            disabled={multiplerStep !== 1}
            ref={multiplier1_numeratorRef}
          />
          
        </div>
        <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
        </div>  
      </div>
      <div className="flex justify-center items-center gap-4">
        <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold" /> 
        <span className="text-3xl font-bold">=</span>

        <div className="flex flex-col gap-2 px-2 bg-white w-24">
          <span className="text-3xl text-center font-bold flex flex-col justify-end"> 
            <input 
              type="text"
              value={numerator2 ? numerator2.toString() : ''}
              onChange={(e) => setNumerator2(parseInt(e.target.value || '0'))}
              placeholder={multiplerStep === 2 ? "?" : ""}
              className={`border-none outline-none my-1 text-3xl text-center ${numerator2 === numerator1 * denominator2 / denominator1 ? 'bg-green-100' : 'bg-white'} ${multiplerStep < 2 && 'hidden'}`}
              disabled={multiplerStep !== 2}
              ref={numerator2Ref}
            />
          </span>
          <span className="border-b-2 border-black w-full"/>
          <span className="text-3xl text-center font-bold flex flex-col justify-end"> {denominator2} </span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
        </div>  
        <div className="flex justify-center items-center">
          x
          <input 
            type="text"
            value={multiplier1_denominator === 0 ? "" : multiplier1_denominator?.toString()}
            onChange={(e) =>  setmultiplier1_denominator(Number(e.target.value))}
            placeholder={multiplerStep === 0 ? "?" : ""}
            className={`w-10 text-center my-1 ml-2 border-2 border-black ${multiplier1_denominator === denominator2 / denominator1 ? 'bg-green-100' : 'bg-white'}`}
            disabled={multiplerStep !== 0}
            ref={multiplier1_denominatorRef}
          />
        </div>
      </div>
    </div>
    {multiplerStep}
  </div>
)}

export const OnlyMultiplier = ({numerator1, denominator1, multiplier, onComplete}: {numerator1: number, denominator1: number, multiplier: number, onComplete: () => void}) => {
  const [multiplier1_numerator, setmultiplier1_numerator] = useState(0);
  const multiplier1_numeratorRef = useRef(null);
  const [multiplier1_denominator, setmultiplier1_denominator] = useState(0);
  const multiplier1_denominatorRef = useRef(null);

  const [multiplierStep, setMultiplierStep] = useState(0);

  useEffect(() => {
    if (multiplier1_denominator === multiplier) {
      setMultiplierStep(1);
      if (multiplier1_denominatorRef.current) {
        (multiplier1_denominatorRef.current as HTMLInputElement).focus();
      }
    }
  }, [multiplier1_denominator]);

  useEffect(() => {
    if (multiplierStep === 1 && multiplier1_numerator === multiplier) {
      setMultiplierStep(2);
      onComplete();
    }
  }, [multiplier1_numerator]);

  return (
    <div className="flex flex-col">
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center">
        x
        <input 
          type="text"
          value={multiplier1_numerator === 0 ? "" : multiplier1_numerator?.toString()}
          onChange={(e) => setmultiplier1_numerator(Number(e.target.value))}
          placeholder={multiplierStep === 1 ? "?" : ""}
          className={`w-10 text-center mb-2 ml-2 border-2 border-black ${multiplier1_numerator === multiplier ? 'bg-green-100' : 'bg-white'} ${multiplierStep < 1 && 'opacity-10'}`}
          disabled={multiplierStep !== 1}
          ref={multiplier1_numeratorRef}
        />
        
      </div>
      <div className="flex justify-center items-center">
        <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
      </div>  
    </div>
    <div className="flex justify-center items-center gap-4">
      <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold" /> 
      <span className="text-3xl font-bold">=</span>
      <div className="text-3xl flex flex-col justify-center font-bold">
      <Fraction numerator={numerator1*multiplier} denominator={denominator1*multiplier} className="text-3xl font-bold" />
      </div>
    </div>
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center">
        <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
      </div>  
      <div className="flex justify-center items-center">
        x
        <input 
          type="text"
          value={multiplier1_denominator === 0 ? "" : multiplier1_denominator?.toString()}
          onChange={(e) => setmultiplier1_denominator(Number(e.target.value))}
          ref={multiplier1_denominatorRef}  
          placeholder={multiplierStep === 0 ? "?" : ""}
          className={`w-10 text-center mt-2 ml-2 border-2 border-black ${multiplier1_denominator === multiplier ? 'bg-green-100' : 'bg-white'}`}
          disabled={multiplierStep !== 0}

        />
        
      </div>
    </div>
  </div>
  )
}

export const OnlyDivisor = ({numerator1, denominator1, divisor, onComplete}: {numerator1: number, denominator1: number, divisor: number, onComplete: () => void}) => {
  const [divisor1_numerator, setDivisor1_numerator] = useState(0);
  const divisor1_numeratorRef = useRef(null);
  const [divisor1_denominator, setDivisor1_denominator] = useState(0);
  const divisor1_denominatorRef = useRef(null);

  const [multiplierStep, setMultiplierStep] = useState(0);

  useEffect(() => {
    if (divisor1_denominator === divisor) {
      setMultiplierStep(1);
      if (divisor1_denominatorRef.current) {
        (divisor1_denominatorRef.current as HTMLInputElement).focus();
      }
    }
  }, [divisor1_denominator]);

  useEffect(() => {
    if (multiplierStep === 1 && divisor1_numerator === divisor) {
      setMultiplierStep(2);
      onComplete();
    }
  }, [divisor1_numerator]);

  return (
    <div className="flex flex-col">
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center">
        <input 
          type="text"
          value={divisor1_numerator === 0 ? "" : divisor1_numerator?.toString()}
          onChange={(e) => setDivisor1_numerator(Number(e.target.value))}
          placeholder={multiplierStep === 1 ? "?" : ""}
          className={`w-10 text-center mb-2 mx-2 border-2 border-black ${divisor1_numerator === divisor ? 'bg-green-100' : 'bg-white'} ${multiplierStep < 1 && 'opacity-10'}`}
          disabled={multiplierStep !== 1}
          ref={divisor1_numeratorRef}
        />
        ÷
      </div>
      <div className="flex justify-center items-center">
        <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-6 -scale-x-100" />
      </div>  
    </div>
    <div className="flex justify-center items-center gap-4">
      <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold" /> 
      <span className="text-3xl font-bold">=</span>
      <div className="text-3xl flex flex-col justify-center font-bold">
      <Fraction numerator={numerator1*divisor} denominator={denominator1*divisor} className="text-3xl font-bold" />
      </div>
    </div>
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center">
        <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-6 rotate-180" />
      </div>  
      <div className="flex justify-center items-center">
        <input 
          type="text"
          value={divisor1_denominator === 0 ? "" : divisor1_denominator?.toString()}
          onChange={(e) => setDivisor1_denominator(Number(e.target.value))}
          ref={divisor1_denominatorRef}  
          placeholder={multiplierStep === 0 ? "?" : ""}
          className={`w-10 text-center mt-2 mx-2 border-2 border-black ${divisor1_denominator === divisor ? 'bg-green-100' : 'bg-white'}`}
          disabled={multiplierStep !== 0}

        />
        ÷
      </div>
    </div>
  </div>
  )
}