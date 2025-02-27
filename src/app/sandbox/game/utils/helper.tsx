import { Button } from '@/components/custom_ui/button';
import { GameScreen, GameState } from '../game-state';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGameState } from '../state-utils';
import { Input } from '@/components/custom_ui/input';
import { useState } from 'react';

export const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  const { step: step4 } = gameStateRef.current.state4;
  const { step: step5 } = gameStateRef.current.state5;
  const { step: step6 } = gameStateRef.current.state6;
  const { step: step7 } = gameStateRef.current.state7;
  const [directStep, setDirectStep] = useState('');

  const getCurrentStep = () => {
    switch(screen) {
      case 'first': return step1;
      case 'second': return step2;
      case 'third': return step3;
      case 'fourth': return step4;
      case 'fifth': return step5;
      case 'sixth': return step6;
      case 'seventh': return step7;
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
    <div className="flex items-center justify-between my-2">
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
            <SelectItem value="fourth">Fourth Screen</SelectItem>
            <SelectItem value="fifth">Fifth Screen</SelectItem>
            <SelectItem value="sixth">Sixth Screen</SelectItem>
            <SelectItem value="seventh">Seventh Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center">
        <Input 
          type="number" 
          onChange={(e) => setDirectStep(e.target.value)}
          className="w-16 mr-2 border-2 border-gray-300 rounded-md text-center"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleDirectStepChange();
            }
          }}
          placeholder="Step"
        />
        <Button onClick={handleDirectStepChange}>Go to Step</Button>
      </div>
      <div className="text-center">Current Step: {getCurrentStep()}</div>
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
  } 
  else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  } 
  else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: prev.state3.step + 1 } }));
  } 
  else if(screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: prev.state4.step + 1 } }));
  }
  else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: prev.state5.step + 1 } }));
  }
  else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: prev.state6.step + 1 } }));
  }
  else if (screen === 'seventh') {
    setGameStateRef(prev => ({ ...prev, state7: { ...prev.state7, step: prev.state7.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step } }));
  } 
  else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step } }));
  } 
  else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step } }));
  } 
  else if(screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step } }));
  }
  else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step } }));
  }
  else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step } }));
  }
  else if (screen === 'seventh') {
    setGameStateRef(prev => ({ ...prev, state7: { ...prev.state7, step } }));
  }
}

export const goToScreen = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  setGameStateRef(prev => ({ ...prev, screen }));
}

export const prevStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } 
  else if (screen === 'second') {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  } 
  else if (screen === 'third') {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: Math.max(prev.state3.step - 1, 0) } }));
  } 
  else if(screen === 'fourth') {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: Math.max(prev.state4.step - 1, 0) } }));
  } 
  else if (screen === 'fifth') {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: Math.max(prev.state5.step - 1, 0) } }));
  }
  else if (screen === 'sixth') {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: Math.max(prev.state6.step - 1, 0) } }));
  } 
  else if (screen === 'seventh') {
    setGameStateRef(prev => ({ ...prev, state7: { ...prev.state7, step: Math.max(prev.state7.step - 1, 0) } }));
  }
}
