import { Fraction, BarState } from './bar';

export const desc = `Steps to Play the Fraction Comparison Game:
1. You'll start with two chocolate bars representing fraction1 and fraction2.
2. Break the first chocolate bar into equal parts by clicking the "Split" button.
3. Select the pieces of the first bar that represent the fraction fraction1.
4. Break the second chocolate bar into equal parts by clicking the "Split" button.
5. Select the pieces of the second bar that represent the fraction fraction2.
6. Compare the selected pieces from both bars to determine which fraction is larger.
7. Your goal is to correctly identify which fraction has a greater value.`;


export interface GameState {
  fraction1: Fraction;
  fraction2: Fraction;
  bar1: BarState;
  bar2: BarState;
  showAnswer: boolean;
  userAnswer: string | null;
  isFirstFractionCorrect: boolean;
  isSecondFractionCorrect: boolean;
  compareMode: boolean;
  gameStarted: boolean;
  correctAnswer: Fraction;
}

const num1 = 1
const denom1 = 2
const num2 = 1
const denom2 = 3


export const initialGameState: GameState = {
    fraction1: { num: num1, denom: denom1 },
    fraction2: { num: num2, denom: denom2 },
    bar1: { parts: 1, selectedParts: [] },
    bar2: { parts: 1, selectedParts: [] },
    showAnswer: false,
    userAnswer: null,
    isFirstFractionCorrect: false,
    isSecondFractionCorrect: false,
    compareMode: false,
    gameStarted: false,
    correctAnswer: (num1 * denom2) > (num2 * denom1) 
      ? { num: num1, denom: denom1 } 
      : { num: num2, denom: denom2 }
};
