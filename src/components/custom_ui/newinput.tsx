import { useRef } from "react";

export interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  nthIncorrect?: number;
  onCorrect?: () => void;
  onIncorrect?: (attempt: string, correctAnswer: string) => void;
  correctValue?: string;
  useColor?: boolean;
}

const NewInput = ({ 
  value, 
  useColor = false, 
  onValueChange, 
  nthIncorrect = 1, 
  onCorrect, 
  onIncorrect, 
  correctValue, 
  ...props 
}: NewInputProps) => {
  
  const NOT_ATTEMPTED = 'not_attempted';
  const ATTEMPTED = 'attempted';
  const CORRECT = 'correct';
  const INCORRECT = 'incorrect';

  const getState = (input: string, actual: string): string => {
    if(!input || input === '') {
      return NOT_ATTEMPTED;
    } else if (input.length === actual.length) {
      if (input === actual) {
        return CORRECT;
      } else {
        return INCORRECT;
      }
    }
    return ATTEMPTED;
  }

  const getInputColor = (input: string, actual: string): string | undefined => {
    const state = getState(input, actual);
    if(useColor) {
      if (state === NOT_ATTEMPTED) {
        return;
      } else if (state === CORRECT) {
        return '#DCFCE7';
      } else if (state === INCORRECT) {
        return '#FEE2E2';
      }
      return '#FFFFFF';
    } else {
      return '';
    }
  }

  const nthIncorrectValue = useRef(0);

  const onValueChangeHandler = (value: string) => {
    if(correctValue) {
      if(getState(value, correctValue) === INCORRECT) {
        nthIncorrectValue.current++;
        if(nthIncorrect && nthIncorrectValue.current >= nthIncorrect) {
          onIncorrect?.(value, correctValue);
        }
      }
      if(getState(value, correctValue) === CORRECT) {
        onCorrect?.();
      }
    }
    if (correctValue) {
      if (value.length <= correctValue?.length) {
        onValueChange(value);
      }
    } else {
      onValueChange(value);
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onValueChangeHandler(e.target.value)}
      style={{ backgroundColor: getInputColor(value, correctValue || '') }}
      {...props}
    />
  )
}

export { NewInput };