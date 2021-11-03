/*
    Save Game and Turn in local storage
    to be able to restore game when refreshing page
*/
export function saveGame(board, turn) {
    let boardJSON = JSON.stringify(board);
    localStorage.setItem('lastGame', boardJSON);
    localStorage.setItem('lastTurn', turn);
}

export function getLastGame() {
    let boardJSON = localStorage.getItem('lastGame');
    return JSON.parse(boardJSON);
}

export function getLastTurn() {
    let turnJSON = localStorage.getItem('lastTurn');
    return JSON.parse(turnJSON);
}