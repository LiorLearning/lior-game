import { MixedFractionProps } from './utils/types';

export const desc = ``;

export type GameScreen = 1 | 2 | 3 | 4;

interface QuestionDescription{
  showFirstRow: boolean;
  showSecondRow: boolean;
  showThirdRow: boolean;

  inputWhole: string;
  inputNumerator: string;
  inputDenominator: string;
}

export interface screen1 {
  step: number;
  step2Substep: number;

  question1description: QuestionDescription;
  question2description: QuestionDescription;
}

export interface screen2 {
  step: number;
  substep: number;
  question1description: QuestionDescription;
  question2description: QuestionDescription;
}

export interface screen3 {
  step: number;
  substep: number;
}

export interface screen4 {
  step: number;
  whole1: number;
  whole2: number;
  whole3: number;
  numerator1: number;
  numerator2: number;
  numerator3: number;
  denominator1: number;
  denominator2: number;
  denominator3: number;
}

export interface Question {
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface GameState {
  screen: number;
  state1: screen1;
  state2: screen2;
  state3: screen3;
  state4: screen4;

  questions: {
    question1: Question;
    question2: Question;
    question3: Question;
    question4: Question;
  };
}

export const initialGameState: GameState = {

  screen: 1,

  state1: {
    step: 1,
    step2Substep: 0,
    question1description: {
      showFirstRow: true,
      showSecondRow: false,
      showThirdRow: false,
      inputWhole: '',
      inputNumerator: '',
      inputDenominator: '',
    },
    question2description: {
      showFirstRow: false,
      showSecondRow: false,
      showThirdRow: false,
      inputWhole: '',
      inputNumerator: '',
      inputDenominator: '',
    },
  },

  state2: {
    step: 0,
    substep: 0,
    question1description: {
      showFirstRow: true,
      showSecondRow: false,
      showThirdRow: false,
      inputWhole: '',
      inputNumerator: '',
      inputDenominator: '',
    },
    question2description: {
      showFirstRow: true,
      showSecondRow: false,
      showThirdRow: false,
      inputWhole: '',
      inputNumerator: '',
      inputDenominator: '',
    },
  },

  state3: {
    step: 0,
    substep: 0,
  },

  state4: {
    step: 0,
    whole1: 0,
    whole2: 0,
    whole3: 0,
    numerator1: 0,
    numerator2: 0,
    numerator3: 0,
    denominator1: 0,
    denominator2: 0,
    denominator3: 0,
  },

  questions: {
    question1: {
      fraction1: { whole: 3, numerator: 1, denominator: 4 },
      fraction2: { whole: 4, numerator: 3, denominator: 4 },
    },
    question2: {
      fraction1: { whole: 2, numerator: 3, denominator: 5 },
      fraction2: { whole: 3, numerator: 1, denominator: 5 },
    },
    question3: {
      fraction1: { whole: 5, numerator: 5, denominator: 9 },
      fraction2: { whole: 2, numerator: 2, denominator: 9 },
    },
    question4: {
      fraction1: { whole: 4, numerator: 2, denominator: 7 },
      fraction2: { whole: 1, numerator: 1, denominator: 7 },
    },
  }
};
