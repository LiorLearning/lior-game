export const desc = `
This is the game state for the fraction addition game.
It is a context that provides a ref to the game state and a function to update the game state.
The game state is an object that contains the current state of the game.
The game state is updated by the setGameStateRef function.
The setGameStateRef function is a function that takes a new state and updates the game state.
The new state can be a function that returns a new state or a partial state.
The partial state is a new state that is merged with the current state.
`

interface Fraction {
  numerator: number;
  denominator: number;
}

export interface GameState {
  fractionProblem: {
    fraction1: Fraction;
    fraction2: Fraction;
  };
  chocolateBarPieces: number;
  correctAnswer: Fraction;
  currentScreen: 'chocolate' | 'denominator';
  chocolateBarScreen: {
    selectedPieces: number[];
    step2Pieces: number[];
    numerator: string;
    denominator: string;
    selectedOption: number | null;
    showStep2: boolean;
    showStep3: boolean;
    showFooter: boolean;
  };
  denominatorScreen: {
    denominatorOption: number | null;
    numeratorOption: number | null;
    answerNumerator: string;
    answerDenominator: string;
    showStep2: boolean;
    showStep3: boolean;
    isAnswerCorrect: boolean;
  };
}

export const initialGameState: GameState = {
  fractionProblem: {
    fraction1: { numerator: 1, denominator: 3 },
    fraction2: { numerator: 1, denominator: 3 },
  },
  chocolateBarPieces: 3,
  correctAnswer: { numerator: 2, denominator: 3 },
  currentScreen: 'chocolate',
  chocolateBarScreen: {
    selectedPieces: [],
    step2Pieces: [],
    numerator: '',
    denominator: '',
    selectedOption: null,
    showStep2: false,
    showStep3: false,
    showFooter: false,
  },
  denominatorScreen: {
    denominatorOption: null,
    numeratorOption: null,
    answerNumerator: '',
    answerDenominator: '',
    showStep2: false,
    showStep3: false,
    isAnswerCorrect: false,
  },
}
