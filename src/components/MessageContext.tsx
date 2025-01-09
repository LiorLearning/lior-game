import React, { createContext, useContext, useState } from 'react';
import { AudioProvider } from './utils/audio_stream';

export interface BaseMessage {
  messageId: string;
  isPlaying: boolean;
  timestamp: string;
  content?: string;
  type: 'log' | 'assistance' | 'agent' | 'admin';
}

export interface LogMessage extends BaseMessage {
  type: 'log';
  componentName: string;
  event: string;
  id: string | null;
  value?: string;
}

export interface AssistanceRequestMessage extends BaseMessage {
  type: 'assistance';
  image?: string | null;
  desc?: string;
  gameState?: string;
}

export interface AssistanceResponseMessage extends BaseMessage {
  type: 'agent';
  role: string;
}

export interface AdminRequestMessage extends BaseMessage {
  type: 'admin';
  role: string;
  image?: string | null;
  desc?: string;
  gameState?: string;
}

export type Message = LogMessage | AssistanceRequestMessage | AssistanceResponseMessage | AdminRequestMessage;

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsPlaying: (messageId: string, isPlaying: boolean) => void;
};

export const MessageContext = createContext<MessageContextType | null>(null);

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const setIsPlaying = (messageId: string, isPlaying: boolean) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.messageId === messageId ? 
          { ...msg, isPlaying } : 
          { ...msg, isPlaying: false }
      )
    );
  }

  return (
    <MessageContext.Provider value={{ messages, setMessages, setIsPlaying }}>
      <AudioProvider clientId="12345" setIsPlaying={setIsPlaying}>
        {children}
      </AudioProvider>
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};

export { MessageProvider };