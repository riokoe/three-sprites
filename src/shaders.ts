/**
 * Uniforms and fragment artifact to calculate sprites.
 */
const spriteShader = {

  /**
   * Uniforms, will be injected at the very top of the shader.
   */
  uniforms: (): string => (`
    uniform vec2 tileSize;
    uniform vec2 tileCoord;
    uniform vec2 tileRepeat;
  `),

  /**
   * Fragment shader artifact, will be injected at `fragReplace`.
   */
  frag: (): string => (`
    #ifdef USE_MAP
      vec4 sampledDiffuseColor = texture(
        map,
        mod(vMapUv * tileSize * tileRepeat, tileSize) + tileCoord
      );
      #ifdef DECODE_VIDEO_TEXTURE
        sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
      #endif
      diffuseColor *= sampledDiffuseColor;
    #endif
  `),

  /**
   * The string in the shader code that will be replaced with the
   * fragment shader artifact.
   */
  fragReplace: (): string => (`#include <map_fragment>`)
};

/**
 * Uniforms and fragment artifact to calculate tilemaps.
 */
const mapShader = {

  /**
   * Uniforms, will be injected at the very top of the shader.
   * code.
   */
  uniforms: (tileAmount: number): string => (`
    uniform float[${String(tileAmount)}] tiles;
    uniform vec2 tileSize;
    uniform vec2 tileCount;
    uniform vec2 tileFactor;
    uniform vec2 tileRepeat;
    uniform vec2 tileSpacing;
  `),

  /**
   * Fragment shader artifact, will be injected at `fragReplace`.
   */
  frag: (): string => (`
    #ifdef USE_MAP
      int tilesPerLayer = int(tileRepeat.x * tileRepeat.y);
      int layers = int(ceil(float(tiles.length()) / float(tilesPerLayer)));
      vec4 sampledDiffuseColor = vec4(0.0);
      for (int i = 0; i < layers; i++) {
        float tile = tiles[tilesPerLayer * i + int(floor(vMapUv.x * tileRepeat.x) + floor((1.0 - vMapUv.y) * tileRepeat.y) * tileRepeat.x)];
        vec2 tileCoord = vec2(mod(tile, tileCount.x) * tileSize.x, 1.0 - tileSize.y * (1.0 + floor(tile / tileCount.x)));
        vec4 layerColor = texture(map, mod(vMapUv * tileFactor, tileSize) * (1.0 - tileSpacing / tileSize) + tileCoord + tileSpacing / 2.0);
        sampledDiffuseColor = mix(
          sampledDiffuseColor,
          layerColor,
          layerColor.a
        );
      }
      #ifdef DECODE_VIDEO_TEXTURE
        sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
      #endif
      diffuseColor *= sampledDiffuseColor;
    #endif
  `),

  /**
   * The string in the shader code that will be replaced with the
   * fragment shader artifact.
   */
  fragReplace: (): string => (`#include <map_fragment>`)
};

export { spriteShader, mapShader };
