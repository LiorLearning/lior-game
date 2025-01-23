export type GameScreen = 1 | 2 | 3;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'First screen',
    description: 'First screen description'
  },
  {
    title: 2,
    oneliner: 'Second screen',
    description: 'Second screen description'
  }
]

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
  screen: 1,
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
