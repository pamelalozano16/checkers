/*
    Save Game and Turn in local storage
    to be able to restore game when refreshing page
*/
export function saveGame(board, turn, playerCount) {
    let boardJSON = JSON.stringify(board);
    let playerCountJSON = JSON.stringify(playerCount);
    localStorage.setItem('lastGame', boardJSON);
    localStorage.setItem('playerCount', playerCountJSON);
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

export function getPlayerCount() {
    let playerCount = localStorage.getItem('playerCount');
    return JSON.parse(playerCount);
}