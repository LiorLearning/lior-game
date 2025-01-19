import { GameScreen, GameState } from '../game-state';


export const nextStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: prev.state3.step + 1 } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: prev.state4.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: step } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: step } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: step } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: step } }));
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
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: Math.max(prev.state3.step - 1, 0) } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: Math.max(prev.state4.step - 1, 0) } }));
  }
}
