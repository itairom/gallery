'use strict'
const PACMAN = '😷';

var gPacman;
var gSuperPowerTimeOut
var isSuperPower = false

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === GHOST && isSuperPower === true) {


        for (var k = 0; k < gGhosts.length - 1; k++) {

            if (gGhosts[k].location.i === nextLocation.i &&
                gGhosts[k].location.j === nextLocation.j) {

                var temp = gGhosts.splice(gGhosts[k], 1)
                gDeadGhosts.push(temp)
                console.log('gGhosts', gGhosts)
                console.log('gDeadGhostss', gDeadGhosts)

                // gBoard[emptyCells[randNum].i][emptyCells[randNum].j] = CHERRY
                // renderCell({ i: emptyCells[randNum].i, j: emptyCells[randNum].j }, CHERRY)


                gBoard[nextLocation.i][nextLocation.j] = EMPTY
                renderCell({ i: nextLocation.i, j: nextLocation.j, }, EMPTY)

                //renderCell(nextCell, '')
            }

        }




    } else if (nextCell === GHOST) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }


    if (nextCell === POWER_FOOD) {
        updateScore(1)
            //gSuperPowerTimeOut = setInterval(superPower, 10000)
            //change ghost color


        // for (var i = 0; i < 3; i++) {
        //     gGhosts[i].color = 'green'
        //     getGhostHTML(gGhosts[i])
        // }

        superPower()
    }


    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PACMAN)

    // console.log(totalFood);
    // console.log(gGame.score);

    if (gGame.score === totalFood - 1) {
        console.log('finish');
        victory()
    }
    // TODO: return if cannot move
    // TODO: hitting a ghost?  call gameOver
    // TODO: update the model
    // TODO: update the DOM
    // TODO: Move the pacman
    // TODO: update the model
    // TODO: update the DOM
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
                break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }

    return nextLocation;
}

function superPower() {

    console.log('got super power');
    isSuperPower = true
    setTimeout(superPowerOff, 10000)

}

function superPowerOff() {
    //clearing the super power interval
    clearInterval(gSuperPowerTimeOut)
    isSuperPower = false

    console.log('clear the interval');
}