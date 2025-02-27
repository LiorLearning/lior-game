export interface BaseProps {
    sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}