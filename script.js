const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const errorMessage = document.getElementById("errorMessage");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "1️⃣";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let moveCount1 = 0;
let moveCount2 = 0;
let selectedCellIndex = -1; 

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

  if (selectedCellIndex !== -1 && cellIndex === selectedCellIndex) {
    cells[selectedCellIndex].style.opacity = "1"; 
    resetHighlight(); 
    selectedCellIndex = -1;
    message.textContent = `Player ${currentPlayer}'s turn`;
    errorMessage.textContent = ""; 
    return;
  }

  if (gameState[cellIndex] !== "") {
    if (gameState[cellIndex] !== currentPlayer) {
      errorMessage.textContent = "It's not your turn!";
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 2000);
      return;
    }
    if (
      gameState[cellIndex] === currentPlayer &&
      (currentPlayer === "1️⃣" ? moveCount1 : moveCount2) === 3
    ) {
      if (selectedCellIndex !== -1) {
        cells[selectedCellIndex].style.opacity = "1";
      }
      selectedCellIndex = cellIndex;
      cell.style.opacity = "0.2"; 
      highlightEmptyCells();
      message.textContent = `Player ${currentPlayer}, move your marker`;
      errorMessage.textContent = ""; 
    }
    return;
  }

  if (
    selectedCellIndex !== -1 &&
    cell.textContent === "" &&
    gameState[selectedCellIndex] === currentPlayer
  ) {
    gameState[selectedCellIndex] = "";
    cells[selectedCellIndex].textContent = "";
    cells[selectedCellIndex].style.backgroundColor = "#aa94dd"; // Reset the background color
    cells[selectedCellIndex].style.opacity = "1.0";

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = currentPlayer === "1️⃣" ? "green" : "yellow";

    selectedCellIndex = -1;
    resetHighlight();
    if (checkWin()) {
      message.textContent = `Congratulations...player ${currentPlayer} won the game!`;
      message.style.color = "green";
      gameActive = false;
      handleWin();
      return;
    }
    currentPlayer = currentPlayer === "1️⃣" ? "2️⃣" : "1️⃣";
    message.textContent = `Player ${currentPlayer}'s turn`;
    errorMessage.textContent = ""; 
  }

  if (
    selectedCellIndex !== -1 &&
    gameState[cellIndex] !== "" &&
    gameState[cellIndex] !== currentPlayer
  ) {
    errorMessage.textContent = "Marker already placed in this cell!";
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);
    return;
  }

  if (currentPlayer === "1️⃣" && moveCount1 < 3) {
    gameState[cellIndex] = "1️⃣";
    cell.textContent = "1️⃣";
    cell.style.backgroundColor = "green";
    moveCount1++;
  } else if (currentPlayer === "2️⃣" && moveCount2 < 3) {
    gameState[cellIndex] = "2️⃣";
    cell.textContent = "2️⃣";
    cell.style.backgroundColor = "yellow";
    moveCount2++;
  } else {
    return;
  }

  updateHighlight();
  if (checkWin()) {
    message.textContent = `Congratulations...player ${currentPlayer} won the game!`;
    message.style.color = "green"; 
    gameActive = false;
    handleWin();
    return;
  }

  currentPlayer = currentPlayer === "1️⃣" ? "2️⃣" : "1️⃣";
  message.textContent = `Player ${currentPlayer}'s turn`;
  errorMessage.textContent = ""; 
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
    if (cell.textContent === losingMarker || cell.textContent === "") {
      cell.style.opacity = "0.3";
    }
  });
}

function highlightEmptyCells() {
  cells.forEach((cell, index) => {
    if (gameState[index] === "") {
      cell.classList.add("highlight-empty");
    }
  });
}

function resetHighlight() {
  cells.forEach((cell) => {
    cell.classList.remove("highlight-empty");
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
  moveCount1 = 0;
  moveCount2 = 0;
  selectedCellIndex = -1;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#a9a3f3";
    cell.style.opacity = "1"; 
  });
  message.style.color = "black"; 
  errorMessage.textContent = ""; 
  updateHighlight();
  message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", () => {
  resetGame;
  location.reload();
});

updateHighlight();
message.textContent = `Player ${currentPlayer}'s turn`;
