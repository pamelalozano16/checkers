import React from 'react';
import './components.css';
import { Draggable } from 'react-beautiful-dnd';

function Piece(props) {
    let id = 8*props.row+props.col+1;
    let player = props.boardArray[props.row][props.col];
    let classPlayer;

    if(player === 1) {
        classPlayer = "piece dark-brown";
    } else if (player === 2) {
        classPlayer = "piece light-gold";
    } else if (player === 3){
        classPlayer = "piece light-brown king";
    } else {
        classPlayer = "piece dark-gold king";
    }

    return (
        <Draggable key={id.toString()} draggableId={props.row + "," + props.col + "," + player} index={parseInt(id, 10)}>
            { (provided) => (
            <div 
            ref = {provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className = {classPlayer}
            ></div> 
            ) }
        </Draggable>
    )
}

export default Piece;