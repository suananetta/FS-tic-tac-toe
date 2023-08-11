
let intro = document.querySelector('.intro');
let inputInfo = document.querySelectorAll('.input-player');
let firstTurn = document.querySelectorAll('.radio-item');
let startBtn = document.querySelector('.start-btn');

let gameField = document.querySelector('.game-field');
let player1Intro = document.querySelector('.player1');
let player2Intro = document.querySelector('.player2');

let winner = document.querySelector('.winner-info');

let cells = document.querySelectorAll('.cell');
let turnInfo = document.querySelector('.turn-info');
let restartBtn = document.querySelector('.restart-btn');

let player1 = {
    class: 'player1',
    name: 'Player1',
    step: 'X'
}
let player2 = {
    class: 'player2',
    name: 'Player2',
    step: 'O'
}

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let field;
let firstPlayer;
let currentPlayer = player1;
let gameStatus = false;

window.addEventListener('load', () => {
    initGame();
});

function initGame() {
    startBtn.addEventListener('click', startBtnClick);
    cells.forEach(cell => {
        cell.addEventListener('click', clickCell)
    });
    restartBtn.addEventListener('click', restartGame);
}

function handleChangeInput() {
    inputInfo.forEach(item => {
        if(item.classList.contains('name1')) {
            player1.name = item.value.trim().length > 0? item.value : 'Player 1';
        } else if(item.classList.contains('name2')) {
            player2.name = item.value.trim().length > 0? item.value : 'Player 2';
        }
    })
}

function handleChangeRadio() {
    firstTurn.forEach(item => {
        if(item.checked) {
            firstPlayer = item.value;
        }
    })
}

function startBtnClick() {
    player1Intro.textContent = player1.name + ' - X';
    player2Intro.textContent = player2.name + ' - O';
    cells.forEach(cell => cell.textContent = '');
    field = Array(9).fill('');

    if(firstPlayer === 'player1') {
        currentPlayer = player1;
    } else if(firstPlayer === 'player2') {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }

    intro.style.display = 'none';
    gameField.style.display = 'flex';

    gameStatus = true;
    turnInfo.textContent = `It's ${currentPlayer.name} turn!`;
}

function clickCell() {

    if(!gameStatus) {
        return;
    }

    if(this.textContent) {
        return;
    }

    this.textContent = currentPlayer.step;
    const cellIndex = this.dataset.cellIndex;
    field[cellIndex] = currentPlayer.step;

    if(checkWinner()) {
        return finishGame();
    }
    
    cells.forEach((cell) => {
        if(cell.textContent === player1.step) {
            cell.classList.add(player1.class)
        } else if (cell.textContent === player2.step) {
            cell.classList.add(player2.class)
        }
    })

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    turnInfo.textContent = `It's ${currentPlayer.name}'s turn`;
}

function checkWinConditions(condition) {
    const [a, b, c] = condition;

    const cellA = field[a];
    const cellB = field[b];
    const cellC = field[c];

    if([cellA, cellB, cellC].includes('')) {
        return false;
    }

    return cellA === cellB && cellB === cellC;
}

function checkWinner() {
    for(let condition of winConditions) {
        if(checkWinConditions(condition)) {
            winner.classList.add(currentPlayer.class)
            winner.textContent = `${currentPlayer.name} won the game! Congratulations!`;
            return true;
        }
    }

    if(!field.includes('')) {
        winner.textContent = "It's dead heat we have here!";
        return true;
    }
}

function finishGame() {
    gameStatus = false;
    turnInfo.textContent = '';
}

function restartGame() {
    currentPlayer = player1;
    winner.textContent = '';

    intro.style.display = 'flex';
    gameField.style.display = 'none';

    cells.forEach((cell) => {
        if(cell.textContent === player1.step) {
            cell.classList.remove(player1.class)
        } else if (cell.textContent === player2.step) {
            cell.classList.remove(player2.class)
        }
    })
    winner.classList.remove(player1.class, player2.class)
}