import React, { ReactNode, useContext, useEffect, useState } from 'react';
import QuestionComponent from '../../components/question/question';
import { GameContext } from '../../store/context';
import { AppError } from '../../types/http-error';
import './style.scss';

const Game = () => {
  const { state, fetchQuestions } = useContext(GameContext);
  const [isLoading, setIsloading] = useState(false);
  const [loadingError, setIsloadingError] = useState<AppError>();

  useEffect(() => {
    const abortCtrl = new AbortController();

    (async () => {
      try {
        setIsloading(true);
        await fetchQuestions(abortCtrl.signal);
        setIsloading(false);
      } catch (error) {
        if (abortCtrl.signal.aborted) return;
        setIsloadingError(error);
      } finally {
        if (abortCtrl.signal.aborted) return;
        setIsloading(false);
      }
    })();

    return () => abortCtrl.abort();
  }, [fetchQuestions]);

  let errorNode: ReactNode;
  let questionNode: ReactNode;
  let loadingNode: ReactNode;

  if (isLoading) {
    loadingNode = <div className="title">Loading questions...</div>;
  }

  if (loadingError) {
    errorNode = <div className="title error">{loadingError.message}</div>;
  }

  if (state.currentQuestion) {
    questionNode = <QuestionComponent />;
  }

  return (
    <div className="game">
      {loadingNode}
      {errorNode}
      {questionNode}
    </div>
  );
};

export default Game;
