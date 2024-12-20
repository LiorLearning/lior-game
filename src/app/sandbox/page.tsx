'use client'

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { LiorGameProvider } from '@/components/lior-game-provider';

const SandboxPage = dynamic(() => import('./sandbox'), { 
  ssr: false 
});

export default function Page() {
  return (
    <LiorGameProvider>
        <Suspense fallback={<div>Loading...</div>}>
            <SandboxPage /> 
        </Suspense>
    </LiorGameProvider>
  )
}