import { PLAYER_1, PLAYER_2, PLAYER_2_KING, EMPTY, PLAYER_1_KING } from "./types";

let availableMoves;
let left;
let right;
let up;
let down;

function checkIfItCanEat (playerToEat, playerToEatKing, board) {
    if (up+1 < board.length && 0 <= left-1 //While it's not out of range
        && (playerToEat === board[up][left] || playerToEatKing === board[up][left])  
        && board[up+1][left-1] === EMPTY) { 
        //Check if it's able to capture left
        availableMoves.push([up+1, left-1]);
    };

    if (up+1 < board.length && right+1 < board.length //While it's not out of range
        && (playerToEat === board[up][right] || playerToEatKing === board[up][right])
        && board[up+1][right+1] === EMPTY) { 
        //Check if it's able to capture right
        availableMoves.push([up+1, right+1]);
    };

    if (0 <= down-1 && 0 <= left-1
        && (playerToEat === board[down][left] || playerToEatKing === board[down][left]) 
        && board[down-1][left-1] === EMPTY) {
        availableMoves.push([down-1, left-1]);
    } 

    if (0 <= down-1 && right+1 < board.length
        && (playerToEat === board[down][right] || playerToEatKing === board[down][right])
        && board[down-1][right+1] === EMPTY) {
        availableMoves.push([down-1, right+1]);
    }
    return availableMoves;
}

export function checkAvailableMovesKing (board, position, player, playerCount) {
    availableMoves = [];
    left = position[1]-1;
    right = position[1]+1;
    up = position[0]+1;
    down = position[0]-1;

    if (player === PLAYER_1_KING) {
        availableMoves = checkIfItCanEat(PLAYER_2, PLAYER_2_KING, board);
    } else {
        availableMoves = checkIfItCanEat(PLAYER_1, PLAYER_1_KING, board);
    }

    if (EMPTY === availableMoves.length) { //If it can't capture enemy move to valid cell
        if(up < board.length) {
            if(0 <= left && EMPTY === board[up][left]) {
                availableMoves.push([up, left])
            };
    
            if(right < board.length && EMPTY === board[up][right]) {
                availableMoves.push([up, right])
            };
        }

        if(0 <= down) {
            if(0 <= left && EMPTY === board[down][left]) {
                availableMoves.push([down, left])
            };

            if(right < board.length && EMPTY === board[down][right]) {
                availableMoves.push([down, right])
            };
        }
    }

    return availableMoves;
}