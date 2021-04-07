var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/glue.jpg" />';

var COLLECT_SOUND = new Audio('./sounds/collected.mp3')

var gBoard;
var gGamerPos;
var gBallCount = 0;
var gIsStuck = false;
var gTotalBallCount = 2
var gBallInterval;
var gGlueInterval;


function initGame() {
	gIsStuck = false;
	gBallCount = 0;
	if (gBallInterval) clearInterval(gBallInterval);

	elResetBtn = document.querySelector('.reset-button');
	elResetBtn.style.display = 'none';
	var elBallCount = document.querySelector('.ballcount');
	elBallCount.innerText = gBallCount;

	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallInterval = setInterval(addBalls, 1500);
	gGlueInterval = setInterval(addGlue, 5000);
}

function getEmptyCells() {
	var emptyCells = []
	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[0].length - 1; j++) {
			var currCell = gBoard[i][j]
			if (!currCell.gameElement) {
				emptyCells.push({ i, j })
			}
		}
	}
	return emptyCells
}

function addBalls() {
	var emptyCells = getEmptyCells()

	var i = getRandomInt(0, emptyCells.length);

	var pos = emptyCells[i]

	gTotalBallCount++

	gBoard[pos.i][pos.j].gameElement = BALL;

	renderCell(pos, BALL_IMG)
}

function addGlue() {
	var emptyCells = getEmptyCells()
	var i = getRandomInt(0, emptyCells.length);

	var pos = emptyCells[i]


	gBoard[pos.i][pos.j].gameElement = GLUE;

	renderCell(pos, GLUE_IMG)

	setTimeout(deleteGlue, 3000, pos);
}

function deleteGlue(pos) {
	if (gBoard[pos.i][pos.j].gameElement === GAMER) return
	gBoard[pos.i][pos.j].gameElement = '';
	renderCell(pos, '')
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	board[0][5].type = FLOOR;
	board[9][5].type = FLOOR;
	board[5][0].type = FLOOR;
	board[5][11].type = FLOOR;

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[getRandomInt(1, 9)][getRandomInt(1, 11)].gameElement = BALL;
	board[getRandomInt(1, 9)][getRandomInt(1, 11)].gameElement = BALL;

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
	var elBallCount = document.querySelector('.ballcount');
	elBallCount.innerText = gBallCount;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	if (gIsStuck) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			COLLECT_SOUND.play();
			gBallCount++;
			var elBallCount = document.querySelector('.ballcount');
			elBallCount.innerText = gBallCount + '';
			if (gTotalBallCount === gBallCount) victory();
		}

		if (targetCell.gameElement === GLUE) {
			gIsStuck = true;

			setTimeout(function () {
				gIsStuck = false;
			}, 3000);
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		if (i === 1) {
			i = gBoard.length - 1;
		} else if (i === gBoard.length - 1) {
			i = 0;
		}

		if (j === 0) {
			j = 11;
		} else if (j === 11) {
			j = 0;
		}

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function victory() {
	gIsStuck = true;
	clearInterval(gBallInterval);
	clearInterval(gGlueInterval);
	gBallInterval = null
	gGlueInterval = null
	elResetBtn = document.querySelector('.reset-button');
	elResetBtn.style.display = 'inline';
	var elBallCount = document.querySelector('.ballcount');
	elBallCount.innerText = 'VICTORY!';
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

