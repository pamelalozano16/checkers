import {PLAYER_1, PLAYER_2, ACCEPT, FINISH, DENY, WINNER, EMPTY}  from './types';

function isInArray(array, row, col) {
    for(let i in array){
        if(array[i][0] === row && array[i][1] === col) {
            return true;
        }
    }
    return false;
}


export function checkAvailableMoves(board, position, player) {
    let availableMoves = [];
    let left = position[1]-1;
    let right = position[1]+1;

    if(player === PLAYER_1) {
        let up = position[0]+1;
        if (up+1 < board.length && 0 <= left-1 //While it's not out of range
            && PLAYER_2 === board[up][left] && board[up+1][left-1] === EMPTY) { //Check if it's able to eat
            availableMoves.push([up+1, left-1]);
        } else if (EMPTY === board[up][left]) {
            availableMoves.push([up, left]);
        }
        if (up+1 < board.length && right+1 < board.length //While it's not out of range
            && PLAYER_2 === board[up][right] && board[up+1][right+1] === EMPTY) { //Check if it's able to eat
            availableMoves.push([up+1, right+1]);
        } else if (EMPTY === board[up][right]) {
            availableMoves.push([up, right]);
        }

    } else {
        let down = position[0]-1;
        if (0 <= down-1 && 0 <= left-1 //While it's not out of range
            && PLAYER_1 === board[down][left] && board[down-1][left-1] === EMPTY) { //Check if it's able to eat
            availableMoves.push([down-1, left-1]);
        } else if (EMPTY === board[down][left]) {
            availableMoves.push([down, left]);
        }
        if (0 <= down-1 && right+1 < board.length //While it's not out of range
            && PLAYER_1 === board[down][right] && board[down-1][right+1] === EMPTY) { //Check if it's able to eat
            availableMoves.push([down-1, right+1]);
        } else if (EMPTY === board[down][right]) {
            availableMoves.push([down, right]);
        }
    }

    return availableMoves;
}

export function checkMoveAndUpdate(board, player, availableMoves, newPositionIndex, position) {
    let status = DENY;
    if(isInArray(availableMoves, newPositionIndex[0], newPositionIndex[1])) {
        //Move piece
        board[position[0]][position[1]] = EMPTY;
        board[newPositionIndex[0]][newPositionIndex[1]] = player;

        //Check if piece ate another piece
        if(position[1]+2 === newPositionIndex[1]) { //Ate right piece
            if(player === PLAYER_1) {
                board[position[0]+1][position[1]+1] = EMPTY;    
            } else {
                board[position[0]-1][position[1]+1] = EMPTY;   
            }
        }

        if(position[1]-2 === newPositionIndex[1]) { //Ate left piece
            if(player === PLAYER_1) {
                board[position[0]+1][position[1]-1] = EMPTY;    
            } else {
                board[position[0]-1][position[1]-1] = EMPTY;   
            }
        }

        status = ACCEPT;
    }

    //Check if it's a winning move
    if (player === PLAYER_1) {
        for(let i in board[board.length-1]){
            if(board[board.length-1][i] === PLAYER_1) {
                    board[0][i] = WINNER;
                    status = FINISH;
            }
        }
    } else {
        for(let i in board[0]){
            if(board[0][i] === PLAYER_2){
                    board[0][i] = WINNER;
                    status = FINISH;
            }
        }
    }

    return status;
};
