import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);


const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 20, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
const scene = new THREE.Scene();
scene.add(line);

function showSprite(spritePath, s) {
    const map = new THREE.TextureLoader().load(spritePath);
    const material = new THREE.SpriteMaterial({ map: map });

    const sprite = new THREE.Sprite(material);
    s.add(sprite);
    sprite.scale.set(10, 10, 10);
}

showSprite("textures/star.png", scene);

renderer.render(scene, camera);