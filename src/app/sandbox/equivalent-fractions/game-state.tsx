export const desc = `
Steps to Play the Equivalent Fractions Game:
1. You'll start with two chocolate bars representing fraction1 and fraction2.
2. Break the first chocolate bar into equal parts by clicking the "Split" button.
3. Select the pieces of the first bar that represent the fraction fraction1.
4. Break the second chocolate bar into equal parts by clicking the "Split" button.
5. Select the pieces of the second bar that represent the fraction fraction2.
6. Compare the selected pieces from both bars to determine which fraction is larger.
7. Your goal is to correctly identify which fraction has a greater value.
`

export interface Equation {
  input: { numerator: number; denominator: number };
  multiplier: { numerator: number; denominator: number };
  output: { numerator: number; denominator: number };
}

export interface FirstScreenState {
  equation: Equation;
  firstBar: number[][];
  secondBar: number[][];
  selectedKnife: number | null;
  isCorrect: boolean;
  currentStep: number;
  barNumerator: string;
  showCorrect: boolean;
  canProceed: boolean;
}

export interface SecondScreenState {
  equation: Equation;
  firstBar: number[][];
  secondBar: number[][];
  currentStep: number;
  showCorrect: boolean;
  isCorrect: boolean;
  selectedPieces: number[];
}

export interface ThirdScreenState {
  equation: Equation;
  firstBar: number[][];
  secondBar: number[][];
  isCorrect: boolean;
  currentStep: number;
}

export type Screen = 'first' | 'second1' | 'second2' | 'third';

export interface GameState {
  currentScreen: Screen;
  firstScreenState: FirstScreenState;
  secondScreenState: SecondScreenState;
  thirdScreenState: ThirdScreenState;
}

export const initialGameState: GameState = {
  currentScreen: 'first',
  firstScreenState: {
    equation: {
      input: { numerator: 3, denominator: 4 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 12 },
    },
    firstBar: Array(4).fill(null).map((_, i) => (i < 3 ? [1] : [0])),
    secondBar: Array(4).fill([0]),
    selectedKnife: null,
    isCorrect: false,
    currentStep: 0,
    barNumerator: '',
    showCorrect: false,
    canProceed: false,
  },
  secondScreenState: {
    equation: {
      input: { numerator: 3, denominator: 4 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 8 },
    },
    firstBar: Array(4).fill(null).map((_, i) => (i < 3 ? [1] : [0])),
    secondBar: Array(4).fill([0]),
    currentStep: 1,
    showCorrect: false,
    isCorrect: false,
    selectedPieces: [],
  },
  thirdScreenState: {
    equation: {
      input: { numerator: 2, denominator: 3 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 12 },
    },
    firstBar: Array(3).fill(null).map((_, i) => (i < 2 ? [1] : [0])),
    secondBar: Array(3).fill([0]),
    isCorrect: false,
    currentStep: 1,
  },
};
