[**three-sprites**](../index.md) • **Docs**

***

# Class: `abstract` SpriteMaterial

Base material to render sprites:

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

## Extends

- `Material`

## Constructors

### new SpriteMaterial()

> **new SpriteMaterial**(): [`SpriteMaterial`](SpriteMaterial.md)

#### Returns

[`SpriteMaterial`](SpriteMaterial.md)

#### Inherited from

`THREE.Material.constructor`

#### Defined in

node\_modules/@types/three/src/materials/Material.d.ts:237

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `map?` | `public` | `null` \| `Texture` | The texture for the sprite. https://threejs.org/docs/?q=basicmat#api/en/materials/MeshBasicMaterial.map | [src/SpriteMaterial.ts:101](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L101) |
| `tiling?` | `public` | `Required`\<[`ISpriteTilingOptions`](../interfaces/ISpriteTilingOptions.md)\<`Vector2`\>\> | The tiling options set via `.tile()`. Manipulating them directly takes no effect until `.tile()` is called again. | [src/SpriteMaterial.ts:130](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L130) |
| `uniforms?` | `public` | [`ISpriteUniforms`](../interfaces/ISpriteUniforms.md) | Uniforms of the shader. May be set before shader compilation. Can be used to manipulate tile/tileset size/coordinates instead of calling `tile(options)`. Useful to bypass px -> UV calculations of `tile()` in case tiling data is already formatted as UVs: `const mat = new SpriteMaterial({ map: myTexture }); mat.uniforms = { tileSize: { value: new THREE.Vector2(0.5, 0.5) }, tileCoord: { value: new THREE.Vector2(0, 0.5) }, tileRepeat: { value: new THREE.Vector2(1, 1) }, } let n = 0; while (await new Promise(res => setTimeout(res, 100))) { mat.uniforms.tileCoord.value.set(0.5 * n, 0.5); n = Number(!n); }` | [src/SpriteMaterial.ts:124](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L124) |

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

#### Overrides

`THREE.Material.customProgramCacheKey`

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

#### Overrides

`THREE.Material.onBeforeCompile`

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

#### Defined in

[src/SpriteMaterial.ts:151](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L151)

***

### extendClass()

> `static` **extendClass**\<`T`\>(`ctor`): () => [`SpriteMaterial`](SpriteMaterial.md) & `T`

Static method to create mixins of `THREE.Material`-based
classes and `SpriteMaterial`. Used internally to generate
mixin classes. Generates a new class instead of extending
the original class. Hence do not use to create mixins
during runtime or you'll risk leaking memory.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* () => `Material` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctor` | `T` | The class to extend. |

#### Returns

`Function`

##### Returns

[`SpriteMaterial`](SpriteMaterial.md) & `T`

#### Defined in

[src/SpriteMaterial.ts:338](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L338)

***

### extendMaterial()

> `static` **extendMaterial**\<`T`\>(`material`): [`SpriteMaterial`](SpriteMaterial.md) & `T`

Static method to extend instanciated materials by
`SpriteMaterial`'s prototype.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Material` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `material` | `T` | The material to extend. |

#### Returns

[`SpriteMaterial`](SpriteMaterial.md) & `T`

#### Defined in

[src/SpriteMaterial.ts:354](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L354)
