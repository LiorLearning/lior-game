'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistanceRequestMessage, useMessageContext } from './MessageContext'
import { useWebSocketLogger, WebSocketStatus } from './websocket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SpeechToText from './utils/speech_to_text'
import { Send } from 'lucide-react'
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
  const { sendLog, handleStopAudio } = useWebSocketLogger();
  const [inputMessage, setInputMessage] = useState('');

  const handleRecordingStart = () => {
    handleStopAudio();
  }

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
    // Find the scrollable viewport element
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollArea) return;
    
    const scrollToBottom = () => {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: 'smooth'
      });
    };

    // Initial scroll
    scrollToBottom();

    // Create observer for new messages
    const observer = new MutationObserver(() => {
      // Add a small delay to ensure content is rendered
      setTimeout(scrollToBottom, 100);
    });
    
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
          <div className="relative w-2/3">
            <Input 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSendTextMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl pr-10 py-4 h-12"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={onSendTextMessage}
              disabled={!inputMessage.trim()}
            >
              <Send className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <div className="relative w-1/3">
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