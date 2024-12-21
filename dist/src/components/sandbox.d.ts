import React, { ReactNode } from 'react';
export declare const SandboxProvider: React.FC<{
    children: ReactNode;
    gameState: any;
    desc: string;
}>;
export declare const useSandboxContext: () => {
    componentRef: React.RefObject<HTMLDivElement> | null;
    sendAdminMessage?: (role: string, content: string) => Promise<void>;
};
