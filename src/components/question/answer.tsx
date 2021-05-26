import React from 'react';
import { Answer } from '../../store/models';
import './style.scss';

type Props = {
  answer: Answer;
  disabled?: boolean;
  getAnswer: () => void;
};

const AnswerButtonComponent = ({ getAnswer, disabled, answer }: Props) => {
  return (
    <button className='answer' disabled={disabled} onClick={getAnswer}>
      {answer.label}
    </button>
  );
};

export default AnswerButtonComponent;
