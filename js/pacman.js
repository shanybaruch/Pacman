'use strict'

var PACMAN = '<img src="img/pacmanleft.png" class="pacman">'
var gPacman
var gIsSuper = false

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 4, j: 10 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === SUPERFOOD) {
        if (gIsSuper) {
            console.log(`Already super!`)
            return
        }
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)

    //save original color 
    var originalColors = []
    for (var i = 0; i < gGhosts.length; i++) {
        originalColors.push(gGhosts[i].color)
    }

    //add to array
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = originalColors[i]
    }

    //if is super food
    if (nextCell === SUPERFOOD) {
        gIsSuper = true
        changeGhostColor()

        setTimeout(() => {
            gIsSuper = false
            changeGhostColor()
            createGhosts(gBoard)

        }, 5000)
    }

    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)

    //check victory
    checkVictory()

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gIsSuper) return gameOver()
    if (nextCell === GHOST && gIsSuper) {
        const idx = ghostIndexByLocation(nextLocation)
        gGhosts.splice(idx, 1)
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            PACMAN = '<img src="img/pacmanup.png" class="pacman">'
            nextLocation.i -= 1
            break;

        case 'ArrowDown':
            PACMAN = '<img src="img/pacmandown.png" class="pacman">'
            nextLocation.i += 1
            break;

        case 'ArrowLeft':
            PACMAN = '<img src="img/pacmanleft.png" class="pacman">'
            nextLocation.j -= 1
            break;

        case 'ArrowRight':
            PACMAN = '<img src="img/pacmanright.png" class="pacman">'
            nextLocation.j += 1
            break;
    }
    // TODO: figure out nextLocation
    return nextLocation
}

function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) {
                return false
            }
        }
    }
    msgVictory()
    return true
}