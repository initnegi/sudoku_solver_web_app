document.getElementById('solve-btn').addEventListener('click', solveSudoku);

function getBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            row.push(cell.value ? parseInt(cell.value) : 0);
        }
        board.push(row);
    }
    return board;
}

async function solveSudoku() {
    const board = getBoard();
    const response = await fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board })
    });

    const result = await response.json();
    if (result.success) {
        displayBoard(result.board);
        document.getElementById('message').innerText = "Sudoku Solved!";
    } else {
        document.getElementById('message').innerText = "No solution exists!";
    }
}

function displayBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.value = board[i][j] === 0 ? '' : board[i][j];
        }
    }
}
