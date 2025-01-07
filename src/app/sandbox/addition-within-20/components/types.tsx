export interface Position {
  x: number;
  y: number;
}

export interface Vector {
  x: number;
  y: number;
  z?: number;
}

export interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}