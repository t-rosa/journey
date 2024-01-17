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

// Object
const group = new t.Group();
scene.add(group);

const cube1 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: "cyan" })
);
group.add(cube1);

const cube2 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: "red" })
);
group.add(cube2);

cube2.position.x = -2;

const cube3 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: "green" })
);
group.add(cube3);

cube3.position.x = 2;

// Camera
const camera = new t.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

camera.position.set(0, 5, 3);
camera.lookAt(group.position);

// Helper
const axesHelper = new t.AxesHelper(2);
scene.add(axesHelper);

// Renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
