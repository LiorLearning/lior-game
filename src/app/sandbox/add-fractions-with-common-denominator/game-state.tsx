// Game state for fraction addition game with two main screens:
// 1. Chocolate bar screen for visual fraction addition
// 2. Denominator screen for understanding fraction addition rules

// Each screen maintains its own state tracking:
// - User selections and inputs
// - Multi-step progression
// - Validation and feedback

export const desc = `
Welcome to the Fraction Addition Game! Learn to add fractions through interactive chocolate bars.

Detailed Gameplay:

Chocolate Bar Screen
1. You'll see a chocolate bar divided into equal parts based on the denominator
2. First select pieces to represent the first fraction (e.g. 1/3)
3. Then you'll see additional pieces from a friend (the second fraction)
4. Select all pieces you now have to show the sum
5. Enter the resulting fraction's numerator and denominator
6. Choose the correct rule about denominators in fraction addition

Denominator Screen
1. You'll see the same fraction addition problem
2. Select the correct rule about denominators in fraction addition
3. Select the correct rule about numerators in fraction addition
4. Enter the final answer showing your understanding

Game State Details:
- fractionProblem: Stores the two fractions being added
- chocolateBarPieces: Number of total pieces in the visual bar
- correctAnswer: The expected sum of the fractions
- currentScreen: Tracks which screen is active
- chocolateBarScreen: Manages state for the visual addition screen
  * selectedPieces: Tracks clicked pieces for first fraction
  * step2Pieces: Tracks pieces selected after adding second fraction
  * numerator/denominator: User's input for the sum
  * showStep2/3: Controls multi-step progression
- denominatorScreen: Manages state for the rules screen
  * denominatorOption: User's choice about denominator rules
  * numeratorOption: User's choice about numerator rules
  * answerNumerator/Denominator: Final fraction input
  * showStep2/3: Controls multi-step progression

Tips:
- Use the chocolate bars to visualize how fractions combine
- Pay attention to whether denominators change when adding fractions
- Practice both visual and rule-based understanding
`

interface Fraction {
  numerator: number;
  denominator: number;
}

export interface GameState {
  started : boolean;

  question1: {
    fraction1: Fraction;
    fraction2: Fraction;
  };
  question2: {
    fraction1: Fraction;
    fraction2: Fraction;
  };

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
  started: false,
  question1: {
    fraction1: { numerator: 2, denominator: 5 },
    fraction2: { numerator: 1, denominator: 5 },
  },
  question2: {
    fraction1: { numerator: 2, denominator: 4 },
    fraction2: { numerator: 1, denominator: 4 },
  },
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
