[**three-sprites**](../index.md) • **Docs**

***

# Class: SpriteMeshPhongMaterial

THREE.MeshPhongMaterial extending SpriteMaterial.

```
const material = new THREE.SpriteMeshPhongMaterial({
  map: myTexture,
});

materiial.tile({
  tile: 0,
  tileSize: { x: 16, y: 16 },
  tilesetSize: { x: 128, y: 128 },
});
```

## Extends

- [`SpriteMaterial`](SpriteMaterial.md)\<`this`\> & *typeof* `MeshPhongMaterial`

## Constructors

### new SpriteMeshPhongMaterial()

> **new SpriteMeshPhongMaterial**(): [`SpriteMeshPhongMaterial`](SpriteMeshPhongMaterial.md)

#### Returns

[`SpriteMeshPhongMaterial`](SpriteMeshPhongMaterial.md)

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).constructor`

#### Defined in

[src/SpriteMaterial.ts:338](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L338)

***

### new SpriteMeshPhongMaterial()

> **new SpriteMeshPhongMaterial**(`parameters`?): `MeshPhongMaterial`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parameters`? | `MeshPhongMaterialParameters` |

#### Returns

`MeshPhongMaterial`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).constructor`

#### Defined in

[src/index.ts:97](https://github.com/riokoe/three-sprites/blob/main/src/index.ts#L97)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| `map?` | `public` | `null` \| `Texture` | The texture for the sprite. https://threejs.org/docs/?q=basicmat#api/en/materials/MeshBasicMaterial.map | `SpriteMaterial.extendClass(THREE.MeshPhongMaterial).map` | [src/SpriteMaterial.ts:101](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L101) |
| `prototype` | `public` | `MeshPhongMaterial` | - | `SpriteMaterial.extendClass(THREE.MeshPhongMaterial).prototype` |  |
| `tiling?` | `public` | `Required`\<[`ISpriteTilingOptions`](../interfaces/ISpriteTilingOptions.md)\<`Vector2`\>\> | The tiling options set via `.tile()`. Manipulating them directly takes no effect until `.tile()` is called again. | `SpriteMaterial.extendClass(THREE.MeshPhongMaterial).tiling` | [src/SpriteMaterial.ts:130](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L130) |
| `uniforms?` | `public` | [`ISpriteUniforms`](../interfaces/ISpriteUniforms.md) | Uniforms of the shader. May be set before shader compilation. Can be used to manipulate tile/tileset size/coordinates instead of calling `tile(options)`. Useful to bypass px -> UV calculations of `tile()` in case tiling data is already formatted as UVs: `const mat = new SpriteMaterial({ map: myTexture }); mat.uniforms = { tileSize: { value: new THREE.Vector2(0.5, 0.5) }, tileCoord: { value: new THREE.Vector2(0, 0.5) }, tileRepeat: { value: new THREE.Vector2(1, 1) }, } let n = 0; while (await new Promise(res => setTimeout(res, 100))) { mat.uniforms.tileCoord.value.set(0.5 * n, 0.5); n = Number(!n); }` | `SpriteMaterial.extendClass(THREE.MeshPhongMaterial).uniforms` | [src/SpriteMaterial.ts:124](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L124) |

## Methods

### customProgramCacheKey()

> **customProgramCacheKey**(): `string`

Overrides `THREE.Material.onBeforeCompile()`.
https://threejs.org/docs/?q=Material#api/en/materials/Material.customProgramCacheKey

Returns a custom shader cache key identifying the base
material and tiling type. When inheriting from this class
and overriding this method, ensure to adopt the original
key to prevent stale shaders across different configurationsL

```
customProgramCacheKey() {
  const originalKey = super.customProgramCacheKey();
  return `${originalKey}-${myKey}`;
}
```

#### Returns

`string`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).customProgramCacheKey`

#### Defined in

[src/SpriteMaterial.ts:210](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L210)

***

### injectShaderFragments()

> `protected` **injectShaderFragments**(`shader`): `void`

Injects tiling shader fragments into the material's original
shader program.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `WebGLProgramParametersWithUniforms` | The shader provided by the renderer. |

#### Returns

`void`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).injectShaderFragments`

#### Defined in

[src/SpriteMaterial.ts:247](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L247)

***

### mergeUniforms()

> **mergeUniforms**(`shader`): `void`

Used internally to merge pre-existing uniforms after the
shader is (re-)compiled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `WebGLProgramParametersWithUniforms` | The shader provided by the renderer. |

#### Returns

`void`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).mergeUniforms`

#### Defined in

[src/SpriteMaterial.ts:311](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L311)

***

### onBeforeCompile()

> **onBeforeCompile**(`shader`): `void`

Overrides `THREE.Material.onBeforeCompile()`.
https://threejs.org/docs/?q=Material#api/en/materials/Material.onBeforeCompile

Injects tiling shader fragments into the material's original
shader program. When inheriting from this class and overriding
this method, ensure to call `super.onBeforeCompile()`
or `this.injectShaderFragments()` to ensure the tiling shader
artifacts are injected.

```
onBeforeCompile(shader) {
  // My shader manipulation logic here...
  this.injectShaderFragments(shader);
}
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `WebGLProgramParametersWithUniforms` | The shader provided by the renderer. |

#### Returns

`void`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).onBeforeCompile`

#### Defined in

[src/SpriteMaterial.ts:235](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L235)

***

### setTilingOptions()

> **setTilingOptions**(`options`): `void`

Used internally to merge `ISpriteTilingOptions` from`.tile()`
with Required<ISpriteTilingOptions<THREE.Vector2>> on
`this.tiling`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ISpriteTilingOptions`](../interfaces/ISpriteTilingOptions.md)\<`Vector2Like`\> | Tiling options to set. |

#### Returns

`void`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).setTilingOptions`

#### Defined in

[src/SpriteMaterial.ts:273](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L273)

***

### tile()

> **tile**(`options`): `void`

Sets the tiling options:

```
const sprite = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new SpriteMeshBasicMaterial({ map: myTileset }),
);
sprite.material.tile({
  tile: 3,
  tileSize: { x: 16, y: 32 },
  tilesetSize: { x: 96, y: 80 },
});
myScene.add(sprite);
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ISpriteTilingOptions`](../interfaces/ISpriteTilingOptions.md)\<`Vector2Like`\> | Tiling options to set. |

#### Returns

`void`

#### Inherited from

`SpriteMaterial.extendClass(THREE.MeshPhongMaterial).tile`

#### Defined in

[src/SpriteMaterial.ts:151](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L151)
