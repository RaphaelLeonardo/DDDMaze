import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

    // Adicionar eventos de mouse para controlar a câmera
    var isDragging = false;
    var previousMousePosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    renderer.domElement.addEventListener('mouseup', function(event) {
        isDragging = false;
    });

    renderer.domElement.addEventListener('mousemove', function(event) {
        var deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        if(isDragging) {
            var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 0.5),
                    toRadians(deltaMove.x * 0.5),
                    0,
                    'XYZ'
                ));

                camera.position.sub(player.position); // Ajustar a posição da câmera em relação ao jogador
                camera.position.applyQuaternion(deltaRotationQuaternion); // Aplicar rotação à posição da câmera
                camera.position.add(player.position); // Recolocar a câmera na posição correta em relação ao jogador
                camera.lookAt(player.position); // Focar a câmera no jogador
        }

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    renderer.domElement.addEventListener('wheel', function(event) {
        var zoomSpeed = event.deltaY * 0.1;
        var zoomDirection = camera.position.clone().sub(player.position).normalize(); // Direção do zoom em relação ao jogador
        camera.position.add(zoomDirection.multiplyScalar(zoomSpeed)); // Ajustar a posição da câmera em relação ao jogador
    });

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }
    
    // Adicionar evento de teclado para mover o jogador e a câmera
    document.addEventListener('keydown', function (event) {
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
    
        // Atualizar a posição da câmera para seguir o jogador
        camera.position.copy(player.position).add(new THREE.Vector3(0, 50, 100)); // Manter a mesma altura e distância da câmera em relação ao jogador
        camera.lookAt(player.position); // Focar a câmera no jogador
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
