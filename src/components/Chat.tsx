'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistanceRequestMessage, useMessageContext } from './MessageContext'
import { useWebSocketLogger, WebSocketStatus } from './websocket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SpeechToText from './utils/speech_to_text'
import { Send } from 'lucide-react'
import { AudioContext } from './utils/audio_stream'
import { handleScreenshot } from './utils/screenshot'
import Message from './utils/Message'

interface ChatProps {
  desc: string;
  gameState: any;
  componentRef: React.RefObject<HTMLDivElement>;
}

const Chat: React.FC<ChatProps> = ({ desc, gameState, componentRef }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages } = useMessageContext();
  const { sendLog } = useWebSocketLogger();
  const [inputMessage, setInputMessage] = useState('');

  const handleRecordingStart = () => {}

  const handleRecordingStop = async (blob: Blob) => {
    sendLog(blob);
    sendLog({
      type: 'assistance',
      timestamp: new Date().toISOString(),
      content: '',
      image: await handleScreenshot(componentRef),
      desc,
      gameState: JSON.stringify(gameState, null, 0),
    } as AssistanceRequestMessage);
  };

  const onSendTextMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const image = await handleScreenshot(componentRef);
    const newMessage: AssistanceRequestMessage = {
      type: 'assistance',
      timestamp: new Date().toISOString(),
      content: inputMessage,
      isPlaying: false,
      messageId: crypto.randomUUID(),
      gameState: JSON.stringify(gameState, null, 0),
    };

    setMessages(prev => [...prev, newMessage]);
    sendLog({
      ...newMessage,
      image,
      desc,
    });
    setInputMessage('');
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;
    
    const scrollToBottom = () => {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: 'smooth'
      });
    };

    scrollToBottom();
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(scrollArea, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
        <WebSocketStatus />
      </div>
      
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <Message /> 
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendTextMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-xl"
          />
          <Button 
            onClick={onSendTextMessage}
            size="icon"
            className="rounded-2xl bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Send className="h-5 w-4" />
          </Button>
          <div className="relative w-1/2">
            <SpeechToText 
              onRecordingStart={handleRecordingStart} 
              onRecordingStop={handleRecordingStop}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat