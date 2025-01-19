// Game state for fraction addition game with two main screens:
// 1. Chocolate bar screen for visual fraction addition
// 2. Denominator screen for understanding fraction addition rules

// Each screen maintains its own state tracking:
// - User selections and inputs
// - Multi-step progression
// - Validation and feedback

export const desc = `
Welcome to the Fraction Subtraction Game! Learn to subtract fractions using interactive chocolate bars.

Detailed Gameplay:

Visual Subtraction Screen
1. Start with a chocolate bar divided into equal parts (the minuend)
2. Select the correct number of pieces to represent the first fraction
3. Remove pieces by dragging them away (the subtrahend)
4. Count the remaining pieces to find the difference
5. Enter your answer as a fraction
6. Reflect on how the subtraction affected the numerator and denominator

Rules Understanding Screen
1. Learn about denominator behavior in fraction subtraction
   - Understand why denominators stay the same when subtracting fractions
   - Practice with different examples

2. Learn about numerator behavior
   - See how numerators are subtracted when denominators are the same
   - Practice finding the difference between numerators

3. Apply the rules
   - Use your understanding to solve fraction subtraction problems
   - Check your answers with visual confirmation

Key Concepts:
- When subtracting fractions with the same denominator:
  * The denominator stays the same
  * Only the numerators are subtracted
  * The result represents the remaining pieces

Tips:
- Use the chocolate bar to visualize the subtraction process
- Remember that pieces must be the same size (same denominator) to subtract
- Practice connecting the visual model to the numerical representation
`
interface Fraction {
  numerator: number;
  denominator: number;
}

interface Screen1State {
  currentStep: number;
  selectedPieces: number;
  droppedPieces: Array<{ x: number, y: number, originalIndex: number }>;
  answer: {
    numerator: string;
    denominator: string;
  };
  firstAnswer: string | null;
  secondAnswer: string | null;
  isNumeratorCorrect?: boolean;
  isDenominatorCorrect?: boolean;
  barValueStep: boolean;
  barValue: {
    numerator: number;
    denominator: number;
  };
}

interface Screen2State {
  currentStep: number;
  denominatorAnswer: string | null;
  numeratorAnswer: string | null;
  finalAnswer: string;
  completedSteps: number[];
  isStep3Correct: boolean;
}

interface SharedState {
  currentFrame: number;
  questions: {
    question1: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
    question2: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
  }
}

export interface GameState extends SharedState {
  screen1State: Screen1State;
  screen2State: Screen2State;
}

export const initialGameState: GameState = {
  currentFrame: 1,
  questions: {
    question1: {
      fraction1: {
        numerator: 7,
        denominator: 8
      },
      fraction2: {
        numerator: 1,
        denominator: 8
      }
    },
    question2: {
      fraction1: {
        numerator: 4,
        denominator: 5
      },
      fraction2: {
        numerator: 3,
        denominator: 5
      }
    }
  },
  screen1State: {
    currentStep: 1,
    selectedPieces: 0,
    droppedPieces: [],
    answer: {
      numerator: '',
      denominator: ''
    },
    firstAnswer: null,
    secondAnswer: null,
    barValueStep: false,
    barValue: {
      numerator: 0,
      denominator: 1
    },
  },

  screen2State: {
    currentStep: 1,
    denominatorAnswer: null,
    numeratorAnswer: null,
    finalAnswer: '',
    completedSteps: [],
    isStep3Correct: false
  }
}