import { ChocolateBarWithFraction } from "./chocolate-bar";
import { ChocolateRow } from "./chocolate-row";
import { Fraction } from "../game-state";
import { useState } from "react";
import { BaseProps } from "../utils/types";

interface KnifeGameProps extends BaseProps {
  fraction: Fraction;
  onCorrect: () => void;
  showKnife: boolean;
}

const KnifeGame = ({ fraction, onCorrect, showKnife, sendAdminMessage }: KnifeGameProps) => {
  const [ firstCorrect, setFirstCorrect ] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8">
        <span className="text-2xl font-bold">Use the knife to make equivalent fractions from {fraction.numerator}/{fraction.denominator}.</span>
      </div>

      <div className="w-full flex flex-col items-center gap-16 my-8">
        {/* Original 1/2 */}
        <div className="flex flex-col items-center justify-center gap-8">
          <ChocolateBarWithFraction fraction={fraction} />
        </div>

        <ChocolateRow
          multiplier={2}
          originalFraction={fraction}
          onCorrect={() => setFirstCorrect(true)}
          sendAdminMessage={sendAdminMessage}
          showKnife={showKnife}
        />

        <ChocolateRow
          multiplier={3}
          originalFraction={fraction}
          onCorrect={() => {if (firstCorrect) {onCorrect();}}}
          sendAdminMessage={sendAdminMessage}
          showKnife={showKnife}
        />
      </div>
    </>
  )
}

export default KnifeGame;