import * as THREE from 'three';

(async () => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    // const points = [];
    // points.push(new THREE.Vector3(- 10, 0, 0));
    // points.push(new THREE.Vector3(0, 20, 0));
    // points.push(new THREE.Vector3(10, 0, 0));

    // const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // const line = new THREE.Line(geometry, material);
    // scene.add(line);

    async function showSprite(spritePath, s) {
        const map = await (new THREE.TextureLoader()).loadAsync(spritePath);
        const material = new THREE.SpriteMaterial({ map: map });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 10, 1);
        s.add(sprite);
    }

    await showSprite("textures/star.png", scene);

    renderer.render(scene, camera);
})();