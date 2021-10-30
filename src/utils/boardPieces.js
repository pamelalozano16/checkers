import isEven from "./isEven";

function createInitialBoard(boardSize) {
    //Create empty board
    let board = Array.apply(null, Array(boardSize)).map(function (x, i) { return []; });
    for(let i=0; i<board.length; i++){
        board[i] = (Array.apply(null, Array(boardSize)).map(function (x, i) { return 0; }));
    }

    //Place player one
    for(let i=0; i<3; i++){
        for(let j=0; j<board[i].length; j++){
            if( ( isEven(i)&&isEven(j) ) || ( !isEven(i)&&!isEven(j) ) ) {
                board[i][j]=1;
            }
        }
    }

    //Place player two
        for(let i=5; i<board.length; i++){
            for(let j=0; j<board[i].length; j++){
                if( ( isEven(i)&&isEven(j) ) || ( !isEven(i)&&!isEven(j) ) ) {
                    board[i][j]=2;
                }
            }
        }
        
    return board;
}

export default createInitialBoard;