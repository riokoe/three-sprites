import * as THREE from "three";
import { SpriteMaterial, type ISpriteTilingOptions, type ISpriteUniforms } from "./SpriteMaterial.js";
import { TilemapMaterial, type ITilemapTilingOptions, type ITilemapUniforms } from "./TilemapMaterial.js";

export {
  type ITilemapUniforms,
  type ISpriteUniforms,
  type ISpriteTilingOptions,
  type ITilemapTilingOptions,
  SpriteMaterial,
  TilemapMaterial,
};

/**
 * THREE.MeshBasicMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshBasicMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshBasicMaterial extends SpriteMaterial.extendClass(THREE.MeshBasicMaterial) { }

/**
 * THREE.MeshLambertMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshLambertMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshLambertMaterial extends SpriteMaterial.extendClass(THREE.MeshLambertMaterial) { }

/**
 * THREE.MeshStandardMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshStandardMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshStandardMaterial extends SpriteMaterial.extendClass(THREE.MeshStandardMaterial) { }

/**
 * THREE.MeshPhysicalMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshPhysicalMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshPhysicalMaterial extends SpriteMaterial.extendClass(THREE.MeshPhysicalMaterial) { }

/**
 * THREE.MeshPhongMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshPhongMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshPhongMaterial extends SpriteMaterial.extendClass(THREE.MeshPhongMaterial) { }

/**
 * THREE.MeshToonMaterial extending SpriteMaterial.
 * 
 * ```
 * const material = new THREE.SpriteMeshToonMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tile: 0,
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class SpriteMeshToonMaterial extends SpriteMaterial.extendClass(THREE.MeshToonMaterial) { }

/**
 * THREE.MeshBasicMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshBasicMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshBasicMaterial extends TilemapMaterial.extendClass(THREE.MeshBasicMaterial) { }

/**
 * THREE.MeshLambertMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshLambertMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshLambertMaterial extends TilemapMaterial.extendClass(THREE.MeshLambertMaterial) { }

/**
 * THREE.MeshStandardMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshStandardMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshStandardMaterial extends TilemapMaterial.extendClass(THREE.MeshStandardMaterial) { }

/**
 * THREE.MeshPhysicalMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshPhysicalMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshPhysicalMaterial extends TilemapMaterial.extendClass(THREE.MeshPhysicalMaterial) { }

/**
 * THREE.MeshPhongMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshPhongMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshPhongMaterial extends TilemapMaterial.extendClass(THREE.MeshPhongMaterial) { }

/**
 * THREE.MeshToonMaterial extending TilemapMaterial.
 * 
 * ```
 * const material = new THREE.TilemapMeshToonMaterial({
 *   map: myTexture,
 * });
 * 
 * materiial.tile({
 *   tiles: [1, 2, 3, 4, 5, 6, 7],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 128, y: 128 },
 * });
 * ```
 */
export class TilemapMeshToonMaterial extends TilemapMaterial.extendClass(THREE.MeshToonMaterial) { }
