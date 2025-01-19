export const desc = `
### Game Description for Screen 1: Creating Equivalent Fractions

**Objective:**
The goal of this screen is to help students understand how to create equivalent fractions by finding a common denominator. This is achieved through a visual and interactive approach using chocolate bar representations.

**Game Flow:**
1. **Introduction:**
   - Students are introduced to two fractions, for example, \( \frac{1}{2} \) and \( \frac{1}{3} \).
   - The task is to rewrite these fractions so that they have the same denominator, allowing them to be compared or combined.

2. **Interactive Tools:**
   - Students use a "knife" tool to split chocolate bars into equal pieces. This tool helps them visualize the process of creating equivalent fractions.
   - For instance, they can split the chocolate bar representing \( \frac{1}{2} \) into 4 pieces and the one representing \( \frac{1}{3} \) into 6 pieces.

3. **Steps:**
   - **Step 1:** Students select the appropriate multiplier for each fraction to create equivalent fractions with a common denominator.
   - **Step 2:** They use the knife tool to adjust the chocolate bars, ensuring both fractions have the same number of pieces (denominator).

4. **AI Tutor Support:**
   - If a student selects an incorrect multiplier or fails to achieve a common denominator, the AI tutor provides contextual hints and guidance.
   - The AI might say, "Imagine you are cutting the chocolate bar into smaller pieces. How many pieces do you need to cut each bar into so they look the same?"
   - It could also ask, "What happens if you cut each piece of the \( \frac{1}{2} \) bar into 3 smaller pieces and each piece of the \( \frac{1}{3} \) bar into 2 smaller pieces? How many pieces do you have now?"

5. **Feedback:**
   - The AI tutor encourages students to think about the relationship between the numerators and denominators in the context of the chocolate bars.
   - It guides them to understand that multiplying both the numerator and denominator by the same number does not change the value of the fraction, but it does change its form to have a common denominator with another fraction.

**Relevant Game State Variables:**
- step: Tracks the current step in the game flow.
- fraction1: Represents the first fraction, initially set to \( \frac{1}{2} \).
- fraction2: Represents the second fraction, initially set to \( \frac{1}{3} \).
`;


export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface Fraction {
  numerator: string;
  denominator: string;
}

interface State1 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
}

interface State2 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  chocolateFractions1: Fraction[];
  chocolateFractions2: Fraction[];
  chocolatesWithSameDenominator: number[];
}

interface State3 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  gcd: number;
}

interface State4 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number; // Least Common Denominator
  ecd: number; // Easiest Common Denominator
}

interface State5 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  ecd: number;
}

interface State6 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  ecd: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
  state6: State6;
}


// Least Common Denominator (lcd) = denom1 * denom2 / Greatest Common Divisor (gcd)
// Easiest Common Denominator (ecd) = denom1 * denom2

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    // Defines the game screen 1
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' },

    step: 0, // Do not change this
  },
  state2: {
    step: 0, // Do not change this

    // Defines the game screen 2
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' },
    lcd: 6, // Least Common Denominator of fraction1 and fraction2

    // We need to make sure that among these three options, 
    // there is exactly one option that is common to both 
    // fraction1 and fraction2

    // Equivalent fractions for fraction1
    chocolateFractions1: [
      { numerator: '1', denominator: '2' },
      { numerator: '2', denominator: '4' },
      { numerator: '3', denominator: '6' },
    ],
    // Equivalent fractions for fraction2
    chocolateFractions2: [
      { numerator: '1', denominator: '3' },
      { numerator: '2', denominator: '6' },
      { numerator: '3', denominator: '9' }
    ],
    // Indices of chocolates with same denominator, 
    // must be one among the options for 
    // chocolateFractions1 and chocolateFractions2
    chocolatesWithSameDenominator: [1, 2]
  },
  state3: {
    step: 0, // Do not change this

    // Defines the game screen 3
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '5' },
    gcd: 15 // Greatest Common Divisor of fraction1 and fraction2
  },
  state4: {
    step: 0, // Do not change this

    // Defines the game screen 4
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '4' },
    lcd: 4, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 8, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  },
  state5: {
    step: 0, // Do not change this

    // Defines the game screen 5
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '6' },
    lcd: 6, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 18, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  },
  state6: {
    step: 0, // Do not change this

    // Defines the game screen 6
    fraction1: { numerator: '1', denominator: '4' },
    fraction2: { numerator: '1', denominator: '8' },
    lcd: 8, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 32, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  }
};
