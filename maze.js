// Definir variáveis globais da cena, câmera e renderizador
var scene, camera, renderer;

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

    // Adicionar evento de foco ao renderizador para garantir que ele receba o foco do teclado
    renderer.domElement.setAttribute('tabindex', '0');
    renderer.domElement.focus();

    // Criar um plano para representar o chão
    var groundGeometry = new THREE.PlaneGeometry(200, 200);
    var groundMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2; // Rotacionar o plano para que fique no eixo X
    scene.add(ground);

    // Criar um objeto para representar o jogador
    var playerGeometry = new THREE.BoxGeometry(5, 5, 5);
    var playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 2.5, 0); // Posicionar o jogador no topo do plano
    scene.add(player);

    // Adicionar evento de teclado para mover o jogador
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                player.position.x -= 5; // Mover para a esquerda
                break;
            case 'ArrowRight':
                player.position.x += 5; // Mover para a direita
                break;
            case 'ArrowUp':
                player.position.z -= 5; // Mover para frente
                break;
            case 'ArrowDown':
                player.position.z += 5; // Mover para trás
                break;
        }
    });
}

// Função de animação
function animate() {
    requestAnimationFrame(animate); // Chamada recursiva para animação
    renderer.render(scene, camera); // Renderizar a cena
}

// Chamar as funções init() e animate() para iniciar a aplicação
init();
animate();
