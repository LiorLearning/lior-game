import React, { ReactNode } from 'react';
import './chocolate.css';
export declare const desc = "Steps to Play the Fraction Comparison Game:\n1. You'll start with two chocolate bars representing fraction1 and fration2.\n2. Break the first chocolate bar into equal parts by clicking the \"Split\" button.\n3. Select the pieces of the first bar that represent the fraction fraction1.\n4. Break the second chocolate bar into equal parts by clicking the \"Split\" button.\n5. Select the pieces of the second bar that represent the fraction fraction2.\n6. Compare the selected pieces from both bars to determine which fraction is larger.\n7. Your goal is to correctly identify which fraction has a greater value.";
export declare const GameStateProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useGameState: () => {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};
interface Fraction {
    num: number;
    denom: number;
}
interface BarState {
    parts: number;
    selectedParts: number[];
}
interface GameState {
    fraction1: Fraction;
    fraction2: Fraction;
    bar1: BarState;
    bar2: BarState;
    showAnswer: boolean;
    userAnswer: string | null;
    isFirstFractionCorrect: boolean;
    isSecondFractionCorrect: boolean;
    compareMode: boolean;
    gameStarted: boolean;
    correctAnswer: Fraction;
}
interface FractionsGameProps {
    sendAdminMessage: (role: string, content: string) => void;
}
declare const FractionsGame: ({ sendAdminMessage }: FractionsGameProps) => React.JSX.Element;
export default FractionsGame;
//# sourceMappingURL=game.d.ts.map