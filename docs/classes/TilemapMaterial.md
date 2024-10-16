[**three-sprites**](../index.md) • **Docs**

***

# Class: `abstract` TilemapMaterial

Base material to render sprites:

```
const tilemap = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new TilemapMeshBasicMaterial({ map: myTileset }),
);
tilemap.material.tile({
  tile: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  tileSize: { x: 16, y: 16 },
  tilesetSize: { x: 96, y: 80 },
});
myScene.add(tilemap);
```

## Extends

- `Material`

## Constructors

### new TilemapMaterial()

> **new TilemapMaterial**(): [`TilemapMaterial`](TilemapMaterial.md)

#### Returns

[`TilemapMaterial`](TilemapMaterial.md)

#### Inherited from

`THREE.Material.constructor`

#### Defined in

node\_modules/@types/three/src/materials/Material.d.ts:237

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `map?` | `public` | `null` \| `Texture` | The texture for the Tilemap. https://threejs.org/docs/?q=basicmat#api/en/materials/MeshBasicMaterial.map | [src/TilemapMaterial.ts:124](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L124) |
| `tiling?` | `public` | `Required`\<[`ITilemapTilingOptions`](../interfaces/ITilemapTilingOptions.md)\<`Vector2`\>\> | The tiling options set via `.tile()`. Manipulating them directly takes no effect until `.tile()` is called again. | [src/TilemapMaterial.ts:146](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L146) |
| `uniforms?` | `public` | [`ITilemapUniforms`](../interfaces/ITilemapUniforms.md) | Uniforms of the shader. May be set before shader compilation. `const mat = new SpriteMaterial({ map: myTexture }); mat.uniforms = { myCustomUniform: { value: 10 }, } mat.tile({ // ... });` | [src/TilemapMaterial.ts:140](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L140) |

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

[src/TilemapMaterial.ts:222](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L222)

***

### injectShaderFragments()

> **injectShaderFragments**(`shader`): `void`

Injects tiling shader fragments into the material's original
shader program.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader` | `WebGLProgramParametersWithUniforms` | The shader provided by the renderer. |

#### Returns

`void`

#### Defined in

[src/TilemapMaterial.ts:259](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L259)

***

### mergeUniforms()

> **mergeUniforms**(`shader`?): `void`

Used internally to merge pre-existing uniforms after the
shader is (re-)compiled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shader`? | `WebGLProgramParametersWithUniforms` | The shader provided by the renderer. |

#### Returns

`void`

#### Defined in

[src/TilemapMaterial.ts:312](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L312)

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

[src/TilemapMaterial.ts:247](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L247)

***

### setTilingOptions()

> **setTilingOptions**(`options`): `void`

Used internally to merge `ITilemapTilingOptions` from`.tile()`
with Required<ITilemapTilingOptions<THREE.Vector2>> on
`this.tiling`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ITilemapTilingOptions`](../interfaces/ITilemapTilingOptions.md)\<`Vector2Like`\> | Tiling options to set. |

#### Returns

`void`

#### Defined in

[src/TilemapMaterial.ts:282](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L282)

***

### tile()

> **tile**(`options`): `void`

Sets the tiling options:

```
const tilemap = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new TilemapMeshBasicMaterial({ map: myTileset }),
);
tilemap.material.tile({
  tile: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  tileSize: { x: 16, y: 16 },
  tilesetSize: { x: 96, y: 80 },
});
myScene.add(tilemap);
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ITilemapTilingOptions`](../interfaces/ITilemapTilingOptions.md)\<`Vector2Like`\> | Tiling options to set. |

#### Returns

`void`

#### Defined in

[src/TilemapMaterial.ts:167](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L167)

***

### extendClass()

> `static` **extendClass**\<`TCtor`, `TParam`\>(`ctor`): (`args`) => `TCtor` & [`TilemapMaterial`](TilemapMaterial.md)

Static method to create mixins of `THREE.Material`-based
classes and `TilemapMaterial`. Used internally to generate
mixin classes. Generates a new class instead of extending
the original class. Hence do not use to create mixins
during runtime or you'll risk leaking memory.

#### Type Parameters

| Type Parameter |
| ------ |
| `TCtor` *extends* (`args`) => `Material` |
| `TParam` *extends* `MaterialParameters` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctor` | `TCtor` | The class to extend. |

#### Returns

`Function`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | `TParam` |

##### Returns

`TCtor` & [`TilemapMaterial`](TilemapMaterial.md)

#### Defined in

[src/TilemapMaterial.ts:354](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L354)

***

### extendMaterial()

> `static` **extendMaterial**\<`T`\>(`material`): [`TilemapMaterial`](TilemapMaterial.md) & `T`

Static method to extend instanciated materials by
TilemapMaterial's prototype.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Material` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `material` | `T` | The material to extend. |

#### Returns

[`TilemapMaterial`](TilemapMaterial.md) & `T`

#### Defined in

[src/TilemapMaterial.ts:373](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L373)
