import React, { ReactNode } from 'react';

declare const SandboxProvider: React.FC<{
    children: ReactNode;
}>;
declare const useSandboxContext: () => {
    componentRef: React.RefObject<HTMLDivElement> | null;
    sendAdminMessage?: (role: string, content: string) => Promise<void>;
};

declare const LiorGameProvider: React.FC<{
    children: ReactNode;
    wsUrl?: string;
}>;
declare const useLiorGame: () => {};

export { LiorGameProvider, SandboxProvider, useLiorGame, useSandboxContext };
