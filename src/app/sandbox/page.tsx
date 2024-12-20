'use client'

import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GameStateProvider } from './game/game';

const SandboxPage = dynamic(() => import('./sandbox'), { 
  ssr: false 
});

export default function Page() {
  return (
    <MessageProvider>
        <WebSocketProvider url={`${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`}>
            <Suspense fallback={<div>Loading...</div>}>
                <GameStateProvider>
                    <SandboxPage /> ``
                </GameStateProvider>
            </Suspense>
        </WebSocketProvider>
    </MessageProvider>
  )
}