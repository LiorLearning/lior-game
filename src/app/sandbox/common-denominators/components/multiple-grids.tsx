import { COLORS } from '../utils/types';
import { Button } from '@/components/custom_ui/button';
import { useEffect, useState } from 'react';
import { CORRECT, getInputColor, getState, INCORRECT } from '../utils/helper';
import { Fraction } from '../game-state';

interface BaseMultiplesGridProps {
  fraction1: Fraction;
  fraction2: Fraction;
  onSuccess: () => void;
  onSelectKnife?: (index: number) => void;
}

interface GCDMultiplesGridProps extends BaseMultiplesGridProps {
  gcd: number;
  sendAdminMessage: (role: string, message: string) => void;
}

interface LCDECDMultiplesGridProps extends BaseMultiplesGridProps {
  lcd: number;
  ecd: number;
  sendAdminMessage: (role: string, message: string) => void;
}

const renderMultiplesRow = (
  fraction: Fraction,
  getMultiples: (num: number) => number[], 
  selectedMultiple: number[],
  showColor: boolean = true
) => (
  <div className="flex items-center gap-4 w-full">
    <div className="flex items-center gap-4">
      <div className="text-black px-3 py-1 inline-flex flex-col items-center">
        <span>{fraction.numerator}</span>
        <div className="w-3 h-px bg-black" />
        <span>{fraction.denominator}</span>
      </div>
      <div className="w-36 text-white px-4 py-2 text-center" style={{
        backgroundColor: COLORS.pink
      }}>
        Multiples of {fraction.denominator}
      </div>
    </div>
    <div className="flex gap-4">
      {getMultiples(parseInt(fraction.denominator)).map((multiple) => (
        <Button
          key={multiple}
          className={`w-12 h-12 rounded-md border-2 flex items-center justify-center`}
          style={{
            backgroundColor: showColor ? getColor(multiple, selectedMultiple) : COLORS.gray
          }}
        >
          {multiple}
        </Button>
      ))}
    </div>
  </div>
);

const getColor = (multiple: number, selectedMultiple: number[]) => {
  if (selectedMultiple.includes(multiple)) {
    if (multiple === selectedMultiple[0]) {
      return COLORS.lightPurple;
    } else if (multiple === selectedMultiple[1]) {
      return COLORS.lightGreen;
    }
    return COLORS.pink;
  }
  return COLORS.gray;
};

const GCDMultiplesGrid = ({ fraction1, fraction2, gcd, onSuccess, onSelectKnife, sendAdminMessage }: GCDMultiplesGridProps) => {
  const maxMultiple = Math.max(parseInt(fraction1.denominator), parseInt(fraction2.denominator));
  const getMultiples = (num: number) => Array.from({ length: maxMultiple }, (_, i) => num * (i + 1));
  const selectedMultiple = [parseInt(fraction1.denominator) * parseInt(fraction2.denominator)];
  const [answer, setAnswer] = useState<string>('');

  const color = getInputColor(answer, gcd.toString())
  const state = getState(answer, gcd.toString())

  useEffect(() => {
    if (state === CORRECT) {
      onSuccess();
    } else if (state === INCORRECT) {
      sendAdminMessage('agent', "Hmmm, let's give that another try!");
      sendAdminMessage('admin', "Diagnose socratically, ask user to look at the multiples and try again.")
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {renderKnifeRow(maxMultiple, onSelectKnife)}
      {renderMultiplesRow(fraction1, getMultiples, selectedMultiple, true)}
      {renderMultiplesRow(fraction2, getMultiples, selectedMultiple, false)}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-2xl">Common denominator is</span>
        <input
          type="text"
          className="w-16 h-12 border-2 rounded-md text-center text-lg"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const LCDECDMultiplesGrid = ({ fraction1, fraction2, lcd, ecd, onSuccess, onSelectKnife, sendAdminMessage }: LCDECDMultiplesGridProps) => {
  const maxMultiple = Math.max(parseInt(fraction1.denominator), parseInt(fraction2.denominator));
  const [answers, setAnswers] = useState({
    lcd: '',
    ecd: ''
  });

  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (answers.lcd === lcd.toString() && answers.ecd === ecd.toString()) {
      onSuccess();
    }
  }, [answers]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {showSecondRow ? <div className="h-12"></div> : renderKnifeRow(maxMultiple, onSelectKnife) }
      <MultiplesInputRow fraction={fraction1} maxMultiple={maxMultiple} lcd={lcd} ecd={ecd} onSuccess={() => setShowSecondRow(true)} showColor={showQuestion} />
      {showSecondRow && (
        <MultiplesInputRow 
        fraction={fraction2} 
        maxMultiple={maxMultiple} 
        lcd={lcd} 
        ecd={ecd} 
        onSuccess={() => {
          sendAdminMessage('agent', "Notice that we found 2 common denominators. Which is the least one?")
          setShowQuestion(true)
        }} 
        showColor={showQuestion} />)}
      {showQuestion && (
        <div className="flex flex-col gap-4 mt-4 w-[120%] justify-center items-center">
          <div className="flex flex-col items-center justify-center text-2xl">
            Common denominators:
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">Least common denominator (LCD) =</span>
            <input
              type="text"
              className="w-16 h-12 border-2 rounded-md text-center text-lg"
              style={{
                backgroundColor: answers.lcd === lcd.toString() ? COLORS.lightPurple : COLORS.gray
              }}
              value={answers.lcd}
              onChange={(e) => setAnswers(prev => ({ ...prev, lcd: e.target.value }))}
            />
          </div>
          {showSecondRow && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">Easiest common denominator (ECD) = product of {fraction1.denominator} and {fraction2.denominator} = </span>
              <input
                type="text"
                className="w-16 h-12 border-2 rounded-md text-center text-lg"
                style={{
                  backgroundColor: answers.ecd === ecd.toString() ? COLORS.lightGreen : COLORS.gray
                }}
                value={answers.ecd}
                onChange={(e) => setAnswers(prev => ({ ...prev, ecd: e.target.value }))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions for rendering common UI elements
const renderKnifeRow = (maxMultiple: number, onSelectKnife?: (index: number) => void) => (
  <div className="flex items-center gap-4 w-full">
    <div className="flex" style={{ marginLeft: '12.8rem' }}>
      {Array.from({ length: maxMultiple }, (_, index) => index + 1).map((multiplier) => (
        <Button 
          key={multiplier}
          className={`mx-2 w-12 h-12 rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: COLORS.gray }}
          onClick={() => onSelectKnife?.(multiplier)}
        >
          <span className="text-2xl">🔪</span> {multiplier}
        </Button>
      ))}
    </div>
  </div>
);

const MultiplesInputRow: React.FC<{
  fraction: Fraction, 
  maxMultiple: number,
  lcd: number,
  ecd: number,
  onSuccess: () => void,
  showColor: boolean
}> = ({ fraction, maxMultiple, lcd, ecd, onSuccess, showColor }) => {
  const [multiples, setMultiples] = useState<string[]>(Array(maxMultiple).fill(''));

  const getInputColor = (multiple: string, index: number, showColor: boolean) => {
    const answer = (parseInt(fraction.denominator) * (index + 1)).toString();

    if (showColor) {
      if (multiple === lcd.toString()) {
        return COLORS.lightPurple;
      } else if (multiple === ecd.toString()) {
        return COLORS.lightGreen;
      }
      return COLORS.gray;
    }

    if (multiple !== '') {
      if (multiple.length >= answer.length) {
        if (multiple === answer) {
          return COLORS.lightGreen;
        } else {
          return COLORS.lightRed;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };

  useEffect(() => {
    const allCorrect = multiples.every((multiple, index) => multiple === (parseInt(fraction.denominator) * (index + 1)).toString());  
    if (allCorrect) {
      onSuccess();
    }
  }, [multiples]);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-4">
        <div className="text-black px-3 py-1 inline-flex flex-col items-center">
          <span>{fraction.numerator}</span>
          <div className="w-3 h-px bg-black" />
          <span>{fraction.denominator}</span>
        </div>
        <div className="w-36 text-white px-4 py-2 text-center" style={{
          backgroundColor: COLORS.pink
        }}>
          Multiples of {fraction.denominator}
        </div>
      </div>
      {multiples.map((multiple, index) => (
        <div className="flex flex-col items-center" key={`mult1-${index}`}>
          <input
            key={index}
            type="text"
            className="w-12 h-12 rounded-md border-2 text-center"
            value={multiple}
            style={{
              backgroundColor: getInputColor(multiple, index, showColor)
            }}
            onChange={(e) => {
              setMultiples(prev => {
                const newMultiples = [...prev];
                newMultiples[index] = e.target.value;
                return newMultiples;
              })
            }}
          />
        </div>
      ))}
    </div>
  );
};



export default function MultiplesGrid(props: GCDMultiplesGridProps | LCDECDMultiplesGridProps) {
  if ('gcd' in props) {
    return <GCDMultiplesGrid {...props} />;
  }
  return <LCDECDMultiplesGrid {...props} />;
}