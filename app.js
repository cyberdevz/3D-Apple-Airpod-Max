
// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 13;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
scene.add(ambientLight);



// Load 3D Model (Headset)
const loader = new THREE.GLTFLoader();
let headset;

loader.load(
  '/Apple_head.glb', // Replace with the path to your 3D model
  (gltf) => {
    headset = gltf.scene;
    scene.add(headset);
  },
  (xhr) => {
    console.log(`Model ${xhr.loaded / xhr.total * 100}% loaded.`);
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Handle Scroll
let scrollPosition = 0;
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (headset) {
    headset.rotation.y += 0.01; // Continuous rotation
    headset.position.y = -scrollPosition * 0.01; // Move up/down with scroll
    headset.rotation.x = scrollPosition * 0.001; // Rotate with scroll
  }

  renderer.render(scene, camera);
}
animate();

// Resize Event
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

