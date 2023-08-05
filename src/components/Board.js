import React from 'react';
import "./Board.css";
import Box from './Box';

const Board = ({board, onClick}) => {
  return (
    <div className='board'>
      {board.map((value, idx) => {
      //if the value is equal to null then only u pass in the click function
      return <Box value={value} onClick={() => value === null && onClick(idx)} />
      
      })}
    </div>
  )
}

export default Board
