import { Button } from "@/components/custom_ui/button";
import { COLORS } from "../utils/types";
interface ProceedButtonProps {
  text?: string;
  color?: string;
  onClick: () => void;
}

const ProceedButton = ({ text = 'PROCEED', color = COLORS.pink, onClick }: ProceedButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center m-8 mb-16">
      <Button
        onClick={onClick}
        className={`text-white px-8 py-2 text-2xl font-bold border-2 border-black shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none`}
        style={{
          backgroundColor: color,
        }}
      >
        {text}
      </Button>
    </div>
  )
}

export default ProceedButton;