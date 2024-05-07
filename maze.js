const maze = document.getElementById('maze');

const width = 20;
const height = 20;
const mazeCells = [];

let playerPosition = 0;
let player = document.createElement('div');
player.classList.add('player');
maze.appendChild(player);

for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.top = `${row * 20}px`;
        cell.style.left = `${col * 20}px`;
        mazeCells.push(cell);
        maze.appendChild(cell);
    }
}

function addWalls() {
    const totalCells = width * height;

    const numWalls = Math.floor(totalCells * 0.4);

    const wallCells = [];

    for (let i = 0; i < numWalls; i++) {
        let randomIndex = Math.floor(Math.random() * totalCells);
        while (randomIndex === 0 || randomIndex === totalCells - 1) {
            randomIndex = Math.floor(Math.random() * totalCells);
        }
        wallCells.push(randomIndex);
    }

    wallCells.forEach(index => {
        mazeCells[index].classList.add('wall');
    });
}

function addStartAndEnd() {
    mazeCells[0].classList.add('start');
    mazeCells[mazeCells.length - 1].classList.add('end');
}

function movePlayer(event) {
    console.log('Tecla pressionada:', event.key);
    console.log('Posição do jogador antes de mover:', playerPosition);
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition >= width) {
                playerPosition -= width;
            }
            break;
        case 'ArrowDown':
            if (playerPosition < (height - 1) * width) {
                playerPosition += width;
            }
            break;
        case 'ArrowLeft':
            if (playerPosition % width !== 0) {
                playerPosition -= 1;
            }
            break;
        case 'ArrowRight':
            if ((playerPosition + 1) % width !== 0) {
                playerPosition += 1;
            }
            break;
    }

    console.log('Nova posição do jogador após mover:', playerPosition);

    const cell = mazeCells[playerPosition];
    const playerStyle = player.style;
    playerStyle.top = cell.style.top;
    playerStyle.left = cell.style.left;

    console.log('Posição visual do jogador atualizada para:', playerStyle.top, playerStyle.left);

    if (playerPosition === mazeCells.length - 1) {
        alert('Parabéns! Você chegou ao fim do labirinto!');

        resetGame();
    }
}

document.addEventListener('keydown', movePlayer);

function resetGame() {
    player.remove();

    const newPlayer = document.createElement('div');
    newPlayer.classList.add('player');
    maze.appendChild(newPlayer);

    playerPosition = 0;

    player = newPlayer;

    player.addEventListener('keydown', movePlayer);
}

addWalls();
addStartAndEnd();
