import React, { ReactNode, useContext, useEffect, useState } from 'react';
import QuestionComponent from '../../components/question/index';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import { AppError } from '../../types/http-error';
import './style.scss';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const [isLoading, setIsloading] = useState(true);
  const [loadingError, setIsloadingError] = useState<AppError>();

  useEffect(() => {
    const load = async () => {
      try {
        setIsloading(true);
        await store.fetchQuestions(dispatch);
      } catch (error) {
        setIsloadingError(error);
      } finally {
        setIsloading(false);
      }
    };
    load();
  }, [dispatch]);

  const { currentQuestion, questions, player } = state;
  const isLast = questions[questions.length - 1] === currentQuestion;

  let errorNode: ReactNode;
  let questionNode: ReactNode;
  let loadingNode: ReactNode;

  if (isLoading) {
    loadingNode = <div>Loading...</div>;
  }

  if (loadingError) {
    errorNode = <div>{loadingError.message}</div>;
  }

  if (currentQuestion) {
    questionNode = (
      <QuestionComponent
        isLast={isLast}
        player={player!}
        question={currentQuestion}
        next={(a) => store.setAnswer(dispatch, player!, currentQuestion, a)}
        countdownExpire={() => store.answerTimesUp(dispatch)}
      />
    );
  }

  return (
    <div className='game'>
      {loadingNode}
      {errorNode}
      {questionNode}
    </div>
  );
};

export default Game;
