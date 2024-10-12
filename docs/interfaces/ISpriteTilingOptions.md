[**three-sprites**](../index.md) • **Docs**

***

# Interface: ISpriteTilingOptions\<TVec\>

Options for `SpriteMaterial.tile()`

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TVec` *extends* `THREE.Vector2Like` | `THREE.Vector2Like` |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `repeat?` | `TVec` | Amount of times to repeat the tile on the sprite: `{ x: 2, y: 2 }` Default: `{ x: 1, y: 1 }` | [src/SpriteMaterial.ts:68](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L68) |
| `spacing?` | `number` | Spacing between tiles in the tileset in px: `spacing: 2` Default: `0` | [src/SpriteMaterial.ts:76](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L76) |
| `tile?` | `number` \| `TVec` | Index or coordinates of a tile in the tileset. For a tileset with a w/h of 128 and a tile size of w/h 16, the coordinates/index for the second tile would look like this: `tile = { x: 16, y: 0 }` `tile = 1` Default: `0` | [src/SpriteMaterial.ts:48](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L48) |
| `tilesetSize?` | `TVec` | Size of the tileset in px: `{ x: 128, y: 128 }` | [src/SpriteMaterial.ts:60](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L60) |
| `tileSize?` | `TVec` | Size of the tile in the tileset in px: `{ x: 16, y: 16 }` | [src/SpriteMaterial.ts:54](https://github.com/riokoe/three-sprites/blob/main/src/SpriteMaterial.ts#L54) |
