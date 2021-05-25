import React from 'react';
import { Answer } from '../../store/models';
import './style.scss';

type Props = {
  answer: Answer;
  getAnser: () => void;
};

const AnswerComponent = ({ getAnser, answer }: Props) => {
  return (
    <button className='answer-btn' onClick={getAnser}>
      {answer.label}
    </button>
  );
};

export default AnswerComponent;
