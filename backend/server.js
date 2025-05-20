const express = require('express');
const bodyParser = require('body-parser');
const { solveSudoku } = require('./controllers/solver');

const app = express();
app.use(bodyParser.json());
app.use(express.static('frontend'));

// API to solve Sudoku puzzle
app.post('/solve', (req, res) => {
    const board = req.body.board;
    const solution = solveSudoku(board);
    if (solution) {
        res.json({ success: true, board: solution });
    } else {
        res.json({ success: false });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
