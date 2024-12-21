import React, { createContext, useContext, ReactNode } from 'react';
import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import { SandboxProvider } from './sandbox';

export const LiorGameContext = createContext<{} | undefined>(undefined);

export const LiorGameProvider: React.FC<{ 
  children: ReactNode,
  wsUrl?: string,
  gameState: any,
  desc: string
}> = ({ 
  children, 
  wsUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws`,
  gameState,
  desc
}) => {
  return (
    <MessageProvider>
      <WebSocketProvider url={wsUrl}>
          <SandboxProvider gameState={gameState} desc={desc}>
            {children}
          </SandboxProvider>
      </WebSocketProvider>
    </MessageProvider>
  );
};

export const useLiorGame = () => {
  const context = useContext(LiorGameContext);
  if (context === undefined) {
    throw new Error('useLiorGame must be used within a LiorGameProvider');
  }
  return context;
};
