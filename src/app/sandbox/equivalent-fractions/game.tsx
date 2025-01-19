
import { useGameState } from './state-utils';
import { prevStep, nextStep } from './utils/helper';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import Level0 from './screen/zero';
import Level1 from './screen/first';
import Level2 from './screen/second';
import Level3 from './screen/three';
import Level4 from './screen/four';

const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen1;

  return (
    <div className="flex justify-between mt-4">
      <Button className='m-2' onClick={() => prevStep(step.id, setGameStateRef)}>Previous Step</Button>
      <Select onValueChange={(value) => setGameStateRef({ level: parseInt(value) })}>
        <SelectTrigger>
          <SelectValue placeholder="Select Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Level 0</SelectItem>
          <SelectItem value="1">Level 1</SelectItem>
          <SelectItem value="2">Level 2</SelectItem>
          <SelectItem value="3">Level 3</SelectItem>
          <SelectItem value="4">Level 4</SelectItem>
        </SelectContent>
      </Select>
      <Button className='m-2' onClick={() => nextStep(step.id, setGameStateRef)}>Next Step</Button>
    </div>
  );
};

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function EquivalentFractionsGame({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { level } = gameStateRef.current;

  return (
    <div className="mx-auto game-container font-Jost font-medium">
      <DevHelper />
      {level === 0 && <Level0 sendAdminMessage={sendAdminMessage} />}
      {level === 1 && <Level1 sendAdminMessage={sendAdminMessage} />}
      {level === 2 && <Level2 sendAdminMessage={sendAdminMessage} />}
      {level === 3 && <Level3 sendAdminMessage={sendAdminMessage} />}
      {level === 4 && <Level4 sendAdminMessage={sendAdminMessage} />}

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