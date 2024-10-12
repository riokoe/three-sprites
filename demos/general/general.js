import * as THREE from "three";
import World from "env";
import { SpriteMeshBasicMaterial, SpriteMeshStandardMaterial, TilemapMeshBasicMaterial } from "three-sprites";

(() => {
  // Setup of the scene, GUI, etc.
  const world = new World();
  const tex = new THREE.TextureLoader().load("../shared/tileset.png");

  // Disable mipmaps and turn on repeat wrapping to prevent seams
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;

  // Defaults
  const tileSize = { x: 128, y: 128 };
  const tilesetSize = { x: 384, y: 256 };

  /**
   * Display the second tile in the tileset
   */
  const tile1 = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile1.material.tile({
    tile: 1,
    tileSize,
    tilesetSize
  });
  tile1.position.set(-5, 0.1, 0);
  tile1.rotateX(-Math.PI / 2);
  world.scene.add(tile1);

  /**
   * Display the fourth tile in a tileset using a
   * MeshStandardMaterial and a tilemap spacing of 10
   */
  const tile2 = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new SpriteMeshStandardMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile2.material.tile({
    tile: 3,
    tileSize,
    tilesetSize,
    spacing: 10
  });
  tile2.position.set(5, 0.1, 0);
  tile2.rotateX(-Math.PI / 2);
  world.scene.add(tile2);

  /**
   * Display the fourth tile and repeat it once along
   * its x axis using a tilemap spacing of 10
   */
  const tile3 = new THREE.Mesh(
    new THREE.PlaneGeometry(19, 9.5),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile3.material.tile({
    tile: 3,
    tileSize,
    tilesetSize,
    repeat: { x: 2, y: 1 },
    spacing: 10
  });
  tile3.position.set(0, 0.1, 10);
  tile3.rotateX(-Math.PI / 2);
  world.scene.add(tile3);

  /**
   * Animate through 4 tiles
   */
  const tile4 = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile4.material.tile({
    tile: 1,
    tileSize,
    tilesetSize
  });
  tile4.position.set(-5, 0.1, 20);
  tile4.rotateX(-Math.PI / 2);
  world.scene.add(tile4);

  /**
   * Display the third tile using texture coordinates
   */
  const tile5 = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile5.material.tile({
    tile: { x: 256, y: 0 },
    tileSize,
    tilesetSize
  });
  tile5.position.set(5, 0.1, 20);
  tile5.rotateX(-Math.PI / 2);
  world.scene.add(tile5);

  /**
   * Repeat and animate tiles using coordinates
   */
  const tile6 = new THREE.Mesh(
    new THREE.PlaneGeometry(14.5, 29),
    new SpriteMeshBasicMaterial({
      side: THREE.FrontSide,
      precision: "highp",
      map: tex,
    }),
  );
  tile6.material.tile({
    tile: { x: 128, y: 0 },
    tileSize: { x: 256, y: 128 },
    tilesetSize,
    repeat: { x: 1, y: 4 }
  });
  tile6.position.set(18, 0.1, 10);
  tile6.rotateX(-Math.PI / 2);
  world.scene.add(tile6);

  /**
   * Display the tileset on a tilemap with
   * - transparent tiles
   * - a map of 10x5
   * - a spacing of 10
   * - two layers
   */
  const tile7 = new THREE.Mesh(
    new THREE.PlaneGeometry(34.5, 17.25),
    new TilemapMeshBasicMaterial({
      side: THREE.FrontSide,
      transparent: true,
      precision: "highp",
      map: tex,
    }),
  );
  tile7.material.tile({
    tiles: [
      // Layer one, 10x5
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 2, 2, 3, 3, 4, 4, 1, 1,
      5, 1, 0, 0, 3, 3, 0, 0, 1, 5,
      1, 1, 2, 2, 3, 3, 4, 4, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      // Layer two, 10x5
      5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 5, 5, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
    ],
    tileSize,
    tilesetSize,
    repeat: { x: 10, y: 5 },
    spacing: 10
  });
  tile7.position.set(8, 0.1, 34.5);
  tile7.rotateX(-Math.PI / 2);
  world.scene.add(tile7);

  /**
   * Animations for tile 4 and tile 6
   */
  let lastTs = 0;
  let tile4n = 0;
  let tile6n = 0;
  function tick(ts = 0) {
    if (ts - lastTs >= 500) {
      lastTs = ts;

      tile4n += 1;
      if (tile4n >= 5)
        tile4n = 1;
      tile4.material.tile({ tile: tile4n });

      // Animate tile size:
      //  ------      --
      // |      | -> |  |
      //  ------     |  |
      //              --
      tile6n = Number(!tile6n);
      tile6.material.tile({
        tile: { x: 128 * tile6n, y: 128 * (1 - tile6n) },
        tileSize: { x: 256 - tile6n * 128, y: 128 + tile6n * 128 },
        repeat: { x: 1 + tile6n, y: 4 - tile6n * 2 }
      });
    }
    requestAnimationFrame(tick);
  }
  tick();

})();
