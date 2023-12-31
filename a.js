document.addEventListener("DOMContentLoaded", function () {
  let music = new Audio("bg.mp3");
  let t = new Audio("ping.mp3");
  let gameover = new Audio("go.mp3");
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const resultElement = document.getElementById("result");
  const resetButton = document.getElementById("resetBtn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  function checkWinner() {
    // Define all possible winning combinations as arrays of cell indices
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    let winner = null;

    // Use forEach to iterate through each winning combination
    winningCombinations.forEach((combo) => {
      const [a, b, c] = combo;

      // Check if the symbols in the current combination are the same and not empty
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        // If true, set the winner variable
        winner = gameBoard[a];
      }
    });

    // Return the winner (or null if no winner is found)
    return winner;
  }

  function checkTie() {
    return gameBoard.every((cell) => cell !== "");
  }

  function handleClick(index) {
    if (!gameActive || gameBoard[index] !== "") return;
    t.play()
    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      resultElement.innerText = `Player ${winner} wins!`;
      
        document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width='256px';
    
      gameActive = false;
    } else if (checkTie()) {
      gameover.play()
      resultElement.innerText = "It's a tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerText = "";
    });

    resultElement.innerText = "";
    currentPlayer = "X";
    gameActive = true;
    if(gameActive==false){
      document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width='0px';
    }
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
    music.play();
  });

  resetButton.addEventListener("click", resetGame);
});
