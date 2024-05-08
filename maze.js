// Definir as variáveis globais da cena, câmera e renderizador
var scene, camera, renderer;

// Variáveis globais para o jogador e as paredes do labirinto
var player, walls = [];

// Função para criar o jogador
function createPlayer() {
    var geometry = new THREE.BoxGeometry(5, 5, 5); // Geometria do jogador (cubo)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde
    player = new THREE.Mesh(geometry, material); // Criar o jogador
    scene.add(player); // Adicionar o jogador à cena
}

// Função para criar as paredes do labirinto
function createWalls() {
    var wallGeometry = new THREE.BoxGeometry(10, 10, 10); // Geometria das paredes (cubo)
    var wallMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Material azul

    // Criar as paredes do labirinto
    for (var i = 0; i < 10; i++) {
        var wall = new THREE.Mesh(wallGeometry, wallMaterial); // Criar uma parede
        wall.position.set(i * 10 - 45, 5, 0); // Posicionar a parede
        scene.add(wall); // Adicionar a parede à cena
        walls.push(wall); // Adicionar a parede ao array de paredes
    }
}

// Função para mover o jogador
function movePlayer(direction) {
    var speed = 5; // Velocidade de movimento do jogador

    // Mover o jogador na direção especificada
    switch (direction) {
        case 'left':
            player.position.x -= speed;
            break;
        case 'right':
            player.position.x += speed;
            break;
        case 'forward':
            player.position.z -= speed;
            break;
        case 'backward':
            player.position.z += speed;
            break;
    }

    // Detectar colisões com as paredes do labirinto
    for (var i = 0; i < walls.length; i++) {
        if (player.position.distanceTo(walls[i].position) < 10) {
            // Se houver uma colisão, reverter o movimento do jogador
            switch (direction) {
                case 'left':
                    player.position.x += speed;
                    break;
                case 'right':
                    player.position.x -= speed;
                    break;
                case 'forward':
                    player.position.z += speed;
                    break;
                case 'backward':
                    player.position.z -= speed;
                    break;
            }
            break; // Parar de verificar as colisões
        }
    }
}

// Função para lidar com a entrada do teclado
function handleKeyboardInput(event) {
    console.log(event.key)
    switch (event.key) {
        case 'ArrowLeft':
            movePlayer('left');
            break;
        case 'ArrowRight':
            movePlayer('right');
            break;
        case 'ArrowUp':
            movePlayer('forward');
            break;
        case 'ArrowDown':
            movePlayer('backward');
            break;
    }
}

// Adicionar evento de teclado para mover o jogador

// Chamar as funções para criar o jogador e as paredes do labirinto

// Função para verificar se o jogador alcançou o final do labirinto
function checkGoal() {
    if (player.position.distanceTo(walls[walls.length - 1].position) < 10) {
        alert('Parabéns! Você chegou ao final do labirinto!');
        resetGame(); // Reiniciar o jogo
    }
}

// Função para reiniciar o jogo
function resetGame() {
    // Reposicionar o jogador para a posição inicial
    player.position.set(0, 5, -45);
}

// Chamar a função checkGoal() a cada frame
function update() {
    requestAnimationFrame(update); // Chamada recursiva para atualização
    checkGoal(); // Verificar se o jogador alcançou o final do labirinto
}

// Iniciar a função update() para atualizar o jogo

// Inicializar a cena, câmera e renderizador
function init() {
    // Criar a cena
    scene = new THREE.Scene();

    // Criar a câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100); // Posicionar a câmera

    // Criar o renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adicionar o renderizador ao documento HTML
    document.body.appendChild(renderer.domElement);

    renderer.domElement.setAttribute('tabindex', '0');
    renderer.domElement.focus();
}

// Função de animação
function animate() {
    requestAnimationFrame(animate); // Chamada recursiva para animação
    renderer.render(scene, camera); // Renderizar a cena
}

// Chamar as funções init() e animate() para iniciar a aplicação
init();
animate();
createPlayer();
createWalls();
update();
document.addEventListener('keydown', handleKeyboardInput);