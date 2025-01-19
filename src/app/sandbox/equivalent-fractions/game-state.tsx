export const desc = ``;

export type GameScreen = 1 | 2 | 3 | 4;

export interface Screen1 {
  step: {
    id: number,
    text: string
  },
  question:{
    numerator1: number
    denominator1: number
    denominator2: number
  },
  selectedKnife: number | null,
  selectedPieces: number,
}

export interface Screen2 {
  step: {
    id: number,
    text: string
  },
  substep: number,
  selectedKnife: number | null,
  selectedHoney: number | null,
  selectedPieces1: number,
  selectedPieces2: number,

  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  },
}

export interface Screen3 {
  step: number,
  fraction1: {
    numerator: number
    denominator: number
  }
  fraction2: {
    numerator: number
    denominator: number
  }
  fraction3: {
    numerator: number
    denominator: number
  }
  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  }

  answers: {
    numerator: number
    multiplier1: number
    multiplier2: number
    multiplier3: number
  }
}

export interface Screen4 {
  step: number,
  question1:{
    numerator1: number
    denominator1: number
    denominator2: number
  },
  question2:{
    numerator1: number
    numerator2: number
    denominator2: number
  }
}

export interface GameState {
  level: number,
  screen1: Screen1,
  screen2: Screen2,
  screen3: Screen3,
  screen4: Screen4,
}

export const initialGameState: GameState = {
  level: 0,
  screen1: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES"
    },
    question:{
      numerator1: 2,
      denominator1: 3,
      denominator2: 9
    },
    selectedKnife: null,
    selectedPieces: 0,
  },
  screen2: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES"
    },
    substep: 0,
    selectedKnife: null,
    selectedHoney: null,
    selectedPieces1: 0,
    selectedPieces2: 0,
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 3
    }
  },
  screen3: {
    step: 1,
    fraction1: {
      numerator: 4,
      denominator: 6
    },
    fraction2: {
      numerator: 8,
      denominator: 12
    },
    fraction3: {
      numerator: 2,
      denominator: 3
    },
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 3
    },
    answers: {
      numerator: 0,
      multiplier1: 3,
      multiplier2: 2,
      multiplier3: 3
    }
  },
  screen4: {
    step: 1,
    question1: {
      numerator1: 2,
      denominator1: 3,
      denominator2: 15
    },
    question2: {
      numerator1: 2,
      numerator2: 8,
      denominator2: 12
    }
  }
};