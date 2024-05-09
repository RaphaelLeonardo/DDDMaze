import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Definir variáveis globais da cena, câmera e renderizador
var scene, camera, renderer, controls;

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

    // Criar os controles OrbitControls usando a câmera e o elemento de renderização
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Ativar amortecimento para movimento suave
    controls.dampingFactor = 0.25; // Fator de amortecimento (ajuste conforme necessário)

    // Atualizar os controles após quaisquer alterações manuais na câmera
    controls.update();

    document.addEventListener('keydown', function(event) {
        var moveDistance = 5; // Distância de movimento do jogador
    
        // Definir a direção de movimento com base na tecla pressionada
        var moveDirection;
        switch (event.key) {
            case 'ArrowLeft':
                moveDirection = new THREE.Vector3(-1, 0, 0);
                break;
            case 'ArrowRight':
                moveDirection = new THREE.Vector3(1, 0, 0);
                break;
            case 'ArrowUp':
                moveDirection = new THREE.Vector3(0, 0, -1);
                break;
            case 'ArrowDown':
                moveDirection = new THREE.Vector3(0, 0, 1);
                break;
        }
    
        // Mover o jogador na direção correta em relação ao mundo
        player.translateOnAxis(moveDirection, moveDistance);
    });
    
}

// Função de animação
function animate() {
    requestAnimationFrame(animate); // Chamada recursiva para animação
    controls.update(); // Atualizar os controles do OrbitControls
    renderer.render(scene, camera); // Renderizar a cena
}

// Chamar as funções init() e animate() para iniciar a aplicação
init();
animate();
