export function checkAvailableMoves(pieces, position, newPositionIndex, player) {
    let left = position[1]-1;
    let right = position[1]+1;

    if(player === 1) {
        let up = position[0]+1;
        if (newPositionIndex[0] === up+1 && newPositionIndex[1] === left-1 && 2 === pieces[up][left]) {
            //Eats upper left piece
            pieces[position[0]][position[1]] = 0;
            pieces[up][left] = 0;
            pieces[up+1][left-1] = 1;
        } else if(newPositionIndex[0] === up+1 && newPositionIndex[1] === right+1 && 2 === pieces[up][right]){
            //Eats upper right piece
            pieces[position[0]][position[1]] = 0;
            pieces[up][right] = 0;
            pieces[up+1][right+1] = 1;
        } else if(newPositionIndex[0] === up && (newPositionIndex[1] === left || newPositionIndex[1] === right)){
            //Moves
            pieces[position[0]][position[1]] = 0;
            pieces[newPositionIndex[0]][newPositionIndex[1]] = 1;
        }

        //Check if it's a winning move
        for(let i in pieces[pieces.length-1]){
            if(pieces[pieces.length-1][i] === 1){
                pieces[pieces.length-1][i] = 3;
            }
        }

    } else {
        let down = position[0]-1;
        if (newPositionIndex[0] === down-1 && newPositionIndex[1] === left-1 && 1 === pieces[down][left]) {
            //Eats upper left piece
            pieces[position[0]][position[1]] = 0;
            pieces[down][left] = 0;
            pieces[down-1][left-1] = 2;
        } else if(newPositionIndex[0] === down-1 && newPositionIndex[1] === right+1 && 1 === pieces[down][right]){
            //Eats upper right piece
            pieces[position[0]][position[1]] = 0;
            pieces[down][right] = 0;
            pieces[down-1][right+1] = 2;
        } else if(newPositionIndex[0] === down && (newPositionIndex[1] === left || newPositionIndex[1] === right)) {
            //Moves
            pieces[position[0]][position[1]] = 0;
            pieces[newPositionIndex[0]][newPositionIndex[1]] = 2;
        }

        //Check if it's a winning move
        for(let i in pieces[0]){
            if(pieces[0][i] === 2){
                pieces[0][i] = 3;
            }
        }
    }
};
