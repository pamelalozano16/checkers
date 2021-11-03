import {PLAYER_1, PLAYER_2, PLAYER_1_KING, PLAYER_2_KING,ACCEPT, FINISH, DENY, EMPTY}  from './types';
import {checkAvailableMovesKing} from './checkAvailableMovesKings';

let playerCount = new Array(4);
playerCount[PLAYER_1] = 12;
playerCount[PLAYER_2] = 12;

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
            && (PLAYER_2 === board[up][left] || PLAYER_2_KING === board[up][left]) 
            && board[up+1][left-1] === EMPTY) { 
            //Check if it's able to capture left
            availableMoves.push([up+1, left-1]);
        };

        if (up+1 < board.length && right+1 < board.length //While it's not out of range
            && (PLAYER_2 === board[up][right] || PLAYER_2_KING === board[up][right])  
            && board[up+1][right+1] === EMPTY) { 
            //Check if it's able to capture right
            availableMoves.push([up+1, right+1]);
        };

        if (EMPTY === availableMoves.length) { //If it can't capture enemy move to valid cell
            if(EMPTY === board[up][left]) {
                availableMoves.push([up, left])
            };

            if(EMPTY === board[up][right]) {
                availableMoves.push([up, right])
            };
        }

    } else if (player === PLAYER_2) {
        let down = position[0]-1;
        if (0 <= down-1 && 0 <= left-1
            && (PLAYER_1 === board[down][left] || PLAYER_1_KING === board[down][left]) 
            && board[down-1][left-1] === EMPTY) {
            availableMoves.push([down-1, left-1]);
        } 

        if (0 <= down-1 && right+1 < board.length
            && (PLAYER_1 === board[down][right] || PLAYER_1_KING === board[down][right])  
            && board[down-1][right+1] === EMPTY) {
            availableMoves.push([down-1, right+1]);
        }
        
        if (EMPTY === availableMoves.length) { //If it can't capture enemy move to valid cell
            if(EMPTY === board[down][left]) {
                availableMoves.push([down, left])
            };

            if(EMPTY === board[down][right]) {
                availableMoves.push([down, right])
            };
        }
    } else {
        availableMoves = checkAvailableMovesKing(board, position, player, playerCount);
    }
    
    return availableMoves;
}

export function checkMoveAndUpdate(board, player, availableMoves, newPositionIndex, position) {
    let status = DENY;
    let capturedEnemy = false;
    if(isInArray(availableMoves, newPositionIndex[0], newPositionIndex[1])) {
        //Move piece
        board[position[0]][position[1]] = EMPTY;
        board[newPositionIndex[0]][newPositionIndex[1]] = player;

        //Check if piece ate another piece
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

        if(capturedEnemy) {
            (player === PLAYER_1 || player === PLAYER_1_KING) ? playerCount[PLAYER_2]-- : playerCount[PLAYER_1]--;
            console.log(playerCount);
            if (0 === playerCount[PLAYER_1] || 0 === playerCount[PLAYER_2]) {
                return FINISH;
            }
        }

        status = ACCEPT;
    }

    //Check if a piece turns into king
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
