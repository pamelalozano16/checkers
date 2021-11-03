import React, {useState} from "react";
import './App.css';
import Board from "./components/Board";
import createInitialBoard  from './utils/boardPieces';
import  {getLastGame, getLastTurn, getPlayerCount} from './utils/localStorage';
import {PLAYER_1, PLAYER_2, DEAULT_BOARD_SIZE}  from './utils/types';

function App() {
  const [turn, changeTurn] = useState(PLAYER_1);
  const [playerCount, updatePlayerCount] = useState([0, 12, 12, 0]);
  const [gameFinished, finishGame] = useState(false);
  const [gameStarted, startGame] = useState(false);
  const [board, changeBoardStatus] = useState (createInitialBoard(DEAULT_BOARD_SIZE));


  function restoreGame () {
    let lastGame = getLastGame();
    let lastTurn = getLastTurn();
    let lastPlayerCount = getPlayerCount();
    if (lastGame) {
      changeBoardStatus(Array.from(lastGame));
      changeTurn(lastTurn);
      updatePlayerCount(lastPlayerCount);
    }
    startGame(true);
  }

  return (
    <div className="App">
      {(!gameStarted) ? <div className="menu">
        <h2>TWO PLAYER <br /> CHECKERS GAME</h2>
        <button onClick={() => {startGame(true)}}>Start</button>
        <button onClick={restoreGame}>Restore Game</button>
      </div> :
      (<div>
        <div>
          {(!gameFinished) ? <h2 className={(turn === 1) ? "turn one" : "turn two"}> PLAYER {turn}'S TURN</h2> : 
          <h2 className={(turn === 1) ? "turn one" : "turn two"}> PLAYER {turn} WINS</h2>}
        </div>
        <div>
          {(gameFinished) ? <h2 className="game-over">GAME OVER</h2> : null}
        </div>
        <Board 
        turn = {turn}
        onChangeTurn={changeTurn} 
        onFinish={finishGame}
        boardArray={board}
        playerCount = {playerCount}
        updatePlayerCount = {updatePlayerCount}
        ></Board>
      </div>)}
    </div>
  );
}

export default App;
