import React from 'react';
import { Answer } from '../../store/models';
import './style.scss';

type Props = {
  answer: Answer;
  getAnswer: () => void;
};

const AnswerComponent = ({ getAnswer, answer }: Props) => {
  return (
    <button className='answer-btn' onClick={getAnswer}>
      {answer.label}
    </button>
  );
};

export default AnswerComponent;
