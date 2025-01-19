export interface Line {
  text: string;
  color?: string;
}

export const COLORS = {
  pink: '#FF497C',
  blue: '#0099FF',
  red: '#FF0000',
  green: '#00FF00',
  purple: '#921FFD',
}

export interface StepText {
  lines: Line[];
}
