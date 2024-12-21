import React, { createContext, useState } from 'react';
import { AudioProvider } from './utils/audio_stream';
export const MessageContext = createContext(null);
const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const setIsPlaying = (messageId, isPlaying) => {
        setMessages(prevMessages => prevMessages.map(msg => msg.messageId === messageId ? Object.assign(Object.assign({}, msg), { isPlaying }) : msg));
    };
    return (<MessageContext.Provider value={{ messages, setMessages }}>
      <AudioProvider clientId="12345" setIsPlaying={setIsPlaying}>
        {children}
      </AudioProvider>
    </MessageContext.Provider>);
};
export { MessageProvider };
//# sourceMappingURL=MessageContext.jsx.map