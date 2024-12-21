'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import FractionsGame, { desc, GameStateProvider, useGameState } from './game/game';
import { useSandboxContext } from '@/components/sandbox';

function GameWrapper() {
  const { gameState } = useGameState();
  const { sendAdminMessage } = useSandboxContext();

  return (
    <LiorGameProvider gameState={gameState ?? {}} desc={desc}>
      <FractionsGame sendAdminMessage={sendAdminMessage ?? ((role, content) => {})} />
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