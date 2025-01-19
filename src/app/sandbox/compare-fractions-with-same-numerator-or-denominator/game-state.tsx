import { Fraction, BarState } from './bar';

// Initial fractions to compare
const num1 = 1
const denom1 = 2
const num2 = 1
const denom2 = 3

// Game state manages the interactive comparison of two fractions using chocolate bars
// Each bar can be split into parts and pieces can be selected to represent fractions
export const desc = `
Welcome to the Fraction Comparison Game! Learn to compare fractions through interactive chocolate bars.

Detailed Gameplay:
1. You'll start with two chocolate bars and two fractions to compare
2. For the first fraction (${num1}/${denom1}):
   - Break the first chocolate bar into ${denom1} equal parts using the "Split" button
   - Select ${num1} piece(s) to represent the fraction
   - The bar will show green checkmark when correct pieces are selected
3. For the second fraction (${num2}/${denom2}):
   - Break the second chocolate bar into ${denom2} equal parts
   - Select ${num2} piece(s) to represent the fraction
   - The bar will show green checkmark when correct
4. Once both fractions are correctly represented:
   - Click "Compare Bars" to visually compare the selected pieces
   - Choose which fraction you think is bigger
   - Get immediate feedback on your answer

Game State Details:
- fraction1/fraction2: The two fractions being compared
- bar1/bar2: Track the number of parts and which pieces are selected for each bar
- isFirstFractionCorrect/isSecondFractionCorrect: Whether correct pieces are selected
- compareMode: Whether in visual comparison mode
- showAnswer: Whether to show the final result
- correctAnswer: The larger fraction determined by cross multiplication

Tips:
- Use the Split button to break bars into equal parts
- Click pieces to select/deselect them
- Compare the selected pieces visually to determine the larger fraction
- Pay attention to both the number of parts (denominator) and selected pieces (numerator)
`;

// Interface defining the complete game state structure
export interface GameState {
  fraction1: Fraction;  // First fraction to compare
  fraction2: Fraction;  // Second fraction to compare 
  bar1: BarState;      // State of first chocolate bar
  bar2: BarState;      // State of second chocolate bar
  showAnswer: boolean; // Whether to show the result
  userAnswer: string | null;  // User's selected answer
  isFirstFractionCorrect: boolean;  // First fraction correctly represented
  isSecondFractionCorrect: boolean; // Second fraction correctly represented
  compareMode: boolean;  // In comparison mode
  gameStarted: boolean; // Game has begun
  correctAnswer: Fraction; // The larger fraction
}


// Initial state when game starts
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