import "./index.css";
import * as t from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

// Canvas
const canvas = t.createCanvasElement();
document.querySelector("#app")?.appendChild(canvas);

canvas.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height) - 0.5;
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement;

  if (!fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Scene
const scene = new t.Scene();

// Camera
const camera = new t.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100,
);
scene.add(camera);
camera.position.set(0, 0, 3);

// Object
const cube = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: "red" }),
);
scene.add(cube);

// Helper
const axesHelper = new t.AxesHelper();
scene.add(axesHelper);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render
const renderer = new t.WebGLRenderer({
  canvas,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function tick() {
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 4;
  // camera.lookAt(cube.position);
  // camera.position.y = cursor.y;

  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(tick);
}

tick();
