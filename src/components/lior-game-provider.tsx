import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import { SandboxProvider } from './sandbox';

export const LiorGameContext = createContext<{} | undefined>(undefined);

function keepAlive() {
  const intervalId = setInterval(() => {
    console.log('pinging self');
    fetch(window.location.href)
  }, 300_000); // 5 minutes
  return () => clearInterval(intervalId);
}

export const LiorGameProvider: React.FC<{ 
  children: ReactNode,
  wsUrl: string,
  gameState?: any,
  desc?: string
}> = ({ 
  children, 
  wsUrl,
  gameState,
  desc
}) => {

  useEffect(() => {
    const cleanup = keepAlive();
    return cleanup;
  }, []);

  return (
    <MessageProvider>
      <WebSocketProvider url={wsUrl}>
        <SandboxProvider gameState={gameState ?? {}} desc={desc ?? ''}>
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
