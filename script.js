const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 8 * gridSize, y: 8 * gridSize }];
let food = { x: 5 * gridSize, y: 5 * gridSize };
let score = 0;
let dx = gridSize;
let dy = 0;
let gameInterval;

canvas.width = canvasSize;
canvas.height = canvasSize;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Update score
  scoreElement.innerText = score;

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    resetGame();
    return;
  }

  // Check for collision with self
  if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function resetGame() {
  clearInterval(gameInterval);
  alert("Game Over!");
  snake = [{ x: 8 * gridSize, y: 8 * gridSize }];
  dx = gridSize;
  dy = 0;
  score = 0;
  placeFood();
  gameInterval = setInterval(draw, 100);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -gridSize;
      }
      break;
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = gridSize;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -gridSize;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = gridSize;
        dy = 0;
      }
      break;
  }
}

document.addEventListener("keydown", changeDirection);

gameInterval = setInterval(draw, 100);
