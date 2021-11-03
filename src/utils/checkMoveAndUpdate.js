import {PLAYER_1, PLAYER_2, PLAYER_1_KING, PLAYER_2_KING,ACCEPT, FINISH, DENY, EMPTY}  from './types';

//Keep count to finish game if there's no pieces left
let playerCount = new Array(4);
playerCount[PLAYER_1] = 12;
playerCount[PLAYER_2] = 12;

/*
    Check if row and column match an item in array
*/
function isInArray(array, row, col) {
    for(let i in array){
        if(array[i][0] === row && array[i][1] === col) {
            return true;
        }
    }
    return false;
}

/*
    Checks if the move done by the player is valid
    comparing with the availableMoves array.
    If it is, it updates the board and pieces.
*/
export function checkMoveAndUpdate(board, player, availableMoves, newPositionIndex, position) {
    let status = DENY;
    let capturedEnemy = false;

    if(isInArray(availableMoves, newPositionIndex[0], newPositionIndex[1])) {
        //Move piece
        board[position[0]][position[1]] = EMPTY;
        board[newPositionIndex[0]][newPositionIndex[1]] = player;

        //Check if piece captured another piece
        if(position[1]+2 === newPositionIndex[1]) { //Ate right piece
            if(position[0]+2 === newPositionIndex[0]) {
                board[position[0]+1][position[1]+1] = EMPTY;    
            } else {
                board[position[0]-1][position[1]+1] = EMPTY;  
            }
            capturedEnemy = true; 
        }

        if(position[1]-2 === newPositionIndex[1]) { //Ate left piece
            if(position[0]+2 === newPositionIndex[0]) {
                board[position[0]+1][position[1]-1] = EMPTY;    
            } else {
                board[position[0]-1][position[1]-1] = EMPTY;   
            }
            capturedEnemy = true; 
        }


        //If enemy is captured keep count of players and check if game is finished
        if(capturedEnemy) {
            (player === PLAYER_1 || player === PLAYER_1_KING) ? playerCount[PLAYER_2]-- : playerCount[PLAYER_1]--;
            if (0 === playerCount[PLAYER_1] || 0 === playerCount[PLAYER_2]) {
                return FINISH;
            }
        }

        status = ACCEPT;
    }

    //King checkers mechanics (when a checker hits the last row and gets an ability to move backwards)
    if (player === PLAYER_1) {
        for(let i in board[board.length-1]){
            if(board[board.length-1][i] === PLAYER_1) {
                    board[board.length-1][i] = PLAYER_1_KING;
            }
        }
    } else {
        for(let i in board[0]){
            if(board[0][i] === PLAYER_2){
                    board[0][i] = PLAYER_2_KING;
            }
        }
    }

    return status;
};
