const gameContainer = document.getElementById('game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = 'right';

function updateGameArea() {
    moveSnake();
    if (checkCollision()) {
        alert('Game Over!');
        return;
    }
    updateSnake();
    checkFoodCollision();
    updateSnakeElement();
    updateFoodElement();
    setTimeout(updateGameArea, 100);
}

function moveSnake() {
    const head = Object.assign({}, snake[0]);
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 ||
        head.x >= gameContainer.offsetWidth / 20 ||
        head.y < 0 ||
        head.y >= gameContainer.offsetHeight / 20
    ) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function updateSnake() {
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (gameContainer.offsetWidth / 20)),
            y: Math.floor(Math.random() * (gameContainer.offsetHeight / 20))
        };
        return true;
    }
    return false;
}

function updateSnakeElement() {
    const head = snake[0];
    snakeElement.style.left = head.x * 20 + 'px';
    snakeElement.style.top = head.y * 20 + 'px';
}

function updateFoodElement() {
    foodElement.style.left = food.x * 20 + 'px';
    foodElement.style.top = food.y * 20 + 'px';
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

updateGameArea();