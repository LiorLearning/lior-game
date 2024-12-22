'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import FractionsGame, { desc, GameStateProvider, useGameState } from './game/game';
import { useSandboxContext } from '@/components/sandbox';

function LiorGameWrapper() {
  const { sendAdminMessage } = useSandboxContext();
  return <FractionsGame sendAdminMessage={sendAdminMessage} />;
}

function GameWrapper() {
  const { gameState } = useGameState();

  return (
    <LiorGameProvider gameState={gameState ?? {}} desc={desc}>
      <LiorGameWrapper />
    </LiorGameProvider>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameStateProvider>
        <GameWrapper />
      </GameStateProvider>
    </Suspense>
  )
}