import { COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { useEffect, useState } from 'react';
import { Input } from '@/components/custom_ui/input';
import { Fraction } from '../game-state';
import { getInputColor } from '../utils/helper';



interface ECDSectionProps {
  fraction1: Fraction;
  fraction2: Fraction;
  onSuccess: () => void;
  showHelp?: boolean;
}

export const ECDSection = ({ fraction1, fraction2, onSuccess, showHelp = false }: ECDSectionProps) => {
  const [ecdInputs, setEcdInputs] = useState({
    denom1: '',
    denom2: '',
    result: ''
  });

  useEffect(() => {
    if (parseInt(ecdInputs.denom1) * parseInt(ecdInputs.denom2) === parseInt(ecdInputs.result)) {
      onSuccess();
    }
  }, [ecdInputs]);

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <StepModule color={COLORS.pink} stepNumber={1} numerator1={parseInt(fraction1.numerator)} denominator1={parseInt(fraction1.denominator)} numerator2={parseInt(fraction2.numerator)} denominator2={parseInt(fraction2.denominator)} stepText="FIND ECD" />
      <div className="flex flex-col items-center justify-center mt-4">
        <span className="text-xl">Easiest Common Denominator</span>
      </div>
      <div className="flex items-center gap-4 mt-12">
        <Input
          type="text"
          value={ecdInputs.denom1}
          onChange={(e) => setEcdInputs(prev => ({ ...prev, denom1: e.target.value }))}
          className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          style={{
            backgroundColor: getInputColor(ecdInputs.denom1, fraction1.denominator)
          }}
        />
        <span className="text-xl">×</span>
        <Input
          type="text"
          value={ecdInputs.denom2}
          onChange={(e) => setEcdInputs(prev => ({ ...prev, denom2: e.target.value }))}
          className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          style={{
            backgroundColor: getInputColor(ecdInputs.denom2, fraction2.denominator)
          }}
        />
        <span className="text-xl">=</span>
        <Input
          type="text"
          value={ecdInputs.result}
          onChange={(e) => setEcdInputs(prev => ({ ...prev, result: e.target.value }))}
          className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          style={{
            backgroundColor: getInputColor(ecdInputs.result, (parseInt(fraction1.denominator) * parseInt(fraction2.denominator)).toString())
          }}
        />
      </div>
      {showHelp && <div className="text-xl mt-2 mb-16">
        Hint: ECD = product of denominators
      </div>}
    </div>
  )
}
