import { COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { useEffect, useState } from 'react';
import { Input } from '@/components/custom_ui/input';
import { Fraction } from '../game-state';
import { getInputColor } from '../utils/helper';


interface LCDSectionProps {
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  onSuccess: () => void;
  showHelp?: boolean;
}

export const LCDSection = ({ fraction1, fraction2, lcd, onSuccess, showHelp = false }: LCDSectionProps) => {
  const [lcdInputs, setLcdInputs] = useState({
    multiples1: ['', '', '', '', ''],
    multiples2: ['', '', '', '', ''],
    result: ''
  });

  useEffect(() => {
    if (parseInt(lcdInputs.result) === lcd) {
      onSuccess();
    }
  }, [lcdInputs]);

  const handleLcdChange = (row: number, index: number, value: string) => {
    setLcdInputs(prev => {
      const newMultiples = row === 1 ? [...prev.multiples1] : [...prev.multiples2];
      newMultiples[index] = value;
      return {
        ...prev,
        [row === 1 ? 'multiples1' : 'multiples2']: newMultiples
      };
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={2} numerator1={parseInt(fraction1.numerator)} denominator1={parseInt(fraction1.denominator)} numerator2={parseInt(fraction2.numerator)} denominator2={parseInt(fraction2.denominator)} stepText="FIND LCD" />
        <div className="flex flex-col items-center justify-center mt-4">
          <span className="text-xl">Least Common Denominator</span>
        </div>
        
        {/* Multiples of first denominator */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
              <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                <span>{fraction1.numerator}</span>
                <div className="w-3 h-px bg-black" />
                <span>{fraction1.denominator}</span>
              </div>
              <div className="bg-pink-100 px-2 py-1 rounded">
              Multiples of {fraction1.denominator}
            </div>
            <div className="flex gap-2">
              {lcdInputs.multiples1.map((value, index) => (
                <div className="flex flex-col items-center" key={`mult1-${index}`}>
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => handleLcdChange(1, index, e.target.value)}
                    className="w-12 h-12 border-2 border-gray-300 rounded text-center"
                    style={{
                      backgroundColor: getInputColor(value, (parseInt(fraction1.denominator) * (index + 1)).toString())
                    }}
                  />
                  {showHelp && <span className="text-sm text-gray-500">{fraction1.denominator} x {index + 1}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Multiples of second denominator */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
              <span>{fraction1.numerator}</span>
              <div className="w-3 h-px bg-black" />
              <span>{fraction2.denominator}</span>
            </div>
            <div className="bg-pink-100 px-2 py-1 rounded">
              Multiples of {fraction2.denominator}
            </div>
            <div className="flex gap-2">
              {lcdInputs.multiples2.map((value, index) => (
                <div className="flex flex-col items-center" key={`mult2-${index}`}>
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => handleLcdChange(2, index, e.target.value)}
                    className="w-12 h-12 border-2 border-gray-300 rounded text-center"
                    style={{
                      backgroundColor: getInputColor(value, (parseInt(fraction2.denominator) * (index + 1)).toString())
                    }}
                  />
                  {showHelp && <span className="text-sm text-gray-500">{fraction2.denominator} x {index + 1}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LCD Result */}
        <div className="flex items-center gap-2 mt-6">
          <span className="text-3xl">LCD is</span>
          <Input
            type="text"
            value={lcdInputs.result}
            onChange={(e) => setLcdInputs(prev => ({ ...prev, result: e.target.value }))}
            className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
            style={{
              backgroundColor: getInputColor(lcdInputs.result, lcd.toString())
            }}
          />
        </div>
      </div>
    </>
  )
}