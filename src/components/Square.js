import React from 'react';
import './components.css';
import Piece from './Piece';
import { Droppable } from 'react-beautiful-dnd';

function isEven(i) {
    return (i % 2 === 0);
}

function Square (props) {
    return (
        <Droppable droppableId={props.row + "," + props.col}>
            {(provided) => (
            <div className={( ( isEven(props.col)&&isEven(props.row) ) || ( !isEven(props.col)&&!isEven(props.row) ) )? 
                "square gold" : "square brown" }  ref={provided.innerRef} {...provided.droppableProps}>
                {(0 < props.boardArray[props.row][props.col]) ? <Piece col={props.col} row={props.row} boardArray={props.boardArray}></Piece> : null}      
                {provided.placeholder}
            </div>
            )}
        </Droppable>

    )
}

export default Square;