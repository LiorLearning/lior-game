const MAX_GREEN_MARBLES = 5;
const MAX_BLUE_MARBLES = 6;
const MAX_BLACK_MARBLES = 10;

export const desc = `
Addition Game: Interactive Marble Counting Adventure

Game Overview:
This interactive game helps you learn addition by physically moving and combining marbles across two platforms.

Detailed Gameplay:

Platform Setup
- You start with ${MAX_GREEN_MARBLES} green marbles on the left platform
- You have ${MAX_BLUE_MARBLES} blue marbles on the right platform
- Total marbles: ${MAX_GREEN_MARBLES + MAX_BLUE_MARBLES} (${MAX_GREEN_MARBLES} green + ${MAX_BLUE_MARBLES} blue)

Shooting Marbles
1. Begin by shooting green marbles into the central container
   - Click the "Shoot" button to launch green marbles
   - Aim to move all green marbles from the left platform
2. After green marbles are depleted, switch to blue marbles
   - Click the "Shoot" button to launch blue marbles
   - Move all blue marbles from the right platform

Goal
- Successfully transfer ALL ${MAX_GREEN_MARBLES + MAX_BLUE_MARBLES} marbles into the central container
- Visualize how ${MAX_GREEN_MARBLES} + ${MAX_BLUE_MARBLES} combines to make ${MAX_GREEN_MARBLES + MAX_BLUE_MARBLES}
- Learn addition through a hands-on, interactive experience

Learning Objectives:
- Understand addition as combining groups of objects
- Develop spatial reasoning skills
- Practice counting and tracking marbles
`;

export type GameScreen = 'first' | 'second';

export interface GameState1 {
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
  greenMarblesCount: number;
  blueMarblesCount: number;
  blackMarblesCount: number;
  showFinalAnswer: boolean;
}

export interface GameState {
  screen: GameScreen;
  maxGreenMarbles: number;
  maxBlueMarbles: number;
  maxBlackMarbles: number;
  state1: GameState1;
  state2: GameState2;
}

export const initialGameState: GameState = {
  screen: 'first',
  maxGreenMarbles: MAX_GREEN_MARBLES,
  maxBlueMarbles: MAX_BLUE_MARBLES,
  maxBlackMarbles: MAX_BLACK_MARBLES,
  state1: {
    greenScore: MAX_GREEN_MARBLES,
    blueScore: MAX_BLUE_MARBLES,
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
    greenMarblesCount: 0,
    blueMarblesCount: 0,
    blackMarblesCount: 0,
    showFinalAnswer: false,
  }
};