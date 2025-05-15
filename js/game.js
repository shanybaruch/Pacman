'use strict'

const WALL = '🟦'
const FOOD = '•'
const EMPTY = ' '
const SUPERFOOD = '⚪'
const CHERRY = '🍒'


const gGame = {
    score: 0,
    isOn: false
}
var gBoard
//add cherry in random cell
var gAddCherryInterval
//clean cherry cell interval
var gClearCherryinterval

//what in cell before we put the cherry
var gCurrCellContent
//cherry location cell
var gCherryCellLocation


function init() {

    //reset Previous game
    if (gGhostsInterval) clearInterval(gGhostsInterval)
    clearGhost()
    resetScore()
    hideMsgGameOver()

    //create new game
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    // create board in dom
    renderBoard(gBoard, '.board-container')

    //put a cherry in interval
    addCherryCell(gBoard)
    gClearCherryinterval = setInterval(clearPrevCherryCell, 5000, gBoard)
    gAddCherryInterval = setInterval(addCherryCell, 5000, gBoard)

    gGame.isOn = true
}

function buildBoard() {
    const size = 12
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 ) {
                board[i][j] = WALL
            }
        }
    }
    board[size / 2][size / 2] = WALL
    board[size / 2 - 1][size / 2] = WALL
    board[size / 2][size / 2 - 1] = WALL
    board[size / 2 - 1][size / 2 - 1] = WALL

    board[1][1] = SUPERFOOD
    board[board.length - 2][board.length - 2] = SUPERFOOD
    board[1][board.length - 2] = SUPERFOOD
    board[board.length - 2][1] = SUPERFOOD

    return board
}

function clearPrevCherryCell(board) {

    board[gCherryCellLocation.i][gCherryCellLocation.j] = gCurrCellContent

    renderCell(gCherryCellLocation, gCurrCellContent)
}

function addCherryCell(board) {

    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === FOOD || board[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    gCherryCellLocation = emptyCells[randIdx]

    gCurrCellContent = board[gCherryCellLocation.i][gCherryCellLocation.j]

    // update modal
    board[gCherryCellLocation.i][gCherryCellLocation.j] = CHERRY

    //update dom
    renderCell(gCherryCellLocation, CHERRY)
}

function updateScore(diff) {
    // TODO: update model 
    gGame.score += diff

    // TODO: update dom
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    showGameOver()
    showPlayAgain()
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    clearInterval(gClearCherryinterval)
    clearInterval(gAddCherryInterval)
}

function showGameOver() {
    var elMsgGameOver = document.querySelector('.msg-gameover')
    elMsgGameOver.classList.remove('hide')
}

function hideMsgGameOver() {

    var elBtnPlayAgain = document.querySelector('.btn-playagain')
    if (elBtnPlayAgain.classList.contains('hide')) { }
    else elBtnPlayAgain.classList.add('hide')

    var elMsgGameOver = document.querySelector('.msg-gameover')
    if (elMsgGameOver.classList.contains('hide')) { }
    else elMsgGameOver.classList.add('hide')

    var elMsgVictory = document.querySelector('.msg-victory')
    if (elMsgVictory.classList.contains('hide')) { }
    else elMsgVictory.classList.add('hide')

}

function msgVictory() {
    var elMsgVictory = document.querySelector('.msg-victory')
    elMsgVictory.classList.remove('hide')

    showPlayAgain()
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    clearInterval(gClearCherryinterval)
    clearInterval(gAddCherryInterval)
}

function resetScore() {
    gGame.score = 0
    updateScore(0)
}

function showPlayAgain() {
    var elBtnPlayAgain = document.querySelector('.btn-playagain')
    elBtnPlayAgain.classList.remove('hide')
}