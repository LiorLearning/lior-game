import React, { createContext, useContext } from 'react';
import { MessageProvider } from '@/components/MessageContext';
import { WebSocketProvider } from '@/components/websocket';
import { GameStateProvider } from '@/app/sandbox/game/game';
import { SandboxProvider } from './sandbox';
export const LiorGameContext = createContext(undefined);
export const LiorGameProvider = ({ children, wsUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL}/superartifacts/ws` }) => {
    return (<MessageProvider>
      <WebSocketProvider url={wsUrl}>
        <GameStateProvider>
          <SandboxProvider>
            {children}
          </SandboxProvider>
        </GameStateProvider>
      </WebSocketProvider>
    </MessageProvider>);
};
export const useLiorGame = () => {
    const context = useContext(LiorGameContext);
    if (context === undefined) {
        throw new Error('useLiorGame must be used within a LiorGameProvider');
    }
    return context;
};
//# sourceMappingURL=lior-game-provider.jsx.map