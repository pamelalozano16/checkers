import React, { useState } from 'react';
import './components.css';
import Square from './Square'
import { DragDropContext } from 'react-beautiful-dnd';
import  { saveGame } from '../utils/localStorage';
import { checkMoveAndUpdate }  from '../utils/checkMoveAndUpdate';
import { checkAvailableMoves } from '../utils/checkAvailableMoves';
import {PLAYER_1, PLAYER_2, ACCEPT, FINISH, DEAULT_BOARD_SIZE}  from '../utils/types';

let turn = PLAYER_1;
let finishedGame = false;

function Board(props) {
    const [board, updateBoard] = useState(props.boardArray);
    const [availableMoves, updateAvailableMoves] = useState([]);
    turn = props.turn; 

    function handleOnDragStart(result) {
        let position = result.draggableId.split(",").map((x) => { return parseInt(x,10); });
        let player = position[2];
        //If it's not a that player's turn (piece or king) return move
        if (( player !== turn && player !== (turn+2) )|| finishedGame) { return; }

        updateAvailableMoves(checkAvailableMoves(board, position, player));
    }

    function handleOnDragEnd(result) {
        //Reset available squares
        updateAvailableMoves([]);

        //Drag and drop out of bound
        if (!result.destination || finishedGame) return;

        //Drag and drop on another piece
        if (0 < result.destination.index) return;

        //Position index = [i, j, player]
        //New Position index = [i, j]
        let position = result.draggableId.split(",").map((x) => { return parseInt(x,10); });
        let newPositionIndex = result.destination.droppableId.split(",").map((x) => { return parseInt(x,10); });
        let player = position[2];

        //If the player moves in the other's turn
        if ( player !== turn && player !== (turn+2) ) { return; }

        //Update board if move is valid
        let moveStatus = checkMoveAndUpdate(board, player, availableMoves, newPositionIndex, position);
        if (moveStatus === ACCEPT) {
            let updatedPositions = Array.from(board);
            updateBoard(updatedPositions);
    
            //Update Turn
            turn = (turn === PLAYER_1) ? PLAYER_2 : PLAYER_1;
            props.onChangeTurn(turn);

            //Save game in local storage
            saveGame(board, turn);

        } else if(moveStatus === FINISH){
            props.onFinish(true);
            finishedGame = true;
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
            <div className="board">
            {Object.keys(board).map(row => {
            return Object.keys(board[row]).map(col => {
                return (
                    <Square key={(DEAULT_BOARD_SIZE*row+col)} col={col} row={row} boardArray={board}
                    availableMoves={availableMoves}></Square>
                );
                });
            })}
            </div>
        </DragDropContext>
    )
}

export default Board;