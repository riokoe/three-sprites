import * as THREE from "three";
import { mapShader } from "./shaders.js";

/**
 * Uniforms for `TilemapMaterial`
 */
export interface ITilemapUniforms {

  /**
   * Tile nunmbers in order.
   * 
   * ```
   * [
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   * ]
   * ```
   */
  tiles?: THREE.Uniform<Float32Array>;

  /**
   * Size of the tile as UVs:
   * `{ x: 0.1, y: 0.1 }`
   */
  tileSize?: THREE.Uniform<THREE.Vector2>;

  /**
   * Number of columns/rows in the tileset:
   * `{ x: 5, y: 5 }`
   */
  tileCount?: THREE.Uniform<THREE.Vector2>;

  /**
   * Factor of tileset dimensions vs UVs
   * `{ x: 2, y: 1 }`
   */
  tileFactor?: THREE.Uniform<THREE.Vector2>;

  /**
   * Number of columns/rows in the tilemap:
   * `{ x: 10, y: 5 }`
   */
  tileRepeat?: THREE.Uniform<THREE.Vector2>;

  /**
   * Spacing between tiles in UVs:
   * `{ x: 0.01, y: 0.01 }`
   */
  tileSpacing?: THREE.Uniform<THREE.Vector2>;
  [key: string]: THREE.IUniform | undefined;
}

/**
 * Options for `TilemapMaterial.tile()`
 */
export interface ITilemapTilingOptions<TVec extends THREE.Vector2Like = THREE.Vector2Like> {

  /**
   * An array of indices for tiles from the tileset to be
   * displayed on the tilemap in order:
   * 
   * ```
   * [
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   *   0, 1, 5, 2, 5, 3, 1,
   * ]
   * ```
   */
  tiles?: number[];

  /**
   * Size of the tiles in the tileset in px:
   * `{ x: 16, y: 16 }`
   */
  tileSize?: TVec;

  /**
   * Size of the tileset in px:
   * `{ x: 128, y: 128 }`
   */
  tilesetSize?: TVec;

  /**
   * Describes the amount of rows/columns in the tilemap:
   * `{ x: 10, y: 5 }`
   */
  repeat?: TVec;

  /**
   * Spacing between tiles in the tileset in px:
   * `spacing: 2`
   * 
   * Default: `0`
   */
  spacing?: number;
}

/**
 * Base material to render sprites:
 * 
 * ```
 * const tilemap = new THREE.Mesh(
 *   new THREE.PlaneGeometry(10, 10),
 *   new TilemapMeshBasicMaterial({ map: myTileset }),
 * );
 * tilemap.material.tile({
 *   tile: [1, 2, 3, 4, 5, 6, 7, 8, 9],
 *   tileSize: { x: 16, y: 16 },
 *   tilesetSize: { x: 96, y: 80 },
 * });
 * myScene.add(tilemap);
 * ```
 */
export abstract class TilemapMaterial extends THREE.Material {

  /**
   * The texture for the Tilemap.
   * https://threejs.org/docs/?q=basicmat#api/en/materials/MeshBasicMaterial.map
   */
  public map?: THREE.Texture | null;

  /**
   * Uniforms of the shader. May be set before shader
   * compilation.
   * 
   * ```
   * const mat = new SpriteMaterial({ map: myTexture });
   * mat.uniforms = {
   *   myCustomUniform: { value: 10 },
   * }
   * mat.tile({
   *   // ...
   * });
   * ```
   */
  public uniforms?: ITilemapUniforms;

  /**
   * The tiling options set via `.tile()`. Manipulating them
   * directly takes no effect until `.tile()` is called again.
   */
  public tiling?: Required<ITilemapTilingOptions<THREE.Vector2>>;

  /**
   * Sets the tiling options:
   * 
   * ```
   * const tilemap = new THREE.Mesh(
   *   new THREE.PlaneGeometry(10, 10),
   *   new TilemapMeshBasicMaterial({ map: myTileset }),
   * );
   * tilemap.material.tile({
   *   tile: [1, 2, 3, 4, 5, 6, 7, 8, 9],
   *   tileSize: { x: 16, y: 16 },
   *   tilesetSize: { x: 96, y: 80 },
   * });
   * myScene.add(tilemap);
   * ```
   * 
   * @param {ITilemapTilingOptions} options Tiling options to set.
   * @returns {void}
   */
  public tile(options: ITilemapTilingOptions): void {
    this.setTilingOptions(options);

    // Wait for onBeforeCompile in case options have been set
    // before the shader was compiled.
    if (!this.uniforms || !this.tiling)
      return;

    // If onBeforeCompile was fired before tiling options were
    // set, then the `tiles` uniform will be empty, in which case
    // we re-calculate uniforms.
    if (!this.uniforms.tiles)
      this.mergeUniforms();

    this.uniforms.tiles?.value.set(this.tiling.tiles);
    this.uniforms.tileSize?.value.set(
      this.tiling.tileSize.x / this.tiling.tilesetSize.x,
      this.tiling.tileSize.y / this.tiling.tilesetSize.y
    );
    this.uniforms.tileCount?.value.set(
      this.tiling.tilesetSize.x / this.tiling.tileSize.x,
      this.tiling.tilesetSize.y / this.tiling.tileSize.y
    );
    this.uniforms.tileFactor?.value.set(
      1 / Math.max(1, this.tiling.repeat.x),
      1 / Math.max(1, this.tiling.repeat.y)
    );
    this.uniforms.tileRepeat?.value.set(
      Math.max(1, this.tiling.repeat.x),
      Math.max(1, this.tiling.repeat.y)
    );
    this.uniforms.tileSpacing?.value.set(
      this.tiling.spacing / this.tiling.tilesetSize.x,
      this.tiling.spacing / this.tiling.tilesetSize.y
    );
  }

  /**
   * Overrides `THREE.Material.onBeforeCompile()`.
   * https://threejs.org/docs/?q=Material#api/en/materials/Material.customProgramCacheKey
   * 
   * Returns a custom shader cache key identifying the base
   * material and tiling type. When inheriting from this class
   * and overriding this method, ensure to adopt the original
   * key to prevent stale shaders across different configurationsL
   * 
   * ```
   * customProgramCacheKey() {
   *   const originalKey = super.customProgramCacheKey();
   *   return `${originalKey}-${myKey}`;
   * }
   * ```
   * 
   * @returns {string}
   */
  public customProgramCacheKey(): string {
    return `tilemap-${this.type}-${String(this.uniforms?.tiles?.value.length ?? this.tiling?.tiles.length ?? 0)}`;
  }

  /**
   * Overrides `THREE.Material.onBeforeCompile()`.
   * https://threejs.org/docs/?q=Material#api/en/materials/Material.onBeforeCompile
   * 
   * Injects tiling shader fragments into the material's original
   * shader program. When inheriting from this class and overriding
   * this method, ensure to call `super.onBeforeCompile()`
   * or `this.injectShaderFragments()` to ensure the tiling shader
   * artifacts are injected.
   * 
   * ```
   * onBeforeCompile(shader) {
   *   // My shader manipulation logic here...
   *   this.injectShaderFragments(shader);
   * }
   * ```
   * 
   * @param {THREE.WebGLProgramParametersWithUniforms} shader
   *   The shader provided by the renderer. 
   * @returns {void}
   */
  public onBeforeCompile(shader: THREE.WebGLProgramParametersWithUniforms): void {
    this.injectShaderFragments(shader);
  }

  /**
   * Injects tiling shader fragments into the material's original
   * shader program.
   *
   * @param {THREE.WebGLProgramParametersWithUniforms} shader
   *   The shader provided by the renderer.
   * @returns {void}
   */
  injectShaderFragments(shader: THREE.WebGLProgramParametersWithUniforms): void {
    this.mergeUniforms(shader);
    if (this.tiling)
      this.tile(this.tiling);

    shader.fragmentShader = `
      ${mapShader.uniforms(this.tiling?.tiles.length ?? 0)}
      ${shader.fragmentShader}
    `;
    shader.fragmentShader = shader.fragmentShader.replace(
      mapShader.fragReplace(),
      mapShader.frag()
    );
  }

  /**
   * Used internally to merge `ITilemapTilingOptions` from`.tile()`
   * with Required<ITilemapTilingOptions<THREE.Vector2>> on
   * `this.tiling`.
   * 
   * @param {ITilemapTilingOptions} options Tiling options to set.
   * @returns {void}
   */
  public setTilingOptions(options: ITilemapTilingOptions): void {
    if (!this.tiling) {
      this.tiling = {
        tiles: [],
        tileSize: new THREE.Vector2(0, 0),
        tilesetSize: new THREE.Vector2(0, 0),
        repeat: new THREE.Vector2(0, 0),
        spacing: 0,
      };
    }
    if (typeof options.tiles !== "undefined")
      this.tiling.tiles = Array.from(options.tiles);
    if (typeof options.tileSize !== "undefined")
      this.tiling.tileSize.copy(options.tileSize);
    if (typeof options.tilesetSize !== "undefined")
      this.tiling.tilesetSize.copy(options.tilesetSize);
    if (typeof options.repeat !== "undefined")
      this.tiling.repeat.copy(options.repeat);
    if (typeof options.spacing !== "undefined")
      this.tiling.spacing = options.spacing;
  }

  /**
   * Used internally to merge pre-existing uniforms after the
   * shader is (re-)compiled.
   * 
   * @param {THREE.WebGLProgramParametersWithUniforms} shader
   *   The shader provided by the renderer.
   * @returns {void}
   */
  public mergeUniforms(shader?: THREE.WebGLProgramParametersWithUniforms): void {
    if (shader) {
      const existingUniforms = this.uniforms;
      this.uniforms = shader.uniforms;
      if (existingUniforms) {
        for (const key in existingUniforms) {
          if (!this.uniforms[key])
            this.uniforms[key] = existingUniforms[key];
        }
      }
    }

    if (!this.uniforms)
      return;

    if (this.tiling && (!this.uniforms.tiles || this.uniforms.tiles.value.length !== this.tiling.tiles.length)) {
      if (this.uniforms.tiles)
        this.needsUpdate = true;
      this.uniforms.tiles = new THREE.Uniform(new Float32Array(this.tiling.tiles));
    }
    if (!this.uniforms.tileSize)
      this.uniforms.tileSize = new THREE.Uniform(new THREE.Vector2(0));
    if (!this.uniforms.tileCount)
      this.uniforms.tileCount = new THREE.Uniform(new THREE.Vector2(0));
    if (!this.uniforms.tileFactor)
      this.uniforms.tileFactor = new THREE.Uniform(new THREE.Vector2(0));
    if (!this.uniforms.tileRepeat)
      this.uniforms.tileRepeat = new THREE.Uniform(new THREE.Vector2(1));
    if (!this.uniforms.tileSpacing)
      this.uniforms.tileSpacing = new THREE.Uniform(new THREE.Vector2(0));
  }

  /**
   * Static method to create mixins of `THREE.Material`-based
   * classes and `TilemapMaterial`. Used internally to generate
   * mixin classes. Generates a new class instead of extending
   * the original class. Hence do not use to create mixins
   * during runtime or you'll risk leaking memory.
   * 
   * @param {T} ctor The class to extend.
   * @returns {new () => T & TilemapMaterial}
   */
  public static extendClass<
    TCtor extends new (args: TParam) => THREE.Material,
    TParam extends THREE.MaterialParameters
  >(ctor: TCtor): new (args: TParam) => TCtor & TilemapMaterial {
    const newClass = class extends (ctor as new (args: TParam) => THREE.Material) { };
    for (const prop of Object.getOwnPropertyNames(TilemapMaterial.prototype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.defineProperty(newClass.prototype, prop, Object.getOwnPropertyDescriptor(TilemapMaterial.prototype, prop as keyof TilemapMaterial) ?? Object.create(null));
    }
    return newClass as unknown as new (args: TParam) => TCtor & TilemapMaterial;
  }

  /**
   * Static method to extend instanciated materials by
   * TilemapMaterial's prototype.
   * 
   * @param {T} material The material to extend.
   * @returns {TilemapMaterial & T}
   */
  public static extendMaterial<T extends THREE.Material>(material: T): TilemapMaterial & T {
    for (const prop of Object.getOwnPropertyNames(TilemapMaterial.prototype)) {
      if (!(prop in material)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.defineProperty(material, prop, Object.getOwnPropertyDescriptor(TilemapMaterial.prototype, prop as keyof TilemapMaterial) ?? Object.create(null));
      }
    }
    material.needsUpdate = true;
    return material as TilemapMaterial & T;
  }
}
