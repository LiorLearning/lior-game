import React from 'react';
import { Message } from './MessageContext';
type WebSocketContextType = {
    sendLog: (message: Message | Blob) => void;
    addToChat: (message: Message) => void;
    toggleAudio: (message: Message) => void;
    isConnected: boolean;
};
interface WebSocketProviderProps {
    url: string;
    children: React.ReactNode;
}
export declare const WebSocketProvider: React.FC<WebSocketProviderProps>;
export declare const useWebSocketLogger: () => WebSocketContextType;
export declare const useMessageLogger: () => void;
export declare const WebSocketStatus: React.FC;
export {};
