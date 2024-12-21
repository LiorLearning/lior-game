import React, { useContext, useCallback, useMemo } from 'react';
import { MessageContext } from './MessageContext';
import { useWebSocketLogger } from './websocket';
const withEventLogging = (WrappedComponent) => {
    const WithEventLogging = (props) => {
        const messageContext = useContext(MessageContext);
        const { sendLog } = useWebSocketLogger();
        // Create a stable log message creator
        const createLogMessage = useCallback((event, target, value) => {
            return Object.assign({ messageId: crypto.randomUUID(), isPlaying: false, timestamp: new Date().toISOString(), componentName: WrappedComponent.displayName || WrappedComponent.name || 'UnnamedComponent', event, id: target.getAttribute('id') }, (value && { value }));
        }, []);
        // Helper function to create a LogMessage with type 'log'
        const createLogMessageWithLogType = (message) => (Object.assign(Object.assign({}, message), { type: 'log' }));
        // Memoize the event wrapper creators
        const wrapClickHandler = useCallback((handler) => {
            return (event) => {
                const logMessage = createLogMessageWithLogType(createLogMessage('click', event.currentTarget));
                // messageContext?.setMessages(prev => [...prev, logMessage]);
                sendLog(logMessage);
                handler === null || handler === void 0 ? void 0 : handler(event);
            };
        }, [messageContext, createLogMessage, sendLog]);
        const wrapChangeHandler = useCallback((handler) => {
            return (event) => {
                const logMessage = createLogMessageWithLogType(createLogMessage('change', event.currentTarget, event.currentTarget.value));
                // messageContext?.setMessages(prev => [...prev, logMessage]);
                sendLog(logMessage);
                handler === null || handler === void 0 ? void 0 : handler(event);
            };
        }, [messageContext, createLogMessage, sendLog]);
        // Memoize the wrapped handlers
        const wrappedHandlers = useMemo(() => {
            const newProps = {};
            Object.entries(props).forEach(([key, value]) => {
                if (typeof value === 'function') {
                    if (key.toLowerCase().includes('click')) {
                        newProps[key] = wrapClickHandler(value);
                    }
                    else if (key.toLowerCase().includes('change')) {
                        newProps[key] = wrapChangeHandler(value);
                    }
                    else {
                        newProps[key] = value;
                    }
                }
                else {
                    newProps[key] = value;
                }
            });
            return newProps;
        }, [props, wrapClickHandler, wrapChangeHandler]);
        return <WrappedComponent {...wrappedHandlers}/>;
    };
    // Optimize the display name for debugging
    WithEventLogging.displayName = `WithEventLogging(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    // No need for an additional React.memo here since we're already memoizing properly
    return WithEventLogging;
};
export default withEventLogging;
//# sourceMappingURL=EventLogger.jsx.map