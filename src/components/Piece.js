import React from 'react';
import './components.css';
import { Draggable } from 'react-beautiful-dnd';

function Piece(props) {
    let id = 8*props.row+props.col;
    let player = props.boardArray[props.row][props.col];
    return (
        
        <Draggable key={id.toString()} draggableId={props.row + "," + props.col + "," + player} index={parseInt(id, 10)}>
            { (provided) => (
            <div 
            ref = {provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className = {(player === 1) ? "piece dark-brown" : "piece light-gold"}
            ></div> 
            ) }
        </Draggable>
    )
}

export default Piece;