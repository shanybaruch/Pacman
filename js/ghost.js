'use strict'

const GHOST = '<img src="img/orangeghost.png" class="ghost">'
var gGhosts = []

var gGhostsInterval

function createGhosts(board) {

    if (gGhostsInterval) clearInterval(gGhostsInterval)
    // TODO: Create 3 ghosts and an interval
    while (gGhosts.length < 3) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    var ghost = {
        location: { i: 4, j: 6 },
        currCellContent: FOOD,
        color: getRandomColor(),
    }

    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost)
}

//for loop all ghost
function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN && gIsSuper) {
        renderCell(ghost.location, PACMAN)
        const idx = ghostIndexByLocation(nextLocation)
        gGhosts.splice(idx, 1)
    }
    if (nextCell === PACMAN && !gIsSuper) return gameOver()

}

//options ghosts move
function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gIsSuper) {
        return '<img src="img/whiteghost.png" class="ghost">'
    }
    return ghost.color
}

function clearGhost() {
    gGhosts = []
}

//random color ghost
function getRandomColor() {
    var colors = ['<img src="img/orangeghost.png" class="ghost">',
        '<img src="img/redghost.png" class="ghost">',
        '<img src="img/pinkghost.png" class="ghost">',
        '<img src="img/lightblueghost.png" class="ghost">'
    ]
    var idx = Math.floor(Math.random() * colors.length);

    return colors[idx]
}

function changeGhostColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}

function ghostIndexByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) return i
    }
}