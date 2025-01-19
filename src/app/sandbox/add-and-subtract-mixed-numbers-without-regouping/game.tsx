import FourthScreen from './screen/forth';
import ThirdScreen from './screen/third';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import { useGameState } from './state-utils';
import { prevStep, nextStep } from './utils/helper';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { GameScreen } from './game-state';

const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step4 } = gameStateRef.current.state4;

  return (
    <div className="flex justify-between mt-4"> 
      <Button className='m-2' onClick={() => prevStep(screen as GameScreen, setGameStateRef)}>Previous Step</Button>
      <div className="text-lg">
        <Select 
          value={screen.toString()} 
          onValueChange={(selectedScreen) => {
            setGameStateRef(prev => ({ ...prev, screen: parseInt(selectedScreen) }));
          }}
        >
          <SelectTrigger className="m-2">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">First Screen</SelectItem>
            <SelectItem value="2">Second Screen</SelectItem>
            <SelectItem value="3">Third Screen</SelectItem>
            <SelectItem value="4">Fourth Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {screen === 1 && <span>Step: {step1}</span>}
      {screen === 2 && <span>Step: {step2}</span>}
      <Button className='m-2' onClick={() => nextStep(screen as GameScreen, setGameStateRef)}>Next Step</Button>
    </div>
  );
};

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function MixedFractionGame({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;

  return (
    <div className="mx-auto game-container font-Jost">
      <DevHelper />
      {/* Game screens */}
      {screen === 1 && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 2 && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 3 && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 4 && <FourthScreen sendAdminMessage={sendAdminMessage} />}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          .font-Jost {
            font-family: 'Jost', sans-serif;
          }
        `}
      </style>



    </div>
  )
}