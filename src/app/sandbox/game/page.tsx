'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./game'), {
  ssr: false,
});

import { useGameState, GameStateProvider } from './state-utils';
import { useSandboxContext } from 'dist/src/components/sandbox';

console.error = () => {};

function LiorGameWrapper() {
  const { sendAdminMessage } = useSandboxContext();
  return <Game sendAdminMessage={sendAdminMessage} />;
}

function GameWrapper() {
  const { getDescription } = useGameState();
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`;

  return (
    <LiorGameProvider desc={getDescription?.()} wsUrl={wsUrl}>
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