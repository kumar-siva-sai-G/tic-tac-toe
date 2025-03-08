document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const newGameBtn = document.getElementById("newGame");
    const popup = document.getElementById("winnerPopup");
    const winnerMessage = document.getElementById("winnerMessage");
    const closePopup = document.getElementById("closePopup");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes("") ? null : "Draw";
    }

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        let winner = checkWinner();

        if (winner) {
            gameActive = false;
            if (winner === "Draw") {
                winnerMessage.textContent = "It's a Draw!";
            } else {
                winnerMessage.textContent = `Player ${winner} Wins!`;
            }
            popup.style.display = "block";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        cells.forEach(cell => cell.textContent = "");
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    newGameBtn.addEventListener("click", restartGame);
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
        restartGame();
    });
});
