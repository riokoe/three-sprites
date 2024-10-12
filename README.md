# three-sprites

A library for [THREE.js](https://github.com/mrdoob/three.js) to render, animate and layer spritesheet/tileset-based tilemaps and sprites. The project provides tiling-based versions of most [THREE.js materials](https://threejs.org/docs/?q=material#api/en/materials/Material) but also allows you to extend custom materials.

 - Load spritesheets/tilesets
 - Render, animate and tile sprites
 - Render and layer tilemaps
 - No texture cloning

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V514H3K9)

# Demos

[![Demo](https://github.com/riokoe/three-sprites/raw/main/demos/shared/demo.gif)]()

 - [Tilemap demo](https://riokoe.github.io/three-sprites/demos/tilemap/index.html) ([source code](https://github.com/riokoe/three-sprites/tree/main/demos/tilemap/tilemap.js))
 - [Usage demo](https://riokoe.github.io/three-sprites/demos/general/index.html) ([source code](https://github.com/riokoe/three-sprites/tree/main/demos/general/general.js))

# Installation

## Dependencies

Has a peer dependency to [THREE.js](https://threejs.org/docs/#manual/en/introduction/Installation).

## NPM

Install via:

```bash
npm install three three-sprites
```

Import in ESM projects:

```js
import * as THREE from "three";
import { SpriteMeshBasicMaterial, TilemapMeshBasicMaterial } from "three-sprites";
```

Import in CJS projects:

```js
const THREE = require("three");
const { SpriteMeshBasicMaterial, TilemapMeshBasicMaterial } = require("three-sprites");
```

## Browser / CDN

Configure import map:

```xml
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js",
      "three-sprites": "https://cdn.jsdelivr.net/npm/three-sprites@latest/dist/browser/three-sprites.min.js",
    }
  }
</script>
```

Import in your project:


```js
import * as THREE from "three";
import { SpriteMeshBasicMaterial, TilemapMeshBasicMaterial } from "three-sprites";
```

# Usage

For details see the [documentation](https://github.com/riokoe/three-sprites/tree/main/docs/index.md) and the [demo source code](https://github.com/riokoe/three-sprites/tree/main/demos/).

## Materials

The library provides exports for almost all THREE.js materials.

For sprites:

```js
import {
  SpriteMeshBasicMaterial,
  SpriteMeshLambertMaterial,
  SpriteMeshStandardMaterial,
  SpriteMeshPhysicalMaterial,
  SpriteMeshPhongMaterial,
  SpriteMeshToonMaterial
} from "three-sprites"
```

For tilemaps:

```js
import {
  TilemapMeshBasicMaterial,
  TilemapMeshLambertMaterial,
  TilemapMeshStandardMaterial,
  TilemapMeshPhysicalMaterial,
  TilemapMeshPhongMaterial,
  TilemapMeshToonMaterial
} from "three-sprites"
```

Chose the ones which fit your needs. They all provide the same interface around sprites/tilemaps but also come with the corresponding material's set of features.

## Sprites

### Render a sprite based on a tileset index

Working with a tileset (all tiles have the same size), you can use tile indices to render and animate sprites. The following example loads a tileset and renders one tile as a sprite.

```js
// Import THREE.js and a material from thee-sprites
import * as THREE from "three";
import { SpriteMeshBasicMaterial } from "three-sprites";

// Load spritesheet or tileset
const texture = new THREE.TextureLoader().load("spritesheet.png");

// Turn off mipmapping to minimize seams on mag/min filters
texture.magFilter = THREE.LinearFilter;
texture.minFilter = THREE.LinearFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Create a mesh with the new material
const sprite = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new SpriteMeshBasicMaterial({
    side: THREE.FrontSide,
    precision: "highp",
    map: texture,
  }),
);

// Configure the tiling
sprite.material.tile({
  // Define the size of the tileset in px
  tileSize: { x: 128, y: 128 },
  // Define the size of the tiles in the tileset in px
  tilesetSize: { x: 16, y: 16 },
  // Set the index of the tile in the tileset to render
  // In this case, we display the fourth tile in the tileset
  // On a tileset of w/h 128/128 with tiles of 16/16, that's the tile at x/y 48/0
  tile: 3,
});

// Position the mesh and add it to your scene...
myScene.add(sprite)
```

With the sprite in your scene, animate through tile 3-6 based on tile indices:

```js
let tileIndex = 3;
let lastts = 0;
const tick = ts => {
  if (tileIndex > 6)
    tileIndex = 3;
  // Set the corresponding tile
  sprite.tile({ tile: tileIndex++ });
  requestAnimationFrame(tick);
};
tick();
```

### Render a sprite based on spritesheet coordinates

Working with a spritesheet instead of a tileset, you can use coordinates to render the sprite:

```js
// Imports and mesh setup identical to the previous full example...

// Display a 16x32 sprite from a spritesheet
sprite.material.tile({
  // Define the size of the spritesheet in px
  tileSize: { x: 128, y: 128 },
  // Define the (top/left corner) coordinates of the tile in the spritesheet
  tile: { x: 32 , y: 16}
  // Define the size of tile
  tilesetSize: { x: 16, y: 32 },
});
```

Animate via coordinates:

```js
const tick = ts => {
  // ...
  sprite.tile({ tile: { x: 32 + n, 16 + m } });
  // ...
};
```

### Repeat a sprite on the mesh

Instead of fitting one tile on a mesh, you can repeat the same tile horizontally/vertically:

```js
// Imports and mesh setup identical to the previous full example...

// Create a 10x2 mesh
const sprite = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 2),
  new SpriteMeshBasicMaterial({
    side: THREE.FrontSide,
    precision: "highp",
    map: texture,
  }),
);

// Display a 16x16 sprite and repeat it 9 times horizontally
// and 1 time vertically
sprite.material.tile({
  // Define the size of the spritesheet in px
  tileSize: { x: 128, y: 128 },
  // Define the (top/left corner) coordinates of the tile in the spritesheet
  tile: { x: 32 , y: 16}
  // Define the size of tile in the spritesheet
  tilesetSize: { x: 16, y: 16 },
  // Repeat the tile vertically/horizontally:
  repeat: { x: 10, y: 2 }
});
```

### Use a tileset with spacing

When working with a tileset with spacing between tiles, you can crop them:

```js
// Imports and mesh setup identical to the previous full example...

sprite.material.tile({
  tileSize: { x: 128, y: 128 },
  tilesetSize: { x: 16, y: 16 },
  tile: 4,
  repeat: { x: 10, y: 2 },
  // Define the space between tiles in px
  spacing: 2
});
```

## Tilemaps

### Render a tilemap from a tileset

Instead of rendering individual sprites, you can render multiple different tiles on one mesh.

```js
// Import THREE.js and a material from thee-sprites
// Note that Tilemaps use a different base material as they run on
// different shaders compared to sprites
import * as THREE from "three";
import { TilemapMeshBasicMaterial } from "three-sprites";

// Load tileset
const texture = new THREE.TextureLoader().load("tileset.png");

// Turn off mipmapping to minimize seams on mag/min filters
texture.magFilter = THREE.LinearFilter;
texture.minFilter = THREE.LinearFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Create a mesh with the new material
const sprite = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 10),
  new TilemapMeshBasicMaterial({
    side: THREE.FrontSide,
    precision: "highp",
    map: texture,
  }),
);

// Configure the tiling
sprite.material.tile({
  // Define the size of the tileset in px
  tileSize: { x: 128, y: 128 },
  // Define the size of tiles in the tileset
  tilesetSize: { x: 16, y: 16 },
  // Define the space between tiles in the tileset
  spacing: 0,
  // Define how many tiles to display in each direction
  repeat: { x: 10, y: 5 }
  // Define which tiles to render
  tiles: [
    0, 0, 1, 5, 3, 9, 2, 5, 0, 0,
    0, 4, 4, 2, 2, 2, 1, 9, 0, 0,
    0, 1, 1, 5, 0, 9, 4, 3, 4, 0,
    0, 1, 0, 5, 3, 9, 2, 5, 0, 3,
    0, 7, 8, 4, 3, 2, 1, 9, 8, 7,
  ],
});

// Position the mesh and add it to your scene...
myScene.add(sprite)
```

### Layer tilemaps

Blend multiple tilemap layers on one mesh. Supports transparency.

```js
// Imports and mesh setup identical to the previous full example...

// Configure the tiling
sprite.material.tile({
  // Define the size of the tileset in px
  tileSize: { x: 128, y: 128 },
  // Define the size of tiles in the tileset
  tilesetSize: { x: 16, y: 16 },
  // Define the space between tiles in the tileset
  spacing: 0,
  // Define how many tiles to display in each direction
  repeat: { x: 10, y: 5 }
  // Define which tiles to render
  tiles: [
    // Layer one
    0, 0, 1, 5, 3, 9, 2, 5, 0, 0,
    0, 4, 4, 2, 2, 2, 1, 9, 0, 0,
    0, 1, 1, 5, 0, 9, 4, 3, 4, 0,
    0, 1, 0, 5, 3, 9, 2, 5, 0, 3,
    0, 7, 8, 4, 3, 2, 1, 9, 8, 7,
    // Layer two, will wrap around and start at the first tile again
    3, 7, 3, 0, 4, 7, 2, 7, 4, 6,
    3, 2, 3, 0, 1, 2, 2, 9, 6, 1,
    3, 7, 3, 2, 1, 7, 7, 1, 4, 6,
    2, 1, 2, 0, 4, 7, 2, 7, 2, 7,
    3, 7, 1, 3, 4, 7, 6, 6, 4, 9,
    // More layers
    // ...
  ],
});
```

## General

### Re-using textures

Instead of defining texture wrapping per texture, this library allows you to re-use textures across sprites and tilemaps.

```js
const texture = new THREE.TextureLoader().load("tileset.png");
const geo = new THREE.PlaneGeometry(1, 1);
const materialOptions = {
    side: THREE.FrontSide,
    precision: "highp",
    map: texture
};
const tilingOptions = {
  tileSize: { x: 16, y: 16 },
  tilesetSize: { x: 128, y: 128 }
}

// Sprite 1
const sprite1 = new THREE.Mesh(geo, new SpriteMeshBasicMaterial(materialOptions));
sprite1.tile({ ...tilingOptions, tile: 1 });
myScene.add(sprite1);

// Sprite 2
const sprite2 = new THREE.Mesh(geo, new SpriteMeshBasicMaterial(materialOptions));
sprite2.tile({ ...tilingOptions, tile: 5 });
myScene.add(sprite2);

// Sprite 3
const sprite3 = new THREE.Mesh(geo, new SpriteMeshBasicMaterial(materialOptions));
sprite3.tile({ ...tilingOptions, tile: 12 });
myScene.add(sprite3);

// Tlemap
const tilemap = new THREE.Mesh(geo, new TilemapMeshBasicMaterial(materialOptions));
tilemap.material.tile({
  ...tileOptions,
  repeat: { x: 10, y: 5 },
  tiles: [
    0, 0, 1, 5, 3, 9, 2, 5, 0, 0,
    0, 4, 4, 2, 2, 2, 1, 9, 0, 0,
    0, 1, 1, 5, 0, 9, 4, 3, 4, 0,
    0, 1, 0, 5, 3, 9, 2, 5, 0, 3,
    0, 7, 8, 4, 3, 2, 1, 9, 8, 7,
  ],
});
myScene.add(tilemap);
```

# Documentation

## Classes

| Class | Description |
| ------ | ------ |
| [SpriteMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMaterial.md) | Base material to render sprites: |
| [SpriteMeshBasicMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMeshBasicMaterial.md) | THREE.MeshBasicMaterial extending SpriteMaterial. |
| [SpriteMeshLambertMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMeshLambertMaterial.md) | THREE.MeshLambertMaterial extending SpriteMaterial. |
| [SpriteMeshPhongMaterial](classes/SpriteMeshPhongMaterial.md) | THREE.MeshPhongMaterial extending SpriteMaterial. |
| [SpriteMeshPhysicalMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMeshPhysicalMaterial.md) | THREE.MeshPhysicalMaterial extending SpriteMaterial. |
| [SpriteMeshStandardMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMeshStandardMaterial.md) | THREE.MeshStandardMaterial extending SpriteMaterial. |
| [SpriteMeshToonMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/SpriteMeshToonMaterial.md) | THREE.MeshToonMaterial extending SpriteMaterial. |
| [TilemapMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMaterial.md) | Base material to render sprites: |
| [TilemapMeshBasicMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshBasicMaterial.md) | THREE.MeshBasicMaterial extending TilemapMaterial. |
| [TilemapMeshLambertMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshLambertMaterial.md) | THREE.MeshLambertMaterial extending TilemapMaterial. |
| [TilemapMeshPhongMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshPhongMaterial.md) | THREE.MeshPhongMaterial extending TilemapMaterial. |
| [TilemapMeshPhysicalMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshPhysicalMaterial.md) | THREE.MeshPhysicalMaterial extending TilemapMaterial. |
| [TilemapMeshStandardMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshStandardMaterial.md) | THREE.MeshStandardMaterial extending TilemapMaterial. |
| [TilemapMeshToonMaterial](https://github.com/riokoe/three-sprites/tree/main/docs/classes/TilemapMeshToonMaterial.md) | THREE.MeshToonMaterial extending TilemapMaterial. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ISpriteTilingOptions](https://github.com/riokoe/three-sprites/tree/main/docs/interfaces/ISpriteTilingOptions.md) | Options for `SpriteMaterial.tile()` |
| [ISpriteUniforms](https://github.com/riokoe/three-sprites/tree/main/docs/interfaces/ISpriteUniforms.md) | Uniforms for `SpriteMaterial` |
| [ITilemapTilingOptions](https://github.com/riokoe/three-sprites/tree/main/docs/interfaces/ITilemapTilingOptions.md) | Options for `TilemapMaterial.tile()` |
| [ITilemapUniforms](https://github.com/riokoe/three-sprites/tree/main/docs/interfaces/ITilemapUniforms.md) | Uniforms for `TilemapMaterial` |
