export type GameScreen = 1 | 2;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Interactive marble shooting game to learn addition',
    description: 'This screen teaches addition through an engaging marble shooting game. Students start with green and blue marbles on separate platforms and use slingshots to shoot them into a central container. The container has a 10-marble limit, helping students understand the concept of making groups of 10. First, shoot all green marbles, then blue marbles. When the container fills with 10 marbles, students learn to break down the addition problem (e.g., 7+6) into an easier form (10+3). The visual representation and physical interaction helps students grasp how numbers combine and how breaking them into tens makes addition easier.'
  },
  {
    title: 2,
    oneliner: 'Practice addition by selecting and grouping marbles',
    description: 'This screen reinforces addition concepts through a marble selection activity. Students are presented with another addition problem and must select the correct number of green and blue marbles. After selection, they identify groups of 10 by clicking marbles to turn them black, visually representing the make-a-ten strategy. The remaining marbles are then counted to complete the addition. Students enter their final answer and receive immediate feedback. This screen helps solidify understanding of the make-a-ten strategy without the shooting mechanic, focusing purely on the mathematical concept.'
  }
]


export interface GameState1 {
  step: number;
  maxGreenMarbles: number;
  maxBlueMarbles: number;
}


export interface GameState2 {
  maxGreenMarbles: number;
  maxBlueMarbles: number;
}

export interface GameState {
  screen: GameScreen;
  state1: GameState1;
  state2: GameState2;
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    // Defines the game screen 1
    maxGreenMarbles: 5,
    maxBlueMarbles: 6,
    step: 0,
  },
  state2: {
    // Defines the game screen 2
    maxGreenMarbles: 7,
    maxBlueMarbles: 8,
  }
};