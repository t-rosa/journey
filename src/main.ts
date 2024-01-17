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
const geometry = new t.BoxGeometry(1, 1, 1);
const material = new t.MeshBasicMaterial({
  color: "blue",
});
const mesh = new t.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new t.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
