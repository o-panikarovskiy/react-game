import Action, { NEXT_QUESTION, QUESTION_TIMES_UP, SET_ANSWER, SET_QUESTIONS, START_GAME } from './actions';
import { GameState } from './models';

export const initialState: GameState = {
  questions: [],
  player: { name: '', score: 0, health: 0 },
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
      const { player, gameStatus } = action.payload;

      return {
        ...state,
        player,
        gameStatus,
      };
    }

    case NEXT_QUESTION: {
      const { currentQuestion, questions, player } = state;

      const qidx = questions.findIndex((q) => q === currentQuestion);
      const nextQuestion = questions[qidx + 1];
      const gameStatus = player.health === 0 || !nextQuestion ? 'finished' : state.gameStatus;

      return {
        ...state,
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
