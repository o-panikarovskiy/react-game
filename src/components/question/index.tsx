import React, { useState } from 'react';
import { Answer, Question } from '../../store/models';
import AnswerComponent from '../answer/index';
import StatusComponent from '../status/index';
import './style.scss';

type Props = {
  question: Question;
  totalScore: number;
  health: number;
  isLast: boolean;
  next: (a: Answer) => void;
  countdownExpire: () => void;
};

const QuestionComponent = (props: Props) => {
  const [answer, setAnswer] = useState<Answer>();
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const { next, countdownExpire, question, isLast, health, totalScore } = props;

  const answerHandle = (answer: Answer) => {
    if (!isLast) {
      setAnswer(answer);
      setShowAnswerResult(true);
    } else {
      next(answer);
    }
  };

  const nextQuestionHandle = () => {
    if (answer) {
      setShowAnswerResult(false);
      next(answer);
    }
  };

  if (showAnswerResult) {
    return (
      <div className={`answer-result ${answer?.right ? 'correct' : 'incorrect'} `}>
        {answer?.right ? <div>+${question.score}</div> : <div>-1 ♥️</div>}
        <button className='btn' onClick={nextQuestionHandle}>
          Next Question
        </button>
      </div>
    );
  }

  return (
    <>
      <StatusComponent
        totalScore={totalScore}
        health={health}
        countdown={question.timeout}
        countdownExpire={countdownExpire}
      />
      <div className='question'>
        <div className='title'>{question.title}</div>
        <div className='answers'>
          {question.answers.map((a) => (
            <AnswerComponent key={a.label} answer={a} getAnswer={() => answerHandle(a)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionComponent;
