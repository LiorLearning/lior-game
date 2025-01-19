export const desc = `
Addition Game: Interactive Marble Counting Adventure

Game Overview:
This interactive game helps you learn addition by physically moving and combining marbles across two platforms.

Detailed Gameplay:

Platform Setup
- You start with maxGreenMarbles green marbles on the left platform
- You have maxBlueMarbles blue marbles on the right platform
- Total marbles: maxGreenMarbles + maxBlueMarbles (maxGreenMarbles green + maxBlueMarbles blue)

Shooting Marbles
1. Begin by shooting green marbles into the central container
   - Click the "Shoot" button to launch green marbles
   - Aim to move all green marbles from the left platform
2. After green marbles are depleted, switch to blue marbles
   - Click the "Shoot" button to launch blue marbles
   - Move all blue marbles from the right platform

Goal
- Successfully transfer ALL maxGreenMarbles + maxBlueMarbles marbles into the central container
- Visualize how maxGreenMarbles + maxBlueMarbles combines to make maxGreenMarbles + maxBlueMarbles
- Learn addition through a hands-on, interactive experience

Learning Objectives:
- Understand addition as combining groups of objects
- Develop spatial reasoning skills
- Practice counting and tracking marbles
`;

export type GameScreen = 'first' | 'second';

export interface GameState1 {
  maxGreenMarbles: number;
  maxBlueMarbles: number;
  maxBlackMarbles: number;
  greenScore: number;
  blueScore: number;
  blackScore: number;
  containerScore: number;
  activePhase: 'left' | 'right';
  currentStep: number;
  finalAnswer: number;
  clickDisabled: boolean;
  showAddButton: boolean;
  additionStarted?: boolean;
}


export interface GameState2 {
  maxGreenMarbles: number;
  maxBlueMarbles: number;
  maxBlackMarbles: number;
  greenMarblesCount: number;
  blueMarblesCount: number;
  blackMarblesCount: number;
  showFinalAnswer: boolean;
}

export interface GameState {
  screen: GameScreen;
  state1: GameState1;
  state2: GameState2;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    // Defines the game screen 1
    maxGreenMarbles: 5,
    maxBlueMarbles: 6,
    greenScore: 5, // = maxGreenMarbles
    blueScore: 6, // = maxBlueMarbles
    
    // Do not change anything beyond this
    maxBlackMarbles: 10,
    blackScore: 0,
    containerScore: 0,
    activePhase: 'left',
    clickDisabled: false,
    currentStep: 0,
    finalAnswer: 0,
    showAddButton: false,
    additionStarted: false
  },
  state2: {
    // Defines the game screen 2
    maxGreenMarbles: 7,
    maxBlueMarbles: 8,
    
    // Do not change anything beyond this
    maxBlackMarbles: 10,
    greenMarblesCount: 0,
    blueMarblesCount: 0,
    blackMarblesCount: 0,
    showFinalAnswer: false,
  }
};