import Action, { QUESTION_TIMES_UP, SET_ANSWER, SET_QUESTIONS, START_GAME } from './actions';
import { GameState } from './models';

export const initialState: GameState = {
  ratings: [],
  questions: [],
};

export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...initialState,
        player: action.payload,
        gameStatus: 'started',
      };
    }

    case SET_ANSWER: {
      const { player, ratings } = action.payload;
      const { currentQuestion, questions } = state;

      const qidx = questions.findIndex((q) => q === currentQuestion);
      const nextQuestion = questions[qidx + 1];
      const gameStatus = !nextQuestion || player.health === 0 ? 'finished' : state.gameStatus;

      return {
        ...state,
        player,
        ratings,
        gameStatus,
        currentQuestion: nextQuestion,
      };
    }

    case QUESTION_TIMES_UP: {
      return {
        ...state,
        gameStatus: 'finished',
      };
    }

    case SET_QUESTIONS: {
      const questions = action.payload;
      return {
        ...state,
        questions,
        currentQuestion: questions[0],
      };
    }

    default:
      return state;
  }
};
