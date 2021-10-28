import React from 'react';
import './components.css';

function isEven(i) {
    return (i % 2 === 0);
}

function Square (props) {
      return (
          <div class={( ( isEven(props.col)&&isEven(props.row) ) || ( !isEven(props.col)&&!isEven(props.row) ) )? 
            "square black" : "square blue" }></div>
      )
}

function Board() {
    var rows = [];
    for (var i = 0; i < 8; i++) {
        for(var j =0; j<8; j++){
            rows.push(<Square col={i} row={j} />);
        }
    }
    return (
        <div class="board">
         {rows}   
        </div>
    )
}

export default Board;