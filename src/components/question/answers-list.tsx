import AnswerButtonComponent from 'components/question/answer';
import React from 'react';
import { Answer } from '../../store/models';
import './style.scss';

type Props = {
  answers: readonly Answer[];
  getAnswer: (a: Answer) => void;
};

const AnswersList = ({ getAnswer, answers }: Props) => {
  return (
    <div className="answers">
      {answers.map((a) => (
        <AnswerButtonComponent key={a.label} answer={a} getAnswer={() => getAnswer(a)} />
      ))}
    </div>
  );
};

export default AnswersList;
