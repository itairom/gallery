'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🌮'
const CHERRY = '🍒'

var totalFood = 0
var gFoodCollected = +2
var gBoard;
var placeCherry

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    setInterval(placeCherry, 10000)
        //placeCherry()

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (board[i][j] === FOOD) totalFood++
        }
    }
    board[1][1] = POWER_FOOD
    board[1][board.length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board.length - 2] = POWER_FOOD



    console.log(totalFood)
    return board;
}


function placeCherry() {
    var emptyCells = getEmptyCells()
    var randNum = getRandomIntInclusive(0, emptyCells.length - 1)
    gBoard[emptyCells[randNum].i][emptyCells[randNum].j] = CHERRY
    renderCell({ i: emptyCells[randNum].i, j: emptyCells[randNum].j }, CHERRY)

}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
        // TODO: update model and dom
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    var elModal = document.querySelector('.play-again')
    elModal.style.display = "block"
    var elH1 = document.querySelector('.game-over')
    elH1.style.display = "block"
}

function victory() {

    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    var elModal = document.querySelector('.play-again')
    elModal.style.display = "block"
    var elH1 = document.querySelector('.victory')
    elH1.style.display = "block"
}

function resetGame() {
    var elModal = document.querySelector('.play-again')
    console.log('reset');
    gGhosts = []
    elModal.style.display = "none"
    gGame.isOn = true
    gGame.score = 0
    init()
        //clearInterval(gIntervalGhosts)
}