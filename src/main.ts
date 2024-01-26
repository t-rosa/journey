import gsap from "gsap";
import GUI from "lil-gui";
import * as t from "three";
import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./index.css";

//Debug
const gui = new GUI()

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

// Lights
// const ambientLight = new t.AmbientLight("white", 1);
// scene.add(ambientLight);

// const pointLight = new t.PointLight("white", 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = t.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

// textures
const loadingManager = new t.LoadingManager();
const textureLoader = new t.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

doorColorTexture.colorSpace = t.SRGBColorSpace;
matcapTexture.colorSpace = t.SRGBColorSpace;


// Camera
const camera = new t.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 5;
scene.add(camera);

// Meshes

// const material = new t.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new t.Color("red");
// material.side = t.DoubleSide;

// const material = new t.MeshNormalMaterial();
// material.flatShading = true;

// const material = new t.MeshStandardMaterial();
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.side = t.DoubleSide
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.01
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture

const material = new t.MeshPhysicalMaterial();
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.side = t.DoubleSide
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.01
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.transparent = true
material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.01)
gui.add(material, 'aoMapIntensity').min(1).max(10).step(1)

// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

material.sheen = 1
material.sheenRoughness =0.25 
material.sheenColor.set(1,1,1)

gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')

const sphere = new t.Mesh(new t.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new t.Mesh(new t.PlaneGeometry(1, 1, 100,100), material);

const torus = new t.Mesh(new t.TorusGeometry(0.3, 0.2, 64, 128), material);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

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
  gsap.to(sphere.rotation, { y: sphere.rotation.y + Math.PI * 0.03 });
  gsap.to(sphere.rotation, { x: sphere.rotation.x + Math.PI * -0.03 });

  gsap.to(plane.rotation, { y: plane.rotation.y + Math.PI * 0.03 });
  gsap.to(plane.rotation, { x: plane.rotation.x + Math.PI * -0.03 });

  gsap.to(torus.rotation, { y: torus.rotation.y + Math.PI * 0.03 });
  gsap.to(torus.rotation, { x: torus.rotation.x + Math.PI * -0.03 });

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
