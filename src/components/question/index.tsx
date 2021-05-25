import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import AnswerComponent from '../answer/index';
import StatusComponent from '../status/index';
import './style.scss';

function QuestionComponent() {
  const {
    state: { currentQuestion },
    dispatch,
  } = useContext(GameContext);

  return (
    <>
      <StatusComponent />
      <div className='question'>
        <div className='title'>{currentQuestion?.title}</div>
        <div className='answers'>
          {currentQuestion?.answers.map((a) => (
            <AnswerComponent key={a.label} answer={a} getAnser={() => store.setAnswer(dispatch, a)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default QuestionComponent;
