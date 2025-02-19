import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const scene = new THREE.Scene();
let Apple_head;

const loader = new GLTFLoader();
loader.load(
    'W:/Github/3D-Apple-Airpod-Max/Apple_head.glb',
    function (gltf) {
        bee = gltf.scene;
        scene.add(bee);
    },
    function (xhr) {},
    function (error) {
        console.error('Error loading GLTF model', error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Light setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Animation: Rotate the model on the Z-axis
const reRender3D = () => {
    requestAnimationFrame(reRender3D);

    // If the model is loaded, rotate it on the Z-axis
    if (bee) {
        bee.rotation.z += 0.01; // Adjust the speed of rotation here
        if (bee.rotation.z >= Math.PI) {
            bee.rotation.z = 0; // Reset after completing 180 degrees (PI radians)
        }
    }

    renderer.render(scene, camera);
};
reRender3D();

// Adjust the renderer and camera on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


