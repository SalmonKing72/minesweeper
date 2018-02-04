const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
	let board = [];

	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		let row = [];
		for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
			row.push(' ');
		}
		board.push(row);
	}

	return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
	let board = [];

	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		let row = [];
		for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
			row.push(null);
		}
		board.push(row);
	}

	let numberOfBombsPlaced = 0;

	while (numberOfBombsPlaced < numberOfBombs) {
		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		let randomColIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColIndex] !== 'B') {
			board[randomRowIndex][randomColIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}

	return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
	const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;

	neighborOffsets.forEach((offSet) => {
		const neighborRowIndex = rowIndex + offSet[0];
		const neighborColumnIndex = colIndex + offSet[1];
		if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows &&
			neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	});
	return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
	if (playerBoard[rowIndex][colIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][colIndex] === 'B') {
		playerBoard[rowIndex][colIndex] = 'B';
	} else {
		playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
	}
};

const printBoard = (board) => {
	console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);