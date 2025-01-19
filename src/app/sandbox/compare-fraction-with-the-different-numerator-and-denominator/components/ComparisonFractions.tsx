import React, { useState, useEffect, useRef } from "react";
import Fraction from "./Fraction";
import { ChevronDown } from 'lucide-react'
import { sounds } from '../../equivalent-fractions/utils/sounds'

interface ComparisonFractionsProps {
  fraction1: {
    numerator: number;
    denominator: number;
  };
  fraction2: {
    numerator: number;
    denominator: number;
  };
  onComplete: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export default function ComparisonFractions({
  fraction1,
  fraction2,
  onComplete,
  sendAdminMessage
}: ComparisonFractionsProps) {
  
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const correctAnswer = fraction1.numerator > fraction2.numerator ? ">" : (
    fraction1.numerator < fraction2.numerator ? "<" : "="
  );

  const commonDenominator = fraction1.denominator * fraction2.denominator;
  const newNumerator1 = fraction1.numerator * fraction2.denominator;
  const newNumerator2 = fraction2.numerator * fraction1.denominator;

  useEffect(() => {
    if (answer === correctAnswer) {
      onComplete();
    }
  }, [answer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (value === correctAnswer) {
      sounds.correct();
      setAnswer(value);
      onComplete();
      setIsOpen(false);
    } else {
      setAnswer(value);
      sounds.wrong();
      sendAdminMessage('admin', `User entered ${value} as answer when asked which is greater ${fraction1.numerator}/${fraction1.denominator} or ${fraction2.numerator}/${fraction2.denominator}  , diagnose socratically`);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full bg-yellow-100 py-16">
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <Fraction 
            numerator={fraction1.numerator} 
            denominator={fraction1.denominator} 
            className="text-3xl font-bold"
          />
          <span className="text-3xl font-bold">=</span>
          <div className="bg-white px-4 py-2">
            <Fraction 
              numerator={newNumerator1} 
              denominator={commonDenominator} 
              className="text-3xl font-bold"
            />
          </div>
        </div>
        <span className="text-3xl font-bold">&</span>
        <div className="flex items-center gap-4">
          <Fraction 
            numerator={fraction2.numerator} 
            denominator={fraction2.denominator} 
            className="text-3xl font-bold"
          />
          <span className="text-3xl font-bold">=</span>
          <div className="bg-white px-4 py-2">
            <Fraction 
              numerator={newNumerator2} 
              denominator={commonDenominator} 
              className="text-3xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <Fraction 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          className="text-3xl font-bold"
        />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 text-center text-3xl font-bold border-2 border-black flex items-center justify-center
              ${answer ? (
                answer === correctAnswer 
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              ) : "bg-white"}`}
          >
            {answer || "?"}
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 z-10">
              {["<", "=", ">"].map((option) => (
                <div
                  key={option}
                  className="text-2xl hover:bg-gray-100 cursor-pointer px-4 py-2 flex items-center justify-center"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <Fraction 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          className="text-3xl font-bold"
        />
      </div>
    </div>
  );
}
