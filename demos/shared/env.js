import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { Emitter } from "three-emitter";

export default class World {
  resizeObserver;
  renderer;
  scene;
  stats;
  rotate;
  zeroVec = new THREE.Vector3(8, 0, 15);

  constructor(rotate = true, dark = false) {
    this.rotate = rotate;
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(dark ? 0x222222 : 0xffffff, 1.0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setPixelRatio(window.devicePixelRatio);


    this.scene = new Scene(dark);
    this.stats = new Stats();

    this.resizeObserver = new ResizeObserver(this.windowResized.bind(this));
    this.resizeObserver.observe(document.documentElement.querySelector("body"));
    this.windowResized();

    document.documentElement.querySelector("body").appendChild(this.renderer.domElement);
    document.documentElement.querySelector("body").appendChild(this.stats.domElement);

    this.tick();
  }

  tick(ms) {
    if (this.rotate) {
      this.scene.camera.position.set(8 + 60 * Math.sin(ms * 0.0001), 30, 15 + 60 * Math.cos(ms * 0.0001));
      this.scene.camera.lookAt(this.zeroVec);
    }

    this.renderer.render(this.scene, this.scene.camera);
    this.stats.update();
    requestAnimationFrame(this.tick.bind(this));
  }

  windowResized() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.camera.aspect = window.innerWidth / window.innerHeight;
    this.scene.camera.updateProjectionMatrix();
  }
}

class Scene extends THREE.Scene {
  camera;
  floor;
  light;
  emitter;

  constructor(dark = false) {
    super();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    this.camera.position.set(0, 30, 75);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.add(this.camera);

    this.floor = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), new THREE.MeshBasicMaterial({ color: dark ? 0x222222 : 0xaaaaaa }));
    this.floor.rotateX(-Math.PI / 2);
    this.add(this.floor);

    this.light = new THREE.PointLight(0xffffff, 5, 100, 0.1);
    this.light.position.set(0, 1, 5);
    this.light.lookAt(new THREE.Vector3(10, 0, 0));
    this.add(this.light);

    if (!dark)
      this.fog = new THREE.Fog(0xffffff, 50, 100);

    if (dark) {
      this.emitter = new Emitter({
        geometry: new THREE.PlaneGeometry(0.1, 0.1),
        materialParameters: {
          transparent: true,
          side: THREE.FrontSide,
        },
        maxParticles: 1000,
        attributes: {
          rng: new THREE.InstancedBufferAttribute(new Float32Array(1000), 1),
          emitterPosition: new THREE.InstancedBufferAttribute(new Float32Array(3000), 3),
          color: new THREE.InstancedBufferAttribute(new Float32Array(3000), 3),
        },
        vert: `
          precision highp float;

          // General
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          #define PI 3.1415926535897932384626433832795

          // From Geo
          attribute vec3 position;

          // From Emitter
          attribute float rng;
          attribute vec3 emitterPosition;
          attribute vec3 color;
          uniform float time;

          // New
          varying float vRng;
          varying vec4 vColor;
          
          void main() {
            vRng = rng;
            // Vert orientation, billboarded
            vec4 matrix = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
            // Position
            float modY = mod(rng + (time / 2.0), 1.0);
            float modX = sin(rng * 10.0 + time) * (modY / 4.0 + 0.3);
            vColor = vec4(color, sin(modY * PI));
            matrix.xy += position.xy + vec2(modX, modY);
            matrix.xyz += emitterPosition;
            gl_Position = projectionMatrix * matrix;
          }`,
        frag: `
          precision highp float;

          uniform float time;
          varying float vRng;
          varying vec4 vColor;

          void main() {
            gl_FragColor = vec4(vColor);
          }`
      });
      this.emitter.position.setY(0.12);
      this.emitter.fillAttribute("rng", () => Math.random());
      this.emitter.fillAttribute("color", [1, 1, 1]);
      this.add(this.emitter);
    }
  }
}
