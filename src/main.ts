import * as t from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./index.css";

// Canvas
const canvas = t.createCanvasElement();
document.getElementById("app")?.appendChild(canvas);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Scene
const scene = new t.Scene();

// Camera
const camera = new t.PerspectiveCamera(
  65,
  sizes.width / sizes.height,
  0.1,
  100
);
scene.add(camera);

camera.position.set(0, 0, 3);

// Object
const geometry = new t.BufferGeometry();

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

// Fill the array
for (let index = 0; index < positionsArray.length; index++) {
  positionsArray[index] = (Math.random() - 0.5) * 3;
}

const positionAttribute = new t.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionAttribute);

const object = new t.Mesh(
  geometry,
  new t.MeshBasicMaterial({ color: "red", wireframe: true })
);
scene.add(object);

// Renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Helpers
const axesHelper = new t.AxesHelper();
// scene.add(axesHelper);

// Animations
function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
