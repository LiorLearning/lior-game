export type GameScreen = 'first' | 'second';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'First screen',
    description: 'First screen description'
  },
  {
    title: 'second',
    oneliner: 'Second screen',
    description: 'Second screen description'
  }
]

interface State1 {
  step: number;
  variable: number;
}

interface State2 {
  step: number;
  variable: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    variable: 0,
  },
  state2: {
    step: 0,
    variable: 0,
  },
};
