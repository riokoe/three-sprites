import terser from '@rollup/plugin-terser';

export default {
  input: "dist/esm/index.js",
  output: [
    {
      file: "dist/browser/three-sprites.js",
      format: "iife",
      name: "ThreeSprites",
      globals: { three: "THREE" },
    },
    {
      file: "dist/browser/three-sprites.min.js",
      format: "iife",
      name: "ThreeSprites",
      globals: { three: "THREE" },
      plugins: [terser()]
    }
  ]
};
