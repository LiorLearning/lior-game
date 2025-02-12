import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import Chat from "@/components/Chat";
import { useWebSocketLogger } from '@/components/websocket';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { AdminRequestMessage, AssistanceResponseMessage } from './MessageContext';
import { handleScreenshot } from './utils/screenshot';

// Create a context for the Sandbox component
const SandboxContext = createContext<{
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;  
}>({
  sendAdminMessage: () => Promise.resolve(''),
});

// Create a provider component for the Sandbox
export const SandboxProvider: React.FC<{ 
  children: ReactNode,
  gameState: any,
  desc: string,
}> = ({ children, gameState, desc }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const setComponentRef = (ref: React.RefObject<HTMLDivElement>) => {
    componentRef.current = ref.current;
  };
  const { isConnected, sendLog, addToChat } = useWebSocketLogger()

  const sendAdminMessage = async (role: string, content: string, onComplete?: () => void) : Promise<string> => {
    const messageId = crypto.randomUUID();

    if (role === 'admin') {
      const adminMessage = {
        messageId: messageId,
        type: 'admin',
        timestamp: new Date().toISOString(),
        content: content,
        role: role,
        image: await handleScreenshot(componentRef),
        gameState: JSON.stringify(gameState, null, 0),
        desc: desc,
      } as AdminRequestMessage;
      sendLog(adminMessage);
      onComplete?.();
    } else if (role === 'agent') {
      const agentMessage = {
        messageId: messageId,
        type: 'agent',
        timestamp: new Date().toISOString(),
        content: content,
        role: 'agent',
      } as AssistanceResponseMessage;
      addToChat(agentMessage, onComplete);
    }
    
    return messageId;
  };

  useEffect(() => {
    const updatePageContent = async () => {
      if (componentRef.current) {
        setComponentRef(componentRef);
      }
    };

    const observer = new MutationObserver(updatePageContent);
    
    if (componentRef.current) {
      observer.observe(componentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    updatePageContent();

    return () => observer.disconnect();
  }, []);

  return (
    <SandboxContext.Provider value={{ sendAdminMessage }}>
      <div className="flex h-full">
        <div className="w-[25%] min-w-[250px] flex flex-col border-r border-gray-200 fixed left-0 top-0 h-full">
          <Chat desc={desc} componentRef={componentRef} gameState={gameState}/>
        </div>
        <div className="w-[75%] border-r-border flex flex-col overflow-auto fixed right-0 top-0 h-full" ref={componentRef}>
          <div className="relative h-full w-full overflow-y-auto">
            {isConnected ? (
              <div className="w-full h-full">
                {children}
              </div> 
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b p-4">
                <h1 className="text-md font-bold mb-4 text-center">
                  Loading Game
                </h1>
                <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SandboxContext.Provider>
  )
}

export const useSandboxContext = () => {
  const context = useContext(SandboxContext);
  if (context === undefined) {
    throw new Error('useSandboxContext must be used within a SandboxProvider');
  }
  return context;
};
