'use client';

import { Card } from "@/components/custom_ui/card";
import { FirstScreen } from './FirstScreen';
import { SecondScreen } from './SecondScreen';
import { ThirdScreen } from './ThirdScreen';
import { useGameState } from './state-utils';

export const desc = `Steps to Play the Game:
1. Break the first chocolate bar by clicking the "Split" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Split" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Compare the selected pieces from both bars to determine which fraction is larger.`;

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef } = useGameState();
  const { currentScreen } = gameStateRef.current;

  return (
    <Card className="h-full w-full p-8 bg-gradient-to-br bg-[#FFF8EE] shadow-2xl">
      <div className="w-full max-w-7xl mx-auto">
        {currentScreen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
        {currentScreen === 'second1' && <SecondScreen />}
        {currentScreen === 'second2' && <SecondScreen />}
        {currentScreen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      </div>
    </Card>
  );
}
