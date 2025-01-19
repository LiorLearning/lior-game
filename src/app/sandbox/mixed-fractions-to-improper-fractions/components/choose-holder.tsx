import { Button } from "@/components/ui/button";
import { GameProps } from "../utils/types";
import { useEffect, useState, useRef } from "react";
import { COLORS } from "../screen/constants";

interface ChooseHolderProps extends GameProps {
  answer: number;
  denomOptions: number[];
  onSuccess: () => void;
}

export const ChooseHolder = ({ answer, denomOptions, onSuccess, sendAdminMessage }: ChooseHolderProps) => {
  const [showButton, setShowButton] = useState(false);
  const hasGameStarted = useRef(false);

  const handleDenomOptionClick = (option: number) => {
    if (option === answer) {
      onSuccess();
    } else {
      sendAdminMessage('agent', "Hmmm, let's give that another try!");
      sendAdminMessage('admin', "Diagnosis socratically and ask user to select the correct holder");
    }
  };

  useEffect(() => {
    if (!hasGameStarted.current) {
      setTimeout(() => {
        sendAdminMessage('agent', "A hint: Look at the denominator");
        setShowButton(true);
      }, 8000);
      hasGameStarted.current = true;
    }
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-2">
      <div className="flex justify-center space-x-16">
        {denomOptions.map((option, index) => (
          <Button 
            key={index} 
            className="px-8 py-4 text-3xl rounded-none transition-colors duration-300 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)]"
            style={{
              backgroundColor: COLORS.pink,
            }}
            onClick={() => handleDenomOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}