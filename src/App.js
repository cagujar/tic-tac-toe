import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';


function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  //9 elements with null value in the beginning
  const [board, setBoard] = useState(Array(9).fill(null));

  //set true so that x will always start the game
  const [xPlaying, setXPlaying] = useState(true);

  const [scores, setScores] = useState({ xScore: 0, oScore: 0})

  const [gameOver,setGameOver] = useState(false);
  //it will take the idx of which box has been click
  // whenever this function is called the current player is done playing and switch to other player
  const handleBoxClick = (boxIdx) => {
    const updateBoard = board.map((value, idx) => {
      //if idx is equal to the idx that has been click then return X
      if(idx === boxIdx) {
        //if x is playing then return x otherwise, O
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updateBoard);

    //if the winner does exist then it will check
    if (winner) {
      //if the winner is O  
      if(winner === "O" ) {
        //let oscore and extract that from the scores state
        let {oScore} = scores;
        //increment score by 1
        oScore += 1
        //then update the score ...score keeps all the other values except for the new value of oscore
        setScores({...scores, oScore})
      } else {
        let {xScore} = scores;
        xScore += 1
        setScores({...scores, xScore})
      }
    }

    

    setBoard(updateBoard);

    /*xplaying is the opposite value of the current playing
      so that if x was playing it will be set to O and if O is playing
      it will be set to X
    */
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x,y,z] = WIN_CONDITIONS[i];

      if(board[x] && board[x] === board[y] && board[y] === board[z]) {
        console.log(board[x])
        setGameOver(true)
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />

      {/* if the game is over and somebody click the box so the board is reset otherwise, calls handleboxclick  */}
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
