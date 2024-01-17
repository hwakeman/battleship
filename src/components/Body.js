import React from 'react'
import './styles/body.css'
import Board from './board/Board';
import BoardButtons from './board/BoardButtons';

export default function Body() {
    return (
      <div className='body'>
        <Board/>
        <BoardButtons/>
      </div>
    );
}