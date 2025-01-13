import { Fraction } from '../game-state';
import { Button } from '@/components/custom_ui/button';
import { Input } from '@/components/custom_ui/input';
import { useEffect, useState } from 'react';
import { COLORS } from '../utils/types';
import { INCORRECT, getInputColor, getState } from '../utils/helper';



interface KnifeRowProps {
  fraction: Fraction;
  index: number;
  input: 'none' | 'one' | 'two';
  onSelectMultiplier: (multiplier: number) => void;
  hard?: boolean;
}

export default function KnifeRow({fraction, index, input, onSelectMultiplier, hard=false} : KnifeRowProps) {
  const [factor, setFactor] = useState('')
  const [answer, setAnswer] = useState('')

  const factorColor = getInputColor(factor, index.toString())
  const factorState = getState(factor, index.toString())
  const answerColor = getInputColor(answer, (index * parseInt(fraction.denominator)).toString())
  const answerState = getState(answer, (index * parseInt(fraction.denominator)).toString())

  const [showKnife, setShowKnife] = useState(false)

  useEffect(() => {
    if (index === 2) {
      setShowKnife(true)
    } else if (factorState === INCORRECT || answerState === INCORRECT) {
      setShowKnife(true)
    }
  }, [factorState, answerState, index])

  useEffect(() => {
    if (parseInt(fraction.denominator) * index === parseInt(answer)) {
      onSelectMultiplier(index)
    }
  }, [answer])

  return (
    <div className="flex items-center gap-4 rounded-lg w-full max-w-3xl" style={{
      backgroundColor: COLORS.pinkLight
    }}>
      {showKnife ? (
        <Button 
        className={`ml-4 w-12 h-12 rounded-lg flex items-center justify-center`}
        style={{
          backgroundColor: COLORS.gray,
        }}
        onClick={() => {
          onSelectMultiplier(index)
        }}
      >
          <span className="text-2xl">🔪</span> {index}
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-xl p-8" />
      )}
      {input === 'one' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, split into {index} each, give {hard ? '' : `${fraction.denominator} X ${index} = `}</span>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-12 h-12 text-center text-xl font-bold border border-black"
              style={{ backgroundColor: answerColor }}
              maxLength={3}
            />
            <span>total pieces</span>
          </div>
        </div>
      ) : input === 'two' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, split into {index} each, give {hard ? '' : `${fraction.denominator} X `}</span>
            {!hard && 
              <>
                <Input
                  type="text"
                  value={factor}
                  onChange={(e) => setFactor(e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border border-black"
                  style={{ backgroundColor: factorColor }}
                  maxLength={3}
                />
                <span>=</span>
              </>
            }
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-12 h-12 text-center text-xl font-bold border border-black"
              style={{ backgroundColor: answerColor }}
              maxLength={3}
            />
            <span>total pieces</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xl p-4">
          <span>{fraction.denominator} pieces, not split any further, give {fraction.denominator} X {index} = {parseInt(fraction.denominator) * index} total pieces</span>
        </div>
      )}
    </div>
  )
}