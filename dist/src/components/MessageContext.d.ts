import React from 'react';
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
};
export declare const MessageContext: React.Context<MessageContextType | null>;
declare const MessageProvider: React.FC<{
    children: React.ReactNode;
}>;
export { MessageProvider };
//# sourceMappingURL=MessageContext.d.ts.map