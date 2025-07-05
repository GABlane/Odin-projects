(function () {

    function CellFactory() {
        let value = 0;

        return {
            setValue: (player) => value = player,
            getValue: () => value,
            isEmpty: () => value === 0
        };
    }

    function TileElementFactory(row, col, onTileClick) {
        const tile = document.createElement("button");
        tile.classList.add("tile");
        tile.dataset.row = row;
        tile.dataset.col = col;
        tile.textContent = "";

        tile.addEventListener("click", function (e) {
            const clickedRow = parseInt(e.target.dataset.row);
            const clickedCol = parseInt(e.target.dataset.col);
            onTileClick(clickedRow, clickedCol);
        });

        return {
            element: tile,
            updateDisplay: (value) => {
                tile.textContent = value !== 0 ? value : "";
            },
            clear: () => {
                tile.textContent = "";
            }
        };
    }

    function GameboardFactory(onTileClick) {
        const ROWS = 3;
        const COLS = 3;
        let board = [];
        let tileElements = [];

        const gameContainer = document.getElementById("game-container");

        // Initialize the board
        function initializeBoard() {
            gameContainer.innerHTML = '';
            board = [];
            tileElements = [];

            for (let i = 0; i < ROWS; i++) {
                board[i] = [];
                tileElements[i] = [];

                for (let j = 0; j < COLS; j++) {
                    // Create cell data
                    board[i][j] = CellFactory();

                    // Create tile element
                    const tileElement = TileElementFactory(i, j, onTileClick);
                    tileElements[i][j] = tileElement;

                    // Add to DOM
                    gameContainer.appendChild(tileElement.element);
                }
            }
        }

        // Initialize on creation
        initializeBoard();

        return {
            getBoard: () => board,
            playCell: (row, col, player) => {
                board[row][col].setValue(player);
            },
            renderBoard: () => {
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLS; j++) {
                        const value = board[i][j].getValue();
                        tileElements[i][j].updateDisplay(value);
                    }
                }
            },
            resetBoard: () => {
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLS; j++) {
                        board[i][j].setValue(0);
                        tileElements[i][j].clear();
                    }
                }
            }
        };
    }

    // Factory function for win condition checking
    function WinCheckerFactory() {
        function checkWinner(board, row, col) {
            const player = board[row][col].getValue();

            // Check row
            if (board[row].every(cell => cell.getValue() === player)) {
                return true;
            }

            // Check column
            if (board.every(r => r[col].getValue() === player)) {
                return true;
            }

            // Check main diagonal
            if (row === col && [0, 1, 2].every(i => board[i][i].getValue() === player)) {
                return true;
            }

            // Check anti-diagonal
            if (row + col === 2 && [0, 1, 2].every(i => board[i][2 - i].getValue() === player)) {
                return true;
            }

            return false;
        }

        function checkTie(board) {
            return board.every(row => row.every(cell => !cell.isEmpty()));
        }

        return { checkWinner, checkTie };
    }

    function UIControllerFactory() {
        const currentPlayerElement = document.getElementById('current-player');
        const gameStatusElement = document.getElementById('game-status');

        return {
            updateCurrentPlayer: (player) => {
                currentPlayerElement.textContent = player;
            },
            showWinner: (player) => {
                gameStatusElement.textContent = `Player ${player} wins!`;
            },
            showTie: () => {
                gameStatusElement.textContent = "It's a tie!";
            },
            clearStatus: () => {
                gameStatusElement.textContent = '';
            }
        };
    }

    // Main game factory function
    function GameFactory() {
        let currentPlayer = 'X';
        let gameActive = true;

        const winChecker = WinCheckerFactory();
        const ui = UIControllerFactory();
        const board = GameboardFactory(handleTileClick);

        function handleTileClick(row, col) {
            if (!gameActive) return;

            const gameBoard = board.getBoard();

            // Check if cell is already taken
            if (!gameBoard[row][col].isEmpty()) {
                console.log("Cell already taken!");
                return;
            }

            // Play the move
            board.playCell(row, col, currentPlayer);
            board.renderBoard();

            // Check for winner
            if (winChecker.checkWinner(gameBoard, row, col)) {
                ui.showWinner(currentPlayer);
                gameActive = false;
                return;
            }

            // Check for tie
            if (winChecker.checkTie(gameBoard)) {
                ui.showTie();
                gameActive = false;
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            ui.updateCurrentPlayer(currentPlayer);
        }

        function restart() {
            board.resetBoard();
            currentPlayer = 'X';
            gameActive = true;
            ui.updateCurrentPlayer(currentPlayer);
            ui.clearStatus();
        }

        return { restart };
    }

    const game = GameFactory();

    document.getElementById('restart').addEventListener('click', () => {
        game.restart();
    });

})(); 