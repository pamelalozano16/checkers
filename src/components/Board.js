import React, { useState } from 'react';
import './components.css';
import Square from './Square'
import { DragDropContext } from 'react-beautiful-dnd';
import createInitialBoard  from '../utils/boardPieces';

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
        let positionIndex = result.draggableId.split(",");
        let newPositionIndex = result.destination.droppableId.split(",")
        let player = parseInt(positionIndex[2], 10);
        
        //Replace empty space with piece
        let updatedPositions = Array.from(pieces);
        updatedPositions[positionIndex[0]][positionIndex[1]] = 0;
        updatedPositions[newPositionIndex[0]][newPositionIndex[1]] = player;
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