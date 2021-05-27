import AnswersList from 'components/question/answers-list';
import QuestionResult from 'components/question/result';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { GameContext } from 'store/context';
import { Answer, Question } from '../../store/models';
import StatusComponent from '../status/status';
import './style.scss';

const QuestionComponent = () => {
  const { state, answerTimesUp, sendAnswerToServer, nextQuestion } = useContext(GameContext);
  const [resultAnswer, showResultAnswer] = useState<Answer>();
  const [isSending, setIsSending] = useState(false);

  const { player, currentQuestion, gameStatus } = state;
  const question = currentQuestion as Question;

  const sendAnswer = async (answer: Answer) => {
    setIsSending(true);
    const { gameStatus } = await sendAnswerToServer(player, question, answer);

    if (gameStatus !== 'finished') {
      setIsSending(false);
      showResultAnswer(answer);
    }
  };

  useEffect(() => {
    setIsSending(false);
    showResultAnswer(void 0);
  }, [question]);

  let qBody: ReactNode;
  if (resultAnswer) {
    qBody = <QuestionResult answer={resultAnswer} question={question} gameStatus={gameStatus} next={nextQuestion} />;
  } else {
    qBody = <AnswersList answers={question.answers} disabled={isSending} getAnswer={(a) => sendAnswer(a)} />;
  }

  return (
    <>
      <StatusComponent player={player} stopTimer={!!resultAnswer || isSending} countdown={question.timeout} countdownExpire={answerTimesUp} />
      <div className="question">
        <div className="title">{question.title}</div>
        {qBody}
      </div>
    </>
  );
};

export default QuestionComponent;
