[**three-sprites**](../index.md) • **Docs**

***

# Interface: ITilemapTilingOptions\<TVec\>

Options for `TilemapMaterial.tile()`

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TVec` *extends* `THREE.Vector2Like` | `THREE.Vector2Like` |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `repeat?` | `TVec` | Describes the amount of rows/columns in the tilemap: `{ x: 10, y: 5 }` | [src/TilemapMaterial.ts:91](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L91) |
| `spacing?` | `number` | Spacing between tiles in the tileset in px: `spacing: 2` Default: `0` | [src/TilemapMaterial.ts:99](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L99) |
| `tiles?` | `number`[] | An array of indices for tiles from the tileset to be displayed on the tilemap in order: `[ 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, 0, 1, 5, 2, 5, 3, 1, ]` | [src/TilemapMaterial.ts:73](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L73) |
| `tilesetSize?` | `TVec` | Size of the tileset in px: `{ x: 128, y: 128 }` | [src/TilemapMaterial.ts:85](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L85) |
| `tileSize?` | `TVec` | Size of the tiles in the tileset in px: `{ x: 16, y: 16 }` | [src/TilemapMaterial.ts:79](https://github.com/riokoe/three-sprites/blob/main/src/TilemapMaterial.ts#L79) |
