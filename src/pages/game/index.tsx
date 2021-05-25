import React, { useContext, useEffect } from 'react';
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

  const { isQuestionsLoading, loadingError } = state;

  return (
    <div className='game'>
      {isQuestionsLoading ? (
        <div>Loading...</div>
      ) : loadingError ? (
        <div>{loadingError.message}</div>
      ) : (
        <QuestionComponent />
      )}
    </div>
  );
};

export default Game;
