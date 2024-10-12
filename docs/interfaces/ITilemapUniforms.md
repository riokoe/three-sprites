[**three-sprites**](../index.md) • **Docs**

***

# Interface: ITilemapUniforms

Uniforms for `TilemapMaterial`

## Indexable

 \[`key`: `string`\]: `THREE.IUniform` \| `undefined`

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `tileCount?` | `Uniform`\<`Vector2`\> | Number of columns/rows in the tileset: `{ x: 5, y: 5 }` | src/TilemapMaterial.ts:33 |
| `tileFactor?` | `Uniform`\<`Vector2`\> | Factor of tileset dimensions vs UVs `{ x: 2, y: 1 }` | src/TilemapMaterial.ts:39 |
| `tileRepeat?` | `Uniform`\<`Vector2`\> | Number of columns/rows in the tilemap: `{ x: 10, y: 5 }` | src/TilemapMaterial.ts:45 |
| `tiles?` | `Uniform`\<`Float32Array`\> | Tile nunmbers in order. `[ 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, ]` | src/TilemapMaterial.ts:21 |
| `tileSize?` | `Uniform`\<`Vector2`\> | Size of the tile as UVs: `{ x: 0.1, y: 0.1 }` | src/TilemapMaterial.ts:27 |
| `tileSpacing?` | `Uniform`\<`Vector2`\> | Spacing between tiles in UVs: `{ x: 0.01, y: 0.01 }` | src/TilemapMaterial.ts:51 |
