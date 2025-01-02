import React from 'react';
import * as Matter from 'matter-js';

export const desc = `Steps to Play the Addition Game:
1. You'll start with green and blue marbles on two platforms.
2. Shoot the green marbles first by clicking the "Shoot" button.
3. After shooting all green marbles, switch to blue marbles.
4. Your goal is to get all marbles into the central container.
5. Watch how the marbles combine to make 15!`;


export interface GameState {
  greenScore: number;
  blueScore: number;
  containerScore: number;
  activePhase: 'left' | 'right';
  leftContainerBalls: Matter.Body[];
  rightContainerBalls: Matter.Body[];
  platformsVisible: boolean;
  activeBallLeft: Matter.Body | null;
  activeBallRight: Matter.Body | null;
  clickDisabled: boolean;
  isGameComplete: boolean;
  sceneRef: React.RefObject<HTMLDivElement> | null;
  showEmptyButton: boolean;
  gameComplete: boolean;
  showAddButton: boolean;
}

export const initialGameState: GameState = {
  greenScore: 8,
  blueScore: 7,
  containerScore: 0,
  activePhase: 'left',
  leftContainerBalls: [],
  rightContainerBalls: [],
  platformsVisible: true,
  activeBallLeft: null,
  activeBallRight: null,
  clickDisabled: false,
  isGameComplete: false,
  sceneRef: null,
  showEmptyButton: false,
  gameComplete: false,
  showAddButton: false,
};