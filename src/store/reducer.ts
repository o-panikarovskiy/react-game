import Action, {
  QUESTION_TIMES_UP,
  REQ_QUESTIONS,
  REQ_QUESTIONS_ERROR,
  REQ_QUESTIONS_SUCCESS,
  SET_ANSWER,
  START_GAME,
} from './actions';
import { Answer, GameState, GameStatus } from './models';

export const initialState: GameState = {
  health: 3,
  totalScore: 0,
  questions: [],
  isQuestionsLoading: false,
};

export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...initialState,
        gameStatus: 'started',
      };
    }

    case SET_ANSWER: {
      return setAnswer(state, action.payload);
    }

    case QUESTION_TIMES_UP: {
      return {
        ...state,
        gameStatus: 'finished',
      };
    }

    case REQ_QUESTIONS: {
      return {
        ...state,
        isQuestionsLoading: true,
      };
    }

    case REQ_QUESTIONS_SUCCESS: {
      const questions = action.payload;
      return {
        ...state,
        questions,
        currentQuestion: questions[0],
        isQuestionsLoading: false,
      };
    }

    case REQ_QUESTIONS_ERROR: {
      return {
        ...state,
        loadingError: action.payload,
        isQuestionsLoading: false,
      };
    }

    default:
      return state;
  }
};

const setAnswer = (state: GameState, answer: Answer): GameState => {
  const { currentQuestion, questions, totalScore, health } = state;
  if (!currentQuestion) return state;

  const qidx = questions.findIndex((q) => q === currentQuestion);
  const healthNew = health + (answer.right ? 0 : -1);
  const score = totalScore + (answer.right ? currentQuestion.score : 0);
  const nextQuestion = questions[qidx + 1];
  const gameStatus: GameStatus | undefined = !nextQuestion || healthNew === 0 ? 'finished' : state.gameStatus;

  return {
    ...state,
    gameStatus,
    health: healthNew,
    totalScore: score,
    currentQuestion: nextQuestion,
  };
};
