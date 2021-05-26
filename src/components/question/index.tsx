import AnswersList from 'components/question/answers-list';
import QuestionResult from 'components/question/result';
import React, { ReactNode, useState } from 'react';
import { Answer, GameStatus, Player, Question } from '../../store/models';
import StatusComponent from '../status/index';
import './style.scss';

type Props = {
  player: Player;
  question: Question;
  gameStatus?: GameStatus;
  next: (a: Answer) => void;
  countdownExpire: () => void;
};

const QuestionComponent = (props: Props) => {
  const [answer, setAnswer] = useState<Answer>();
  const { next, countdownExpire, question, player, gameStatus } = props;

  const answerHandle = (answer: Answer) => {
    if (!question.isLast) {
      setAnswer(answer);
    } else {
      next(answer);
    }
  };

  const nextQuestionHandle = () => {
    if (answer) {
      next(answer);
      setAnswer(void 0);
    }
  };

  let qBody: ReactNode;
  if (answer) {
    qBody = <QuestionResult answer={answer} question={question} gameStatus={gameStatus} next={nextQuestionHandle} />;
  } else {
    qBody = <AnswersList answers={question.answers} getAnswer={answerHandle} />;
  }

  return (
    <>
      <StatusComponent
        player={player}
        stopTimer={!!answer}
        countdown={question.timeout}
        countdownExpire={countdownExpire}
      />
      <div className='question'>
        <div className='title'>{question.title}</div>
        {qBody}
      </div>
    </>
  );
};

export default QuestionComponent;
