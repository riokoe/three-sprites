import * as THREE from "three";
import { spriteShader } from "./shaders.js";

/**
 * Uniforms for `SpriteMaterial`
 */
export interface ISpriteUniforms {

  /**
   * Size of the tile as UVs:
   * `{ x: 0.1, y: 0.1 }`
   */
  tileSize?: THREE.Uniform<THREE.Vector2>;

  /**
   * UV coordinates of the tile:
   * `{ x: 0.0, y: 0.9 }`
   */
  tileCoord?: THREE.Uniform<THREE.Vector2>;

  /**
   * Amount of times to repeat the tile:
   * `{ x: 2, y: 2 }`
   */
  tileFactor?: THREE.Uniform<THREE.Vector2>;

  /**
   * Rest of uniforms inherited from the super class
   */
  [key: string]: THREE.IUniform | undefined;
}

/**
 * Options for `SpriteMaterial.tile()`
 */
export interface ISpriteTilingOptions<TVec extends THREE.Vector2Like = THREE.Vector2Like> {

  /**
   * Index or coordinates of a tile in the tileset.
   * For a tileset with a w/h of 128 and a tile size of
   * w/h 16, the coordinates/index for the second  tile
   * would look like this:
   * `tile = { x: 16, y: 0 }`
   * `tile = 1`
   * 
   * Default: `0`
   */
  tile?: number | TVec;

  /**
   * Size of the tile in the tileset in px:
   * `{ x: 16, y: 16 }`
   */
  tileSize?: TVec;

  /**
   * Size of the tileset in px:
   * `{ x: 128, y: 128 }`
   */
  tilesetSize?: TVec;

  /**
   * Amount of times to repeat the tile on the sprite:
   * `{ x: 2, y: 2 }`
   * 
   * Default: `{ x: 1, y: 1 }`
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
 * const sprite = new THREE.Mesh(
 *   new THREE.PlaneGeometry(1, 1),
 *   new SpriteMeshBasicMaterial({ map: myTileset }),
 * );
 * sprite.material.tile({
 *   tile: 3,
 *   tileSize: { x: 16, y: 32 },
 *   tilesetSize: { x: 96, y: 80 },
 * });
 * myScene.add(sprite);
 * ```
 */
export abstract class SpriteMaterial extends THREE.Material {

  /**
   * The texture for the sprite.
   * https://threejs.org/docs/?q=basicmat#api/en/materials/MeshBasicMaterial.map
   */
  public map?: THREE.Texture | null;

  /**
   * Uniforms of the shader. May be set before shader
   * compilation. Can be used to manipulate tile/tileset
   * size/coordinates instead of calling `tile(options)`.
   * Useful to bypass px -> UV calculations of `tile()` in
   * case tiling data is already formatted as UVs:
   * 
   * ```
   * const mat = new SpriteMaterial({ map: myTexture });
   * mat.uniforms = {
   *   tileSize: { value: new THREE.Vector2(0.5, 0.5) },
   *   tileCoord: { value: new THREE.Vector2(0, 0.5) },
   *   tileFactor: { value: new THREE.Vector2(1, 1) },
   * }
   * let n = 0;
   * while (await new Promise(res => setTimeout(res, 100))) {
   *   mat.uniforms.tileCoord.value.set(0.5 * n, 0.5);
   *   n = Number(!n);
   * }
   * ```
   */
  public uniforms?: ISpriteUniforms;

  /**
   * The tiling options set via `.tile()`. Manipulating them
   * directly takes no effect until `.tile()` is called again.
   */
  public tiling?: Required<ISpriteTilingOptions<THREE.Vector2>>;

  /**
   * Sets the tiling options:
   * 
   * ```
   * const sprite = new THREE.Mesh(
   *   new THREE.PlaneGeometry(1, 1),
   *   new SpriteMeshBasicMaterial({ map: myTileset }),
   * );
   * sprite.material.tile({
   *   tile: 3,
   *   tileSize: { x: 16, y: 32 },
   *   tilesetSize: { x: 96, y: 80 },
   * });
   * myScene.add(sprite);
   * ```
   * 
   * @param {ISpriteTilingOptions} options Tiling options to set.
   * @returns {void}
   */
  public tile(options: ISpriteTilingOptions): void {
    this.setTilingOptions(options);

    // Wait for onBeforeCompile in case options have been set
    // before the shader was compiled.
    if (!this.uniforms || !this.tiling)
      return;

    const tileSizeX = this.tiling.tileSize.x / this.tiling.tilesetSize.x;
    const tileSizeY = this.tiling.tileSize.y / this.tiling.tilesetSize.y;
    let tilePadX = this.tiling.spacing / this.tiling.tilesetSize.x;
    let tilePadY = this.tiling.spacing / this.tiling.tilesetSize.y;

    if (typeof this.tiling.tile === "object" && "x" in this.tiling.tile && "y" in this.tiling.tile) {
      tilePadX = 0;
      tilePadY = 0;
      this.uniforms.tileCoord?.value.set(
        this.tiling.tile.x / this.tiling.tilesetSize.x,
        // Abs to correct for negative floating point errors. Prevents edge artifacts
        Math.abs(1 - this.tiling.tile.y / this.tiling.tilesetSize.y - tileSizeY)
      );
    }
    else {
      const cols = this.tiling.tilesetSize.x / this.tiling.tileSize.x;
      this.uniforms.tileCoord?.value.set(
        (this.tiling.tile % cols) * tileSizeX + tilePadX / 2,
        // Abs to correct for negative floating point errors. Prevents edge artifacts
        Math.abs(1 - Math.floor(this.tiling.tile / cols) * tileSizeY - tileSizeY + tilePadY / 2)
      );
    }

    this.uniforms.tileSize?.value.set(
      tileSizeX - tilePadX,
      tileSizeY - tilePadY
    );
    this.uniforms.tileFactor?.value.set(
      1 / Math.max(1, this.tiling.repeat.x),
      1 / Math.max(1, this.tiling.repeat.y)
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
    return `sprite-${this.type}`;
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
  protected injectShaderFragments(shader: THREE.WebGLProgramParametersWithUniforms): void {
    this.mergeUniforms(shader);
    if (this.tiling)
      this.tile(this.tiling);

    shader.fragmentShader = `
      ${spriteShader.uniforms()}
      ${shader.fragmentShader}
    `;
    shader.fragmentShader = shader.fragmentShader.replace(
      spriteShader.fragReplace(),
      spriteShader.frag()
    );
  }

  /**
   * Used internally to merge `ISpriteTilingOptions` from`.tile()`
   * with Required<ISpriteTilingOptions<THREE.Vector2>> on
   * `this.tiling`.
   * 
   * @param {ISpriteTilingOptions} options Tiling options to set.
   * @returns {void}
   */
  public setTilingOptions(options: ISpriteTilingOptions): void {
    if (!this.tiling) {
      this.tiling = {
        tile: 0,
        tileSize: new THREE.Vector2(0, 0),
        tilesetSize: new THREE.Vector2(0, 0),
        repeat: new THREE.Vector2(0, 0),
        spacing: 0,
      };
    }
    if (typeof options.tile !== "undefined") {
      if (typeof options.tile === "object" && "x" in options.tile && "y" in options.tile) {
        if (!(this.tiling.tile instanceof THREE.Vector2))
          this.tiling.tile = new THREE.Vector2();
        this.tiling.tile.copy(options.tile);
      }
      else {
        this.tiling.tile = options.tile;
      }
    }
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
  public mergeUniforms(shader: THREE.WebGLProgramParametersWithUniforms): void {
    const existingUniforms = this.uniforms;
    this.uniforms = shader.uniforms;
    if (existingUniforms) {
      for (const key in existingUniforms) {
        if (!this.uniforms[key])
          this.uniforms[key] = existingUniforms[key];
      }
    }
    if (!this.uniforms.tileCoord)
      this.uniforms.tileCoord = new THREE.Uniform(new THREE.Vector2(0));
    if (!this.uniforms.tileSize)
      this.uniforms.tileSize = new THREE.Uniform(new THREE.Vector2(0));
    if (!this.uniforms.tileFactor)
      this.uniforms.tileFactor = new THREE.Uniform(new THREE.Vector2(1));
  }

  /**
   * Static method to create mixins of `THREE.Material`-based
   * classes and `SpriteMaterial`. Used internally to generate
   * mixin classes. Generates a new class instead of extending
   * the original class. Hence do not use to create mixins
   * during runtime or you'll risk leaking memory.
   * 
   * @param {T} ctor The class to extend.
   * @returns {new () => T & TiledMaterial}
   */
  public static extendClass<
    TCtor extends new (args: TParam) => THREE.Material,
    TParam extends THREE.MaterialParameters
  >(ctor: TCtor): new (args: TParam) => TCtor & SpriteMaterial {
    const newClass = class extends (ctor as new (args: TParam) => THREE.Material) { };
    for (const prop of Object.getOwnPropertyNames(SpriteMaterial.prototype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.defineProperty(newClass.prototype, prop, Object.getOwnPropertyDescriptor(SpriteMaterial.prototype, prop as keyof SpriteMaterial) ?? Object.create(null));
    }
    return newClass as unknown as new (args: TParam) => TCtor & SpriteMaterial;
  }

  /**
   * Static method to extend instanciated materials by
   * `SpriteMaterial`'s prototype.
   * 
   * @param {T} material The material to extend.
   * @returns {SpriteMaterial & T}
   */
  public static extendMaterial<T extends THREE.Material>(material: T): SpriteMaterial & T {
    for (const prop of Object.getOwnPropertyNames(SpriteMaterial.prototype)) {
      if (!(prop in material)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.defineProperty(material, prop, Object.getOwnPropertyDescriptor(SpriteMaterial.prototype, prop as keyof SpriteMaterial) ?? Object.create(null));
      }
    }
    material.needsUpdate = true;
    return material as SpriteMaterial & T;
  }

}
