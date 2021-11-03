import React, {useState} from "react";
import './App.css';
import Board from "./components/Board";
import {PLAYER_1}  from './utils/types';

function App() {
  const [turn, changeTurn] = useState(PLAYER_1);
  const [gameFinished, finishGame] = useState(false);
  const [gameStarted, startGame] = useState(false);

  return (
    <div className="App">
      {(!gameStarted) ? <div class="menu">
        <h2>TWO PLAYER <br /> CHECKERS GAME</h2>
        <button onClick={() => {startGame(true)}}>Start</button>
      </div> :
      (<div>
        <div>
          {(!gameFinished) ? <h2 className={(turn === 1) ? "turn one" : "turn two"}> PLAYER {turn}'S TURN</h2> : 
          <h2 className={(turn === 1) ? "turn one" : "turn two"}> PLAYER {turn} WINS</h2>}
        </div>
        <div>
          {(gameFinished) ? <h2 className="game-over">GAME OVER</h2> : null}
        </div>
        <Board onChangeTurn={changeTurn} onFinish={finishGame}></Board>
      </div>)}
    </div>
  );
}

export default App;
