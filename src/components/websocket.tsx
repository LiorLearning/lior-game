import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { MessageContext, Message, useMessageContext } from './MessageContext';
import { WifiOff, Wifi } from 'lucide-react';
import { AudioContext } from './utils/audio_stream';

const SPEAKOUT = true;

type WebSocketContextType = {
  sendLog: (message: Message | Blob) => void;
  addToChat: (message: Message, onComplete?: () => void) => void;
  toggleAudio: (message: Message) => void;
  handleStopAudio: () => void;
  isConnected: boolean;
  reconnectWebSocket: () => void;
};

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketManagerProps {
  url: string;
  onConnectionChange: (isConnected: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  handlePlayAudio: (messageId: string, messageText: string, onComplete?: () => void) => void;
}

// WebSocket manager class to handle the connection and reconnection logic
class WebSocketManager {
  private ws: WebSocket | null = null;
  private queue: (Message | Blob)[] = [];
  private readonly url: string;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private onConnectionChange: (isConnected: boolean) => void;
  private setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  private audioContext: any = null;
  private handlePlayAudio: (messageId: string, messageText: string, onComplete?: () => void) => void;

  constructor({ url, onConnectionChange, setMessages, handlePlayAudio }: WebSocketManagerProps) {
    this.url = url;
    this.onConnectionChange = onConnectionChange;
    this.setMessages = setMessages;
    this.handlePlayAudio = handlePlayAudio;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.reconnectAttempts = 0;
      this.onConnectionChange(true);
      this.flushQueue();
      this.setMessages([]);
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.setMessages(prev => [...prev, message]);
      if (this.audioContext && SPEAKOUT && message.role == 'agent') {
        this.handlePlayAudio(message.messageId, message.content!);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.onConnectionChange(false);
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.log('WebSocket Error:', error);
      this.ws?.close();
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const backoffTime = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, backoffTime);
  }

  sendMessage(message: Message | Blob) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      if (message instanceof Blob) {
        this.ws.send(message);
      } else {
        this.ws.send(JSON.stringify(message));
      }
    } else {
      this.queue.push(message);
    }
  }

  private flushQueue() {
    while (this.queue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      const message = this.queue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  setAudioContext(audioContext: any) {
    this.audioContext = audioContext;
  }
}

interface WebSocketProviderProps {
  url: string;
  children: React.ReactNode;
}

// WebSocket Provider Component
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const wsRef = useRef<WebSocketManager | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const { setMessages, setIsPlaying } = useMessageContext();
  const audioContext = useContext(AudioContext);
  const currentMessageIdRef = useRef<string | null>(null);

  if (!audioContext) {
    throw new Error('MessageCard must be used within an AudioProvider');
  }

  const handleStopAudio = () => {
    setIsPlaying(currentMessageIdRef.current!, false);
    audioContext.stopAudio(currentMessageIdRef.current!);
    currentMessageIdRef.current = null;
  };

  const handlePlayAudio = (messageId: string, messageText: string, onComplete?: () => void) => {
    if (!messageText.trim()) {
      return;
    }

    handleStopAudio();

    // Update messages state immediately
    setIsPlaying(messageId, true);
    audioContext.playAudio(messageId, messageText, onComplete);
    currentMessageIdRef.current = messageId;
  };

  const toggleAudio = useCallback(async (message: Message) => {
    const isPlaying = message.isPlaying;

    setIsPlaying(message.messageId, !isPlaying);

    if (isPlaying || currentMessageIdRef.current) {
      handleStopAudio();
    } else {
      handlePlayAudio(message.messageId, message.content!);
    }
  }, []);

  const reconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current.connect();
    }
  }, []);

  useEffect(() => {
    wsRef.current = new WebSocketManager({ 
      url, 
      onConnectionChange: setIsConnected, 
      setMessages: setMessages,
      handlePlayAudio: handlePlayAudio
    });
    if (audioContext) {
      wsRef.current.setAudioContext(audioContext);
    }
    wsRef.current.connect();

    return () => {
      wsRef.current?.disconnect();
    };
  }, [url]);

  const sendLog = (message: Message | Blob) => {
    wsRef.current?.sendMessage(message);
  };

  const addToChat = (message: Message, onComplete?: () => void) => {
    setMessages(prevMessages => [...prevMessages, message]);
    if (message.content) {
      handlePlayAudio(message.messageId, message.content, onComplete);
    }
    wsRef.current?.sendMessage(message);
  };

  const contextValue = React.useMemo(() => ({
    sendLog,
    addToChat,
    toggleAudio,
    isConnected,
    reconnectWebSocket,
    handleStopAudio
  }), [sendLog, addToChat, toggleAudio, isConnected, reconnectWebSocket, handleStopAudio]);

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocketLogger = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketLogger must be used within a WebSocketProvider');
  }
  return context;
};

// Hook to connect MessageContext with WebSocket logging
export const useMessageLogger = () => {
  const { messages } = useContext(MessageContext) ?? {};
  const { sendLog } = useWebSocketLogger();
  
  useEffect(() => {
    if (messages?.length) {
      // Only send the latest message
      const latestMessage = messages[messages.length - 1];
      sendLog(latestMessage);
    }
  }, [messages]);
};

export const WebSocketStatus: React.FC = () => {
  const { isConnected } = useWebSocketLogger();
  
  return (
    <div className="p-2 rounded-full flex items-center justify-center">
      {isConnected ? <Wifi className="text-green-500" /> : <WifiOff className="text-red-500" />}
    </div>
  );
};