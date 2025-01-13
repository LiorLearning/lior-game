import { COLORS } from "../utils/types";
import { Button } from '@/components/custom_ui/button';
import { useGameState } from '../state-utils';
import { useState } from 'react';
import { nextStep } from '../utils/helper';

interface QuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onSuccess: () => void;
}

export const Question = ({ question, options, correctAnswer, onSuccess }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const handleAnswerClick = (index: number) => {
    if (index === correctAnswer) {
      setSelectedAnswer('correct');
      setSelectedIndex(index);
      onSuccess();
    } else {
      setSelectedAnswer('incorrect');
      setSelectedIndex(index);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center" style={{
      backgroundColor: COLORS.pinkLight
    }}>
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="text-center text-2xl mt-16 mb-8">
          <p>{question}</p>
        </div>
        {options.map((option, index) => (
          <div className="flex flex-col items-center justify-center mb-4" key={index}>
            <Button
              onClick={() => handleAnswerClick(index)}
              style={{ 
                backgroundColor: (selectedAnswer === 'correct' && index === selectedIndex) ? 'green' : (selectedAnswer === 'incorrect' && index === selectedIndex) ? 'red' : COLORS.pink
              }}
              className={`text-white px-8 py-2 text-xl font-bold border-2 border-black hover:opacity-90 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none ${selectedAnswer === 'incorrect' ? 'opacity-50' : ''}`}
            >
              {option}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}