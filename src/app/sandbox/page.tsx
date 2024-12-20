'use client'

import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import FractionsGame from './game/game';
import { SandboxProvider, useSandboxContext } from '@/components/sandbox';

export default function Page() {
  return (
    <LiorGameProvider>
      <SandboxProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <FractionsGame sendAdminMessage={useSandboxContext().sendAdminMessage ?? ((role, content) => {})} />
        </Suspense>
      </SandboxProvider>
    </LiorGameProvider>
  )
}
