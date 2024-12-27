import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import Chat from "@/components/Chat";
import { useWebSocketLogger } from '@/components/websocket';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { AdminRequestMessage, AssistanceResponseMessage } from './MessageContext';
import { handleScreenshot } from './utils/screenshot';

// Create a context for the Sandbox component
const SandboxContext = createContext<{
  sendAdminMessage: (role: string, content: string) => Promise<void>;
}>({
  sendAdminMessage: () => Promise.resolve(),
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

  const sendAdminMessage = async (role: string, content: string) => {
    if (role === 'admin') {
      const adminMessage = {
        type: 'admin',
        timestamp: new Date().toISOString(),
        content: content,
        role: role,
        image: await handleScreenshot(componentRef),
        gameState: JSON.stringify(gameState, null, 0),
        desc: desc,
      } as AdminRequestMessage;
      sendLog(adminMessage);
    } else if (role === 'agent') {
      const agentMessage = {
        type: 'agent',
        timestamp: new Date().toISOString(),
        content: content,
        role: 'agent',
      } as AssistanceResponseMessage;
      addToChat(agentMessage);
    }
  };

    const handleReloadPage = () => {
      window.location.reload();
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
        <div className="flex h-screen">
          <div className="w-[75%] border-r-border flex flex-col" ref={componentRef}>
            <div className="relative h-full w-full">
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm"></div>
              </div>
              <div className="relative h-full w-full flex flex-col">
                <div className="p-2">
                  <Button 
                    variant="outline" 
                    onClick={handleReloadPage}
                    className="hover:bg-gray-100 text-foreground px-4 py-2 flex items-center gap-2"
                    title="Reload Page"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reload</span>
                  </Button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {isConnected ? (
                    children
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b p-4">
                      <h1 className="text-2xl font-bold mb-4 text-center">
                        Loading Game
                      </h1>
                      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[25%] min-w-[250px] flex flex-col">
            <Chat desc={desc} componentRef={componentRef} gameState={gameState}/>
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
