import { Button } from '@/components/custom_ui/button';
import { GameScreen, GameState } from '../game-state';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGameState } from '../state-utils';
import { Input } from '@/components/custom_ui/input';
import { useState } from 'react';
import { COLORS } from './types';
export const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  const [directStep, setDirectStep] = useState('');

  const getCurrentStep = () => {
    switch(screen) {
      case 'first': return step1;
      case 'second': return step2;
      case 'third': return step3;
      default: return 0;
    }
  }

  const handleDirectStepChange = () => {
    const stepNumber = parseInt(directStep);
    if (!isNaN(stepNumber)) {
      goToStep(screen, setGameStateRef, stepNumber);
    }
  }

  return (
    <div className="flex justify-between mt-4">
      <Button className='m-2' onClick={() => prevStep(screen, setGameStateRef)}>Previous Step</Button>
      <div className="text-lg">
        <Select 
          value={screen} 
          onValueChange={(selectedScreen) => {
            setGameStateRef(prev => ({ ...prev, screen: selectedScreen as GameScreen }));
          }}
        >
          <SelectTrigger className="m-2">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Screen</SelectItem>
            <SelectItem value="second">Second Screen</SelectItem>
            <SelectItem value="third">Third Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center">
        <Input 
          type="number" 
          value={directStep} 
          onChange={(e) => setDirectStep(e.target.value)}
          className="w-16 mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleDirectStepChange();
            }
          }}
          placeholder="Step"
        />
        <Button onClick={handleDirectStepChange}>Go to Step</Button>
      </div>
      <Button className='m-2' onClick={() => nextStep(screen, setGameStateRef)}>Next Step</Button>
    </div>
  );
};

export const nextStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step } }));
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
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  }
}


export const NOT_ATTEMPTED = 'not_attempted';
export const ATTEMPTED = 'attempted';
export const CORRECT = 'correct';
export const INCORRECT = 'incorrect';

export const getState = (input: string, actual: string) => {
  console.log(input, actual);
  console.log("Length", input.length, actual.length);
  if (input !== '') {
    if (input.length >= actual.length) {
      if (input === actual) {
        return CORRECT;
      } else {
        return INCORRECT;
      }        
    } else {
      return ATTEMPTED
    }
  }
  
  return NOT_ATTEMPTED;
}

export const getInputColor = (input: string, actual: string) => {
  console.log(input, actual);
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