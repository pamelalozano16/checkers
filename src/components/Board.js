import React, { useState } from 'react';
import './components.css';
import Square from './Square'
import { DragDropContext } from 'react-beautiful-dnd';
import createInitialBoard  from '../utils/boardPieces';
import {checkAvailableMoves, checkMoveAndUpdate}  from '../utils/checkAvailableMoves';
import {PLAYER_1, PLAYER_2, ACCEPT, FINISH}  from '../utils/types';

const DEAULT_BOARD_SIZE = 8;
let turn = PLAYER_1;
let finishedGame = false;

function Board(props) {
    let boardArray = createInitialBoard(DEAULT_BOARD_SIZE);
    const [board, updateBoard] = useState(boardArray);
    const [availableMoves, updateAvailableMoves] = useState([]);

    function handleOnDragStart(result) {
        let position = result.draggableId.split(",").map((x) => { return parseInt(x,10); });
        let player = position[2];
        if (player !== turn || finishedGame) { return; }
        updateAvailableMoves(checkAvailableMoves(board, position, player));
    }

    function handleOnDragEnd(result) {
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
        if (player !== turn) { return; }

        //Update board if move is valid
        let moveStatus = checkMoveAndUpdate(board, player, availableMoves, newPositionIndex, position);
        if (moveStatus === ACCEPT) {
            let updatedPositions = Array.from(board);
            updateBoard(updatedPositions);
    
            //Update Turn
            turn = (player === PLAYER_1) ? PLAYER_2 : PLAYER_1;
            props.onChangeTurn(turn);
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