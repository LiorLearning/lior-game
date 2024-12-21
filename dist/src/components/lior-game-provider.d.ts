import React, { ReactNode } from 'react';
export declare const LiorGameContext: React.Context<{} | undefined>;
export declare const LiorGameProvider: React.FC<{
    children: ReactNode;
    wsUrl?: string;
}>;
export declare const useLiorGame: () => {};
