
export const desc = `
`;

export type GameScreen = 'first' | 'second' | 'third';

export interface Fraction {
    numerator: number;
    denominator: number;
}

export interface GameState1 {
    step: number;
    fraction: Fraction;
    denomOptions: number[];
    piecesAtYOne: number;
}

export interface GameState2 {
    step: number;
    fraction: Fraction;
    denomOptions: number[];
}

export interface GameState3 {
    step: number;
    fraction: Fraction;
}


export interface GameState {
    screen: GameScreen;
    state1: GameState1;
    state2: GameState2;
    state3: GameState3;
}

export const initialGameState: GameState = {
    screen: 'first',
    state1: {
        step: 0,
        fraction: {
            numerator: 7,
            denominator: 4,
        },
        piecesAtYOne: 0,
        denomOptions: [6, 3, 4],
    },
    state2: {
        step: 0,
        fraction: {
            numerator: 8,
            denominator: 3,
        },
        denomOptions: [6, 4, 3], // Must have the correct denominator
    },
    state3: {
        step: 0,
        fraction: {
            numerator: 9,
            denominator: 5,
        },
    },
};