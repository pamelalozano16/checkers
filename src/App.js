import React, {useState} from "react";
import './App.css';
import Board from "./components/Board";
import {PLAYER_1}  from './utils/types';

function App() {
  const [turn, changeTurn] = useState(PLAYER_1);
  const [gameFinished, finishGame] = useState(false);

  return (
    <div className="App">
      {(!gameFinished) ? <h2 class="turn">PLAYER {turn}'S TURN</h2> : <h2 class="game-over">GAME OVER</h2>}
      <Board onChangeTurn={changeTurn} onFinish={finishGame}></Board>
    </div>
  );
}

export default App;
