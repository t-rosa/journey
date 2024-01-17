import gsap from "gsap";
import * as t from "three";

// Canvas
const canvas = t.createCanvasElement();
document.querySelector("#app")?.appendChild(canvas);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new t.Scene();

//Camera
const camera = new t.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

camera.position.set(0, 0, 3);

// Group
const cubes = new t.Group();
scene.add(cubes);

// Objects
const cube1 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: "red" })
);

cubes.add(cube1);

//Helper
const axesHelper = new t.AxesHelper();
scene.add(axesHelper);

// Renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

gsap.to(camera.position, { duration: 1, x: 2, delay: 1 });

// Clock
// const clock = new t.Clock();

// Animation
function tick() {
  camera.lookAt(cubes.position);

  // Clock
  // const elapsedTime = clock.getElapsedTime();

  // Update Object
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);

  // Render
  renderer.render(scene, camera);

  // Loop
  window.requestAnimationFrame(tick);
}

tick();
