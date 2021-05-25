import React, { ReactNode, useContext, useEffect } from 'react';
import QuestionComponent from '../../components/question/index';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import './style.scss';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    const abortCtrl = new AbortController();
    store.fetchQuestions(dispatch, abortCtrl.signal);
    return () => abortCtrl.abort();
  }, [dispatch]);

  const { currentQuestion, isQuestionsLoading, loadingError, questions } = state;
  const isLast = questions[questions.length - 1] === currentQuestion;

  let errorNode: ReactNode;
  let questionNode: ReactNode;
  let loadingNode: ReactNode;

  if (isQuestionsLoading) {
    loadingNode = <div>Loading...</div>;
  }

  if (loadingError) {
    errorNode = <div>{loadingError.message}</div>;
  }

  if (currentQuestion) {
    const { totalScore, health } = state;
    questionNode = (
      <QuestionComponent
        isLast={isLast}
        health={health}
        totalScore={totalScore}
        question={currentQuestion}
        next={(a) => store.setAnswer(dispatch, a)}
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
