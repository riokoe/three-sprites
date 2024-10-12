import * as THREE from "three";
import { EmitterInstance } from "three-emitter";
import World from "env";
import { SpriteMeshBasicMaterial, TilemapMeshBasicMaterial } from "three-sprites";

(() => {
  /*****************************************************************
   * Tileset by ArMM1998
   * License: CC0 / Public Domain
   * Thank you! <3
   * ---------------------------------------------------------------
   * https://opengameart.org/content/zelda-like-tilesets-and-sprites
   *****************************************************************/

  // Setup of the scene, GUI, etc.
  const world = new World(false, true);
  const tex = new THREE.TextureLoader().load("../shared/tileset2.png");
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;

  /**
   * Tilemap
   */
  const tilemap = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 21),
    new TilemapMeshBasicMaterial({
      side: THREE.FrontSide,
      transparent: true,
      precision: "highp",
      map: tex,
    }),
  );
  tilemap.material.tile({
    tiles:
      // Layer 1: Randomized grass
      Array.from({ length: 280 }, () => Math.floor(1 + Math.random() * 3))
        // Layer 2: Props
        .concat([
          0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 21, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 21, 0, 5, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0,
          0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 21,
          0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 10, 11, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 21, 21, 0, 0, 0, 14, 16, 17, 0, 0, 0, 21, 0, 0, 0,
          0, 0, 6, 7, 0, 21, 21, 0, 0, 0, 0, 22, 23, 8, 0, 0, 0, 0, 0, 0,
          0, 0, 12, 13, 0, 0, 0, 5, 0, 0, 0, 9, 0, 14, 0, 0, 0, 0, 0, 0,
          0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21,
          0, 0, 0, 21, 0, 0, 21, 0, 0, 0, 0, 0, 21, 0, 0, 0, 6, 7, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 21, 12, 13, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 0, 0, 0,
        ]),
    tileSize: { x: 16, y: 16 },
    tilesetSize: { x: 96, y: 80 },
    repeat: { x: 20, y: 14 },
  });
  tilemap.position.set(0, 0.1, 0);
  tilemap.rotateX(-Math.PI / 2);
  world.scene.camera.position.set(0, 50, 0);
  world.scene.camera.lookAt(tilemap.position);
  world.scene.add(tilemap);

  /**
   * Fire sprite
   */
  const fire = new THREE.Mesh(
    new THREE.PlaneGeometry(1.54, 1.54),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      transparent: true,
      precision: "highp",
      map: tex,
    }),
  );
  fire.material.tile({
    tile: 27,
    tileSize: { x: 16, y: 16 },
    tilesetSize: { x: 96, y: 80 },
  });
  fire.position.set(-0.5, 0.13, 5.3);
  fire.rotateX(-Math.PI / 2);
  world.scene.add(fire);

  /**
   * Character sprite
   */
  const character = new THREE.Mesh(
    new THREE.PlaneGeometry(1.54, 3.08),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      transparent: true,
      precision: "highp",
      map: tex,
    }),
  );
  character.material.tile({
    tile: { x: 0, y: 48 },
    tileSize: { x: 16, y: 32 },
    tilesetSize: { x: 96, y: 80 },
  });
  //character.scale.x = -1;
  character.position.set(-2, 0.12, 4.3);
  character.rotateX(-Math.PI / 2);
  world.scene.add(character);

  /**
   * Fake fire light
   */
  const light = new THREE.Mesh(
    new THREE.CircleGeometry(4, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffcc99,
      transparent: true,
      opacity: 0.2,
    })
  );
  light.position.set(-0.5, 0.11, 5.7);
  light.rotateX(-Math.PI / 2);
  light.scale.set(1, 0.3, 1);
  world.scene.add(light);

  /**
   * Particles
   */
  const fireParticles = new EmitterInstance(world.scene.emitter, 5);
  fireParticles.fillAttribute("emitterPosition", [-0.5, -4.2, 0.13]);
  fireParticles.fillAttribute("color", [1, 0.8, 0.3]);
  new EmitterInstance(world.scene.emitter, 3)
    .fillAttribute("emitterPosition", [-3, 0, 0.14]);
  new EmitterInstance(world.scene.emitter, 4)
    .fillAttribute("emitterPosition", [4, 6, 0.14]);
  new EmitterInstance(world.scene.emitter, 2)
    .fillAttribute("emitterPosition", [-7, 5, 0.14]);
  new EmitterInstance(world.scene.emitter, 2)
    .fillAttribute("emitterPosition", [8, -7, 0.14]);
  new EmitterInstance(world.scene.emitter, 2)
    .fillAttribute("emitterPosition", [10, 1, 0.14]);
  new EmitterInstance(world.scene.emitter, 2)
    .fillAttribute("emitterPosition", [-10, -9, 0.14]);


  /**
   * Animations for tile 4 and tile 6
   */
  let lastTs = 0;
  let nfire = 0;
  let ncharacter = 0;
  let tick500 = 0;
  let easedTick = 0;
  function tick(ts = 0) {
    const delta = ts - lastTs;
    lastTs = ts;

    // Character movement
    const dir = Math.sin(ts / 2000) * 4;
    if (character.position.x - dir > 0 && character.scale.x > 0)
      character.scale.x = -1;
    else if (character.position.x - dir < 0 && character.scale.x < 0)
      character.scale.x = 1;
    character.position.x = dir;

    // Animate character
    easedTick += 8 - Math.abs(dir);
    if (easedTick >= 300) {
      easedTick = 0;
      if (ncharacter > 3)
        ncharacter = 0;
      character.material.tile({ tile: { x: 0 + 16 * (ncharacter === 2 ? 0 : ncharacter === 3 ? 2 : ncharacter), y: 48 } });
      ncharacter += 1;
    }

    // Animate fire
    tick500 += delta;
    if (tick500 >= 500) {
      tick500 = 0;

      const rng = Math.random() * 0.15;
      light.scale.set(1 + rng, 0.3 + rng / 2, 1);

      nfire += 1;
      if (nfire >= 3)
        nfire = 0;
      fire.material.tile({ tile: 27 + nfire });
    }
    requestAnimationFrame(tick);
  }
  tick();

})();
