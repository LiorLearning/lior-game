'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import FractionsGame, { GameStateProvider } from './game/game';
import { useSandboxContext } from '@/components/sandbox';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameStateProvider>
        <LiorGameProvider>
          <FractionsGame sendAdminMessage={useSandboxContext().sendAdminMessage ?? ((role, content) => {})} />
        </LiorGameProvider>
      </GameStateProvider>
    </Suspense>
  )
}
