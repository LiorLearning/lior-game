declare module 'lior-game' {
  export function SandboxProvider(props: any): React.ReactElement;
  export function useSandboxContext(): {
    sendAdminMessage: (role: string, content: string) => void;
  };
  export function LiorGameProvider(props: any): React.ReactElement;
  export function useLiorGame(): any;
}
