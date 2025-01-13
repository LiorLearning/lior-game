import { GameScreen, GameState } from '../game-state';
import { COLORS } from './types';


export const nextStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  } else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: prev.state3.step + 1 } }));
  } else if (screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: prev.state4.step + 1 } }));
  } else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: prev.state5.step + 1 } }));
  } else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: prev.state6.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: step } }));
  } else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: step } }));
  } else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: step } }));
  } else if (screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: step } }));
  } else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: step } }));
  } else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: step } }));
  }
}

export const goToScreen = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
) => {
  setGameStateRef(prev => ({ ...prev, screen }));
}

export const prevStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  } else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: Math.max(prev.state3.step - 1, 0) } }));
  } else if (screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: Math.max(prev.state4.step - 1, 0) } }));
  } else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: Math.max(prev.state5.step - 1, 0) } }));
  } else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: Math.max(prev.state6.step - 1, 0) } }));
  }
}

export const NOT_ATTEMPTED = 'not_attempted';
export const ATTEMPTED = 'attempted';
export const CORRECT = 'correct';
export const INCORRECT = 'incorrect';

export const getState = (input: string, actual: string) => {
  if (input === '') {
    return NOT_ATTEMPTED;
  } else {
    if (input.length === actual.length) {
      if (input === actual) {
        return CORRECT;
      } else {
        return INCORRECT;
      }
    } else if (input.length > actual.length) {
      return INCORRECT;
    }
  }
  return ATTEMPTED;
}

export const getInputColor = (input: string, actual: string) => {
  const state = getState(input, actual);
  if (state === NOT_ATTEMPTED) {
    return COLORS.white;
  } else if (state === CORRECT) {
    return COLORS.light2Green;
  } else if (state === INCORRECT) {
    return COLORS.lightRed;
  }
  return COLORS.white;
}