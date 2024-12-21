import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { MessageContext } from './MessageContext';
import { WifiOff, Wifi } from 'lucide-react';
import { AudioContext } from './utils/audio_stream';
const SPEAKOUT = true;
// Create the WebSocket context
const WebSocketContext = createContext(null);
// WebSocket manager class to handle the connection and reconnection logic
class WebSocketManager {
    constructor({ url, onConnectionChange, setMessages, handlePlayAudio }) {
        this.ws = null;
        this.queue = [];
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectTimeout = null;
        this.audioContext = null;
        this.url = url;
        this.onConnectionChange = onConnectionChange;
        this.setMessages = setMessages;
        this.handlePlayAudio = handlePlayAudio;
    }
    connect() {
        var _a;
        if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN)
            return;
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
            console.log('WebSocket Message Received:', message.content);
            this.setMessages(prev => [...prev, message]);
            if (this.audioContext && SPEAKOUT && message.role == 'agent') {
                this.handlePlayAudio(message.messageId, message.content);
            }
        };
        this.ws.onclose = () => {
            console.log('WebSocket Disconnected');
            this.onConnectionChange(false);
            this.attemptReconnect();
        };
        this.ws.onerror = (error) => {
            var _a;
            console.log('WebSocket Error:', error);
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
        };
    }
    attemptReconnect() {
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
    sendMessage(message) {
        var _a;
        if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
            if (message instanceof Blob) {
                console.log("Message(audio): ", message);
                this.ws.send(message);
            }
            else {
                this.ws.send(JSON.stringify(message));
            }
        }
        else {
            this.queue.push(message);
        }
    }
    flushQueue() {
        var _a;
        while (this.queue.length > 0 && ((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
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
    setAudioContext(audioContext) {
        this.audioContext = audioContext;
    }
}
// WebSocket Provider Component
export const WebSocketProvider = ({ url, children }) => {
    const wsRef = useRef(null);
    const [isConnected, setIsConnected] = React.useState(false);
    const messageContext = useContext(MessageContext);
    const audioContext = useContext(AudioContext);
    if (!audioContext) {
        throw new Error('MessageCard must be used within an AudioProvider');
    }
    const handleStopAudio = (message) => {
        audioContext.stopAudio(message.messageId);
    };
    const handlePlayAudio = (messageId, messageText) => {
        if (!messageText.trim()) {
            return;
        }
        // Update messages state immediately
        messageContext === null || messageContext === void 0 ? void 0 : messageContext.setMessages(prevMessages => prevMessages.map(msg => msg.messageId === messageId
            ? Object.assign(Object.assign({}, msg), { isPlaying: true }) : Object.assign(Object.assign({}, msg), { isPlaying: false })));
        audioContext.playAudio(messageId, messageText);
    };
    const toggleAudio = useCallback(async (message) => {
        const isPlaying = message.isPlaying;
        console.log(`${isPlaying ? 'Pausing' : 'Playing'} audio for message ID:`, message.messageId);
        messageContext === null || messageContext === void 0 ? void 0 : messageContext.setMessages(prevMessages => prevMessages.map(msg => msg.messageId === message.messageId
            ? Object.assign(Object.assign({}, msg), { isPlaying: !isPlaying }) : msg));
        if (isPlaying) {
            handleStopAudio(message);
        }
        else {
            handlePlayAudio(message.messageId, message.content);
        }
    }, []);
    useEffect(() => {
        if (messageContext) {
            wsRef.current = new WebSocketManager({
                url,
                onConnectionChange: setIsConnected,
                setMessages: messageContext.setMessages,
                handlePlayAudio: handlePlayAudio
            });
            if (audioContext) {
                wsRef.current.setAudioContext(audioContext);
            }
            wsRef.current.connect();
        }
        return () => {
            var _a;
            (_a = wsRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, [url]);
    const sendLog = (message) => {
        var _a;
        (_a = wsRef.current) === null || _a === void 0 ? void 0 : _a.sendMessage(message);
    };
    const addToChat = (message) => {
        if (SPEAKOUT) {
            handlePlayAudio(message.messageId, message.content);
        }
        if (messageContext) {
            messageContext.setMessages(prev => [...prev, message]);
        }
    };
    const contextValue = React.useMemo(() => ({
        sendLog,
        addToChat,
        toggleAudio,
        isConnected
    }), [sendLog, addToChat, toggleAudio, isConnected]);
    return (<WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>);
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
    var _a;
    const { messages } = (_a = useContext(MessageContext)) !== null && _a !== void 0 ? _a : {};
    const { sendLog } = useWebSocketLogger();
    useEffect(() => {
        if (messages === null || messages === void 0 ? void 0 : messages.length) {
            // Only send the latest message
            const latestMessage = messages[messages.length - 1];
            sendLog(latestMessage);
        }
    }, [messages]);
};
export const WebSocketStatus = () => {
    const { isConnected } = useWebSocketLogger();
    return (<div className="p-2 rounded-full flex items-center justify-center">
      {isConnected ? <Wifi className="text-green-500"/> : <WifiOff className="text-red-500"/>}
    </div>);
};
// TODO: Batch send in websocket
//# sourceMappingURL=websocket.jsx.map