export const desc = ``;

export type GameScreen = 'first' | 'second' | 'third';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Question {
  fraction1: Fraction
  fraction2: Fraction
}

export interface GameState {
  screen: GameScreen;
  state1: {
    step: number;
    question: Question
  };
  state2: {
    step: number;
    question: Question
  };
  state3: {
    step: number;
    question: Question
  };
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    question: {
      fraction1: { numerator: 2, denominator: 3 },
      fraction2: { numerator: 3, denominator: 4 },
    },
  },
  state2: {
    step: 0,
    question: {
      fraction1: { numerator: 5, denominator: 6 },
      fraction2: { numerator: 3, denominator: 4 },
    },
  },
  state3: {
    step: 0,
    question: {
      fraction1: { numerator: 5, denominator: 6 },
      fraction2: { numerator: 4, denominator: 5 },
    },
  }
};
