export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth' | 'seventh';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'Meet Tilo and the Multiplying Board',
    description: 'Welcome to multiplication with partial products! Meet Tilo, your friendly guide who will introduce you to the multiplying tile board. This interactive board will help you understand how to break down 2-digit by 1-digit multiplication into smaller, manageable steps using partial products method.'
  },
  {
    title: 'second',
    oneliner: 'Learn Partial Products with Tile Board',
    description: 'Practice multiplying a two-digit number by a one-digit number using the multiplying tile board. Use the slider to split the two-digit number into tens and ones and click on Lock to lock the slider. Then multiply each part separately to find partial products. The board will help you visualize how breaking down numbers makes multiplication easier.'
  },
  {
    title: 'third',
    oneliner: 'Continue Tile Board Multiplication',
    description: 'Continue practicing with the multiplying tile board using new numbers. Split the two-digit number into tens and ones using the slider and then lock it, then find partial products. The visual board helps reinforce how breaking down numbers into parts makes multiplication more manageable.'
  },
  {
    title: 'fourth',
    oneliner: 'Master Tile Board Multiplication',
    description: 'Continue practicing with the multiplying tile board using new numbers. Split the two-digit number into tens and ones using the slider and then lock it, then find partial products. The visual board helps reinforce how breaking down numbers into parts makes multiplication more manageable.'
  },
  {
    title: 'fifth',
    oneliner: 'Begin Abstract Multiplication',
    description: 'Now try solving without the tile board! Apply what you learned about partial products in a more abstract way. Break down the two-digit number into tens and ones, multiply each part, and add the results. This helps transition from concrete visual aids to mental math strategies.'
  },
  {
    title: 'sixth',
    oneliner: 'Practice Abstract Multiplication',
    description: 'Continue practicing the partial products method abstractly with new numbers. Split the two-digit number into tens and ones, multiply each part, and combine the results. This reinforces your understanding of breaking down larger multiplication problems into simpler calculations.'
  }, 
  {
    title: 'seventh',
    oneliner: 'Advanced Multiplication Challenge',
    description: 'Take on a bigger challenge with larger numbers! Use the partial products strategy to break down this multiplication. Split the number into hundreds, tens, and ones, multiply each part, and add the results. This final exercise solidifies your mastery of the partial products method.'
  }
];

interface State1 {
  step: number;
  number1: number;
  number2: number;
}

interface State2 {
  step: number;
  number1: number;
  number2: number;
}

interface State3 {
  step: number;
  number1: number;
  number2: number;
} 

interface State4 {
  step: number;
  number1: number;
  number2: number;
}

interface State5 {
  step: number;
  number1: number;
  number2: number;
}

interface State6 {
  step: number;
  number1: number;
  number2: number;
}

interface State7 {
  step: number;
  number1: number;
  number2: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;  
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
  state6: State6;
  state7: State7;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    number1: 17,
    number2: 6
  },
  state2: {
    step: 0,
    number1: 17,
    number2: 6
  },
  state3: {
    step: 0,
    number1: 23,
    number2: 8
  },
  state4: {
    step: 0,
    number1: 19,
    number2: 5
  },
  state5: {
    step: 0,
    number1: 23,
    number2: 4
  },
  state6: {
    step: 0,
    number1: 54,
    number2: 7
  },
  state7: {
    step: 0,
    number1: 235,
    number2: 4
  }
};

