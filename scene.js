import * as THREE from 'three';
import { ARButton } from 'ARButton';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// AR кнопка
document.body.appendChild(ARButton.createButton(renderer, {
  requiredFeatures: ['hit-test']
}));

// Освітлення
scene.add(new THREE.AmbientLight(0xffffff, 1));

// Завантаження текстури
const loader = new THREE.TextureLoader();
const brickTexture = loader.load('./assets/sandstone.jpg');

// Функція піраміди
function createPyramid(base, height) {
  const geo = new THREE.ConeGeometry(base / Math.sqrt(2), height, 4);
  geo.rotateY(Math.PI / 4);
  const mat = new THREE.MeshStandardMaterial({ map: brickTexture });
  const pyramid = new THREE.Mesh(geo, mat);
  const apexGeo = new THREE.SphereGeometry(base / 20, 16, 16);
  const apexMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
  const apex = new THREE.Mesh(apexGeo, apexMat);
  apex.position.y = height;
  pyramid.add(apex);
  return pyramid;
}

// Масштабування для WebXR (1 метр = 1 одиниця)
const scale = 0.01;

// Створення пірамід
const khufu = createPyramid(230 * scale, 145 * scale);
khufu.position.set(0, 0, -0.5);
scene.add(khufu);

const khafre = createPyramid(210 * scale, 135 * scale);
khafre.position.set(-0.3, 0, -0.6);
scene.add(khafre);

const menkaure = createPyramid(100 * scale, 65 * scale);
menkaure.position.set(0.3, 0, -0.6);
scene.add(menkaure);

// Цикл анімації WebXR
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
