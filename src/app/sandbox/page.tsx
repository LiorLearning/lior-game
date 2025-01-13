'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import Game from './common-denominators/game';
import { useSandboxContext } from '@/components/sandbox';
import { GameStateProvider, useGameState } from './common-denominators/state-utils';
import { desc } from './common-denominators/game-state';

function LiorGameWrapper() {
  const { sendAdminMessage } = useSandboxContext();
  return <Game sendAdminMessage={sendAdminMessage} />;
}

function GameWrapper() {
  const { gameStateRef } = useGameState();
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`;
  return (
    <LiorGameProvider gameState={gameStateRef.current ?? {}} desc={desc} wsUrl={wsUrl}>
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