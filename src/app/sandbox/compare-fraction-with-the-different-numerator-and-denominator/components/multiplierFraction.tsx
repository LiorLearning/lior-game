import React, { useState, useRef, useEffect } from "react";
import Fraction from "./Fraction";
import { BaseProps } from "../utils/types";
import { getInputColor } from "../utils/helper";

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
  const [numerator2, setNumerator2] = useState('');
  const numerator2Ref = useRef(null);
  const [multiplier1_numerator, setmultiplier1_numerator] = useState('');
  const multiplier1_numeratorRef = useRef(null);
  const [multiplier1_denominator, setmultiplier1_denominator] = useState('');
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
    if (multiplerStep === 0 && multiplier1_denominator === (denominator2/denominator1).toString()) {
      setMultiplerStep(1);
    } else if (multiplier1_denominator){
      sendAdminMessage('admin', `User entered ${multiplier1_denominator} as factor of ${denominator2} and ${denominator1} but it is not a valid factor, diagnose socratically`);
    }
  }, [multiplier1_denominator]);

  useEffect(() => {
    if (multiplerStep ===2 && numerator2 === (numerator1 * parseInt(multiplier1_denominator)).toString()) {
      complete();
    }
  }, [numerator2]);

  useEffect(() => {
    if (multiplerStep === 1 && multiplier1_numerator === (denominator2/denominator1).toString()) {
      setMultiplerStep(2);
    } else {
      sendAdminMessage('admin', `User entered ${multiplier1_numerator} as factor for numerator, user already entered ${multiplier1_denominator} as factor of ${denominator2} and ${denominator1}`);
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
            onChange={(e) => setmultiplier1_numerator(e.target.value)}
            placeholder={multiplerStep === 1 ? "?" : ""}
            className={`w-10 text-center mb-2 ml-2 border-2 border-black ${multiplerStep >= 1 ? 'opacity-100' : 'opacity-5'}`}
            disabled={multiplerStep !== 1}
            style={{
              backgroundColor: getInputColor(multiplier1_numerator, (denominator2/denominator1).toString())
            }}
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
              value={numerator2}
              onChange={(e) => setNumerator2(e.target.value)}
              placeholder={multiplerStep === 2 ? "?" : ""}
              className={`border-none outline-none my-1 text-3xl text-center`}
              style={{
                backgroundColor: getInputColor(numerator2, (numerator1 * parseInt(multiplier1_denominator)).toString())
              }}
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
            value={multiplier1_denominator}
            onChange={(e) =>  setmultiplier1_denominator(e.target.value)}
            placeholder={multiplerStep === 0 ? "?" : ""}
            className={`w-10 text-center my-1 ml-2 border-2 border-black`}
            style={{
              backgroundColor: getInputColor(multiplier1_denominator, (denominator2/denominator1).toString())
            }}
            disabled={multiplerStep !== 0}
            ref={multiplier1_denominatorRef}
          />
        </div>
      </div>
    </div>
  </div>
)}