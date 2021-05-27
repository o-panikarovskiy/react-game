import React from 'react';
import { Answer, GameStatus, Question } from 'store/models';

type Props = {
  answer: Answer;
  question: Question;
  gameStatus?: GameStatus;
  next: () => void;
};

const QuestionResult = ({ answer, question, gameStatus, next }: Props) => {
  const correctTitle = `😀 You are right! + $${question.score}`;
  const inCorrectTitle = `🙁 You are wrong! -1 ♥️`;
  const title = answer.right ? correctTitle : inCorrectTitle;
  const nextTitle = gameStatus === 'finished' ? 'Show results' : ' Next Question';

  return (
    <div className={`result ${answer?.right ? 'correct' : 'incorrect'} `}>
      <div className="title">{title}</div>
      <button className="btn" onClick={() => next()}>
        {nextTitle}
      </button>
    </div>
  );
};

export default QuestionResult;
