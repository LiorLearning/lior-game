import React, { ReactNode } from 'react';
interface AudioContextProps {
    isConnected: boolean;
    playAudio: (messageId: string, text: string) => void;
    stopAudio: (messageId?: string) => void;
}
export declare const AudioContext: React.Context<AudioContextProps | null>;
interface AudioProviderProps {
    children: ReactNode;
    clientId: string;
    setIsPlaying: (messageId: string, isPlaying: boolean) => void;
}
export declare const AudioProvider: React.FC<AudioProviderProps>;
export {};
//# sourceMappingURL=audio_stream.d.ts.map