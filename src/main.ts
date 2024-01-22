import GUI from "lil-gui";
import * as t from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./index.css";

// textures
const loadingManager = new t.LoadingManager();

const textureLoader = new t.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
colorTexture.colorSpace = t.SRGBColorSpace;

colorTexture.generateMipmaps = false;
colorTexture.minFilter = t.NearestFilter;
colorTexture.magFilter = t.NearestFilter;

// debug
const gui = new GUI();

type DebugType = {
  texture?: string;
  spin?: () => void;
};

// gui.add(colorTexture);

const debugObject: DebugType = {};

// canvas
const canvas = t.createCanvasElement();
document.getElementById("app")?.appendChild(canvas);

// sizes
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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// cube
const cube = new t.Mesh(
  new t.BoxGeometry(),
  new t.MeshBasicMaterial({ map: colorTexture })
);
scene.add(cube);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.render(scene, camera);
renderer.setSize(sizes.width, sizes.height);

function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
