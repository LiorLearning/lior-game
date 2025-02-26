import { useEffect, useRef, useState } from "react";

export interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  nthIncorrect?: number;
  onCorrect?: () => void;
  onIncorrect?: (attempt: string, correctAnswer: string) => void;
  correctValue?: string;
  useColor?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  timeDelay?: number;
}

const NewInput = ({ 
  value, 
  useColor = false, 
  onValueChange, 
  nthIncorrect = 1, 
  onCorrect, 
  onIncorrect, 
  correctValue, 
  ref,
  timeDelay = 3000,
  ...props 
}: NewInputProps) => {
  
  const NOT_ATTEMPTED = 'not_attempted';
  const ATTEMPTED = 'attempted';
  const CORRECT = 'correct';
  const INCORRECT = 'incorrect';

  const [inputState, setInputState] = useState(NOT_ATTEMPTED);

  const getState = (input: string, actual: string) => {
    if (!input || input === '') {
      return NOT_ATTEMPTED;
    } else if (input.length === actual.length) {
      return input === actual ? CORRECT : INCORRECT;
    }
    return ATTEMPTED;
  };

  const getInputColor = (state: string) => {
    if (useColor) {
      if (state === NOT_ATTEMPTED) return;
      if (state === CORRECT) return '#DCFCE7';
      if (state === INCORRECT) return '#FEE2E2';
      return '#FFFFFF';
    } else {
      return '';
    }
  };

  const nthIncorrectValue = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onValueChangeHandler = (newValue: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (correctValue) {
      const currentState = getState(newValue, correctValue);
      setInputState(currentState);
      
      if (currentState === INCORRECT) {
        nthIncorrectValue.current++;
        if (nthIncorrect && nthIncorrectValue.current >= nthIncorrect) {
          console.log("Calling onIncorrect immediately:", newValue);
          onIncorrect?.(newValue, correctValue);
        }
      }
      if (currentState === CORRECT) {
        console.log("Calling onCorrect");
        onCorrect?.();
      }
    }

    if (correctValue) {
      if (newValue.length <= correctValue.length) {
        onValueChange(newValue);
      }
    } else {
      onValueChange(newValue);
    }

    // **Time delay validation** (Triggers only if input length < correct length)
    if (
      correctValue &&
      newValue.length < correctValue.length && 
      correctValue.length > 1 && newValue.length > 0
    ) {
      console.log("Setting timeout for", newValue);
      timeoutRef.current = setTimeout(() => {
        console.log("Time delay expired, setting state to INCORRECT:", newValue);
        setInputState(INCORRECT);
        nthIncorrectValue.current++;
        onIncorrect?.(newValue, correctValue);
      }, timeDelay);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onValueChangeHandler(e.target.value)}
      style={{ backgroundColor: getInputColor(inputState) }}
      ref={ref}
      {...props}
    />
  );
};

export { NewInput };
