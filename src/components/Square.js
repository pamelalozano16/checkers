import React from 'react';
import './components.css';
import Piece from './Piece';
import { Droppable } from 'react-beautiful-dnd';

function isEven(i) {
    return (i % 2 === 0);
}

function isInArray(array, row, col) {
    row = parseInt(row, 10);
    col = parseInt(col, 10);
    for(let i in array){
        if(array[i][0] === row && array[i][1] === col) {
            return true;
        }
    }
    return false;
}

function Square (props) {
    let squareClass = ( ( isEven(props.col)&&isEven(props.row) ) || ( !isEven(props.col)&&!isEven(props.row) ) )? 
    "square gold" : "square brown";

    return (
        <Droppable droppableId={props.row + "," + props.col}>
            {(provided) => (
            <div 
            className={(isInArray(props.availableMoves, props.row, props.col)) ? "square available" : squareClass}  
            ref={provided.innerRef} 
            {...provided.droppableProps}>
                {(0 < props.boardArray[props.row][props.col]) ? <Piece col={props.col} row={props.row} boardArray={props.boardArray}></Piece> : null}      
                {provided.placeholder}
            </div>
            )}
        </Droppable>

    )
}

export default Square;