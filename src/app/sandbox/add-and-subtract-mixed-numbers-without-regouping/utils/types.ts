export interface BaseProps {
    sendAdminMessage: (role: string, content: string) => void;
}

  
export interface MixedFractionProps {
  whole: number;
  numerator: number;
  denominator: number;
}