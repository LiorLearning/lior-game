import React, { ComponentType, MouseEventHandler, ChangeEventHandler, useContext, useCallback, useMemo } from 'react';
import { LogMessage, MessageContext } from './MessageContext';
import { useWebSocketLogger } from './websocket';

const withEventLogging = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithEventLogging: React.FC<P> = (props) => {
    const messageContext = useContext(MessageContext);
    const { sendLog } = useWebSocketLogger();
    
    // Create a stable log message creator
    const createLogMessage = useCallback((event: string, target: HTMLElement, value?: string) => {
      return {
        messageId: crypto.randomUUID(),
        isPlaying: false,
        timestamp: new Date().toISOString(),
        componentName: WrappedComponent.displayName || WrappedComponent.name || 'UnnamedComponent',
        event,
        id: target.getAttribute('id'),
        ...(value && { value })
      };
    }, []);

    // Helper function to create a LogMessage with type 'log'
    const createLogMessageWithLogType = (message: Omit<LogMessage, 'type'>): LogMessage => ({
      ...message,
      type: 'log'
    });

    // Memoize the event wrapper creators
    const wrapClickHandler = useCallback((handler?: MouseEventHandler) => {
      return (event: React.MouseEvent) => {
        const logMessage = createLogMessageWithLogType(createLogMessage('click', event.currentTarget as HTMLElement));
        // messageContext?.setMessages(prev => [...prev, logMessage]);
        sendLog(logMessage);
        handler?.(event);
      };
    }, [messageContext, createLogMessage, sendLog]);

    const wrapChangeHandler = useCallback((handler?: ChangeEventHandler) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const logMessage = createLogMessageWithLogType(createLogMessage('change', event.currentTarget, event.currentTarget.value));
        // messageContext?.setMessages(prev => [...prev, logMessage]);
        sendLog(logMessage);
        handler?.(event);
      };
    }, [messageContext, createLogMessage, sendLog]);

    // Memoize the wrapped handlers
    const wrappedHandlers = useMemo(() => {
      const newProps: { [key: string]: any } = {};
      
      Object.entries(props).forEach(([key, value]) => {
        if (typeof value === 'function') {
          if (key.toLowerCase().includes('click')) {
            newProps[key] = wrapClickHandler(value as MouseEventHandler);
          } else if (key.toLowerCase().includes('change')) {
            newProps[key] = wrapChangeHandler(value as ChangeEventHandler);
          } else {
            newProps[key] = value;
          }
        } else {
          newProps[key] = value;
        }
      });

      return newProps;
    }, [props, wrapClickHandler, wrapChangeHandler]);

    return <WrappedComponent {...(wrappedHandlers as P)} />;
  };

  // Optimize the display name for debugging
  WithEventLogging.displayName = `WithEventLogging(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  // No need for an additional React.memo here since we're already memoizing properly
  return WithEventLogging;
};

export default withEventLogging;