import gsap from "gsap";
import GUI from "lil-gui";
import * as t from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./index.css";

// Debug
const gui = new GUI({
  width: 300,
  autoPlace: true,
  closeFolders: true,
  title: "Debug",
});
const debug: {
  color?: string;
  spin?: () => void;
  subdivision?: number;
} = {
  subdivision: 1,
};

window.addEventListener("keydown", (e) => {
  if (e.key == "h") {
    gui.show(gui._hidden);
  }
});

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
const camera = new t.PerspectiveCamera(65, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Geometry
debug.color = "#194371";
// const geometry = new t.BufferGeometry();

// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let index = 0; index < positionsArray.length; index++) {
//   positionsArray[index] = (Math.random() - 0.5) * 3;
// }

// const positionAttribute = new t.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionAttribute);

// const triangles = new t.Mesh(
//   geometry,
//   new t.MeshBasicMaterial({ color: "red", wireframe: true })
// );
// scene.add(triangles);

const cube = new t.Mesh(
  new t.BoxGeometry(
    1,
    1,
    1,
    debug.subdivision,
    debug.subdivision,
    debug.subdivision
  ),
  new t.MeshBasicMaterial({ color: debug.color, wireframe: true })
);
scene.add(cube);

gui.add(cube.position, "x").min(-3).max(3).step(1).name("x");
gui.add(cube, "visible");
gui.add(cube.material, "wireframe");
gui.addColor(debug, "color").onChange(() => {
  if (!debug.color) return;
  cube.material.color.set(debug.color);
});

debug.spin = function () {
  gsap.to(cube.rotation, { y: cube.rotation.y + Math.PI * 2 });
};

gui.add(debug, "spin");
const subdivisionTweak = gui.addFolder("subdivision");
subdivisionTweak
  .add(debug, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange((value: number) => {
    cube.geometry.dispose();
    cube.geometry = new t.BoxGeometry(1, 1, 1, value, value, value);
  });

// Renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animation
function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
