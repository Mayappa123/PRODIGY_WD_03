const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "1️⃣";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let moveCountX = 0;
let moveCountO = 0;
let selectedCellIndex = -1; // Track the selected cell for moving a marker

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute("data-index"));

  if (!gameActive) {
    return;
  }

  if (
    selectedCellIndex !== -1 &&
    cell.textContent === "" &&
    gameState[selectedCellIndex] === currentPlayer
  ) {
    // Move marker to the new cell
    gameState[selectedCellIndex] = "";
    cells[selectedCellIndex].textContent = "";
    cells[selectedCellIndex].style.backgroundColor = ""; // Reset the background color

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = currentPlayer === "1️⃣" ? "green" : "yellow";

    selectedCellIndex = -1;
    updateHighlight();
    if (checkWin()) {
      message.textContent = `Congratulations...player ${currentPlayer} won the game!`;
      message.style.color = "green"; // Highlight the winning message in green
      gameActive = false;
      handleWin();
      return;
    }
    currentPlayer = currentPlayer === "1️⃣" ? "2️⃣" : "1️⃣";
    message.textContent = `Player ${currentPlayer}'s turn`;
    return;
  }

  if (gameState[cellIndex] !== "") {
    // Select marker to move
    if (gameState[cellIndex] === currentPlayer) {
      selectedCellIndex = cellIndex;
      message.textContent = `Player ${currentPlayer}, move your marker`;
    }
    return;
  }

  if (currentPlayer === "1️⃣" && moveCountX < 3) {
    gameState[cellIndex] = "1️⃣";
    cell.textContent = "1️⃣";
    cell.style.backgroundColor = "green";
    moveCountX++;
  } else if (currentPlayer === "2️⃣" && moveCountO < 3) {
    gameState[cellIndex] = "2️⃣";
    cell.textContent = "2️⃣";
    cell.style.backgroundColor = "yellow";
    moveCountO++;
  } else {
    return;
  }

  updateHighlight();
  if (checkWin()) {
    message.textContent = `Congratulations...player ${currentPlayer} won the game!`;
    message.style.color = "green"; // Highlight the winning message in green
    gameActive = false;
    handleWin();
    return;
  }

  currentPlayer = currentPlayer === "1️⃣" ? "2️⃣" : "1️⃣";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function handleWin() {
  const losingMarker = currentPlayer === "1️⃣" ? "2️⃣" : "1️⃣";
  cells.forEach((cell) => {
    if (cell.textContent === losingMarker) {
      cell.style.opacity = "0.3";
    }
  });
}

function updateHighlight() {
  cells.forEach((cell, index) => {
    if (gameState[index] === "") {
      cell.classList.add("empty");
    } else {
      cell.classList.remove("empty");
    }
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "1️⃣";
  moveCountX = 0;
  moveCountO = 0;
  selectedCellIndex = -1;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#a9a3f3";
    cell.style.opacity = "1"; // Reset opacity
  });
  message.style.color = "black"; // Reset message color
  updateHighlight();
  message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

updateHighlight();
message.textContent = `Player ${currentPlayer}'s turn`;
