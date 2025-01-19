import { sounds } from '../utils/sounds';

interface ProceedProps {
  onComplete: () => void;
}

const Proceed: React.FC<ProceedProps> = ({ onComplete }) => {
  const handleClick = () => {
    sounds.button(); // Play button sound
    onComplete();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
    >
      Proceed
    </button>
  );
};

export default Proceed;