declare module 'lior-game' {
    function SandboxProvider(props: any): React.ReactElement;
    function useSandboxContext(): {
        sendAdminMessage: (role: string, content: string) => void;
    };
    function LiorGameProvider(props: any): React.ReactElement;
    function useLiorGame(): any;
}
