import gsap from "gsap";
import GUI from "lil-gui";
import * as t from "three";
import {
  FontLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons.js";
import "./index.css";

//Debug
const gui = new GUI();

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

const textureLoader = new t.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/4.png");
matcapTexture.colorSpace = t.SRGBColorSpace;

// Fonts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Toma & Maureen\n           <3", {
    font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  const textMaterial = new t.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new t.Mesh(textGeometry, textMaterial);
  textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox!.max.x - 0.02) / 2,
  //   0,
  //   -(textGeometry.boundingBox!.max.z - 0.02) / 2
  // );
  textGeometry.center();
  scene.add(text);

  const geometry = new t.TorusGeometry();
  const material = new t.MeshMatcapMaterial({ matcap: matcapTexture });

  for (let i = 0; i < 100; i++) {
    const donut = new t.Mesh(geometry, material);

    gsap.to(donut.position, { x: (Math.random() - 0.5) * 20, duration: 1 });
    gsap.to(donut.position, { y: (Math.random() - 0.5) * 20, duration: 1 });
    gsap.to(donut.position, { z: (Math.random() - 0.5) * 20, duration: 1 });

    gsap.to(donut.rotation, { x: Math.random() * Math.PI, duration: 1.6 });
    gsap.to(donut.rotation, { y: Math.random() * Math.PI, duration: 1.6 });

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

// Camera
const camera = new t.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

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
