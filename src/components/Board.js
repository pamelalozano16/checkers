import React, { useState } from 'react';
import './components.css';
import Square from './Square'
import { DragDropContext } from 'react-beautiful-dnd';
import createInitialBoard  from '../utils/boardPieces';
import {checkAvailableMoves}  from '../utils/checkMoveUpdate';

const DEAULT_BOARD_SIZE = 8;

function Board() {
    let boardArray = createInitialBoard(DEAULT_BOARD_SIZE);
    const [pieces, updatePieces] = useState(boardArray);

    function handleOnDragEnd(result) {
        //Drag and drop out of bound
        if (!result.destination) return;

        //Drag and drop on another piece
        if (0 < result.destination.index) return;

        //Position index = [i, j, player]
        //New Position index = [i, j]
        let position= result.draggableId.split(",").map((x) => { return parseInt(x,10); });
        let newPositionIndex = result.destination.droppableId.split(",").map((x) => { return parseInt(x,10); });
        let player = position[2];
        checkAvailableMoves(pieces, position, newPositionIndex, player);

        let updatedPositions = Array.from(pieces);
        updatePieces(updatedPositions);

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="board">
            {Object.keys(pieces).map(row => {
            return Object.keys(pieces[row]).map(col => {
                return (
                    <Square key={(DEAULT_BOARD_SIZE*row+col)} col={col} row={row} boardArray={pieces}></Square>
                );
                });
            })}
            </div>
        </DragDropContext>
    )
}

export default Board;